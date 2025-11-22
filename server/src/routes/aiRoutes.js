const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Validate API Key on module load
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ CRITICAL: GEMINI_API_KEY is not set in environment variables!');
}

// Initialize Gemini
let genAI;
try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized successfully');
} catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error.message);
}

// Chat Endpoint
router.post('/chat', async (req, res) => {
    try {
        console.log('📨 AI Chat Request Received');

        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ API Key missing');
            return res.status(500).json({
                error: 'AI service not configured',
                details: 'API key is missing'
            });
        }

        if (!genAI) {
            console.error('❌ Gemini AI not initialized');
            return res.status(500).json({
                error: 'AI service initialization failed'
            });
        }

        const { message, history } = req.body;
        console.log('💬 User message:', message);
        const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error('AI Chat Error Detailed:', error);
        res.status(500).json({ error: 'Failed to generate response', details: error.message });
    }
});

// Insights Endpoint
router.post('/insights', async (req, res) => {
    try {
        console.log('📊 AI Insights Request Received');

        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ API Key missing');
            return res.status(500).json({
                error: 'AI service not configured',
                details: 'API key is missing'
            });
        }

        if (!genAI) {
            console.error('❌ Gemini AI not initialized');
            return res.status(500).json({
                error: 'AI service initialization failed'
            });
        }

        const { data } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

        const prompt = `
            Analyze the following inventory dashboard data and provide a brief 3-bullet summary of key insights and actionable recommendations.
            Keep it professional and concise.
            
            Data:
            ${JSON.stringify(data)}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text });
    } catch (error) {
        console.error('AI Insights Error Detailed:', error);
        res.status(500).json({ error: 'Failed to generate insights', details: error.message });
    }
});

module.exports = router;
