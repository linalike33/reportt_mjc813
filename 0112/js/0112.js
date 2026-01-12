// RPG게임 캐릭터 데이터
// 이름, 직업(전사,마법사,궁수,도적), 성별(남자,여자), HP, MP, STR, INT, DEX, LUX, 생일
// name, cls, sx, hp, mp, str, int, dex, lux, birthDate

// RPG게임 캐릭터 기능
// 출력 print~~()하는 기능, 목록출력은 <태그 class="charList"/>

// 추가 insert~~(), 수정 update~~(), 삭제 delete~~() 기능
// 공격기능 A.attackStr(B); A캐릭터 B캐릭터 STR을 이용하여 공격하면 B캐릭터는 HP가 감소한다.
// 마법공격 A.attackInt(B); A캐릭터 B캐릭터 INT을 이용하여 공격하면 B캐릭터는 HP가 감소한다. A캐릭터는 MP가 감소한다.
class RPGgame {

  #gameList = [
    { id: 1, name: "히어로", cls: "W", sx: "M", hp: 100, mp: 10, str: 5, int: 7, dex: 8, lux: 22, birthDate: "2024/01/07" },
    { id: 2, name: "모험가", cls: "A", sx: "F", hp: 100, mp: 10, str: 5, int: 4, dex: 8, lux: 22, birthDate: "1774/03/07" },
  ];


  #clsMap = { "전사": "W", "마법사": "M", "궁수": "A", "도적": "I" };
  #sxMap = { "남자": "M", "여자": "F" };

  PrintList() {
    $(".listDataBlock").empty();
    this.#gameList.forEach((item) => {
      let row = $(`<div class="listDataRow" style="border: 1px solid #ccc; margin-bottom: 10px; padding: 10px; cursor: pointer;"></div>`);
      row.append(this.inputItem(item));
      $(".listDataBlock").append(row);
    });
  }

  // 처음 보내주신 라벨+입력창 형식 유지
  inputItem(item) {
    const birthForInput = item.birthDate.replaceAll("/", "-");
    return `
      <input type="hidden" class="idclass" value="${item.id}" />
      <div class="inputItem">
        <div class="text-wrapper">${item.name}</div>
        <div class="div"><input type="text" class="inputText" value="${item.name}" readonly /></div>
      </div>
      <div class="inputItem">
        <div class="text-wrapper">${this.printcls(item.cls)}</div>
        <div class="div">
          <select class="selectCombo" disabled>
            <option value="W" ${item.cls === "W" ? "selected" : ""}>전사</option>
            <option value="M" ${item.cls === "M" ? "selected" : ""}>마법사</option>
            <option value="A" ${item.cls === "A" ? "selected" : ""}>궁수</option>
            <option value="I" ${item.cls === "I" ? "selected" : ""}>도적</option>
          </select>
        </div>
      </div>
      <div class="inputItem">
        <div class="text-wrapper">HP: ${item.hp}</div>
        <div class="div"><input type="number" class="inputNumber" value="${item.hp}" readonly /></div>
      </div>
      <div class="inputItem">
        <div class="text-wrapper">birthDate</div>
        <div class="div"><input type="date" class="inputText" value="${birthForInput}" readonly /></div>
      </div>`;
  }

  printcls(cls) {
    const dict = { "W": "전사", "M": "마법사", "A": "궁수", "I": "도적" };
    return dict[cls] || "-";
  }

  printsx(sx) {
    const dict = { "M": "남자", "F": "여자" };
    return dict[sx] || "-";
  }

  clearInputBox() {
    $("#id").val(0);
    $("#name").val("");
    $("#cls").val("전사");
    $("#sx").val("남자");
    $("#hp").val(0);
    $("#mp").val(0);
    $("#str").val(0);
    $("#int").val(0);
    $("#dex").val(0);
    $("#lux").val(0);
    $("#birthDate").val("");
  }

  setData2InputBox(game) {
    $("#id").val(game.id);
    $("#name").val(game.name);
    $("#cls").val(this.printcls(game.cls));
    $("#sx").val(this.printsx(game.sx));
    $("#hp").val(game.hp);
    $("#mp").val(game.mp);
    $("#str").val(game.str);
    $("#int").val(game.int);
    $("#dex").val(game.dex);
    $("#lux").val(game.lux);
    $("#birthDate").val(game.birthDate.replaceAll("/", "-"));
  }


  checkInputData(mode) {
    const id = $("#id").val() * 1;
    if (mode === "add" && id !== 0) {
      alert("ID값이 유효하지 않습니다. (추가 시에는 0이어야 함)");
      return false;
    }
    if ((mode === "update" || mode === "delete") && id === 0) {
      alert("캐릭터를 선택해주세요.");
      return false;
    }
    if ($("#name").val().length < 2) {
      alert("이름을 2자 이상 입력해주세요.");
      return false;
    }
    return true;
  }

  addGame() {
    if (!this.checkInputData("add")) return;

    let maxId = this.#gameList.reduce((result, item) => result < item.id ? item.id : result, 0) + 1;

    let newGame = {
      id: maxId,
      name: $("#name").val(),
      cls: this.#clsMap[$("#cls").val()],
      sx: this.#sxMap[$("#sx").val()],
      hp: $("#hp").val() * 1, // Number() 대신 * 1 (숫자 변환) Number() 은 똑같이 문자열을 숫자열로 바꿔서 수식을 사용할 수 있게 만들어줌
      mp: $("#mp").val() * 1,
      str: $("#str").val() * 1,
      int: $("#int").val() * 1,
      dex: $("#dex").val() * 1,
      lux: $("#lux").val() * 1,
      birthDate: $("#birthDate").val().replaceAll("-", "/"),
    };

    this.#gameList.push(newGame);
    this.PrintList();
    this.clearInputBox();
  }

  // 2. 수정 기능
  updateGame() {
    if (!this.checkInputData("update")) return;

    const id = $("#id").val() * 1;
    const index = this.#gameList.findIndex(v => v.id === id);

    if (index !== -1) {
      this.#gameList[index] = {
        id: id,
        name: $("#name").val(),
        cls: this.#clsMap[$("#cls").val()],
        sx: this.#sxMap[$("#sx").val()],
        hp: $("#hp").val() * 1,
        mp: $("#mp").val() * 1,
        str: $("#str").val() * 1,
        int: $("#int").val() * 1,
        dex: $("#dex").val() * 1,
        lux: $("#lux").val() * 1,
        birthDate: $("#birthDate").val().replaceAll("-", "/"),
      };
      this.PrintList();
      this.clearInputBox();
      alert("수정되었습니다.");
    }
  }

  // 3. 삭제 기능
  deleteGame() {
    if (!this.checkInputData("delete")) return;

    const id = $("#id").val() * 1;
    if (confirm("정말 삭제하시겠습니까?")) {
      this.#gameList = this.#gameList.filter(item => item.id !== id);
      this.PrintList();
      this.clearInputBox();
      alert("삭제되었습니다.");
    }
  }

  // 외부 보조 함수
  getGameById(id) {
    return this.#gameList.find(v => v.id === id);
  }
}

$(() => {
  const gameApp = new RPGgame();
  gameApp.PrintList();

  // 버튼 이벤트 연결
  $("#btnAdd").click(() => gameApp.addGame());
  $("#btnUpt").click(() => gameApp.updateGame()); // 수정 버튼
  $("#btnDel").click(() => gameApp.deleteGame()); // 삭제 버튼

  // 목록 클릭 시 위로 데이터 전송
  $(document).on("click", ".listDataRow", function () {
    const selectId = $(this).find(".idclass").val() * 1;
    const data = gameApp.getGameById(selectId);
    if (data) gameApp.setData2InputBox(data);
  });
});