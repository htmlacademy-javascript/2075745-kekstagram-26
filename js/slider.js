import { findElement } from './utils.js';

const sliderElementValue = findElement(document, '.scale__control--value');
const imagePreview = findElement(document, '.img-upload__preview img');

// Шаг масштаба
const SCALE_STEP = 25;
// Уменьшение масштаба картинки
export function minusScale() {
  const value = +sliderElementValue.value.slice(0, -1);
  if (value >= SCALE_STEP * 2) {
    sliderElementValue.value = `${value - SCALE_STEP}%`;
    //? Как правильно? Вызов или подписка на событие?
    changeScale();
  }
}
// Увеличение масштаба картинки
export function plusScale() {
  const value = +sliderElementValue.value.slice(0, -1);
  if (value <= 100 - SCALE_STEP) {
    sliderElementValue.value = `${value + SCALE_STEP}%`;
    //? Как правильно? Вызов или подписка на событие?
    changeScale();
  }
}
// Изменение масштаба
export function changeScale() {
  const value = +sliderElementValue.value.slice(0, -1);
  imagePreview.style.transform = `scale(${value * 0.01})`;
}

const effectLevel = findElement(document, '.effect-level');
const effectLevelSlider = findElement(document, '.effect-level__slider');
const effectLevelValue = findElement(document, '.effect-level__value');
let currentEffect;

// Установить значения по умолчанию
export function defaultFormData() {
  imagePreview.style.removeProperty('filter');
  imagePreview.style.removeProperty('transform');
  effectLevel.classList.add('hidden');
}

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  switch (currentEffect) {
    case 'chrome':
      imagePreview.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${effectLevelValue.value}%)`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${effectLevelValue.value}px)`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${effectLevelValue.value})`;
      break;
    default:
    // console.log(currentEffect);
  }
});

const effectsList = findElement(document, '.effects__list');
effectLevel.classList.add('hidden');
imagePreview.removeAttribute('style');
effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  imagePreview.className = `effects__preview--${currentEffect}`;
  switch (currentEffect) {
    case 'chrome':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'sepia':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'marvin':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      effectLevel.classList.remove('hidden');
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'none':
      effectLevel.classList.add('hidden');
      imagePreview.removeAttribute('style');
      break;
    default:
      throw new Error(evt.target.value);
  }
});
