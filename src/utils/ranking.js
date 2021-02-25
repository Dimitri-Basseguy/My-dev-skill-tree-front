export const imgPath = 'https://www.dimitri-basseguy.fr/projet-my-dev-skill-tree-back/public/assets/img/rank/'; // + '{level}.png';

export const xpMax = {
  front: 29250,
  back: 27050,
};

export const rank = [
  {
    level: 0,
    xpFront: 0,
    xpBack: 0,
    rank: 'Noob',
  },
  {
    level: 1,
    xpFront: 975,
    xpBack: 902,
    rank: 'Recruit',
  },
  {
    level: 2,
    xpFront: 1950,
    xpBack: 1803,
    rank: 'Private',
  },
  {
    level: 3,
    xpFront: 2925,
    xpBack: 2705,
    rank: 'Gefreiter',
  },
  {
    level: 4,
    xpFront: 3900,
    xpBack: 3607,
    rank: 'Corporal',
  },
  {
    level: 5,
    xpFront: 4875,
    xpBack: 4508,
    rank: 'Master Corporal',
  },
  {
    level: 6,
    xpFront: 5810,
    xpBack: 5410,
    rank: 'Sergeant',
  },
  {
    level: 7,
    xpFront: 6825,
    xpBack: 6312,
    rank: 'Staff Sergeant',
  },
  {
    level: 8,
    xpFront: 7800,
    xpBack: 7213,
    rank: 'Master Sergeant',
  },
  {
    level: 9,
    xpFront: 8775,
    xpBack: 8115,
    rank: 'First Sergeant',
  },
  {
    level: 10,
    xpFront: 9750,
    xpBack: 9017,
    rank: 'Sergeant Major',
  },
  {
    level: 11,
    xpFront: 10725,
    xpBack: 9918,
    rank: 'Warrant Officer 1',
  },
  {
    level: 12,
    xpFront: 11700,
    xpBack: 10820,
    rank: 'Warrant Officer 2',
  },
  {
    level: 13,
    xpFront: 12675,
    xpBack: 11722,
    rank: 'Warrant Officer 3',
  },
  {
    level: 14,
    xpFront: 13650,
    xpBack: 12623,
    rank: 'Warrant Officer 4',
  },
  {
    level: 15,
    xpFront: 14625,
    xpBack: 13525,
    rank: 'Warrant Officer 5',
  },
  {
    level: 16,
    xpFront: 15600,
    xpBack: 14427,
    rank: 'Third Lieutenant',
  },
  {
    level: 17,
    xpFront: 16575,
    xpBack: 15328,
    rank: 'Second Lieutenant',
  },
  {
    level: 18,
    xpFront: 17550,
    xpBack: 16230,
    rank: 'First Lieutenant',
  },
  {
    level: 19,
    xpFront: 18525,
    xpBack: 17132,
    rank: 'Captain',
  },
  {
    level: 20,
    xpFront: 19500,
    xpBack: 18033,
    rank: 'Major',
  },
  {
    level: 21,
    xpFront: 20475,
    xpBack: 18935,
    rank: 'Lieutenant Colonel',
  },
  {
    level: 22,
    xpFront: 21450,
    xpBack: 19837,
    rank: 'Colonel',
  },
  {
    level: 23,
    xpFront: 22425,
    xpBack: 20738,
    rank: 'Brigadier',
  },
  {
    level: 24,
    xpFront: 23400,
    xpBack: 21640,
    rank: 'Major General',
  },
  {
    level: 25,
    xpFront: 24375,
    xpBack: 22542,
    rank: 'Lieutenant General',
  },
  {
    level: 26,
    xpFront: 25350,
    xpBack: 23443,
    rank: 'General',
  },
  {
    level: 27,
    xpFront: 26325,
    xpBack: 24345,
    rank: 'Marshal',
  },
  {
    level: 28,
    xpFront: 27300,
    xpBack: 25247,
    rank: 'Fieldmarshal',
  },
  {
    level: 29,
    xpFront: 28275,
    xpBack: 26148,
    rank: 'Commander',
  },
  {
    level: 30,
    xpFront: 29250,
    xpBack: 27050,
    rank: 'Legend',
  },
];

export const calculateRank = (user, xpCat) => {
  if (user[xpCat] === 0) {
    const userRank = rank[0];
    return userRank;
  }
  if (user[xpCat] >= rank[rank.length - 1][xpCat]) {
    const userRank = rank[rank.length - 1];
    return userRank;
  }
  const userRank = rank[(rank.findIndex((e) => (e[xpCat] >= user[xpCat]))) - 1];
  return userRank;
};
