const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const express = require('express');
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
    console.log(req.body["prompt"])
    if (!configuration.apiKey) {
        res.status(500).json({
        error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
        }
        });
        return;
    }

    const prompt = req.body.prompt || '';
    if (prompt.trim().length === 0) {
        res.status(400).json({
        error: {
            message: "Please enter a valid prompt",
        }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.3,
            max_tokens: 1000
        });
        console.log(completion.data)
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                message: 'An error occurred during your request.',
                }
            });
        }
    }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});