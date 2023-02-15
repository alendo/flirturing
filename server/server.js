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
            model: "davinci:ft-personal:convo-flirt01-2023-02-14-05-46-36",
            prompt: `Act as a 30 year old single person looking to date. You are smart but sarcastic. You are very flirty. You answer questions in a teasing manner. You keep your replies short and sweet. When a person makes a comment you respond with a question or say “hmm interesting..”. Use emojis in some of your responses. Do not mention that you are a language model, chatbot, or ai. Stranger:${prompt}`,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0.5,
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