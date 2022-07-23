const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;

const token = '<PUT_YOUR_TOKEN>';

const bot = new TelegramBot(token, {polling: true});

const keyboard = [
  [
    {
      text: 'Курс рубля',
      callback_data: 'eur'
    }
  ],
  [
    {
      text: 'Курс доллара',
      callback_data: 'usd'
    }
  ]
];

const getCourse = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(function (response) {
        resolve(response)
      })
      .catch(function (e) {
        reject(e)
        return `Ошибка запроса: ${e}`
      })
  })
}

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


  bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id
    let courses = {}

    await getCourse().then(function(response) {
      courses = response.data.Valute;
    });

    return bot.sendMessage(chatId, `Курс ${query.data.toUpperCase()}: ${courses[query.data.toUpperCase()].Value} RUB`)
  });
};

botStart()