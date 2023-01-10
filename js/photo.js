const DEFAULT_AVATAR_ADDRESS = 'img/muffin-grey.svg';

const avatarImg = document.querySelector('.ad-form-header__preview img');
const avatarUpload = document.querySelector('#avatar');
const housePhotoUpload = document.querySelector('#images');
const housePhoto = document.querySelector('.ad-form__photo');

const onAvatarChange = () => {
  const file = avatarUpload.files[0];
  avatarImg.src = URL.createObjectURL(file);
};

const onImageChange = () => {
  const file = housePhotoUpload.files[0];
  housePhoto.innerHTML = '';
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.style.maxWidth = '100%';
  image.style.height = 'auto';
  housePhoto.append(image);
};

const initPhotoBlocks = () => {
  avatarUpload.addEventListener('change', () => {
    onAvatarChange();
  });

  housePhotoUpload.addEventListener('change', () => {
    onImageChange();
  });
};

const resetPhotoFields = () => {
  avatarImg.src = DEFAULT_AVATAR_ADDRESS;
  housePhoto.innerHTML = '';
};

export { resetPhotoFields, initPhotoBlocks };
