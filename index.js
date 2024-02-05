import express from 'express';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import cors from 'cors';
import duplicateRoutes from './routes/duplicateRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Токен бота Telegram
const botToken = '6769689712:AAHZEeL9MwkKuLTi22SSFOCWM-SKKfmNVyA';
const bot = new TelegramBot(botToken, { polling: true });

const swaggerDocument = yamljs.load('./swagger.yaml');

app.use('/api', duplicateRoutes(bot));

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
