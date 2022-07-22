import { getRandomAvatar, isEnterKey } from './utils.js';
import { openModal } from './picture.js';

// Количество аватар авторов
const AVATAR_COUNT = 6;

//? После клика мышкой на картинку фокус вроде бы уже на другой картинке, а лайки и кол-во комментов по-прежнему отображается
// ? на покидание фокуса мушки надо убрать эту информацию с превью картинки
//
// ?функции в модулях. А в main.js задавать названия элементов
// ?возвращать функцией массив. Строки с переменными не писать
// ?Для обработки валидности введенных данных убрать мигание

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

<<<<<<< HEAD
// пустое изменение для соединения веток
// Функция загрузки картинок. Возвращает массив картинок
export const setupAllPhotos = (container, items, template) => {
  // const sss = container.querySelector('.picture_img');
  // console.log(sss);
  // while (container.lastChild.nodeName === 'picture') {
  //   container.removeChild(container.lastChild);
  // }
=======
// Функция загрузки картинок. Возвращает массив картинок
export const setupAllPhotos = (container, items, template) => {
>>>>>>> module11-task1
  container.append(...items.map(createPhotoFactory(template)));
};


