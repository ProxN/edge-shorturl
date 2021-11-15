import { NextApiRequest, NextApiResponse } from 'next';
import { setURL } from '@lib/utility/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.body.url;

  const shortURL = await setURL(url);

  if (!shortURL) {
    return res.status(400).json({});
  }
  res.status(201).json({ url, shortURL });
};

export default handler;
