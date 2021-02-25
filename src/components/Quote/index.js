import React, { useState, useEffect } from 'react';
import { api } from 'src/utils/url';
import axios from 'axios';

import './Quote.scss';

const Quote = () => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    axios(`${api}/citation`)
      .then((res) => {
        setQuote({ quote: res.data.Quote, author: res.data.Author });

        setTimeout(() => {
          setLoading(!loading);
        }, 0);
      });

  }, [reload]);

  const handleClick = () => {

  };

  const className = (base) => {
    let classN = base;
    if (!loading) {
      classN += ' active';
    }
    return classN;
  };

  return (
    <div onClick={handleClick} className={className('quote-container')}>
      {loading
        ? 'loading'
        : (
          <>
            <div className="quote">{quote.quote}</div>
            <div className="quote-author">- {quote.author}</div>
          </>
        )}
    </div>
  );
};

export default Quote;
