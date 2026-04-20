import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import OpenAI from 'openai';
import 'dotenv/config'; // Automatically loads your existing .env file

const app = express();
const PORT = process.env.PORT || 3001;
const FILE_PATH = './chat-history.json';

app.use(cors());
app.use(express.json());

// Initialize OpenAI securely on the backend
const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.VITE_OPENAI_API_KEY,
});

// Helper to read messages from our JSON "database"
async function getMessages() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist yet, return empty array
        return [];
    }
}

// Helper to save messages
async function saveMessages(messages) {
    await fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2));
}

// 1️⃣ Endpoint: Fetch full stored chat history on page load
app.get('/api/messages', async (req, res) => {
    const messages = await getMessages();
    res.json(messages);
});

// 2️⃣ Endpoint: Accept user message, call AI, save both
app.post('/api/messages', async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required' });

    const messages = await getMessages();

    const userMessage = { role: 'user', content, _id: Date.now() };
    messages.push(userMessage);

    try {
        // Format history for OpenAI
        const formattedHistory = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
        }));

        const completion = await openai.chat.completions.create({
            messages: formattedHistory,
            model: "openai/gpt-4o-mini",
        });

        const aiResponse = completion.choices[0].message.content;
        const aiMessage = { role: 'ai', content: aiResponse, _id: Date.now() + 1 };

        messages.push(aiMessage);
        await saveMessages(messages);

        res.json({ userMessage, aiMessage });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to generate AI response' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});