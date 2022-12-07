import { createArrayOfObjects } from './data.js';
import { generateCards } from './render.js';
import { turnAdFormOff, turnAdFormOn, adFormSubmit } from './form.js';

generateCards(
  createArrayOfObjects()
    .sort(() => Math.random() - 0.5)
    .slice(-1)
);

turnAdFormOff();
turnAdFormOn();

adFormSubmit();
