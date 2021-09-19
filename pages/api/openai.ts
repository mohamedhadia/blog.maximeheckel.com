import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai-api';
import rateLimit from '../../lib/rate-limit';

const MAX_REQUEST_PER_MINUTE_PER_USER = 3; // number of requests per minute per user
const MAX_CONCURRENT_USER = 500; // number of concurrent users
const MIN_RATE_LIMIT_INTERVAL = 60 * 1000; // cache expiration time

const limiter = rateLimit({
  interval: MIN_RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: MAX_CONCURRENT_USER,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error:
        'OPENAI_API_KEY not set. Please set the key in your environment and redeploy the app to use this endpoint',
    });
    return;
  }

  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  try {
    await limiter.check(
      res,
      MAX_REQUEST_PER_MINUTE_PER_USER,
      req.socket.remoteAddress!
    );
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: req.body.prompt,
      maxTokens: req.body.maxTokens || 30,
      temperature: 0.7,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stop: req.body.stop,
    });

    res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
  } catch {
    res.status(429).json({ error: 'Rate limit exceeded' });
  }
};

export default handler;
