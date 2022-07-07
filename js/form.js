import { findElement, isEnterKey, isEscapeKey } from './utils.js';

const uploadFile = findElement(document, '#upload-file');
uploadFile.addEventListener('change', openModal);

const modalWindow = findElement(document, '.img-upload__overlay');
const pictureCancel = findElement(modalWindow, '#upload-cancel');

const form = findElement(document, '.upload-select-image');
const pristine = new Pristine(form);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Норма');
  }
  else {
    console.log('Не валидна');
  }
});

const hashtagsField = findElement(document, '.text__hashtags');
hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});
const descriptionField = findElement(document, '.text__description');
descriptionField.addEventListener('keydown', event.stopPropagation());



// __________________ Повтор кода picture.js
// о чем говорится в задании
// В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.
// renderPicture - другой

const onModalEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

// ?focus по-прежнему на основном окне, при нажатии на Enter снова открывается форма
export function openModal(image) {
  modalWindow.classList.remove('hidden');
  const body = findElement(document, 'body');
  body.classList.add('modal-open');
  // renderPicture(image);
  body.addEventListener('keydown', onModalEscKeyDown);
}

function closeModal() {
  modalWindow.classList.add('hidden');
  const body = findElement(document, 'body');
  body.classList.remove('modal-open');
  // надо ли чистить что-то за собой ? анти rendererPicture
  body.removeEventListener('keydown', onModalEscKeyDown);
  uploadFile.value = '';
}

pictureCancel.addEventListener('click', () => {
  closeModal();
});

pictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});

//     Заведите модуль, который будет отвечать за работу с формой.
//     Пропишите тегу < form > правильные значения атрибутов method и адрес action для отправки формы на сервер.
//         Обратите внимание.В разделе про работу с сетью мы доработаем механизм отправки данных, а пока достаточно правильных атрибутов у тега < form >.
//         Если форма заполнена верно, то после отправки покажется страница сервера(по адресу из атрибута action тега form) с успешно отправленными данными.Если же форма пропустила какие - то некорректные значения, то будет показана страница с допущенными ошибками.В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.
//     Проверьте разметку вашего проекта и добавьте недостающие атрибуты.Например, всем обязательным полям нужно добавить атрибут required.Затем проверьте, правильные ли типы стоят у нужных полей, если нет — проставьте правильные.
//   Изучите, что значит загрузка изображения, и как, когда и каким образом показывается форма редактирования изображения.Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания.В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.
//     Важно.Подстановка выбранного изображения в форму — это отдельная домашняя работа.В данном задании этот пункт реализовывать не нужно.
//     После реализуйте закрытие формы.
//         Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла #upload - file.В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию.Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию, а значит окно с формой не отобразится, что будет нарушением техзадания.Значение других полей формы также нужно сбрасывать.
//     Напишите код для валидации формы добавления изображения.Список полей для валидации:
// Хэш - теги
// Комментарий
//         На расширенном тарифе валидацию хэш - тегов делать не нужно.Достаточно проверки, что поле не пустое.
//     Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам.При желании, реализуйте проверки сразу при вводе значения в поле.
// Как отменить обработчик Esc при фокусе ?
//   Валидация хеш - тегов ?
//     Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.