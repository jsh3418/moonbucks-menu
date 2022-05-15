// [V]메뉴를 추가할 때 localStorage에 데이터를 저장한다.
// [V]메뉴를 수정할 때 localStorage에 데이터를 저장한다.
// [V]메뉴를 삭제할 때 localStorage에 데이터를 저장한다.
// []새로고침해도 데이터가 남아있게 한다.
// []에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
// []페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// []품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold - out class를 추가하여 상태를 변경한다.

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
}

function App() {
  this.menu = [];

  // 메뉴명 추가 기능
  const addMenuName = () => {
    const menuName = $("#espresso-menu-name").value;
    if (menuName === "") {
      alert("메뉴명을 입력해주세요.")
      return;
    }
    this.menu.push({ name: menuName });
    store.setLocalStorage(this.menu);
    const template = this.menu.map((item, index) => {
      return `
      <li data-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${item.name}</span>
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
  // 메뉴명 수정 기능
  const updateMenuName = (e) => {
    const updatedMenuName = prompt("수정할 메뉴명을 입력해주세요.", e.target.closest("li").querySelector(".menu-name").innerText);
    if (updatedMenuName !== "" && updatedMenuName !== null) {
      e.target.closest("li").querySelector(".menu-name").innerText = updatedMenuName;
      const id = e.target.closest("li").dataset.id;
      this.menu[id].name = updatedMenuName;
      store.setLocalStorage(this.menu);
    };
  };
  // 메뉴 삭제 기능
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const id = e.target.closest("li").dataset.id;
      this.menu.splice(id, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      menuCount();
    };
  };
  // 메뉴 카운트 기능
  const menuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
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
  });

};

const app = new App();