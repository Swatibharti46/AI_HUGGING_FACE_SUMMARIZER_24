const axios = require('axios');
require('dotenv').config(); // Ensure environment variables are loaded

async function summarizeText(text) {
  const data = JSON.stringify({
    inputs: text,
    parameters: {
      max_length: 100,
      min_length: 30
    }
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${process.env['ACCESS_TOKEN']}`
    },
    data
  };

  try {
    const response = await axios.request(config);
    console.log('API Response:', response.data); // Log full response for debugging
    return response.data[0].summary_text; // Adjust based on actual API response
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.error(error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error in request setup:', error.message);
    }
    throw error; // Re-throw to handle it upstream
  }
