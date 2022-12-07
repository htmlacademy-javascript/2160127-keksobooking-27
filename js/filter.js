const mapFilter = document.querySelector('.map__filters');

const turnFilterOff = () => {
  mapFilter.classList.add('map__filter--disabled');
  for (const child of mapFilter.children) {
    child.disabled = true;
  }
};

const turnFilterOn = () => {
  mapFilter.classList.add('map__filter--disabled');
  for (const child of mapFilter.children) {
    child.disabled = false;
  }
};
export { turnFilterOff, turnFilterOn };
