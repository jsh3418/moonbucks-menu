import { $ } from "./utils/dom.js";
import MenuApi from "./api/index.js";


function App() {

  // 메뉴 저장
  this.savedMenu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  // 현재 메뉴창
  this.currentMenu = "espresso";

  // 시작할 때
  this.init = async () => {
    this.savedMenu[this.currentMenu] = await MenuApi.getAllMenuByCategory(this.currentMenu);
    render();
    initEventListeners();
  };

  // 메뉴판 그리기
  const render = async () => {
    this.savedMenu[this.currentMenu] = await MenuApi.getAllMenuByCategory(this.currentMenu);
    const template = this.savedMenu[this.currentMenu].map((item) => {
      return `
      <li data-menu-id="${item.id}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" : ""}">${item.name}</span>
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
      </li>
      `}).join("");
    $("#espresso-menu-list").innerHTML = template;
    $("#espresso-menu-name").value = "";
    menuCount();
  };

  // 메뉴 추가 기능
  const addMenu = async () => {
    const menuName = $("#espresso-menu-name").value;
    if (menuName === "") {
      alert("값을 입력해주세요.");
      return;
    }

    const duplicatedItem = this.savedMenu[this.currentMenu].find((menu) => menu.name === menuName);
    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      $("#espresso-menu-name").value = "";
      return;
    }

    await MenuApi.createMenu(this.currentMenu, menuName);
    render();
    $("#espresso-menu-name").value = "";
  };

  // 메뉴 품절 기능
  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentMenu, menuId);
    render();
  };

  // 카테고리 클릭 기능
  const changeCategory = (e) => {
    const isMenuButton = e.target.classList.contains("cafe-category-name");
    if (isMenuButton) {
      this.currentMenu = e.target.dataset.categoryName;
      let h2 = e.target.closest("button").innerText;
      $("#h2").innerText = `${h2} 메뉴 관리`;
      render();
    }
  };

  // 메뉴 수정 기능
  const updateMenu = async (e) => {
    const menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenu = prompt("수정할 메뉴 이름을 입력해주세요.", menuName.innerText);
    if (updatedMenu !== null && updatedMenu !== "") {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.updateMenu(this.currentMenu, updatedMenu, menuId);
      render();
    };
  };

  // 메뉴 삭제 기능
  const removeMenu = async (e) => {
    if (confirm("삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deleteMenu(this.currentMenu, menuId);
      render();
    };
  };

  // 메뉴 카운트 기능
  const menuCount = () => {
    const menuCount = this.savedMenu[this.currentMenu].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const initEventListeners = () => {

    // 버튼 클릭 메뉴 추가
    $("#espresso-menu-submit-button").addEventListener("click", () => {
      addMenu();
    });

    // 엔터키 메뉴 추가
    $("#espresso-menu-name").addEventListener("keypress", (e) => {
      if (e.key === 'Enter') {
        addMenu();
      };
    });

    // 메뉴판 클릭
    $("nav").addEventListener("click", async (e) => { changeCategory(e) });
  };

  // 품절, 수정, 삭제 이벤트
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-sold-out-button")) {
      soldOutMenu(e);
      return;
    };
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenu(e);
      return;
    };
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
      return;
    };
  });

  // submit 기본 동작 무효화
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

};

const app = new App();
app.init();