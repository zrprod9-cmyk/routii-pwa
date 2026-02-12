// Vercel Serverless Function - Generate Icon with WaveSpeed AI
// Endpoint: POST /api/generate-icon
// Body: { prompt, imageBase64? }
// Returns: { success: true, imageUrl: "data:image/png;base64,..." }

const API_BASE = 'https://api.wavespeed.ai/api/v3';
const API_KEY = process.env.WAVESPEED_API_KEY || 'c644d55fdd07d3b127583e313aa67fc46d80ba3a5d7630748b7f26d4027c8a61';

const MODELS = {
  t2i: 'google/nano-banana-pro/text-to-image',
  edit: 'google/nano-banana-pro/edit',
};

// Submit task to WaveSpeed
async function submitTask(modelId, payload) {
  const url = `${API_BASE}/${modelId}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.code !== 200) {
    throw new Error(data.message || 'Failed to submit task');
  }

  return data.data.urls.get; // poll URL
}

// Poll for result
async function pollResult(pollUrl, maxWaitSeconds = 90) {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitSeconds * 1000) {
    const response = await fetch(pollUrl, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();
    const status = data.data.status;

    if (status === 'completed') {
      return data.data.outputs[0]; // first output URL
    } else if (status === 'failed') {
      throw new Error(data.data.error || 'Generation failed');
    }

    // Wait 2s before next poll
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  throw new Error('Timeout waiting for result');
}

// Download image as base64
async function downloadImageAsBase64(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, imageBase64 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Determine model and payload
    let modelId;
    let payload;

    if (imageBase64) {
      // Edit mode
      modelId = MODELS.edit;
      payload = {
        prompt,
        image: imageBase64.replace(/^data:image\/\w+;base64,/, ''), // strip prefix
      };
    } else {
      // Text-to-image mode
      modelId = MODELS.t2i;
      payload = { prompt };
    }

    console.log(`Generating icon: "${prompt}" (${imageBase64 ? 'edit' : 'text-to-image'})`);

    // Submit task
    const pollUrl = await submitTask(modelId, payload);
    console.log(`Task submitted, polling: ${pollUrl}`);

    // Poll for result (max 90s - Vercel Pro timeout)
    const imageUrl = await pollResult(pollUrl, 90);
    console.log(`Image ready: ${imageUrl}`);

    // Download and convert to base64
    const imageBase64Result = await downloadImageAsBase64(imageUrl);

    return res.status(200).json({
      success: true,
      imageUrl: imageBase64Result,
    });
  } catch (error) {
    console.error('Error generating icon:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate icon',
    });
  }
}
