// == Import npm
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// == Import
import './tree.scss';

import Profile from 'src/components/Profile/ProfileTree';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import Avatar from 'src/components/Profile/Avatar';
import Button from 'src/components/Button';

import { positionMain, positionChildren } from 'src/utils/treeDesktop';

import ElementMain from 'src/containers/ElementMain';


const Tree = ({ getUserById, userId, user, skillList, getDefaultTree }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 9000;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // TODO
  /* On s'occupera ici de récupérer les données via l'API etc
  1) checker l'ID et token
  2) pouvoir vérifier que l'utilisateur est bien connecter
  3) Si oui on récupère les données et elles arrivent ici
  */
  /*
  Element a besoin de récupérer l'item (qui et un objet), isParent, isMain, setStatus, xp
   */

  useEffect(() => {
    getDefaultTree();
    getUserById(userId);
  }, [userId]);

  // TRIER LE TREE
  // 
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

  const createSkillList = () => {
    const { skills } = user;
    const skillsArray = skills;
    // Mettre les skills validé dans un tableau contenant les Ids
    const validSkills = skillsArray.map((skill) => skill.id);
    // On construit l'arbre
    return skillList.map((skill) => {
      const currentId = skill.id;
      // Tester si le skills analysé est validé
      let isValidated = false;
      if (validSkills.includes(currentId)) {
        isValidated = true;
      }

      // Children List ?
      const childrenList = [];
      skill.rotation = 0;
      skill.position = { x: 0, y: 0 };
      skillList.map((oneSkill) => {
        if (oneSkill.parentId === currentId) {
          childrenList.push(oneSkill.id);
        }
        return oneSkill;
      });
      // IS PARENT ?
      let isParent = false;
      if (childrenList.length !== 0) {
        isParent = true;
      }
      // IS MAIN ?
      let isMain = false;
      if (skill.parentId === null && (skill.id > idClamp.min && skill.id < idClamp.max)) {
        isMain = true;
      }
      positionMain.forEach((pos) => {
        if (skill.id === pos.id) {
          skill.rotation = 0;
          skill.position = pos.position;
        }
      });
      positionChildren.forEach((pos) => {
        if (skill.id === pos.id) {
          skill.rotation = pos.rotation;
          skill.position = pos.position;
        }
      });
      const id = currentId;
      // Construction du nouvel objet
      const pos = width > breakpoint ? skill.position : 0;
      const rot = width > breakpoint ? skill.rotation : 0;

      const newObject = {
        id,
        name: skill.name,
        children: childrenList,
        position: pos,
        rotation: rot,
        isParent,
        isMain,
        isValidated,
        xp: skill.xp,
      };
      return newObject;
    });
  };

  const setStatus = () => {
    console.log('coucou, je suis la fonction qui modifie le status');
  };
  let listItems = [];

  // Si on a chargé un utilisateur, on appelle les fonctions permettant de formater la List de Skill
  // dans un tableau listant les skills validé ou non comme un tableau d'objet
  if (Object.prototype.hasOwnProperty.call(user, 'id')) {
    listItems = createSkillList();
  }
  // Mobile ou Desktop ?
  let larg = 0;
  if (document.body) {
    larg = (document.body.clientWidth);
  }
  else {
    larg = (window.innerWidth);
  }
  const position = {
    x: 0,
    y: 0,
  };
  if (larg > 430) { // Version Desktop
    // On devra créer plus tard la fonction de placement des mains
  }
  if (listItems.length !== 0) {
    return width > breakpoint ? (
      <div className="tree-container">
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={1}
          defaultPositionY={window.innerHeight * 0.2}
          options={{
            limitToBounds: false,
          }}
          doubleClick={{
            disabled: true,
          }}
        >
          {({ zoomIn, zoomOut, defaultPositionX, defaultPositionY, positionX, positionY, resetTransform }) => (
            <div className="tree">
              <div className="move-tools">
                <Button onClick={zoomIn} fill={false} content="+" />
                <Button onClick={zoomOut} fill={false} content="-" />
              </div>
              <TransformComponent>
                <div className="user-profile">
                  <Profile avatar={user.avatar} xp="18" />
                </div>
                {
                  listItems.map((itemRender) => {
                    if (itemRender.isMain) {
                      return (
                        <ElementMain
                          key={itemRender.id}
                          items={listItems}
                          currentItem={itemRender}
                          setStatus={setStatus}
                          position={position}
                        />
                      );
                    }
                    return '';
                  })
                }
              </TransformComponent>
            </div>
          )}
        </TransformWrapper>
      </div>
    )
      : (
        <div className="tree-container">
          <div className="tree">
            <div className="tree-title">My Dev Skill Tree</div>
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
            <div className="user-profile">
              <Avatar img={user.avatar} />
            </div>
            {
              listItems.map((itemRender) => {
                if (itemRender.isMain) {
                  return (
                    <ElementMain
                      key={itemRender.id}
                      items={listItems}
                      currentItem={itemRender}
                      setStatus={setStatus}
                      position={position}
                    />
                  );
                }
                return '';
              })
          }
          </div>
        </div>
)
  }
  return (<div />);
};

Tree.propTypes = {
  getUserById: PropTypes.func.isRequired,
  userId: PropTypes.number,
  user: PropTypes.object.isRequired,
  skillList: PropTypes.array.isRequired,
  getDefaultTree: PropTypes.func.isRequired,
};
Tree.defaultProps = {
  userId: null,
};

// == Export
export default Tree;
