const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/summonPoolData?retryWrites=true&w=majority');
    // .then(() => console.log("Connect to MongoDB"))
    // .catch( error => console.log(error));

// mongoose.connection('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/summonPoolData?retryWrites=true&w=majority');

const Chr = require('./models/Character');

app.get('/allChrs', async(req, res) => {
    const chrs = await Chr.find();

    res.json(chrs);
})

app.get('/randomSelectOne', async(req, res) => {
    let randomNum = Math.random() * 100;
    console.log(`The random item is : ${randomNum}`);
    const randomChr = await Chr.findOne({ rateEnd: { $gte : randomNum }, rateStart: { $lte : randomNum }});

    res.json(randomChr);
})

app.get('/getGuarantee4star', async(req, res) => {
    let randomNum = Math.random() * 50;
    // 4 star charactor start from rateStart = 10 to rateEnd = 50
    // 5 star charactor start from rateStart = 1.5 to rateEnd = 10
    console.log(`The random guarantee item is : ${randomNum}`);
    const randomChr = await Chr.findOne({ rateEnd : { $gte : randomNum }, rateStart : { $lte : randomNum }});

    res.json(randomChr);
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`));