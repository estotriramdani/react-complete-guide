import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

export default function NewQuote() {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
    history.push('/quotes');
  };

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [status, history]);

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
}
