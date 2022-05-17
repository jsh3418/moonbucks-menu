import { $ } from '../utils/DOM.js';
import { store } from '../utils/store.js';
import { menu, currentMenu } from '../index.js';
import { menuListItemTemplate } from '../template/template.js';

const render = () => {
  const template = menu[currentMenu].map((item, index) => {
    return menuListItemTemplate(item, index)
  }).join("");
  $("#espresso-menu-list").innerHTML = template;
  $("#espresso-menu-name").value = "";
  menuCount();
};

// 메뉴명 추가 기능
const addMenuName = () => {
  const menuName = $("#espresso-menu-name").value;
  if (menuName === "") {
    alert("메뉴명을 입력해주세요.");
    return;
  };
  menu[currentMenu].push({ name: menuName });
  store.setLocalStorage(menu);
  render();
};
// 메뉴명 수정 기능
const updateMenuName = (e) => {
  const menuName = e.target.closest("li").querySelector(".menu-name").innerText;
  const updatedMenuName = prompt("수정할 메뉴명을 입력해주세요.", menuName);
  if (updatedMenuName !== "" && updatedMenuName !== null) {
    const id = e.target.closest("li").dataset.id;
    menu[currentMenu][id].name = updatedMenuName;
    store.setLocalStorage(menu);
    render();
  };
};
// 메뉴 삭제 기능
const removeMenuName = (e) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    const id = e.target.closest("li").dataset.id;
    menu[currentMenu].splice(id, 1);
    store.setLocalStorage(menu);
    render();
  };
};
// 메뉴 품절 기능
const soldOutMenu = (e) => {
  const id = e.target.closest("li").dataset.id;
  menu[currentMenu][id].soldOut = !menu[currentMenu][id].soldOut;
  store.setLocalStorage(menu);
  render();
}
// 메뉴 카운트 기능
const menuCount = () => {
  const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
  $(".menu-count").innerText = `총 ${menuCount}개`;
};

export { render, addMenuName, updateMenuName, removeMenuName, soldOutMenu };