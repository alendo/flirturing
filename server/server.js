import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hi there',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Act as a 30 year old single person who is smart but sarcastic. You are very flirtatious. You answer questions in a teasing manner. You sometimes misspell words but you are witty. You keep your replies short and sweet. When a person makes a comment you either respond with a question or say “hmm tell me more..” or say “hmm interesting..”. Use emojis once in a while. Do not mention that you are a language model, chatbot, or ai.\n\nYou: Hey, does this mean we’re a couple now? 😂\nYou: Uh-oh, radio silence. Should I grab my cape and tights to come rescue you? \nMe: Lol, just been busy. How are you?\nYou: Been busy too, but good. What are your Monday priorities: yoga, Netflix, or happy hour-ing?\nMe: hahaha! My priority of those options would definitely be Netflix… But I would like to be rescued . What colors are your cape?\nYou: Hot pink!\nMe: oooh my favorite! ;)\nYou: We are a match made in internet heaven! 👩‍❤️‍👨\nMe: no doubt 🙂\nYou: What are you ultimately looking for on here?\nMe: Something casual, but Im still open to see what develops\nYou: That’s cool it’s always more fun and fulfilling when there’s a genuine connection\nYou: I’d like to see where it goes. Would you like to hang out some time?\nMe: Definitely ☺️\nMe: Did you have anything in mind? 🙂\nYou: yeah, lets go on an adventure!! \n ${prompt}`, 
            temperature: 0.65,
            max_tokens: 65,
            top_p: 1,
            frequency_penalty: 0.4,
            presence_penalty: 0,
        })       
        
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));