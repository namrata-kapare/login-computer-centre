const sharp = require('sharp');
const path = require('path');

async function processPhoneClean() {
  const inputPath = path.join(__dirname, 'phone.jpeg');
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Green squircle detection:
  // The green shape has high green (G > 120) and G > R * 1.15 and G > B * 1.15, OR white phone handset (R > 200, G > 200, B > 200 inside the icon)
  // Outside background is black with watermarks (R < 100, G < 100, B < 100)
  // Let's identify the icon bounding box and make any background outside the icon transparent
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const isGreen = (g > 100 && g > r * 1.1 && g > b * 1.1);
      const isWhite = (r > 200 && g > 200 && b > 200);

      // Check if it's the black/dark watermark background
      if (!isGreen && !isWhite) {
        data[idx + 3] = 0;
      }
    }
  }

  // Crop to bounding box
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

  const outPath = path.join(__dirname, '../src/assets/contact-phone.png');
  await sharp(cropped).resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(outPath);
  console.log('Clean phone saved', { minX, maxX, minY, maxY });
}

async function processEmailClean() {
  const inputPath = path.join(__dirname, 'email.jpeg');
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // The envelope is yellow / orange:
  // R is dominant, G is high, B is low: R > 170, G > 120, (R - B) > 60
  // Background checkerboard is neutral gray/white: |R-G| < 15, |R-B| < 15, |G-B| < 15
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const isYellow = (r > 160 && g > 110 && (r - b) > 50);

      if (!isYellow) {
        data[idx + 3] = 0;
      }
    }
  }

  // Crop to bounding box
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

  const outPath = path.join(__dirname, '../src/assets/contact-email.png');
  await sharp(cropped).resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(outPath);
  console.log('Clean email saved', { minX, maxX, minY, maxY });
}

async function processLocationClean() {
  const inputPath = path.join(__dirname, 'location.jpeg');
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // The pin head is red: R > 70 and R > G * 1.3 and R > B * 1.3
  // The needle is silver gray along the center column: x between 230 and 280, y > 230, and brightness > 40
  // Background is pure black (R < 35, G < 35, B < 35)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const isRedHead = (r > 60 && r > g * 1.25 && r > b * 1.25);
      const isNeedle = (x >= 235 && x <= 275 && y >= 230 && (r > 40 || g > 40 || b > 40));

      if (!isRedHead && !isNeedle) {
        data[idx + 3] = 0;
      }
    }
  }

  // Crop to bounding box
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

  const outPath = path.join(__dirname, '../src/assets/contact-location.png');
  await sharp(cropped).resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toFile(outPath);
  console.log('Clean location saved', { minX, maxX, minY, maxY });
}

async function run() {
  await processPhoneClean();
  await processEmailClean();
  await processLocationClean();
}

run();
