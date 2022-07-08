import { findElement, isEnterKey, isEscapeKey } from './utils.js';
import { post } from './data.js';

const modalWindow = findElement(document, '.big-picture'); // само окно
// openWindow = findElement(document,''); // на картинки надо повесить открытие окна
// const openWindow = document.querySelector('.setup-open');

const pictureImg = findElement(modalWindow, '.big-picture__img');
const pictureCancel = findElement(modalWindow, '#picture-cancel');
const likesCount = findElement(modalWindow, '.likes-count');
const socialComment = findElement(modalWindow, '.social__comment-count');
const commentsLoader = findElement(modalWindow, '.comments-loader');

const socialHeader = findElement(modalWindow, '.social__header');
const socialPicture = findElement(socialHeader, '.social__picture');
const socialCaption = findElement(socialHeader, '.social__caption');
const socialLikes = findElement(socialHeader, '.likes-count');

const socialComments = findElement(document, '.social__comments');

// templatePicture.addEventListener('click', openModal);

const onModalEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

export function openModal(image) {
  modalWindow.classList.remove('hidden');
  const body = findElement(document, 'body');
  body.classList.add('modal-open');
  renderPicture(image);
  body.addEventListener('keydown', onModalEscKeyDown);
}

function closeModal() {
  modalWindow.classList.add('hidden');
  const body = findElement(document, 'body');
  body.classList.remove('modal-open');
  // надо ли чистить что-то за собой ? анти rendererPicture
  body.removeEventListener('keydown', onModalEscKeyDown);
}

// 0 из 7
// 5 из 7
// 7 из 7

// общее число комментариев. Показываю первые пять. По нажатию еще пять.
// все комментарии закрыты, кнопка скрыта.
// Вызов (первый вызов): показать пять
// если комментариев ноль - всё блокирую: ничего не делаю
// если комментариев не больше 5: открываю оставшиеся комментарии, кнопку скрываю, число показанных комментариев = кол-ву комментариев
//  иначе (комментариев больше 5): открываю пять комментариев, кнопка открыта, число показанных комментариев += 5
let countShownComments = 0;

function show5Comments(id) {
  const sumComments = post(id).comments.length;
  const difference = sumComments - countShownComments;
  if (difference <= 0) {
    console.log('Нечего показывать');
  } else {
    if (difference <= 5) {
      console.log('Показать оставшиеся ' + difference);
      const socialComments = findElement(document, '.social__comments');
      for (let i = countShownComments; i < sumComments - 1; i++) {
        socialComments.childNodes[i].classList.remove('hidden');
      }
      countShownComments = sumComments;
      commentsLoader.classList.add('hidden');
    } else {
      console.log('Показать 5 из ' + difference);
      for (let i = countShownComments; i < countShownComments + 5; i++) {
        socialComments.childNodes[i - 1].classList.remove('hidden');
      }
      countShownComments += 5;
      commentsLoader.classList.remove('hidden');
    };
  }
  let strTemp = socialComment.textContent;
  strTemp = strTemp.slice(strTemp.indexOf(' из'));
  socialComment.textContent = countShownComments + strTemp;
}
commentsLoader.addEventListener('click', show5Comments); // а если засунуть внутрь обновления картинки, то повиснет куча обработчиков, надо вешать на onclick

function renderPicture(image) {
  // перерисовка новой картинки
  const img = findElement(pictureImg, 'img');
  img.src = image.src;
  img.alt = image.alt;
  likesCount.textContent = image.likes;
  const commentsCount = findElement(modalWindow, '.comments-count');
  console.log(commentsCount);
  commentsCount.textContent = image.comments;
  const id = image.id.slice(('picture-').length);
  socialPicture.src = post(id).avatar;
  socialCaption.textContent = post(id).description;
  socialLikes.textContent = post(id).likes;


  const oneSocialComment = findElement(socialComments, '.social__comment');
  const templateCommentFragment = document.createDocumentFragment();

  post(id).comments.forEach((comments) => {
    const templateSocialComment = oneSocialComment.cloneNode(true);
    const avatar = findElement(templateSocialComment, '.social__picture');
    avatar.src = comments.avatar;
    avatar.alt = comments.name;
    const message = findElement(templateSocialComment, '.social__text');
    message.textContent = comments.message;
    templateCommentFragment.appendChild(templateSocialComment);
  });

  // Что-то перестала роботать кнопка escape после одного закрытия
  // Удаление всех дочерних элементов
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
  socialComments.appendChild(templateCommentFragment);
  show5Comments(id);
}

pictureCancel.addEventListener('click', () => {
  closeModal();
});

pictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});
