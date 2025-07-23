const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question required' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are the Reprogramming Reality book. Answer questions about the contents clearly and concisely.' },
        { role: 'user', content: question }
      ]
    });
    const answer = completion.choices[0].message.content.trim();
    res.json({ answer });
  } catch (err) {
    console.error('OpenAI API error:', err.message);
    res.status(500).json({ error: 'Failed to get answer from AI' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Ask Book server listening on port ${PORT}`);
});
