// [V]에스프레소 메뉴에 새로운 메뉴를 확인 버튼으로 추가한다.
// [ ]에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다.
// [ ]메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// [ ]사용자 입력값이 빈 값이라면 추가되지 않는다.
// [ ]메뉴 수정 버튼을 눌러 메뉴 이름을 수정할 수 있게 한다. 브라우저에서 제공하는 prompt 인터페이스를 활용한다.
// [ ]메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다. 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
// [ ]총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

function App() {

  const addMenuName = () => {
    const menuName = $("#espresso-menu-name").value;
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
  };

  // 확인 버튼 클릭 이벤트
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

};

const app = new App();