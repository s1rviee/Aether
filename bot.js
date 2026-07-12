require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

// Import modules
const { runGmgn } = require('./utils/gmgn');
const { formatOutput } = require('./utils/formatter');
const screenCommand = require('./commands/screen');
const filterCommand = require('./commands/filter');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Basic commands
bot.start((ctx) => {
  ctx.reply('🤖 **Aether Coin Screener** siap!\n\n' + 
    '/screen <CA> — Screening lengkap token\n' + 
    '/filter — Atur filter coin\n' + 
    '/status — Cek bot status');
});

bot.command('screen', screenCommand);
bot.command('filter', filterCommand.showMenu);

// Handle inline buttons
bot.on('callback_query', async (ctx) => {
  await filterCommand.handleCallback(ctx);
  await ctx.answerCbQuery();
});

// Cron auto screening
cron.schedule('*/15 * * * *', () => {
  console.log('🔄 Auto screening trending coins...');
  // TODO: Implement full logic
});

bot.launch();
console.log('🚀 Aether Bot is running...');