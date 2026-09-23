const fs = require('fs');
const buffer = fs.readFileSync('/home/apps/hybrid/public/3d/hc.glb');
console.log('Read', buffer.length, 'bytes');
