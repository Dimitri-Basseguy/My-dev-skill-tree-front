import React, { useState, useEffect } from 'react';

const faqItem = ({ id, title, content }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      let isMounted = true;
      setTimeout(() => {
        if (isMounted) {
          setShow(!show);
        }
      }, id*250);
      return () => {
        isMounted = false;
      };
    }
  }, [id]);


  const className = (base) => {
    let classN = base + ' loading';
    if (show) {
      classN = base;
    }
    return classN;
  };

  return (
    <div className={className('faq-item')}>
      <div className="faq-item-title">
        {title}
      </div>
      <div className="faq-item-content">
        {content}
      </div>
    </div>
  );
};

export default faqItem;
