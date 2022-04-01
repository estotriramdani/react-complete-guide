import { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

export const DUMMY_QUOTES = [
  {
    id: 'q1',
    text: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
  },
  {
    id: 'q2',
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: 'Albert Einstein',
  },
  {
    id: 'q3',
    text: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    author: 'Bernard M. Baruch',
  },
  {
    id: 'q4',
    text: 'A room without books is like a body without a soul.',
    author: 'Marcus Tullius Cicero',
  },
  {
    id: 'q5',
    text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: 'Dr. Seuss',
  },
  {
    id: 'q6',
    text: 'You only live once, but if you do it right, once is enough.',
    author: 'Mae West',
  },
  {
    id: 'q7',
    text: 'Be the change that you wish to see in the world.',
    author: 'Mahatma Gandhi',
  },
  {
    id: 'q8',
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: 'Robert Frost',
  },
  {
    id: 'q9',
    text: 'No one can make you feel inferior without your consent.',
    author: 'Eleanor Roosevelt',
  },
  {
    id: 'q10',
    text: 'A friend is someone who knows all about you and still loves you.',
    author: 'Elbert Hubbard',
  },
];

export default function AllQuotes() {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <QuoteList quotes={loadedQuotes} />
    </div>
  );
}
