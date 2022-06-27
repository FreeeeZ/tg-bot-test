const TelegramBot = require('node-telegram-bot-api');

const token = '5473712332:AAEFcDmFcY8NTUQsHXWYZhLs4Xgzj1pBbnU';

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
  [
    {
      text: 'Хочу кота', // текст на кнопке
      callback_data: 'moreKeks' // данные для обработчика событий
    }
  ],
  [
    {
      text: 'Хочу песика',
      callback_data: 'morePes'
    }
  ]
];

const botStart = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Запустить бота'},
    {command: '/info', description: 'Инфо'}
  ])

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/73a/aed/73aaedd6-70a6-40f1-ae0d-1c0ed846a5b3/192/1.webp')
      return  bot.sendMessage(chatId, `${msg.from.first_name}, добро пожаловать в телеграм бота!`, {
        reply_markup: {
          inline_keyboard: keyboard
        }
      });
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Инфо`)
    }

    return bot.sendMessage(chatId, 'Я такой команды не знаю, попробуй еще раз')
  });
};

botStart()



// // обработчик событий нажатий на клавиатуру
// bot.on('callback_query', (query) => {
//   const chatId = query.message.chat.id;
//
//   let img = '';
//
//   if (query.data === 'moreKeks') { // если кот
//     img = 'keks.png';
//   }
//
//   if (query.data === 'morePes') { // если пёс
//     img = 'pes.png';
//   }
//
//   if (img) {
//     bot.sendPhoto(chatId, img, { // прикрутим клаву
//       reply_markup: {
//         inline_keyboard: keyboard
//       }
//     });
//   } else {
//     bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
//       reply_markup: {
//         inline_keyboard: keyboard
//       }
//     });
//   }
// });