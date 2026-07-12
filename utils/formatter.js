function formatOutput(info, security) {
  let output = '📊 **Hasil Screening Token**\n\n';
  
  output += '📌 **Token Info**\n';
  output += '```\n' + info.substring(0, 1200) + (info.length > 1200 ? '...' : '') + '\n```\n\n';
  
  output += '🔒 **Security Check**\n';
  output += '```\n' + security.substring(0, 800) + (security.length > 800 ? '...' : '') + '\n```\n\n';
  
  output += '💡 Gunakan /screen <CA> lain atau tanya detail lebih lanjut!';
  return output;
}

module.exports = { formatOutput };