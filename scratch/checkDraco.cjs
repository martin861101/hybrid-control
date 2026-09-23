const fs = require('fs');
const buffer = fs.readFileSync('/home/apps/hybrid/public/3d/hc.glb');
const str = buffer.toString('utf8', 0, 1000);
if (str.includes('KHR_draco_mesh_compression')) {
  console.log('Uses Draco compression');
} else {
  console.log('No Draco compression found in first 1000 bytes');
}
if (str.includes('EXT_meshopt_compression')) {
  console.log('Uses Meshopt compression');
}
