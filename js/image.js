const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const fileAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview');
const fileChooserZone = document.querySelector('.ad-form__upload input[type=file]');
const previewZone = document.querySelector('.ad-form__photo');

const createImgForPreview = (previewContainer) => {
  const imgContainer = document.createElement('img');
  imgContainer.setAttribute('alt', 'Выбранная фотография жилья');
  imgContainer.setAttribute('src', '#');
  imgContainer.style.alignSelf = 'center';
  imgContainer.style.marginLeft = 'auto';
  imgContainer.style.marginRight = 'auto';
  imgContainer.style.width = '100%';
  imgContainer.style.height = 'auto';
  previewContainer.append(imgContainer);

  return imgContainer;
};

const createPhotoPreview = (fileChooser, previewContainer) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    const preview = previewContainer.querySelector('img');
    if (preview) {
      preview.src = URL.createObjectURL(file);
    } else {
      const newPreview = createImgForPreview(previewContainer);
      newPreview.src = URL.createObjectURL(file);
    }
  }
};

const createAvatarPreview = () => createPhotoPreview(fileAvatar, previewAvatar);
const createZonePreview = () => createPhotoPreview(fileChooserZone, previewZone);

const onChangephoto = () => {
  fileAvatar.addEventListener('change', createAvatarPreview);
  fileChooserZone.addEventListener('change', createZonePreview);
};

const resetAvatarUrl = (photoContainer, defaultPhoto) => {
  photoContainer.querySelector('img').src = defaultPhoto;
};

const resetPhotoContainer = (photoContainer) => {
  previewAvatar.src = DEFAULT_AVATAR;
  photoContainer.innerHTML = '';
};

onChangephoto();

const resetPhoto = () => {
  resetAvatarUrl(previewAvatar, DEFAULT_AVATAR);
  resetPhotoContainer(previewZone);
};

export { resetPhoto };
