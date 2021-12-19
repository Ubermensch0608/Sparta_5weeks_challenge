$(".select-search-btn").click(function () {
  $(".result").show();
});
// 키워드 버튼 함수
$("#number .select-btn").click(function () {
  $("#number .select-btn").not(this).removeClass("btn-clicked");
  $(this).toggleClass("btn-clicked");
});
$("#situation .select-btn").click(function () {
  $("#situation .select-btn").not(this).removeClass("btn-clicked");
  $(this).toggleClass("btn-clicked");
});
$("#genre .select-btn").click(function () {
  $("#genre .select-btn").not(this).removeClass("btn-clicked");
  $(this).toggleClass("btn-clicked");
});

// 찾아주세요! 버튼 눌렀을 때 동적으로 데이터 가져오는 함수
function gameFinder() {
  $("#cardHolder").empty();
  $.ajax({
    type: "GET",
    url: "http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99",
    data: {},
    success: function (response) {
      const row = response["RealtimeCityAir"]["row"];
      for (let i = 0; i < row.length; i++) {
        // 검색결과 개수 표시
        const newRoot = document.querySelector("b");
        const resultCheck = document.querySelectorAll("#newCard");
        let gu_name = row[i]["MSRSTE_NM"];
        let gu_mise = row[i]["IDEX_MVL"];
        let temp_html = ``;
        if (gu_mise > 55) {
          temp_html = `
          <div class="cards" id="newCard">
          <div class="col">
            <div class="card h-100">
              <img src="./images/루미큐브.jfif" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="game-title">${gu_name}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${gu_mise}</li>
                <li class="list-group-item">권장 인원수</li>
                <li class="list-group-item">플레이 시간</li>
              </ul>
            </div>
          </div>
        </div>
      `;
        } else {
          console.log("죄송합니다. 해당 정보가 없습니다.");
        }
        $("#cardHolder").append(temp_html);
        newRoot.innerHTML = resultCheck.length + "개";
      }
    },
  });
}
