import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import ProgresseBarre from '../ProgresseBarre';
import ElementContainer from '../../containers/Element';

import * as fonctionsTree from '../Tree/functions';

import './ElementMain.scss';

const ElementMain = ({
  items, setStatus, currentItem, addSkill, removeSkill,
}) => {
  const [open, setOpen] = useState(false);
  const [isValidatedMain, setValidatedMain] = useState(currentItem.isValidated);

  const handleClick = () => {
    setOpen(!open);
    if (currentItem.children.length === 0) {
      setValidatedMain(!isValidatedMain);
      currentItem.isValidated = !isValidatedMain;
      // Si le skill est ajouter
      if (currentItem.isValidated) {
        addSkill(currentItem);
      }
      else {
        removeSkill(currentItem);
      }
    }
  };
  let openClassName = '';
  if (open) {
    openClassName = 'open';
  }
  else {
    openClassName = 'close';
  }

  const { position, rotation } = currentItem;

  // Formation d'un tableau contenant les enfants sous forme d'item.
  const childListItem = fonctionsTree.createChildren(currentItem, items);

  const [progresse, setProgresse] = useState(fonctionsTree.howManyChildrenValidate(childListItem));

  // On peut maintenant générer dans une variable l'ensemble du rendu des enfants
  const nestedChildren = childListItem.map((child) => (
    <ElementContainer
      key={child.name}
      items={items}
      setStatus={setStatus}
      currentItem={child}
      onProgressChange={setProgresse}
      progresse={progresse}
    />
  ));
  const itemsChildrenValidNb = progresse;
  useEffect(() => {
    if (progresse / currentItem.children.length === 1) {
      setValidatedMain(true);
    }
    else {
      setValidatedMain(false);
    }
  }, [progresse]);

  const className = (base) => {
    let classN = base;
    if (isValidatedMain) {
      classN += ' valid';
      return classN;
    }
    classN += ' noValid';
    return classN;
  };

  return (
    <div className="item-container" style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
      <div className={className('item-main')}>
        <div className="item-parent" onClick={handleClick}>
          <span className="item-name">{currentItem.id} {currentItem.name}</span>
          {currentItem.children.length !== 0 && (
            <>
              <ProgresseBarre
                itemsValide={itemsChildrenValidNb}
                itemsNb={currentItem.children.length}
              />
              <span className="item-children--count">
                <span className="--number">
                  {currentItem.children ? `${itemsChildrenValidNb} / ${currentItem.children.length}` : null}
                </span>
              </span>
            </>
          )}
        </div>
        {Object.prototype.hasOwnProperty.call(currentItem, 'children') && (
          <div className={`children-content ${openClassName}`}>
            {nestedChildren}
          </div>
        )}
      </div>
    </div>
  );
};

ElementMain.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isParent: PropTypes.bool.isRequired,
      isMain: PropTypes.bool.isRequired,
      isValidated: PropTypes.bool,
      children: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
  ).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  setStatus: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
};

export default ElementMain;
