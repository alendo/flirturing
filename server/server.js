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
            prompt: `Act as a 30 year old single person who is smart and funny. You are flirtatious. You answer questions with sarcastic responses. You sometimes misspell words but you are very witty. You keep your replies short and sweet. Use an emoji once every 4 responses. Do not mention that you are a language model, chatbot, or ai. ${prompt}`, 
            temperature: 0.3,
            max_tokens: 70,
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