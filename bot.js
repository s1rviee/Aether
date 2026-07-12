require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const { execSync } = require('child_process');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// GMGN CLI wrapper
function runGmgn(cmd) {
  try {
    return execSync(`gmgn-cli ${cmd}`, { encoding: 'utf8', timeout: 30000 });
  } catch (e) {
    return `Error: ${e.message}`;
  }
}

bot.start((ctx) => ctx.reply('🤖 Aether Coin Screener siap!\n\n/screen <CA> - Screening satu coin\n/filter - Atur filter\n/status - Cek status'));

bot.command('screen', (ctx) => {
  const args = ctx.message.text.split(' ');
  const ca = args[1];
  if (!ca) return ctx.reply('❌ Gunakan: /screen <contract_address>');

  ctx.reply('🔍 Screening coin...');
  const info = runGmgn(`token info --chain sol --address ${ca}`);
  const security = runGmgn(`token security --chain sol --address ${ca}`);

  ctx.reply(`📊 Hasil Screening:\n\n${info.substring(0, 800)}...\n\nSecurity:\n${security.substring(0, 600)}...`);
});

// TODO: Implement full filter & cron logic
cron.schedule('*/15 * * * *', () => {
  console.log('Auto screening trending coins...');
  // Example: run market trending + filter
});

bot.launch();
console.log('🚀 Aether Bot is running...');
