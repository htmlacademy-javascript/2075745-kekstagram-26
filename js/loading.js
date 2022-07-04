import { findElement, getRandomArrayElement } from './utils.js';
import { createAuthors } from './data.js';

const template = findElement(document, '#picture');
console.log(template);
const template2 = findElement(template.content, '.picture');
console.log(template2);
const templatePictureFragment = document.createDocumentFragment();

createAuthors.forEach(({ url, comments, likes }) => {
  const photosElement = template2.cloneNode(true);
  const pictureImg = findElement(photosElement, '.picture__img');
  pictureImg.src = url;
  const pictureComments = findElement(photosElement, '.picture__comments');
  pictureComments.content.value = comments.length; // ? надо будет потом целый объект засунуть, массив объектов
  const pictureLikes = findElement(photosElement, '.picture__likes');
  pictureLikes.content.value = likes;
}
);


// Найти  шаблон <template id="picture">
//Создать элемент
// src = url
// class="picture__likes" = likes
// class="picture__comments" = comments
// Добавить в DOM
// DocumentFragment

// Отобразить фотографии других пользователей.

//     Заведите модуль, который будет отвечать за отрисовку миниатюр.

//     На основе временных данных для разработки и шаблона #picture создайте DOM - элементы, соответствующие фотографиям, и заполните их данными:
//         Адрес изображения url подставьте как атрибут src изображения.
//         Количество лайков likes выведите в блок.picture__likes.
//         Количество комментариев comments выведите в блок.picture__comments.

//     Отрисуйте сгенерированные DOM - элементы в блок.pictures.Для вставки элементов используйте DocumentFragment.

//     Подключите модуль в проект.

