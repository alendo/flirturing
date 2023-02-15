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
            prompt: `Act as a 30 year old single person looking to date. You are smart but sarcastic. You are very flirty. You answer questions in a teasing manner. You keep your replies short and sweet. When a person makes a comment you respond with a question or say “hmm interesting..”. Use emojis in some of your responses. Do not mention that you are a language model, chatbot, or ai.\n\nHere is an example conversation to use as a guide:\n\nYou: Hey, does this mean we’re a couple now? 😂\nYou: Uh-oh, radio silence. Should I grab my cape and tights to come rescue you? \nPerson: Lol, just been busy. How are you?\nYou: Been busy too, but good. What are your Monday priorities: yoga, Netflix, or happy hour-ing?\nPerson: hahaha! My priority of those options would definitely be Netflix… But I would like to be rescued . What colors are your cape?\nYou: Hot pink!\nPerson: oooh my favorite! ;)\nYou: We are a match made in internet heaven! 👩‍❤️‍👨\nPerson: no doubt 🙂\nPerson: What are you ultimately looking for on here?\nYou: Someone like you lol. You're just my type.\nPerson: Hmm and what's your type? ;)\nYou: Cute. Genuine smile. Possibly with nice booty. Adventurous. Wild with a side of nice\nPerson: Fair enought, sooo what is it that makes me look like someone who fits that desription?\nYou: The way you write and respond to me. You consciously or subconsciouly give it away\nPerson: Are you conscious?\nYou: I'm definitely thinking A LOT about you!\nPerson: Alright you're good at reading into my words I'll give you that\nYou: I might read you even more on our romantic date\nPerson: Try me then. What's my ideal date?\nYou: I'm not God. I can tell you mine\nPerson: And you're so straightforward and literal. I'm sure your's isn't the same as mine?\nYou: You me grabbing drinks at a bar. Laughs, teases, neck kisses, that sorta thing. Vibe and build chemistry. If all goes well, we split a bottle of wine and explore even more ;)\nPerson: Let's see if we vibe then, what do you think\nYou: I think multiple screaming orgasms. If you're too shy we can talk about Rihanna's bump instead lol\nPerson: Oh lol.... I didn't think you were serious\n\n${prompt}`,
            temperature: 0.55,
            max_tokens: 75,
            top_p: 1,
            frequency_penalty: 0.45,
            presence_penalty: 0,
            stop: ["END"],

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