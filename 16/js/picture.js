import { findElement, isEnterKey, isEscapeKey, isCharNumber } from './utils.js';
import { arrPosts } from './data.js';

const modalWindow = findElement(document, '.big-picture'); // само окно
// openWindow = findElement(document,''); // на картинки надо повесить открытие окна
// const openWindow = document.querySelector('.setup-open');

const pictureImg = findElement(modalWindow, '.big-picture__img');
const pictureCancel = findElement(modalWindow, '#picture-cancel');
const likesCount = findElement(modalWindow, '.likes-count');
const socialCommentCount = findElement(modalWindow, '.social__comment-count');
const commentsLoader = findElement(modalWindow, '.comments-loader');

const socialHeader = findElement(modalWindow, '.social__header');
const socialPicture = findElement(socialHeader, '.social__picture');
const socialCaption = findElement(socialHeader, '.social__caption');
const socialLikes = findElement(socialHeader, '.likes-count');

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

// общее число комментариев. Показываю первые пять. По нажатию еще пять.
// все комментарии закрыты, кнопка скрыта.
// Вызов (первый вызов): показать пять
// если комментариев ноль - всё блокирую: ничего не делаю
// если комментариев не больше 5: открываю оставшиеся комментарии, кнопку скрываю, число показанных комментариев = кол-ву комментариев
//  иначе (комментариев больше 5): открываю пять комментариев, кнопка открыта, число показанных комментариев += 5
// новый комментарий
let countShownComments = 0;

const STEP_SHOW_COMMENTS = 5;
function show5Comments() {
  const commentsCount = findElement(modalWindow, '.comments-count');
  const sumComments = +commentsCount.textContent;
  const socialComments = findElement(document, '.social__comments');
  if (sumComments - countShownComments <= 0) {
    for (let i = 0; i < socialComments.children.length; i++) {
      socialComments.children[i].classList.add('hidden');
    }
    commentsLoader.classList.add('hidden');
  }
  else {
    if (sumComments - countShownComments <= STEP_SHOW_COMMENTS) {
      for (let i = countShownComments; i < sumComments; i++) {
        socialComments.children[i].classList.remove('hidden');
      }
      countShownComments = sumComments;
      commentsLoader.classList.add('hidden');
    }
    else {
      for (let i = countShownComments; i < countShownComments + 5; i++) {
        socialComments.children[i].classList.remove('hidden');
      }
      countShownComments += STEP_SHOW_COMMENTS;
      commentsLoader.classList.remove('hidden');
    }
  }

  let strTemp = socialCommentCount.innerHTML;
  let j = 0;
  while (isCharNumber(strTemp[j])) {
    j++;
  }
  strTemp = strTemp.slice(j);
  socialCommentCount.innerHTML = countShownComments + strTemp;
}
commentsLoader.onclick = show5Comments;
// addEventListener('click', show5Comments); // а если засунуть внутрь обновления картинки, то повиснет куча обработчиков, надо вешать на onclick

function renderPicture(image) {
  // перерисовка новой картинки
  const img = findElement(pictureImg, 'img');
  img.src = image.src;
  img.alt = image.alt;
  likesCount.textContent = image.likes;
  const commentsCount = findElement(modalWindow, '.comments-count');
  commentsCount.textContent = image.comments;
  const id = image.id.slice(('picture-').length);
  socialPicture.src = arrPosts[id].avatar;
  socialCaption.textContent = arrPosts[id].description;
  socialLikes.textContent = arrPosts[id].likes;

  const socialComments = findElement(document, '.social__comments');
  const oneSocialComment = findElement(socialComments, '.social__comment');
  const templateCommentFragment = document.createDocumentFragment();


  arrPosts[id].comments.forEach((comments) => {
    const templateSocialComment = oneSocialComment.cloneNode(true);
    templateSocialComment.classList.add('hidden');
    const avatar = findElement(templateSocialComment, '.social__picture');
    avatar.src = comments.avatar;
    avatar.alt = comments.name;
    const message = findElement(templateSocialComment, '.social__text');
    message.textContent = comments.message;
    templateCommentFragment.appendChild(templateSocialComment);
  });

  if (arrPosts[id].comments.length) {
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    socialComments.appendChild(templateCommentFragment);
  }
  countShownComments = 0;
  show5Comments();
}

pictureCancel.addEventListener('click', () => {
  closeModal();
});

pictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});
