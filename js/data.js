import { getRandomAvatar, findElement } from './utils.js';
// ? модули ссылаются друг на друга. Разорвать этот порочный круг data (arrPosts) <-> picture (openModal)
import { openModal } from './picture.js';

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

// Количество аватар авторов
const AVATAR_COUNT = 6;
// Массив загруженных картинок
export const arrPosts = [];
// Функция загрузки картинок. Возвращает массив картинок
export const createPosts = (messages) => {

  const template = findElement(document, '#picture');
  const templatePicture = findElement(template.content, '.picture');
  const templatePictureFragment = document.createDocumentFragment();

  messages.forEach(({ id, url, description, comments, likes }) => {
    const photosElement = templatePicture.cloneNode(true);
    photosElement.id = `picture-${id}`;
    const pictureImg = findElement(photosElement, '.picture__img');
    pictureImg.src = url;
    pictureImg.alt = description;
    const pictureComments = findElement(photosElement, '.picture__comments');
    pictureComments.textContent = comments.length;
    const pictureLikes = findElement(photosElement, '.picture__likes');
    pictureLikes.textContent = likes;
    templatePictureFragment.appendChild(photosElement);
    const avatar = getRandomAvatar(AVATAR_COUNT);
    arrPosts.push({ id, url, description, comments, likes, avatar });
  }
  );
  const loadingPictures = findElement(document, '.pictures');
  let pictures = findElement(loadingPictures, '.picture');
  while (pictures !== null) {
    loadingPictures.removeChild(pictures);
    pictures = findElement(loadingPictures, '.picture');
  }

  loadingPictures.appendChild(templatePictureFragment);

  //? Ещё сюда надо повесить нажатие Enter на картинку, чтобы открывалась
  loadingPictures.onclick = function (evt) {
    if (evt.target.tagName === 'IMG') {
      const image = {
        id: evt.target.parentElement.id,
        src: evt.target.src,
        alt: evt.target.alt,
        comments: evt.target.nextElementSibling.firstElementChild.textContent,
        likes: evt.target.nextElementSibling.lastElementChild.textContent,
      };
      openModal(image);
    }
  };
  return arrPosts;
};

