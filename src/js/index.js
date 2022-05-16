import { $ } from './utils/DOM.js';
import { store } from './utils/store.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentMenu = "espresso";

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
      render();
    };
  };

  const render = () => {
    const template = this.menu[this.currentMenu].map((item, index) => {
      return `
      <li data-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="${item.soldOut ? "sold-out" : ""} w-100 pl-2 menu-name">${item.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        > 
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`}).join("");
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
    this.menu[this.currentMenu].push({ name: menuName });
    store.setLocalStorage(this.menu);
    render();
  };
  // 메뉴명 수정 기능
  const updateMenuName = (e) => {
    const updatedMenuName = prompt("수정할 메뉴명을 입력해주세요.", e.target.closest("li").querySelector(".menu-name").innerText);
    if (updatedMenuName !== "" && updatedMenuName !== null) {
      const id = e.target.closest("li").dataset.id;
      this.menu[this.currentMenu][id].name = updatedMenuName;
      store.setLocalStorage(this.menu);
      render();
    };
  };
  // 메뉴 삭제 기능
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const id = e.target.closest("li").dataset.id;
      this.menu[this.currentMenu].splice(id, 1);
      store.setLocalStorage(this.menu);
      render();
    };
  };
  // 메뉴 품절 기능
  const soldOutMenu = (e) => {
    const id = e.target.closest("li").dataset.id;
    this.menu[this.currentMenu][id].soldOut = !this.menu[this.currentMenu][id].soldOut;
    store.setLocalStorage(this.menu);
    render();
  }
  // 메뉴 카운트 기능
  const menuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

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
      this.currentMenu = e.target.dataset.categoryName;
      $("h2").innerText = `${e.target.closest("button").innerText} 메뉴 관리`;
      render();
    };
  });

};

const app = new App();
app.init();