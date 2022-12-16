import { adFormSubmit } from './form.js';
import './map.js';
import { renderMarker } from './map.js';

//import { showAlert } from './alert-message.js';
import { getData } from './server.js';

//showAlert('error');
adFormSubmit();
getData(renderMarker);
