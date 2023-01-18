import { setCoordinates } from './ad-form.js';
import { markUpAd } from './render-elements.js';

const OFFERS_COUNT = 10;
const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const mainPinMarker = L.marker(
  {
    lat: 35.682339,
    lng: 139.75318
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const initMap = (coordinate) => {
  map.setView(coordinate, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  mainPinMarker.setLatLng(coordinate);
  mainPinMarker.addTo(map);
  setCoordinates(coordinate);
};

mainPinMarker.on('moveend', (evt) => {
  const coordinatesMarker = evt.target.getLatLng();
  setCoordinates(coordinatesMarker);
});

const markerGroup = L.layerGroup().addTo(map);

const createAdPinMarker = (locations) => {
  locations.forEach(({ location, offer, author }) => {
    const marker = L.marker(location, {
      icon: pinIcon
    });
    marker.addTo(markerGroup).bindPopup(markUpAd({ offer, author }));
  });
};

const setAdPins = (locations) => {
  markerGroup.clearLayers();
  createAdPinMarker(locations.slice(0, OFFERS_COUNT));
};

const setOnMapLoad = (cb) => map.on('load', cb);

export { initMap, setAdPins, setOnMapLoad };
