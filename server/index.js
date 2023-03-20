const express = require('express');
const app = express() 
const db = require('./models')
const cors = require('cors');

app.use(express.json());
app.use(cors());

const postRouter = require('./routes/Posts');
app.use("/post", postRouter);

const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const userRouter = require("./routes/Registrations");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running");
    })
})