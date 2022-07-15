import './form.js';
import { getData, sendData, onSuccessMessage, onFailMessage } from './api.js';
import { closeModal, setUserFormSubmit } from './form.js';


setUserFormSubmit(closeModal);

const gettingData = getData(onSuccessMessage, onFailMessage);
