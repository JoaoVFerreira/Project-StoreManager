require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

const productsRouter = require('./router/productsRoutes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
