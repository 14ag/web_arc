const express = require('express');
        const { OpenAI } = require('openai'); // Import the OpenAI class
        const cors = require('cors'); // Import cors

        const app = express();
        const port = 3000;

        app.use(cors()); // use cors

        // Replace with your actual OpenAI API key (and never commit this to version control directly!)
        const apiKey = 'YOUR_OPENAI_API_KEY';

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        app.use(express.json()); // to parse JSON bodies

        app.post('/calculate', async (req, res) => {
            try {
                const { expression } = req.body; // Get the calculation string from the client

                if (!expression) {
                    return res.status(400).json({ error: 'Missing expression' });
                }

                const systemPrompt = "you are just a calculator. Be brief. give numeric answer only, maximum number of decimal paces should be 3";
                // Send request to openai api
                const completion = await openai.chat.completions.create({
                  messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: expression },
                  ],
                  model: "gpt-3.5-turbo",
                });

                //response from openai
                const answer = completion.choices[0].message.content;
                
                res.json({ result: answer });
            } catch (error) {
                console.error('Error with OpenAI API:', error);
                res.status(500).json({ error: 'An error occurred with the OpenAI API' });
            }
        });

        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });




export function getAnswer(question) {
    //AI api stuff goes here
    const main = async () => {
        const completion = await api.chat.completions.create({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: question,
                },
            ],
            temperature: 0.0,
            max_tokens: 256,
        });

        const response = completion.choices[0].message.content;

        console.log("User:", userPrompt);
        console.log("AI:", response);
        return response;
    };
    return main()
}