import { createArrayOfObjects } from './data.js';
import { generateCards } from './render.js';
import { activatePage, deactivatePage } from './form.js';

deactivatePage();
generateCards(
  createArrayOfObjects()
    .sort(() => Math.random() - 0.5)
    .slice(-1)
);

activatePage();
