import { $ } from '../utils/DOM.js';
import { currentMenu } from '../index.js';
import { render, addMenuName, updateMenuName, removeMenuName, soldOutMenu } from '../function/function.js';


const initEventListener = () => {

  // 확인 버튼 메뉴 추가 이벤트
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });
  // 엔터로 메뉴 추가 이벤트, form 기본 동작 무효
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addMenuName();
  });
  // 수정 버튼, 삭제 버튼 이벤트
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    };
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    };
    if (e.target.classList.contains("menu-sold-out-button")) {
      soldOutMenu(e);
    }
  });
  // 메뉴판 클릭 이벤트
  $("nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("cafe-category-name")) {
      currentMenu.name = e.target.dataset.categoryName;
      $("h2").innerText = `${e.target.closest("button").innerText} 메뉴 관리`;
      render();
    };
  });

};

export { initEventListener }