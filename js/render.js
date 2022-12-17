const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const cardTempldate = document.querySelector('#card').content.querySelector('.popup');

const render = (cardsData, id) => {
  const cardFragment = document.createDocumentFragment();

  cardsData.forEach(({ offer, author }) => {
    const cardElem = cardTempldate.cloneNode(true);
    const featureElem = cardElem.querySelector('.popup__features');
    const festuresList = featureElem.querySelectorAll('.popup__feature');
    const photosElem = cardElem.querySelector('.popup__photos');
    const photoElem = photosElem.querySelector('.popup__photo');

    const renderData = (selector, data, caption = '') => {
      if (!data) {
        cardElem.querySelector(selector).remove();
      } else {
        cardElem.querySelector(selector).textContent = data + caption;
      }
    };

    if (!author.avatar) {
      cardElem.querySelector('.popup__avatar').remove();
    } else {
      cardElem.querySelector('.popup__avatar').src = author.avatar;
    }

    renderData('.popup__title', offer.title);
    renderData('.popup__text--address', offer.address);
    renderData('.popup__text--price', offer.price, ' ₽/ночь');
    renderData('.popup__type', OFFER_TYPE[offer.type]);
    renderData('.popup__description', offer.description);

    if (!offer.rooms || !offer.guests) {
      cardElem.querySelector('.popup__text--capacity').remove();
    } else {
      cardElem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    }

    if (!offer.checkin || !offer.checkout) {
      cardElem.querySelector('.popup__text--time').remove();
    } else {
      cardElem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    }

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

    if (!offer.photos) {
      photosElem.remove();
    } else {
      photoElem.src = offer.photos[0];
      offer.photos.slice(1).forEach((photo) => {
        const clonePhotoElem = photoElem.cloneNode(true);
        clonePhotoElem.src = photo;
        photosElem.append(clonePhotoElem);
      });
    }
    cardFragment.append(cardElem);
  });
  return cardFragment.children[id];
};

export { render };
