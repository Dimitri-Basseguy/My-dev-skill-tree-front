import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { getUserProfile } from 'src/actions/user';
import { getUserTree } from '../../actions/tree';



import Profile from 'src/components/Profile/ProfileTree';
import Element from './Element';
import Button from 'src/components/Button';
import Loader from 'react-loader-spinner';

import './tree.scss';


// == Composant
const Tree = ({ username }) => {
  const [url, setUrl] = useState(useParams(username).username);
  document.title = `${url} | My Dev Skill Tree`;
  const dispatch = useDispatch();
  const tree = useSelector((s) => s.tree.tree);
  const { pseudonym, avatar, xpFront, xpBack, xpFull } = useSelector(s => s.app.selectedUser);
  const loading = useSelector((s) => s.tree.loadingTree);

  // TRIER LE TREE
  const [active, setActive] = useState('Front');
  const [idClamp, setIdClamp] = useState({ min: 0, max: 146 });
  const buttons = ['Front', 'Back'];

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case ('Front'):
        setIdClamp({ min: 0, max: 146 });
        break;
      case ('Back'):
        setIdClamp({ min: 145, max: 500 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getUserProfile(url));
    dispatch(getUserTree(url));
  }, []);

  let index = null;
  return (
    <div className="tree container">
      <div className="tree">
        <div className="title">My Dev Skill Tree</div>
        <Profile typeName={active} />
        <div className="tree-order-btn">
          {buttons.map((button) => (
            <Button
              key={button}
              onClick={(e) => {
                setActive(button);
                handleClick(e);
              }}
              content={button}
              active={active === button}
              fill={false}
            />
          ))}
        </div>
        {!loading ? (
          <>
            {tree.map((item) => {
              if (item.isMain && item.id > idClamp.min && item.id < idClamp.max) {
                index += 1;
                return (
                  <Element key={item.id} index={index} item={item} items={tree} />
                );
              }
            })}
          </>
        )
          : (
            <div className="loading-spinner">
              <Loader
                type="TailSpin"
                color="#FF0093"
                height={50}
                width={50}
                className="loader"
              />
            </div>
          )}
      </div>
    </div>
  );
};


Tree.propTypes = {

};

// == Export
export default Tree;
