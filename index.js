const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express();
app.use(cors)
const port = 3000;

app.use(express.json());

app.post('/openai', async (req, res) => {
    const apikey = process.env.API_KEY
  try {
    const userPrompt = req.body.prompt;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userPrompt }],
      model: 'gpt-3.5',
    }, {
      headers: {
        Authorization: `Bearer ${apikey}`,
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
