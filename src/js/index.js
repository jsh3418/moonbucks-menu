import { store } from './utils/store.js';
import { render } from './function/function.js';
import { initEventListener } from './eventHandler/eventHandler.js';

export let menu = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
};

export let currentMenu = { name: "espresso" };

function init() {
  if (store.getLocalStorage()) {
    menu = store.getLocalStorage();
    render();
  };
};

init();
initEventListener();