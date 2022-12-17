import { adFormSubmit } from './form.js';
import './map.js';
import { renderMarker } from './map.js';
import './reset-form.js';
import { getData } from './server.js';

adFormSubmit();
getData(renderMarker);
