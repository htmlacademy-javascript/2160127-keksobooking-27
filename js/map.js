import { turnAdFormOff, turnAdFormOn } from './form.js';
import { render } from './render.js';
import { getData } from './server.js';

const CENTER_COORDINATES = {
  lat: 35.68401,
  lng: 139.7559
};

const address = document.querySelector('#address');
address.setAttribute('disabled', true);

turnAdFormOff();
const map = L.map('map-canvas')
  .on('load', () => {
    turnAdFormOn();
  })
  .setView(CENTER_COORDINATES, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50]
});

const otherIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const marker = L.marker(
  CENTER_COORDINATES,
  {
    draggable: true,
    icon: mainIcon
  },
  (address.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`)
);

marker.addTo(map);

const resetMarker = () => {
  marker.setLatLng({
    lat: CENTER_COORDINATES.lat,
    lng: CENTER_COORDINATES.lng
  });
  address.value = `${CENTER_COORDINATES.lat}, ${CENTER_COORDINATES.lng}`;
};

marker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(5);
  const lng = latLng.lng.toFixed(5);

  address.value = `${lat}, ${lng}`;
});

const renderMarker = (adList) => {
  adList.forEach(({ location }, index) => {
    const markerN = L.marker(
      {
        lat: location.lat,
        lng: location.lng
      },
      {
        icon: otherIcon
      }
    );

    markerN.addTo(map).bindPopup(render(adList, index));
  });
};

getData(renderMarker);

export { resetMarker };
