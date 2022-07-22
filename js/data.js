import { getRandomAvatar, isEnterKey } from './utils.js';
import { openModal } from './picture.js';

<<<<<<< HEAD
=======
// const STANDARDMESSAGE = [
//   'Всё отлично!',
//   'В целом всё неплохо.Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
// ];

// const STANDARDDESCRIPTION = [
//   'Прототип нового сервиса — это как ласковый перезвон вертикали власти',
//   'Давайте разбираться: чистосердечное признание облегчает душу',
//   'Частокол на границе продолжает удивлять',
//   'Только частотность поисковых запросов одухотворила всех причастных',
//   'Органический трафик определил дальнейшее развитие',
//   'Все чаще появляется информация о том, что светлый лик правового взаимодействия определил дальнейшее развитие',
//   'Тяжёлое машиностроение — это вам не звон колоколов',
//   'Есть над чем задуматься: обучение кадров — приоритетная задача',
//   'Никто не вправе осуждать далёкий барабанный бой',
//   'Реализация намеченных плановых заданий бодрит',
//   'Дурное дело нехитрое: светлый лик правового взаимодействия станет частью наших традиций',
//   'Экономическая повестка сегодняшнего дня разочаровала',
//   'Граница обучения кадров процветает, как ни в чем не бывало',
//   'Ночь оказалась долгой',
//   'Крепость духовных «скреп» сделала своё дело',
//   'Нет звука приятнее, чем далёкий барабанный бой',
//   'Новая парадигма реальности: кровь стынет в жилах',
//   'Цена вопроса не важна, когда сознание наших соотечественников не замутнено пропагандой',
//   'Подтверждено: обучение кадров — приоритетная задача',
//   'Нынче никто не может себе позволить инициировать боевой клич героев',
//   'Не следует забывать, что герцог графства коронован',
//   'Британские «ученые» заявили, что младая поросль матереет',
//   'Свободу слова не задушить, пусть даже средства индивидуальной защиты оказались бесполезны!',
//   'Новая парадигма реальности: прототип — не панацея',
//   'Допустим, помыслы поколения чисты',
// ];

// const STANDARDNAME = [
//   'Дементьев Валерий',
//   'Тарасюк Артемий',
//   'Гаврилов Болеслав',
//   'Афанасьев Макар',
//   'Авдеев Николай',
//   'Николаев Жигер',
//   'Калашников Ефрем',
//   'Филиппов Рафаил',
//   'Кулишенко Юлий',
//   'Бобылёв Чарльз',
//   'Щукин Чеслав',
//   'Прохоров Харитон',
//   'Гришин Добрыня',
//   'Коломоец Ким',
//   'Щербаков Максим',
//   'Евдокимов Евсей',
//   'Щербаков Люций',
//   'Корнилов Йомер',
//   'Давыдов Дарий',
//   'Буров Шарль',
//   'Милославский Сергей',
//   'Овчаренко Юлий',
//   'Мамонтов Феликс',
//   'Тягай Эдуард',
//   'Яровой Устин',
// ];

// const idAuthor = createCounter(135, 1).inc;
// const idPost = createCounter(1, 1).inc;

// const createSingleComment = function () {
//   return {
//     id: idAuthor(),
//     avatar: getRandomAvatar(AVATAR_COUNT),
//     message: getRandomMessage(STANDARDMESSAGE),
//     name: getRandomArrayElement(STANDARDNAME),
//   };
// };

// const MAX_COUNT_COMMENTS = 25;
// const createComments = function () {
//   const arr = [];
//   const countComments = getRandomPositiveInteger(0, MAX_COUNT_COMMENTS);
//   for (let i = 1; i <= countComments; i++) {
//     const newElement = createSingleComment();
//     arr.push(newElement);
//   }
//   return arr;
// };

// export const createSinglePost = function ({ id, url, likes, description }) {
//   return {
//     id: id, //idPost(),
//     avatar: getRandomAvatar(AVATAR_COUNT),
//     url: url, //getRandomPhoto(PHOTOS_LENGTH),
//     description: description, //getRandomArrayElement(STANDARDDESCRIPTION),
//     likes: likes, //getRandomPositiveInteger(15, 200),
//     comments: createComments(),
//   };
// };

>>>>>>> module11-task1
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


