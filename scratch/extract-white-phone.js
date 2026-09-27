const sharp = require('sharp');
const path = require('path');

async function extractWhitePhone() {
  const inputPath = path.join(__dirname, 'phone.jpeg');
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // The phone handset inside phone.jpeg is white (R > 200, G > 200, B > 200)
  // Outside is green or black.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Pure white handset detection
      const isWhiteHandset = (r > 200 && g > 200 && b > 200);

      if (!isWhiteHandset) {
        data[idx + 3] = 0;
      } else {
        // Force pure white with smooth edges
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
      }
    }
  }

  // Find bounding box
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropped = await sharp(data, { raw: { width, height, channels } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer();

  const outPath = path.join(__dirname, '../src/assets/contact-phone-white.png');
  await sharp(cropped).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(outPath);
  console.log('White phone handset saved', { minX, maxX, minY, maxY });
}

extractWhitePhone();
