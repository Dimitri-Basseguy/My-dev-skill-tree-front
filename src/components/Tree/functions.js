/**
 * Fonction renvoyant un tableau contenant l'ID des Skills Enfants
 * @param {object} Skill - Formaté préalablement
 * @param {object} Initial Tree - Représente l'ensemble d'un arbre initial au chargement
 de l'application
 * @return {array} ChildList - Tableau contenant les Id des skills enfant de notre skill parent
 */
function createChildren(skill, initialTree) {
  const childList = [];
  skill.children.forEach((idChild) => {
    initialTree.forEach((itemChild) => {
      if (itemChild.id === idChild) {
        childList.push(itemChild);
      }
    });
  });
  return childList;
}

function howManyChildrenValidate(item, items) {
  const { children } = item;
  let counter = 0;
  items.map(i => {
    if (children.find(child => child === i.id)) {
      if (i.isValidated) {
        counter += 1;
      }
    }

  });
  return counter;
}

export { createChildren, howManyChildrenValidate };
