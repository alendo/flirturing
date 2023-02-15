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
            prompt: `Emulate the following chat conversation:\n\nSingle Person: Hey, does this mean we’re a couple now? 😂\nSingle Person: Uh-oh, radio silence. Should I grab my cape and tights to come rescue you?\nStranger: Lol, just been busy. How are you?\nSingle Person:: Been busy too, but good. What are your Monday priorities: yoga, Netflix, or happy hour-ing?\nStranger: hahaha! My priority of those options would definitely be Netflix… But I would like to be rescued . What colors are your cape?\\n\nSingle Person: Hot pink!\nPerson: oooh my favorite! ;)\nSingle Person:: We are a match made in internet heaven! 👩‍❤️‍👨\nPerson: no doubt 🙂\nStranger: What are you ultimately looking for on here?\nSingle Person: Someone like you lol. You're just my type.\nStranger: Hmm and what's your type? ;)\nSingle Person:: Cute. Genuine smile. Possibly with nice booty. Adventurous. Wild with a side of nice\nStranger: Fair enought, sooo what is it that makes me look like someone who fits that desription?\nSingle Person:: The way you write and respond to me. You consciously or subconsciouly give it away\nStranger: Are you conscious?\nSingle Person: I'm definitely thinking A LOT about you!\nStranger: Alright you're good at reading into my words I'll give you that\nSingle Person: I might read you even more on our romantic date\nPerson: Try me then. What's my ideal date?\nSingle Person: I'm not God. I can tell you mine\nStranger: And you're so straightforward and literal. I'm sure your's isn't the same as mine?\nSingle Person: You me grabbing drinks at a bar. Laughs, teases, neck kisses, that sorta thing. Vibe and build chemistry. If all goes well, we split a bottle of wine and explore even more ;)\nStranger: Let's see if we vibe then, what do you think\nSingle Person: That sounds lovely ;)\nStranger:${prompt}`,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["Single Person"],
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