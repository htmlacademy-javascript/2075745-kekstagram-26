import { findElement, isEnterKey, isEscapeKey } from './utils.js';
import { post } from './data.js';

const modalWindow = findElement(document, '.big-picture'); // само окно
// openWindow = findElement(document,''); // на картинки надо повесить открытие окна
// const openWindow = document.querySelector('.setup-open');
const buttonCloseWindow = findElement(modalWindow, '.big-picture__cancel');

const pictureImg = findElement(modalWindow, '.big-picture__img');
const pictureCancel = findElement(modalWindow, '#picture-cancel');
const likesCount = findElement(modalWindow, '.likes-count');
const commentsCount = findElement(modalWindow, '.comments-count');
const socialComment = findElement(modalWindow, '.social__comment-count');
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

function renderPicture(image) {
  // временная штука
  // 3. После открытия окна спрячьте блоки счётчика комментариев.social__comment - count и загрузки новых комментариев.comments - loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
  socialComment.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // перерисовка новой картинки
  const img = findElement(pictureImg, 'img');
  img.src = image.src;
  img.alt = image.alt;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments;
  const id = image.id.slice(('picture-').length);
  socialPicture.src = post(id).avatar;
  socialCaption.textContent = post(id).description;
  socialLikes.textContent = post(id).likes;


  const socialComments = findElement(document, '.social__comments');
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
  // Удаление всех дочерних элементов
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
  socialComments.appendChild(templateCommentFragment);
}

pictureCancel.addEventListener('click', () => {
  closeModal();
});

buttonCloseWindow.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});
