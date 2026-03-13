const { exec } = require('child_process');

console.log('Build process starting...');

exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error('Build Error:', error);
    return;
  }
  if (stderr) {
    console.error('Build Stderr:', stderr);
  }
  console.log('Build Stdout:', stdout);
  
  // Check build directory
  const fs = require('fs');
  if (fs.existsSync('./build')) {
    console.log('Build folder exists. Contents:');
    console.log(fs.readdirSync('./build'));
  } else {
    console.log('Build folder does not exist!');
  }
});