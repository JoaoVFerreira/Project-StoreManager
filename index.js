require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

const productsRouter = require('./router/productsRoutes');
const salesRouter = require('./router/salesRoutes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
