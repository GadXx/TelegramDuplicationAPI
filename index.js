import express from 'express';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
const port = 3000; 

app.use(bodyParser.json());

// Токен бота Telegram
const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(botToken, { polling: true });


app.post('/api/duplicateContact', (req, res) => {

    const { name, contact } = req.body;

    if (!name || !contact) {
        return res.status(400).json({ error: 'Both name and contact are required.' });
    }

    // Название чата куда пересылаются контактные данные
    const chatId = 'YOUR_TELEGRAM_CHAT_ID'; 
    const message = `Имя: ${name}\n Контакт: ${contact}`;

    bot.sendMessage(chatId, message)
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((error) => {
            console.error('Error sending message to Telegram:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
    });

app.listen(port);
