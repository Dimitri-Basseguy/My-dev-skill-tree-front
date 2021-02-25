import React, { useState, useEffect } from 'react';
import { api } from 'src/utils/url';
import axios from 'axios';
import Quote from 'src/components/Quote';
import Footer from 'src/components/Footer';
import './faq.scss';
// import skillTreeNext from 'src/assets/images/skilltree-next.jpg';
import FaqItem from './item';



const Faq = () => {
  document.title = 'FAQ | My Dev Skill Tree';
  const [loading, setLoading] = useState(true);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${api}/faq/list`,
    })
      .then((res) => {
        setFaq(res.data);
        setLoading(false);
      });
  }, []);


  return (
    <div className="container">
      <div className="faq-page">
        <div className="faq">
          <h1 className="title">FAQ</h1>
          <Quote />
          {!loading && (
            faq.map((item, index) => {
              return (
                <>
                  <FaqItem key={index} id={index} title={item.title} content={item.content} />
                  {index === 9 && (
                    <img src="https://www.dimitri-basseguy.fr/MyDevSkillTree/images/skilltree-next.jpg" alt="Next Tree" />
                  )}
                </>
              )
            }
            )
          )}

        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Faq;
