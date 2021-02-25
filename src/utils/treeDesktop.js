/* eslint-disable import/prefer-default-export */
const elementSize = {
  x: 140,
  y: 140,
};

const mainWidth = 1920;
const mainTranslate = 140;
const header = 250;
const childrenWchildren = mainTranslate + 60;
const childofChild = mainTranslate - 80;

export const positionMain = [
  {
    id: 1,
    position: {
      x: mainWidth / 2,
      y: header + elementSize.y,
    },
  },
  {
    id: 8,
    position: {
      x: (mainWidth / 2) - (elementSize.x * 2),
      y: header + (elementSize.y * 3) - 150,
    },
  },
  {
    id: 15,
    position: {
      x: ((mainWidth / 4) * 2),
      y: header + (elementSize.y * 3),
    },
  },
  {
    id: 25,
    position: {
      x: (mainWidth / 2) + (elementSize.x * 1.5),
      y: header + (elementSize.y * 3) - 150,
    },
  },
  {
    id: 30,
    position: {
      x: (mainWidth / 2) - (elementSize.x / 2),
      y: header + (elementSize.y * 4.5),
    },
  },
  {
    id: 36,
    position: {
      x: (mainWidth / 2) + (elementSize.x * 2),
      y: header + (elementSize.y * 5),
    },
  },
  {
    id: 41,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 6.5),
    },
  },
  {
    id: 44,
    position: {
      x: (mainWidth / 3),
      y: header + (elementSize.y * 8),
    },
  },
  {
    id: 48,
    position: {
      x: (mainWidth / 3) * 2,
      y: header + (elementSize.y * 8),
    },
  },
  {
    id: 52,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 9.5),
    },
  },
  {
    id: 64,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 12),
    },
  },
  {
    id: 73,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 13.5),
    },
  },
  {
    id: 80,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 15),
    },
  },
  {
    id: 84,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 16.5),
    },
  },
  {
    id: 92,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 18),
    },
  },
  {
    id: 101,
    position: {
      x: (mainWidth / 2),
      y: header + (elementSize.y * 19.5),
    },
  },
];

export const positionChildren = [
  // Main 1 : 6 Children
  {
    id: 2,
    rotation: (360 / 8) * 1,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 3,
    rotation: (360 / 8) * 2,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 4,
    rotation: (360 / 8) * 3,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 5,
    rotation: (360 / 8) * 5,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 6,
    rotation: (360 / 8) * 6,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 7,
    rotation: (360 / 8) * 7,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  // Main 8 : 6 Children
  {
    id: 9,
    rotation: (360 / 6) * 1,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 10,
    rotation: (360 / 6) * 2,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 11,
    rotation: (360 / 6) * 3,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 12,
    rotation: (360 / 6) * 4,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 13,
    rotation: (360 / 6) * 5,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 14,
    rotation: (360 / 6) * 6,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  // Main 15 : 3 Children
  {
    id: 16,
    rotation: 0,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 17,
    rotation: (360 / 3) * 2,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 18,
    rotation: (360 / 3) * 1,
    position: {
      x: childrenWchildren,
      y: 0,
    },
  },
  // Parent 18 : 6 Children
  {
    id: 19,
    rotation: (360 / 6),
    position: {
      x: mainTranslate - 80,
      y: 0,
    },
  },
  {
    id: 20,
    rotation: (360 / 6) * 2,
    position: {
      x: mainTranslate - 80,
      y: 0,
    },
  },
  {
    id: 21,
    rotation: (360 / 6) * 3,
    position: {
      x: mainTranslate - 80,
      y: 0,
    },
  },
  {
    id: 22,
    rotation: (360 / 6) * 4,
    position: {
      x: mainTranslate - 80,
      y: 0,
    },
  },
  {
    id: 23,
    rotation: (360 / 6) * 5,
    position: {
      x: mainTranslate - 80,
      y: 0,
    },
  },
  {
    id: 24,
    rotation: (360 / 6) * 6,
    position: {
      x: mainTranslate - 80,
      y: 0,
    },
  },
  // Main 25 : 4 Children
  {
    id: 26,
    rotation: 0,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 27,
    rotation: ((180 / 4) * 3),
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 28,
    rotation: ((180 / 4) * 2),
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 29,
    rotation: ((180 / 4) * 1),
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  // Main 30 : 2 children
  {
    id: 31,
    rotation: 180,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 32,
    rotation: 270,
    position: {
      x: childrenWchildren,
      y: 0,
    },
  },
  // Parent 32 : 3 children
  {
    id: 33,
    rotation: ((360 / 3) * 1),
    position: {
      x: childofChild,
      y: 0,
    },
  },
  {
    id: 34,
    rotation: ((360 / 3) * 2),
    position: {
      x: childofChild,
      y: 0,
    },
  },
  {
    id: 35,
    rotation: ((360 / 3) * 3),
    position: {
      x: childofChild,
      y: 0,
    },
  },
  // Main 36 : 4 children
  {
    id: 37,
    rotation: ((360 / 4) * 1) + 15,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 38,
    rotation: ((360 / 4) * 2) + 15,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 39,
    rotation: ((360 / 4) * 3) + 15,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 40,
    rotation: ((360 / 4) * 4) + 15,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  // Main 41 : 2 Children
  {
    id: 42,
    rotation: ((360 / 4) * 1),
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 43,
    rotation: ((360 / 4) * 3),
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  // Main 44 : 3 children
  {
    id: 45,
    rotation: 270 + 40,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 46,
    rotation: 270,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 47,
    rotation: 270 - 40,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  // Main 48 : 3 children
  {
    id: 49,
    rotation: 90 + 40,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 50,
    rotation: 90,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 51,
    rotation: 90 - 40,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  // Main 52 : 3 children
  {
    id: 53,
    rotation: (360 / 3) * 1,
    position: {
      x: childrenWchildren,
      y: 0,
    },
  },
  {
    id: 56,
    rotation: (360 / 3) * 2,
    position: {
      x: childrenWchildren,
      y: 0,
    },
  },
  {
    id: 60,
    rotation: (360 / 3) * 3,
    position: {
      x: childrenWchildren,
      y: 0,
    },
  },
  // Parent 53 : 2 children
  {
    id: 54,
    rotation: (360 / 2) * 1,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  {
    id: 55,
    rotation: (360 / 2) * 2,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  // Parent 56 : 3 children
  {
    id: 57,
    rotation: (360 / 3) * 1,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  {
    id: 58,
    rotation: (360 / 3) * 2,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  {
    id: 59,
    rotation: (360 / 3) * 3,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  // Parent 60 : 3 children
  {
    id: 61,
    rotation: (360 / 3) * 1,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  {
    id: 62,
    rotation: (360 / 3) * 2,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  {
    id: 63,
    rotation: (360 / 3) * 3,
    position: {
      x: childofChild,
      y: 0,
    },
  },
  // Main 64 : 3 Children
  {
    id: 65,
    rotation: (360 / 3) * 1,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 66,
    rotation: (360 / 3) * 2,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
  {
    id: 67,
    rotation: (360 / 3) * 3,
    position: {
      x: mainTranslate,
      y: 0,
    },
  },
]
