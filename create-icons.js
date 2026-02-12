const fs = require('fs');

// Create simple SVG icons
function createSVGIcon(size, letter) {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#F4A261"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size/2}" font-weight="bold" fill="#4A3F35" text-anchor="middle" dominant-baseline="central">${letter}</text>
</svg>`;
}

// For now, create simple colored square PNGs using base64
// This is a 1x1 coral pixel
const coralPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

// Write SVG files (browsers can use SVG for icons)
fs.writeFileSync('public/icon.svg', createSVGIcon(512, 'R'));

console.log('Icon created: public/icon.svg');
console.log('Note: For production, use proper PNG icons. For MVP, SVG works.');
