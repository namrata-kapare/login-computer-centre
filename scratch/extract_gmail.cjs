const path = require('path');
const sharp = require(path.join(__dirname, 'node_modules', 'sharp'));
const fs = require('fs');

async function processGmail() {
  const inputPath = path.resolve(__dirname, '../src/assets/gmail_raw.jpeg');
  const img = sharp(inputPath);
  const metadata = await img.metadata();
  console.log('Metadata:', metadata);

  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  console.log('Image dimensions:', info.width, 'x', info.height, 'channels:', info.channels);

  const w = info.width;
  const h = info.height;
  const outBuffer = Buffer.from(data);

  // Identify M symbol pixels specifically:
  // The M logo has distinct chromatic colors:
  // Red/Coral: high R (R > 180), lower G and B
  // Yellow/Orange: high R and G, low B
  // Green: high G (G > 150), lower B
  // Blue: high B (B > 180), lower R
  // Delta (max - min) is significant (> 45) for all M logo pixels
  // And the logo is located in the middle region (x: 25..165, y: 35..155)
  let minX = w, maxX = 0, minY = h, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = outBuffer[idx];
      const g = outBuffer[idx + 1];
      const b = outBuffer[idx + 2];

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;

      // Filter out khaki background and white box
      const isKhaki = (r < 180 && g < 175 && b < 140 && Math.abs(r - g) < 40 && (r - b) > 15 && (r - b) < 65);
      const isWhiteOrGray = (min > 200 && delta < 35) || (delta < 30);

      // Check if pixel is within the central logo area and has strong logo coloration
      const inLogoZone = (x >= 20 && x <= w - 20 && y >= 30 && y <= h - 35);
      const isMLogo = inLogoZone && delta >= 45 && !isKhaki && !isWhiteOrGray;

      if (isMLogo) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`M logo bounding box: (${minX}, ${minY}) to (${maxX}, ${maxY}), size: ${maxX - minX + 1}x${maxY - minY + 1}`);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = outBuffer[idx];
      const g = outBuffer[idx + 1];
      const b = outBuffer[idx + 2];

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;

      if (x < minX - 1 || x > maxX + 1 || y < minY - 1 || y > maxY + 1) {
        outBuffer[idx + 3] = 0;
      } else if (delta < 28 || (min > 210 && delta < 40)) {
        outBuffer[idx + 3] = 0;
      } else if (delta >= 28 && delta < 48 && (r > 180 || g > 180 || b > 180)) {
        // Anti-aliased boundary around logo
        const alpha = Math.min(255, Math.max(0, Math.round(((delta - 28) / 20) * 255)));
        outBuffer[idx + 3] = alpha;
      } else {
        outBuffer[idx + 3] = 255;
      }
    }
  }

  const padding = 2;
  const cropX = Math.max(0, minX - padding);
  const cropY = Math.max(0, minY - padding);
  const cropW = Math.min(w - cropX, (maxX - minX + 1) + padding * 2);
  const cropH = Math.min(h - cropY, (maxY - minY + 1) + padding * 2);

  const fullExtracted = sharp(outBuffer, {
    raw: {
      width: w,
      height: h,
      channels: 4
    }
  });

  const outputPath = path.resolve(__dirname, '../src/assets/contact-email.png');
  await fullExtracted
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile(outputPath);

  console.log('Saved transparent cropped Gmail icon to:', outputPath);
}

processGmail().catch(console.error);
