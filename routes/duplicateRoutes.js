import express from 'express';

const router = express.Router();

const duplicateRoutes = (bot) => {
  router.post('/duplicateContact', (req, res) => {
    const { name, contact } = req.body;

    if (!name || !contact) {
      return res.status(400).json({ error: 'Both name and contact are required.' });
    }
    // ID чата
    const chatId = '-1002135706866'; 
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

  return router;
};

export default duplicateRoutes;
