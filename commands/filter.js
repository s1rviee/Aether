const filterSettings = {}; // In-memory for now

module.exports = {
  showMenu: (ctx) => {
    ctx.reply('⚙️ **Filter Settings**
Pilih filter yang ingin diatur:', {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '💰 Min MCAP (USD)', callback_data: 'filter_mcap_min' }],
          [{ text: '📊 Min Liquidity', callback_data: 'filter_liq_min' }],
          [{ text: '⏰ Max Age (hours)', callback_data: 'filter_age_max' }],
          [{ text: '🔄 Reset All', callback_data: 'filter_reset' }],
          [{ text: '✅ Done', callback_data: 'filter_done' }]
        ]
      }
    });
  },

  handleCallback: async (ctx) => {
    const data = ctx.callbackQuery.data;
    const userId = ctx.from.id;

    if (data === 'filter_done') {
      return ctx.editMessageText('✅ Filter settings saved!');
    }

    if (data === 'filter_reset') {
      delete filterSettings[userId];
      return ctx.editMessageText('🔄 All filters reset.');
    }

    let prompt = '';
    if (data === 'filter_mcap_min') prompt = 'Masukkan minimal MCAP (USD):';
    else if (data === 'filter_liq_min') prompt = 'Masukkan minimal Liquidity (USD):';
    else if (data === 'filter_age_max') prompt = 'Masukkan maksimal age token (jam):';

    await ctx.editMessageText(prompt);
    // TODO: Handle next text input with session
  }
};