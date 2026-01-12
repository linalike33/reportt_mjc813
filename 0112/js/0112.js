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
    {
      id: 1,
      name: "히어로",
      cls: "S",
      sx: "W",
      hp: 100,
      mp: 10,
      str: 5,
      int: 7,
      dex: 8,
      lux: 22,
      birthDate: "2224/01/07",
      imgUrl:
        "https://lwi.nexon.com/maplestory/guide/char_info/char_view/char45.jpg",
    },
    {
      id: 2,
      name: "모험가",
      cls: "A",
      sx: "U",
      hp: 100,
      mp: 10,
      str: 5,
      int: 4,
      dex: 8,
      lux: 22,
      birthDate: "1774/03/07",
      imgUrl:
        "https://lwi.nexon.com/maplestory/guide/char_info/char_view/char45.jpg",
    },
  ];
  PrintList() {
    $(".listDataBlock").empty();
    this.#gameList.forEach((item) => {
      $(".istDataBlock").append(this.inputItem(item));
    });
  }

  printcls(cls) {
    switch (cls) {
      case "W":
        return "전사";
     case "M":
        return "마법사";
    case "A":
        return "궁수";
    case "I":
        return "도적";
    }
    return "-";
  }
   printsx(sx){
    switch (sx){
        case "F":
            return "여자";
        case "M":
            return "남자";        
    }
     return "-";
   }
   inputItem(item){
    let html = ` <input type="hidden" id="id" value="${item.id}" />
          <div class="inputItem">
            <div class="text-wrapper">${item.name}</div>
            <div class="div">
              <input type="text" id="name" class="inputText" maxlength="30" />
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${this.printcls(item.cls)}</div>
            <div class="div">
              <select id="cls" class="selectCombo">
                <option value="전사">전사</option>
                <option value="마법사">마법사</option>
                <option value="궁수">궁수</option>
                <option value="도적">도적</option>
              </select>
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${this.printsx(item.sx)}</div>
            <div class="div">
              <select id="sx" class="selectCombo">
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${item.hp}</div>
            <div class="div">
              <input type="number" id="hp" class="inputNumber" min="0" />
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${item.mp}</div>
            <div class="div">
              <input type="number" id="mp" class="inputNumber" min="0" />
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${item.str}</div>
            <div class="div">
              <input type="number" id="str" class="inputNumber" min="0" />
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${item.int}</div>
            <div class="div">
              <input type="number" id="int" class="inputNumber" min="0" />
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${item.dex}</div>
            <div class="div">
              <input type="number" id="dex" class="inputNumber" min="0" />
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${item.lux}</div>
            <div class="div">
              <input type="number" id="lux" class="inputNumber" min="0" />
            </div>
          </div>
          <div class="inputItem">
            <div class="text-wrapper">${item.birthDate}</div>
            <div class="div">
              <input type="date" id="birthDate" class="inputText" />
            </div>
          </div>`
            return html;
       
   }
   


}
