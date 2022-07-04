import { getRandomArrayElement, getRandomMessage, getRandomAvatar, createCounter } from './utils.js';
import { getRandomPhoto, getRandomPositiveInteger } from './utils.js';

const post = {
  id: 1,
  url: '',
  description: '',
  likes: 15,
  comments: [],
};

const comment = {
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
};

const STANDARDMESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];

const STANDARDDESCRIPTION = [
  'Прототип нового сервиса — это как ласковый перезвон вертикали власти',
  'Давайте разбираться: чистосердечное признание облегчает душу',
  'Частокол на границе продолжает удивлять',
  'Только частотность поисковых запросов одухотворила всех причастных',
  'Органический трафик определил дальнейшее развитие',
  'Все чаще появляется информация о том, что светлый лик правового взаимодействия определил дальнейшее развитие',
  'Тяжёлое машиностроение — это вам не звон колоколов',
  'Есть над чем задуматься: обучение кадров — приоритетная задача',
  'Никто не вправе осуждать далёкий барабанный бой',
  'Реализация намеченных плановых заданий бодрит',
  'Дурное дело нехитрое: светлый лик правового взаимодействия станет частью наших традиций',
  'Экономическая повестка сегодняшнего дня разочаровала',
  'Граница обучения кадров процветает, как ни в чем не бывало',
  'Ночь оказалась долгой',
  'Крепость духовных «скреп» сделала своё дело',
  'Нет звука приятнее, чем далёкий барабанный бой',
  'Новая парадигма реальности: кровь стынет в жилах',
  'Цена вопроса не важна, когда сознание наших соотечественников не замутнено пропагандой',
  'Подтверждено: обучение кадров — приоритетная задача',
  'Нынче никто не может себе позволить инициировать боевой клич героев',
  'Не следует забывать, что герцог графства коронован',
  'Британские «ученые» заявили, что младая поросль матереет',
  'Свободу слова не задушить, пусть даже средства индивидуальной защиты оказались бесполезны!',
  'Новая парадигма реальности: прототип — не панацея',
  'Допустим, помыслы поколения чисты',
];

const STANDARDNAME = [
  'Дементьев Валерий',
  'Тарасюк Артемий',
  'Гаврилов Болеслав',
  'Афанасьев Макар',
  'Авдеев Николай',
  'Николаев Жигер',
  'Калашников Ефрем',
  'Филиппов Рафаил',
  'Кулишенко Юлий',
  'Бобылёв Чарльз',
  'Щукин Чеслав',
  'Прохоров Харитон',
  'Гришин Добрыня',
  'Коломоец Ким',
  'Щербаков Максим',
  'Евдокимов Евсей',
  'Щербаков Люций',
  'Корнилов Йомер',
  'Давыдов Дарий',
  'Буров Шарль',
  'Милославский Сергей',
  'Овчаренко Юлий',
  'Мамонтов Феликс',
  'Тягай Эдуард',
  'Яровой Устин',
];

const PHOTOS_LENGTH = 25;
const AVATAR_COUNT = 6;

const idAuthor = createCounter(135, 1).inc;
const idPhoto = createCounter(1, 1).inc;

const createComment = function () {
  return {
    id: idAuthor(),
    avatar: getRandomAvatar(AVATAR_COUNT),
    message: getRandomMessage(STANDARDMESSAGE),
    name: getRandomArrayElement(STANDARDNAME),
  };
};

const MAX_COUNT_COMMENTS = 5;
const newComment = function () {
  const arr = [];
  const countComments = getRandomPositiveInteger(1, MAX_COUNT_COMMENTS);
  for (let i = 1; i <= countComments; i++) {
    const newElement = createComment();
    arr.push(newElement);
  }
  return arr;
};

export const createAuthor = function () {
  return {
    id: idPhoto(),
    url: getRandomPhoto(PHOTOS_LENGTH),
    description: getRandomArrayElement(STANDARDDESCRIPTION),
    likes: getRandomPositiveInteger(15, 200),
    comments: newComment(),
  };
};

// export const createMock = (length, factory,) =>
//   Array.from({ length }, (_, i) => createAuthor(i));


// const createPhoto = () => {
//   // throw new Error('not implemented yet');
// }
// export const mockPublishedPhotos = createMock(PHOTOS_LENGTH, createPhoto);
// console.log(mockPublishedPhotos);

export const createAuthors = Array.from({ length: PHOTOS_LENGTH }, createAuthor); //() =>
