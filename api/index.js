const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: ["https://gacha-simulator-five.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

/* ============================== Schema of 1999 and genshin ============================== */

const Schema = mongoose.Schema;
const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    rateUp: {
        type: Boolean,
        required: true
    },
    rateEnd: {
        type: Number,
        required: true
    },
    rateStart: {
        type: Number,
        required: true
    }
})

app.get('/', async(req, res) => {
    res.json('test!');
})

/* ============================== connect to the database of 1999 ============================== */

const Reversed1999DBConnection = mongoose.createConnection('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/summonPoolData?retryWrites=true&w=majority');
    // .then(() => console.log("Connect to MongoDB"))
    // .catch( error => console.log(error));

const Chr1999 = Reversed1999DBConnection.model("summonPool", CharacterSchema, "summonPool");

app.get('/allChrs', async(req, res) => {
    const chrs = await Chr1999.find({ name : { $nin : ["當期限定角色2", "當期限定角色3"] }});
    res.json(chrs);
})

app.get('/randomSelectOne', async(req, res) => {
    let randomNum = Math.random() * 100;
    console.log(`The random item is : ${randomNum}`);

    let randomChr = await Chr1999.findOne({ rateEnd: { $gte : randomNum }, rateStart: { $lte : randomNum }});
    if (randomNum >= 1.5 && randomNum <= 10) {  // once the user get the 5-star, he will have 50% chance to get the rateUp chr
        const randomRateUp = Math.random() < 0.5 ? 0 : 1;
        const randomRateUpChrNumber = Math.random() < 0.5 ? 2 : 3;
        randomChr = (randomRateUp === 0)
            ? randomChr
            : await Chr1999.findOne({ name: `當期限定角色${randomRateUpChrNumber}` });
    }
    else if (randomNum >= 0 && randomNum < 1.5) {   // once the user get the 6-star, he will have 50% chance to get the rateUp chr
        const randomBoolean = Math.random() < 0.5 ? 0 : 1;
        randomChr = (randomBoolean === 0)
            ? randomChr
            : await Chr1999.findOne({ name: "當期限定角色" });
    }

    res.json(randomChr);
})

app.get('/getGuarantee4star', async(req, res) => {  // every ten summons(once ten) will get at least one 4-star(or above) chr
    let randomNum = Math.random() * 50;
    // 4 star charactor start from rateStart = 10 to rateEnd = 50
    // 5 star charactor start from rateStart = 1.5 to rateEnd = 10
    // 6 star charactor start from rateStart = 0 to rateEnd = 1.5 
    console.log(`The random guarantee item is : ${randomNum}`);
    const randomChr = await Chr1999.findOne({ rateEnd : { $gte : randomNum }, rateStart : { $lte : randomNum }});
    res.json(randomChr);
})

app.get('/getGuarantee6star', async(req, res) => {
    const detector = Math.random();
    const randomBoolean = (detector < 0.5) ? 1 : 0;
    let randomNum = (randomBoolean === 0) ? Math.random() * 1.3636363 : 1.4;    // use randomNum 1.4 to fetch the rateUpChr
    console.log(`The random guarantee 6 star item is : ${randomNum}`);
    const randomChr = await Chr1999.findOne({ rateEnd : { $gte : randomNum }, rateStart : { $lte : randomNum }});
    res.json(randomChr);
})

app.get('/getGuaranteeRateUp6star', async(req, res) => {
    const returnChr = await Chr1999.findOne({ rateUp : true, star : 6 });
    res.json(returnChr);
})

/* ============================== connect to the database of genshin ============================== */

const genshinDBConnection = mongoose.createConnection('mongodb+srv://iamjeffhi67:SOWdtKJHpkzuT2U5@simulator1999db.qh4flhu.mongodb.net/Genshin?retryWrites=true&w=majority');

const ChrGenshin = genshinDBConnection.model("Genshin-num1", CharacterSchema, "Genshin-num1");

app.get('/allChrs_2', async(req, res) => {
    const chrs = await ChrGenshin.find({ name : { $nin : ["當期限定角色2", "當期限定角色3", "當期限定角色4"] }});
    res.json(chrs);
})

app.get('/randomSelectOne_2', async(req, res) => {
    let randomNum = Math.random() * 100;
    console.log(`The random item is : ${randomNum}`);

    let randomChr = await ChrGenshin.findOne({ rateEnd: { $gte : randomNum }, rateStart: { $lte : randomNum }});
    if (randomNum > 0.6 && randomNum < 5.7) {  // once the user get the 5-star, he will have 50% chance to get the rateUp chr
        const randomRateUp = Math.random() < 0.5 ? 0 : 1;
        const randomRateUpChrNumber = Math.random() < 0.5 ? 2 : 3;
        randomChr = (randomRateUp === 0)
            ? randomChr
            : await ChrGenshin.findOne({ name: `當期限定角色${randomRateUpChrNumber}` });
    }
    else if (randomNum >= 0 && randomNum <= 0.6) {   // once the user get the 6-star, he will have 50% chance to get the rateUp chr
        const randomBoolean = Math.random() < 0.5 ? 0 : 1;
        randomChr = (randomBoolean === 0)
            ? randomChr
            : await ChrGenshin.findOne({ name: "當期限定角色" });
    }

    res.json(randomChr);
})

app.get('/getGuarantee4star_2', async(req, res) => {  // every ten summons(once ten) will get at least one 4-star(or above) chr
    let randomNum = Math.random() * 5.7;   // IDK
    console.log(`The random guarantee item is : ${randomNum}`);
    const randomChr = await ChrGenshin.findOne({ rateEnd : { $gte : randomNum }, rateStart : { $lte : randomNum }});
    res.json(randomChr);
})

app.get('/getGuarantee5star_2', async(req, res) => {
    const detector = Math.random();
    const randomBoolean = (detector < 0.5) ? 1 : 0;
    let randomNum = (randomBoolean === 0) ? Math.random() * 0.469 : 0.5;    // use randomNum 1.4 to fetch the rateUpChr
    console.log(`The random guarantee 5 star item is : ${randomNum}`);
    const randomChr = await ChrGenshin.findOne({ rateEnd : { $gte : randomNum }, rateStart : { $lte : randomNum }});
    res.json(randomChr);
})

app.get('/getGuaranteeRateUp5star_2', async(req, res) => {
    const returnChr = await ChrGenshin.findOne({ rateUp : true, star : 5 });
    res.json(returnChr);
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`));