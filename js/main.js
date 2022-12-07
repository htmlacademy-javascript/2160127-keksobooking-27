import { createArrayOfObjects } from './data.js';
import { generateCards } from './render.js';

generateCards(
  createArrayOfObjects()
    .sort(() => Math.random() - 0.5)
    .slice(-1)
);
