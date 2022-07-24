import { findElement, isEnterKey, isEscapeKey, onElementClick } from './utils.js';
import { STEP_SHOW_COMMENTS } from './const.js';

const modalWindow = findElement(document, '.big-picture'); // само окно
const pictureImg = findElement(modalWindow, '.big-picture__img');
const pictureCancel = findElement(modalWindow, '#picture-cancel');
const commentsLoader = findElement(modalWindow, '.comments-loader');

const closeModalPicture = () => {
  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onModalEscKeyDown);
};

function onModalEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalPicture();
  }
}

let countShownComments = 0;

const showCommentsCount = findElement(modalWindow, '#show-comments-count');
const commentsCount = findElement(modalWindow, '.comments-count');
const socialComments = findElement(modalWindow, '.social__comments');
const oneSocialComment = findElement(socialComments, '.social__comment');

const show5Comments = () => {
  const sumComments = +commentsCount.textContent;

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
      for (let i = countShownComments; i < countShownComments + STEP_SHOW_COMMENTS; i++) {
        socialComments.children[i].classList.remove('hidden');
      }
      countShownComments += STEP_SHOW_COMMENTS;
      commentsLoader.classList.remove('hidden');
    }
  }
  showCommentsCount.textContent = countShownComments;
};

const setupLikes = (likesCount, row) => {
  likesCount.textContent = row.likes;
};

const setupSocialPicture = (socialPicture, row) => {
  socialPicture.src = row.avatar;
};

const setupSocialCaption = (socialCaption, row) => {
  socialCaption.textContent = row.description;
};

const setupCommentsCount = (containerCommentsCount, row) => {
  containerCommentsCount.textContent = row.comments.length;
};

// Перерисовка новой картинки
const renderPicture = (picture, image) => {

  picture.src = image.url;
  picture.alt = image.description;
  setupLikes(findElement(modalWindow, '.likes-count'), image);
  setupSocialPicture(findElement(modalWindow, '.social__picture'), image);
  setupSocialCaption(findElement(modalWindow, '.social__caption'), image);
  setupCommentsCount(commentsCount, image);

  const templateCommentFragment = document.createDocumentFragment();

  const setupAvatar = (avatar, row) => {
    avatar.src = row.avatar;
    avatar.alt = row.name;
  };
  const setupMessage = (message, row) => {
    message.textContent = row.message;
  };
  image.comments.forEach((comments) => {
    const templateSocialComment = oneSocialComment.cloneNode(true);
    templateSocialComment.classList.add('hidden');
    setupAvatar(findElement(templateSocialComment, '.social__picture'), comments);
    setupMessage(findElement(templateSocialComment, '.social__text'), comments);
    templateCommentFragment.appendChild(templateSocialComment);
  });

  if (image.comments.length) {
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    socialComments.appendChild(templateCommentFragment);
  }

  countShownComments = 0;
  show5Comments();
  commentsLoader.onclick = show5Comments;

  onElementClick(pictureCancel, closeModalPicture);

  pictureCancel.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeModalPicture();
    }
  });
};

export const openModalPicture = function (image) {
  modalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderPicture(findElement(pictureImg, 'img'), image);
  document.body.addEventListener('keydown', onModalEscKeyDown);
  pictureCancel.focus();
};
