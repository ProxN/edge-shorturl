import { createClient } from '@supabase/supabase-js';

type Url = {
  id: string;
  url: string;
  shortURL: string;
  created_at: Date;
};

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey, { fetch });

const genreateURL = () => {
  const words = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  return Array.from(Array(8))
    .map((_) => words[Math.floor(Math.random() * words.length)])
    .join('');
};

export const setURL = async (url: string) => {
  const shortURL = genreateURL();
  const response = await supabase.from<Url>('url').insert({ url, shortURL });

  if (response.status === 201) {
    return shortURL;
  }
  return null;
};

export const getURL = async (short: string) => {
  const response = await supabase
    .from<Url>('url')
    .select()
    .eq('shortURL', short);

  return response.data;
};
