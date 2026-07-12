const { execSync } = require('child_process');

function runGmgn(cmd) {
  try {
    return execSync(`gmgn-cli ${cmd}`, { 
      encoding: 'utf8', 
      timeout: 45000 
    }).trim();
  } catch (e) {
    console.error('GMGN Error:', e.message);
    return `❌ GMGN CLI Error: ${e.message}`;
  }
}

module.exports = { runGmgn };