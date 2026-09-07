import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgContent = fs.readFileSync('public/brand/logo-primary.svg', 'utf8');

async function generatePng() {
  await sharp(Buffer.from(svgContent))
    .resize(1024, 1024)
    .png({ quality: 100 })
    .toFile('public/brand/logo-primary.png');
  console.log('Successfully generated public/brand/logo-primary.png');
}

generatePng().catch(console.error);
