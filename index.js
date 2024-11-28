const express = require('express');
const cors = require('cors'); // Import cors for cross-origin requests

const app = express();

// Use the PORT environment variable or default to 3000
const port = process.env.PORT || 3000;

// Import your summarizeText function
const summarizeText = require('./summarize.js');

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', async (req, res) => {
  try {
    const text = req.body.text_to_summarize;
    if (!text) {
      return res.status(400).json({ error: 'text_to_summarize is required' });
    }

    // Call your summarizeText function
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing text:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server (only for development or Replit)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

// Export the app for Vercel
module.exports = app;
