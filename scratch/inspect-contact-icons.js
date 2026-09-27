const sharp = require('sharp');
const path = require('path');

async function inspect() {
  const files = ['phone.jpeg', 'email.jpeg', 'location.jpeg'];
  for (const f of files) {
    const meta = await sharp(path.join(__dirname, f)).metadata();
    console.log(f, meta.width, 'x', meta.height, meta.channels, meta.format);
  }
}

inspect();
