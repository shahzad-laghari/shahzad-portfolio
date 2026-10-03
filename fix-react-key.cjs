const fs = require('fs');

// Read file
let content = fs.readFileSync('./src/data/techIcons.js', 'utf8');

// The react key lost its "react: " prefix - fix it
// Line 18 currently starts with spaces + backtick (SVG content)
// We need to add "react: " before that backtick
content = content.replace(
  /\n(\s+)(`<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="-11\.5)/,
  '\n$1react: $2'
);

fs.writeFileSync('./src/data/techIcons.js', content, 'utf8');
console.log('Fixed react key');
console.log('Lines around fix:');
const lines = content.split('\n');
lines.slice(15, 23).forEach((l, i) => console.log(`Line ${16+i}: ${l.substring(0, 80)}`));
