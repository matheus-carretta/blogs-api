const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { loginRouter, userRouter } = require('./routes');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
