const express = require('express');
const cors = require('cors');

const diaryRouter = require('./routers/diary');

const api = express();

api.use(cors());
api.use(express.json());

api.get("/", (req, res) => {
    res.json({
        title: "Diary",
        description: "does it work?"
    })
})

api.use('/diary', diaryRouter)

module.exports = api;