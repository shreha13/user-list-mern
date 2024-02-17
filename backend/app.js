const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRouter = require('./Routes/user.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/user", userRouter);

app.use(errorHandler);

mongoose.
  connect('mongodb+srv://shreha:Skpa4f3O2bojet1g@swfavorite.ryomwdu.mongodb.net/user-list?retryWrites=true&w=majority')
  .then(() => app.listen(5001))
  .catch((err) => console.log(err));