import { getRandomAvatar, isEnterKey } from './utils.js';
import { openModal } from './picture.js';

// Количество аватар авторов
const AVATAR_COUNT = 6;

function setupElement(photosElement, item) {
  photosElement.id = `picture-${item.id}`;
  photosElement.addEventListener('click', () => {
    openModal(item);
  });
  photosElement.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openModal(item);
    }
  });
  return photosElement;
}

function setupPicture(pictureImg, row) {
  setupElement(pictureImg, row);
  pictureImg.src = row.url;
  pictureImg.alt = row.description;
}

function setupComments(pictureComments, row) {
  pictureComments.textContent = row.comments.length;
}

function setupLikes(pictureLikes, row) {
  pictureLikes.textContent = row.likes;
}

const setupItem = (container, item) => {

  setupPicture(container.querySelector('.picture__img'), item);
  setupComments(container.querySelector('.picture__comments'), item);
  setupLikes(container.querySelector('.picture__likes'), item);
  item.avatar = getRandomAvatar(AVATAR_COUNT);
  return container;
};

const createPhotoFactory = (template) => (item) => setupItem(template.content.cloneNode(true), item);

export const deleteOldPhotos = (container) => {
  const element = container.querySelectorAll('.picture');
  for (let i = 0; i < element.length; i++) {
    element[i].remove();
  }
};

// Функция загрузки картинок. Возвращает массив картинок
export const setupAllPhotos = (container, items, template) => {
  deleteOldPhotos(container);
  container.append(...items.map(createPhotoFactory(template)));
};


