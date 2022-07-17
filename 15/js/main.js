import './form.js';
import { getData, onSuccessMessage, onFailMessage } from './api.js';
import { closeModal, setUserFormSubmit } from './form.js';


setUserFormSubmit(closeModal);

getData(onSuccessMessage, onFailMessage);

