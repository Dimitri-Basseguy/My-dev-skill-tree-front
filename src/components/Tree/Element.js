import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setValidation } from 'src/actions/tree';
import { howManyChildrenValidate } from 'src/components/Tree/functions';

import imgTarget from 'src/assets/images/target.png';
import ProgressBar from 'src/components/Profile/ProgressBar';


const Element = ({ index, items, item, test }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { id, icon, isMain, isParent, name, children, isValidated, update, counter } = item;
  const [valid, setValid] = useState();
  const [progress, setProgress] = useState(howManyChildrenValidate(item, items));

  // Item loading
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!show) {
      setTimeout(() => {
        if (isMounted) {
          setShow(!show);
        }
      }, index * 90);
    }
    return () => {
      isMounted = false;
    };
  }, [item]);

  const onEnter = (base) => {
    let classN = `${base} loading`;
    if (show) {
      classN = base;
    }
    return classN;
  };
  //


  useEffect(() => {
    setValid(isValidated);
  }, [isValidated]);

  // Update progress bar
  useEffect(() => {
    setProgress(howManyChildrenValidate(item, items));
  }, [update]);

  const handleClickOpen = (e) => {
    if ((isParent && children !== []) || (isMain && children.length > 0)) {
      setOpen(!open);
    }
  };

  const handleClickValidation = (e) => {
    if (!isMain || !isParent || item.children.length === 0) {
      dispatch(setValidation(item));
    }
  };

  const className = (base) => {
    let classN = base;
    if (open) {
      classN += ' open';
    }
    if (valid) {
      classN += ' valid';
    }
    return classN;
  };


  const nestedChildren = children.map((i) => {
    const child = items.find(e => e.id === i);
    return (<Element key={child.id} items={items} item={child} />);
  });

  // Si c'est un élément Main
  if (isMain) {
    return (
      <div className={onEnter('main borders')}>
        <div className="main-heading"
          onClick={(e) => {
            handleClickOpen(e);
            handleClickValidation(e);
          }}
        >
          <div className="item-icon">{icon ? (<img src={icon} alt={`icon-${name}`} />) : ''}</div>
          <div className={className('item-title')}>
            {name}
          </div>
          {children.length !== 0 && (
            <>
              <ProgressBar xp={progress} totalXp={item.children.length} />
              <span className="item-count"><img src="https://www.dimitri-basseguy.fr/MyDevSkillTree/images/target.png" alt="itemcount" />{progress} / {item.children.length}</span>
            </>
          )}
        </div>

        {Object.prototype.hasOwnProperty.call(item, 'children') && (
          <div className={className('child-group')}>{nestedChildren}</div>
        )}
      </div>
    );
  }

  // Si c'est un élément Parent
  if (isParent) {
    return (
      <div className={className("parent-child")}>
        <div className="main-heading" onClick={(e) => { handleClickOpen(e); }}>
          <div className="item-icon">{icon ? (<img src={icon} alt={`icon-${name}`} />) : ''}</div>
          <div className="item-title">
            {name}
          </div>
          <ProgressBar xp={progress} totalXp={item.children.length} />
          <span className="item-count">{progress} / {item.children.length}</span>
        </div>
        {Object.prototype.hasOwnProperty.call(item, 'children') && (
          <div className={className('child-group')}>{nestedChildren}</div>
        )}
      </div>
    );
  };

  // Si c'est un élément enfant
  return (
    <div
      className={className('child')}
      onClick={(e) => {
        handleClickValidation(e);
      }}
    >
      <div className="item-icon">{icon ? (<img src={icon} alt={`icon-${name}`} />) : ''}</div>
      <div className="item-title">
        {name}
      </div>
    </div>
  );
};

export default React.memo(Element);
