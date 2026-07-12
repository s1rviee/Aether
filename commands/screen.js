const { runGmgn } = require('../utils/gmgn');
const { formatOutput } = require('../utils/formatter');

module.exports = async (ctx) => {
  const args = ctx.message.text.split(' ').slice(1);
  const ca = args[0];
  
  if (!ca) {
    return ctx.reply('❌ Gunakan: `/screen <contract_address>`', { parse_mode: 'Markdown' });
  }

  await ctx.reply('🔍 **Sedang screening coin...** Mohon tunggu sebentar.');

  const info = runGmgn(`token info --chain sol --address ${ca}`);
  const security = runGmgn(`token security --chain sol --address ${ca}`);

  const formatted = formatOutput(info, security);
  ctx.reply(formatted, { parse_mode: 'Markdown' });
};