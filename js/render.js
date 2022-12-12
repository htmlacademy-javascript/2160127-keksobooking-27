import { createArrayOfObjects } from './data.js';
const cardTempldate = document.querySelector('#card').content.querySelector('.popup');
const cardsData = createArrayOfObjects();
const cardFragment = document.createDocumentFragment();

cardsData.forEach(({ offer, author }) => {
  const cardElem = cardTempldate.cloneNode(true);
  const titleElem = cardElem.querySelector('.popup__title');
  titleElem.textContent = offer.title;
  const addressElem = cardElem.querySelector('.popup__text--address');
  addressElem.textContent = offer.address;
  const priceElem = cardElem.querySelector('.popup__text--price');
  priceElem.textContent = `${offer.price} ₽/ночь`;
  const typeElem = cardElem.querySelector('.popup__type');
  typeElem.textContent = offer.type;
  const textElem = cardElem.querySelector('.popup__text--capacity');
  textElem.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  const timeElem = cardElem.querySelector('.popup__text--time');
  timeElem.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featureElem = cardElem.querySelector('.popup__features');
  const festuresList = featureElem.querySelectorAll('.popup__feature');

  if (!offer.features) {
    featureElem.remove();
  } else {
    festuresList.forEach((listItem) => {
      const isRequired = offer.features.some((feature) => listItem.classList.contains(`popup__feature--${feature}`));

      if (!isRequired) {
        listItem.remove();
      }
    });
  }

  const descriptionElem = cardElem.querySelector('.popup__description');
  descriptionElem.textContent = offer.description;
  const photosElem = cardElem.querySelector('.popup__photos');
  const photoElem = photosElem.querySelector('.popup__photo');

  if (!offer.photos) {
    photosElem.remove();
  } else {
    photoElem.src = offer.photos[0];

    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const clonePhotoElem = photoElem.cloneNode(true);
        clonePhotoElem.src = offer.photos[i];
        photosElem.append(clonePhotoElem);
      }
    }
  }
  const avatarElem = cardElem.querySelector('.popup__avatar');
  avatarElem.src = author.avatar;

  cardFragment.appendChild(cardElem);
});

export { cardsData, cardFragment };
