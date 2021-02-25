import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Element.scss';

// eslint désactivé car pas de risque ici
// eslint-disable-next-line import/no-cycle
import ElementContainer from 'src/containers/Element';
import ProgresseBarre from '../ProgresseBarre';

import * as fonctionsTree from '../Tree/functions';

/*
  items: Tableau contenants les ID corrigées d'une seule catégorie Main
*/

const Element = ({
  items, setStatus, currentItem, addSkill, removeSkill, onProgressChange, progresse,
}) => {
  const item = currentItem;
  const [open, setOpen] = useState(false);

  const [isValidated, setIsValidated] = useState(item.isValidated);

  // Formation d'un tableau contenant les enfants sous forme d'item.
  const childListItem = fonctionsTree.createChildren(currentItem, items);
  const [progressC, setProgressC] = useState(fonctionsTree.howManyChildrenValidate(childListItem));

  let openClassName = '';
  /**
   * Handle onClick
   * Change open state
   */
  const handleClick = (e) => {
    console.log(e.target.className);
    if (e.target.className === 'item-name' || e.target.className === 'item-parent' || e.target.className === 'item-main') {
      setOpen(!open);
    }
    else {
      // TO DO
    }
  };

  const { position } = item;
  const { rotation } = item;

  if (open) {
    openClassName = 'open';
    if (item.isParent === null && item.isMain === null) {
    }
    else {
    }
  }
  else {
    openClassName = 'close';
  }

  /**
   * Handle onChange for checkbox
   * Change isValidated state
   */
  const handleCheckNoParent = () => {
    setIsValidated(!isValidated);
    item.isValidated = !isValidated;
    // Si le skill est ajouter
    if (item.isValidated) {
      addSkill(currentItem);
      onProgressChange(progresse + 1);
    }
    else {
      removeSkill(currentItem);
      onProgressChange(progresse - 1);
    }
  };

  const handleCheckParent = () => {
    setIsValidated(!isValidated);
    item.isValidated = !isValidated;
    // Si le skill est ajouter
    if (item.isValidated) {
      addSkill(currentItem);
      onProgressChange(progresse + 1);
    }
    else {
      removeSkill(currentItem);
      onProgressChange(progresse - 1);
    }
  };

  // Valeurs (ici en dur) à calculer dans l'item récupéré
  // Position :
  //      Si Element est Parent > l'emplacement dans l'arbre d'un item
  //      Si Element est Enfant > la distance de son point d'origine (valeur X)
  // La modification des valeurs permettra de créer des transition (ou utiliser transition CSS)
  // Origin :
  //      Si Element est Enfant > La rotation par rapport au centre de la bulle parente
  //                              Calculer item.children.length / 360
  //                              Penser à la branche d'arrivée

  const itemsChildrenValidNb = progressC;

  /**
   * Create <Element> from item.children array
   * @return {<Element>}
   */
  const nestedChildren = (childListItem).map((child) => (
    <ElementContainer
      key={child.name}
      items={items}
      setStatus={setStatus}
      currentItem={child}
      onProgressChange={setProgressC}
      progresse={progressC}
    />
  ));

  /**
   * Create different checkbox if isMain or not
   * @return {<input>}
   */
  const checkBox = () => {
    if (item.isParent) {
      return (
        <>
          <span className="--number">
            {item.children ? `${itemsChildrenValidNb} / ${item.children.length}` : null}
          </span>
          <input
            type="checkbox"
            checked={isValidated}
            onChange={handleCheckParent}
          />
        </>
      );
    }
  };

  /**
   * Create dynamic className for <Element>
   * @return {string}
   */
  const classNameChild = (base, variant) => {
    let classN = base;
    if (isValidated) {
      classN += ` valid${variant}`;
      return classN;
    }
    classN += ` noValide${variant}`;
    return classN;
  };

  const classNameParent = () => {
    let classN = 'child-translate';
    if (isValidated) {
      classN += ' valid';
      return classN;
    }
    classN += ' noValide';
    return classN;
  };

  const className = (base) => {
    let classN = base;
    if (isValidated) {
      classN += ' valid';
      return classN;
    }
    classN += ' noValid';
    return classN;
  };

  /**
   * React return component
   * If children
   * @return {jsx}
   */
  if (!item.isParent) {
    return (
      <div onClick={handleCheckNoParent} className={className('child-origin')} style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="child-translate" style={{ transform: `translateY(-${position.x}px) rotate(-${rotation}deg)` }}>
          <div className={className('item-child')}>
            <span className="span-child">{item.name}</span>
            {checkBox()}
          </div>
        </div>
      </div>
    );
  }

  /**
   * React return component
   * If parent
   * @return {jsx}
   */
  return (
    <div onClick={handleClick} className="child-origin" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className={className('child-translate')} style={{ transform: `translateY(-${position.x}px) rotate(-${rotation}deg)` }}>
        <div className={className('item-child')}>
          <span className="item-name">{item.name} &thinsp;</span>
          <ProgresseBarre itemsValide={itemsChildrenValidNb} itemsNb={item.children.length} />
          <span className="item-children--count">
            <label>
              {checkBox()}
            </label>
          </span>
          {Object.prototype.hasOwnProperty.call(currentItem, 'children') && (
            <div className={`children-content ${openClassName}`}>
              {nestedChildren}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Element.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isParent: PropTypes.bool.isRequired,
      isMain: PropTypes.bool.isRequired,
      isValidated: PropTypes.bool,
      children: PropTypes.arrayOf(PropTypes.number),
      /*
      rotation: PropTypes.number.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      */
    }).isRequired,
  ).isRequired,
  setStatus: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
  addSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  onProgressChange: PropTypes.func.isRequired,
  progresse: PropTypes.number.isRequired,
};

export default Element;
