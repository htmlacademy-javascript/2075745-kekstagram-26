import './form.js';
import { getData, onSuccessMessage, onFailMessage } from './api.js';
import { closeModal, setUserFormSubmit } from './form.js';
// import { getFilteredArray } from './filter.js';

setUserFormSubmit(closeModal, closeModal);

getData(onSuccessMessage, onFailMessage);

// getData(
//   (photos) => {
//     renderPictures(photos);
//     setActiveFilterClick(debouncing(
//       () => renderPictures(getFilteredArray(photos)),
//       RERENDER_DELAY,
//     ));
//     filterSection.classList.remove('img-filters--inactive');
//   },
//   () => showAlert('Не удалось получить данные. Попробуйте обновить страницу')
// );
