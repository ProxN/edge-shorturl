import { Heading } from '@components/elements/Heading';
import { Box } from '@components/layout/Box';
import { TextInput } from '@components/elements/TextInput';
import { Button } from '@components/elements/Button';
import { Text } from '@components/elements/Text';
import { Center } from '@components/layout/Center';
import { useEffect, useState } from 'react';
import { getURL } from '@lib/utility/supabase';

const validateURL = (url: string) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    url
  );
};

const Index = () => {
  const [url, setUrl] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [error, setError] = useState('');

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError('link is required.');
    } else {
      setError('');
    }
    setUrl(e.target.value);
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateURL(url)) {
      setError('invalid url');
    } else {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setShortURL(
        `${document.location.protocol}//${document.location.host}/${data.shortURL}`
      );
    }
  };

  return (
    <Box>
      <Center minH='100vh' flexDirection='column'>
        <Heading size='4xl' as='h1' mb='2.6rem'>
          SHORT URL
        </Heading>
        {shortURL ? (
          <Box>
            <Text as='a' href={shortURL}>
              {shortURL}
            </Text>
          </Box>
        ) : (
          <Box
            onSubmit={handleSumbit}
            as='form'
            display='flex'
            maxW='40rem'
            w='100%'
            flexDirection='column'
            alignItems='center'
          >
            <TextInput
              isRequired
              aria-describedby='url'
              defaultValue={url}
              value={url}
              onChange={handleURLChange}
              error={error}
              placeholder='enter link'
            />
            <Button mt='1.4rem' isPrimary>
              Shorten URL
            </Button>
          </Box>
        )}
      </Center>
    </Box>
  );
};

export default Index;
