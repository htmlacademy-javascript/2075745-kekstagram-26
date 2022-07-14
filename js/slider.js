import { findElement } from './utils.js';

const sliderElementValue = findElement(document, '.scale__control--value');
const imagePreview = findElement(document, '.img-upload__preview');

const SCALE_STEP = 25;
export function minusScale() {
  const value = +sliderElementValue.value.slice(0, -1);
  if (value >= SCALE_STEP * 2) {
    sliderElementValue.value = value - SCALE_STEP + "%"; //?как нормально сделать конкатенацию?
    changeScale();
  }
}

export function plusScale() {
  const value = +sliderElementValue.value.slice(0, -1);
  if (value <= 100 - SCALE_STEP) {
    sliderElementValue.value = value + SCALE_STEP + "%"; //?как нормально сделать конкатенацию?
    changeScale();
  }
}

export function changeScale() {
  const value = +sliderElementValue.value.slice(0, -1);
  imagePreview.style.transform = `scale(${value * 0.01})`;
  // ? масштаб картинки - оставлять белый фон. Менять масштаб только самой картинки?

}

const effectLevel = findElement(document, '.effect-level');
const effectLevelSlider = findElement(document, '.effect-level__slider');
const effectLevelValue = findElement(document, '.effect-level__value');

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
  const effectFieldset = findElement(document, '.effects');
  console.log(effectFieldset);
  console.log(document.activeElement);
  console.log(effectFieldset.activeElement);

  imagePreview.style.filter = `grayscale(${effectLevelValue.value})`; //???
});

const effectsList = findElement(document, '.effects__list');
effectLevel.classList.add('hidden');
imagePreview.removeAttribute('style');
effectsList.addEventListener('change', (evt) => {
  switch (evt.target.value) {
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
      imagePreview.style.filter = `grayscale(${effectLevelValue.value})`;
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
      imagePreview.style.filter = `sepia(${effectLevelValue.value})`;
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
      imagePreview.style.filter = `invert(${effectLevelValue.value}%)`;
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
      imagePreview.style.filter = `blur(${effectLevelValue.value}px)`;
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
      imagePreview.style.filter = `brightness(${effectLevelValue.value})`;
      break;
    case 'none':
      effectLevel.classList.add('hidden');
      imagePreview.removeAttribute('style');
      break;
    default:
      console.log(evt.target.value);

  }
});
