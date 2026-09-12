const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../src/assets/service-icons');

async function processImage(filePath) {
  try {
    const { data, info } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    
    // Create a visited array
    const visited = new Uint8Array(width * height);
    const queue = [];
    
    const isBackground = (x, y) => {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      if (a === 0) return true; // already transparent
      
      // Black check
      if (r <= 50 && g <= 50 && b <= 50) return true;
      
      // White/Gray checkerboard check (r, g, b are close, and > 180)
      if (r > 150 && g > 150 && b > 150 && Math.abs(r - g) < 25 && Math.abs(r - b) < 25 && Math.abs(g - b) < 25) {
        return true;
      }
      
      return false;
    };

    // Initialize queue with borders
    for (let x = 0; x < width; x++) {
      for (let y of [0, height - 1]) {
        if (isBackground(x, y)) {
          queue.push({ x, y });
          visited[y * width + x] = 1;
        }
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x of [0, width - 1]) {
        if (!visited[y * width + x] && isBackground(x, y)) {
          queue.push({ x, y });
          visited[y * width + x] = 1;
        }
      }
    }
    
    // Flood fill BFS
    let head = 0;
    while (head < queue.length) {
      const { x, y } = queue[head++];
      
      // Make transparent
      const idx = (y * width + x) * channels;
      data[idx + 3] = 0; // set alpha to 0
      data[idx] = 0;
      data[idx+1] = 0;
      data[idx+2] = 0;
      
      // Check 8 neighbors
      const neighbors = [
        { nx: x + 1, ny: y },
        { nx: x - 1, ny: y },
        { nx: x, ny: y + 1 },
        { nx: x, ny: y - 1 },
        { nx: x + 1, ny: y + 1 },
        { nx: x - 1, ny: y - 1 },
        { nx: x + 1, ny: y - 1 },
        { nx: x - 1, ny: y + 1 }
      ];
      
      for (const { nx, ny } of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          if (!visited[ny * width + nx]) {
            if (isBackground(nx, ny)) {
              visited[ny * width + nx] = 1;
              queue.push({ x: nx, y: ny });
            }
          }
        }
      }
    }
    
    // Write back as PNG
    const tempPath = filePath + '.temp.png';
    await sharp(data, { raw: { width, height, channels } }).png().toFile(tempPath);
    
    // If it was a jpg, we should remove the old one and rename the new one, but for simplicity we will just overwrite if it's png, or rename if jpg
    if (filePath.toLowerCase().endsWith('.png')) {
        fs.renameSync(tempPath, filePath);
    } else {
        const newPath = filePath.substring(0, filePath.lastIndexOf('.')) + '.png';
        fs.renameSync(tempPath, newPath);
        fs.unlinkSync(filePath);
    }
    
    console.log(`Processed ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`Error processing ${path.basename(filePath)}:`, err.message);
  }
}

async function main() {
  const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images to process.`);
  for (const file of files) {
    const fullPath = path.join(iconsDir, file);
    await processImage(fullPath);
  }
  console.log('Done.');
}

main();
