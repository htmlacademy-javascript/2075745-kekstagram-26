// import { findElement } from './utils.js';
// import { createPosts } from './data.js';
// import { openModal } from './picture.js';

// const template = findElement(document, '#picture');
// const templatePicture = findElement(template.content, '.picture');
// const templatePictureFragment = document.createDocumentFragment();

// createPosts.forEach(({ id, url, description, comments, likes }) => {
//   const photosElement = templatePicture.cloneNode(true);
//   photosElement.id = `picture-${id}`;
//   const pictureImg = findElement(photosElement, '.picture__img');
//   pictureImg.src = url;
//   pictureImg.alt = description;
//   const pictureComments = findElement(photosElement, '.picture__comments');
//   pictureComments.textContent = comments.length;
//   const pictureLikes = findElement(photosElement, '.picture__likes');
//   pictureLikes.textContent = likes;
//   templatePictureFragment.appendChild(photosElement);
// }
// );
// const loadingPictures = findElement(document, '.pictures');
// loadingPictures.appendChild(templatePictureFragment);

// loadingPictures.onclick = function (evt) {
//   if (evt.target.tagName === 'IMG') {
//     const image = {
//       id: evt.target.parentElement.id,
//       src: evt.target.src,
//       alt: evt.target.alt,
//       comments: evt.target.nextElementSibling.firstElementChild.textContent,
//       likes: evt.target.nextElementSibling.lastElementChild.textContent,
//     };
//     openModal(image);
//   }
// };
