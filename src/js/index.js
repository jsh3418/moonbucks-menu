// [V]에스프레소 메뉴에 새로운 메뉴를 확인 버튼으로 추가한다.
// [V]에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다.
// [V]메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// [V]사용자 입력값이 빈 값이라면 추가되지 않는다.
// [V]메뉴 수정 버튼을 눌러 메뉴 이름을 수정할 수 있게 한다. 브라우저에서 제공하는 prompt 인터페이스를 활용한다.
// [ ]메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다. 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
// [ ]총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

function App() {
  // 메뉴명 추가 기능
  const addMenuName = () => {
    const menuName = $("#espresso-menu-name").value;
    if (menuName === "") {
      alert("메뉴명을 입력해주세요.")
      return;
    }
    const template = `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuName}</span>
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
    </li>`;
    $("#espresso-menu-list").insertAdjacentHTML('beforeend', template);
    $("#espresso-menu-name").value = "";
  };
  // 메뉴명 수정 기능
  const updateMenuName = (e) => {
    const updatedMenuName = prompt("수정할 메뉴명을 입력해주세요.", e.target.closest("li").querySelector(".menu-name").innerText);
    e.target.closest("li").querySelector(".menu-name").innerText = updatedMenuName;
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
  // 수정 버튼 이벤트
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    };
  });

};

const app = new App();