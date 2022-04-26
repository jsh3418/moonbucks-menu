const $ = (selector) => document.querySelector(selector);


function App() {

  // 메뉴 추가 기능
  const addMenu = () => {
    const menuName = $("#espresso-menu-name").value;
    const template = `
  <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
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
  `
    if (menuName !== "") {
      $("#espresso-menu-list").insertAdjacentHTML('beforeend', template);
      $("#espresso-menu-name").value = "";
    } else {
      alert("메뉴 이름을 입력해주세요.");
    }
  }

  // 메뉴 수정 기능
  const updateMenu = (e) => {
    const menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenu = prompt("수정할 메뉴 이름을 입력해주세요.", menuName.innerText)
    if (updatedMenu !== null && updatedMenu !== "") {
      menuName.innerText = updatedMenu;
    }
  }

  // 메뉴 삭제 기능
  const removeMenu = (e) => {
    if (confirm("삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      menuCount();
    }
  }

  // 메뉴 카운트 기능
  const menuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`
  }

  // 버튼 클릭 메뉴 추가
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenu();
    menuCount();
  })

  // 엔터키 메뉴 추가
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      addMenu();
      menuCount();
    }
  })

  // 수정, 삭제 이벤트
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenu(e);
    };
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
    }
  })

  // submit 기본 동작 무효화
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  })

}

const app = new App();