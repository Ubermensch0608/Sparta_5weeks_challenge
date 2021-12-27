// 게임 이름 검색 버튼 누를 시 나타나는 검색 결과 구역
$(".text-search-btn").click(function () {
    $(".text-result-section").show();
});

// 우측 네비게이션 리모콘 가이드 함수
$("#menu > li > a:nth-child(2)").mouseenter(function () {
    $(this).siblings().removeClass('hide-nav');

});
$("#menu > li a:nth-child(2)").mouseleave(function () {
    $(this).siblings().addClass('hide-nav');
});

// 키워드 페이지 버튼 함수
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
// 키워드 검색용 배열
var keywords = [
    2, 3, 4, 5, 6, 7,
    '친구와 함께', '연인과 함께', '가족과 함께', '아이스브레이킹',
    '추리', '카드', '전략', '가족', '역동적'
];

//인원 수 검색에서 range를 array로 만드는 함수
function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

// 키워드 검색 버튼 함수
function gameKeywordFinder() {

    const clicked_keys = [];
    $('.btn-clicked').each(function () { //사용자가 클릭한 버튼의 id값 가져오기
        clicked_keys.push($(this).attr('id'));
    });
    $("#cardHolder2").empty();

    $.ajax({
        type: "GET",
        url: "/search",
        data: {},
        success: function (response) {
                    let games = response['all_games'];
            for (let i = 0; i < games.length; i++) {
                let title = games[i]['title'];
                let num_person = games[i]['num_person'];
                let start = Number(num_person.charAt(0));
                let end = Number(num_person.charAt(num_person.length - 1));
                let person_arr = range(start, end);
                let play_time = games[i]['play_time'];
                let img = games[i]['img'];
                let category = games[i]['category'];
                let when = games[i]['when'];
                let rb_img = games[i]['RB_img']
                let temp_html = ``;
                let j, cnt = 0;
                for (j = 0; j < clicked_keys.length; j++) {
                    let key = clicked_keys[j]
                    if (key <= 6) {
                        for (let n = 0; n < person_arr.length; n++) {
                            if (keywords[key - 1] === person_arr[n]) {
                                cnt++;
                            }
                        }
                    } else if (key <= 10) {
                        if (keywords[key - 1] === when) {
                            cnt++;
                        }
                    } else {
                        if (keywords[key - 1] === category) {
                            cnt++;
                        }
                    }
                }
                if (cnt === clicked_keys.length && title !== undefined) {
                    temp_html = `<div class="card keyword-result" id="newCard">
                                    <div class="card-body">
                                      <div class="card-top"> 
                                         <img src="${rb_img}" class="card-img-top" alt="...">
                                       </div>
                                       
                                       <div class="card-bottom"> 
                                          <h5 class="game-title">${title}</h5>
                                       </div>
                                    </div>
                                  </div>`;
                    $("#cardHolder2").append(temp_html);
                }
                const newRoot = document.querySelector("#result");
                const resultCheck = document.querySelectorAll("#newCard");
                if (resultCheck.length != 0) {
                    newRoot.innerHTML = `<h4>선택하신 다음 기준</h4>
                                         <div class="selected-items"></div>
                                         <h4>해당하는 보드게임 <b>${resultCheck.length}개</b>를 찾았어요!</h4>`;
                    let temp_html2 = ``;
                    for (let k = 0; k < active_elements.length; k++) {
                        temp_html2 += `<a class="select-btn btn-selected">${active_elements[k].innerHTML}</a>`;
                    }
                    $(".selected-items").append(temp_html2);
                    $(".result").show();
                    $(".section-array").show();
                } else {
                    newRoot.innerHTML = `<div class="not-found"><h4>선택하신 기준에 해당하는 게임이 없어요 :(</h4>
                                         <h4>다른 키워드로 검색해보세요!</h4>
                                         <a href="#section-2" id="re-search">다시 검색</a></div>`
                    $(".section-array").hide();
                }
            }
        },
    });
}

// 카드 정렬
let cards_arr = [];

function keywordSort() {
    const clicked_keys = [];
    $('.btn-clicked').each(function () { //사용자가 클릭한 버튼의 id값 가져오기
        clicked_keys.push($(this).attr('id'));
    });

    $("#cardHolder2").empty();
    $.ajax({
        type: "GET",
        url: "/search",
        data: {},
        success: function (response) {
            let games = response['all_games'];
            for (let i = 0; i < games.length; i++) {
                let title = games[i]['title'];
                let num_person = games[i]['num_person'];
                let start = Number(num_person.charAt(0));
                let end = Number(num_person.charAt(num_person.length - 1));

                let person_arr = range(start, end);
                let play_time = games[i]['play_time'];
                let img = games[i]['img'];
                let category = games[i]['category'];
                let when = games[i]['when'];
                let rb_img = games[i]['RB_img'];

                let temp_html = ``;
                let j, cnt = 0;
                for (j = 0; j < clicked_keys.length; j++) {
                    let key = clicked_keys[j]
                    if (key <= 6) {
                        for (let n = 0; n < person_arr.length; n++) {
                            if (keywords[key - 1] === person_arr[n]) {
                                cnt++;
                            }
                        }
                    } else if (key <= 10) {
                        if (keywords[key - 1] === when) {
                            cnt++;
                        }
                    } else {
                        if (keywords[key - 1] === category) {
                            cnt++;
                        }
                    }
                }
                if (cnt === clicked_keys.length && title !== undefined) {
                    temp_html = `<div class="card keyword-result" id="newCard">
                                    <div class="card-body">
                                      <div class="card-top"> 
                                         <img src="${rb_img}" class="card-img-top" alt="...">
                                       </div>
                                       
                                       <div class="card-bottom"> 
                                          <h5 class="game-title">${title}</h5>
                                       </div>
                                    </div>
                                  </div>`;
                    let temp_arr = {key: j, title: title, play_time: play_time.slice(0, -1), t_html: temp_html}
                    cards_arr.push(temp_arr);
                }
            }
        },
    });
}

$('#title_arr').click(function () { //제목 ㄱㄴㄷ순 정렬
    keywordSort();
    var result;
    result = cards_arr.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
    });
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        $("#cardHolder2").append(result[i].t_html);
    }
    cards_arr = [];
});
$('#time_arr').click(function () { //플탐순 정렬
    keywordSort();
    var result;
    result = cards_arr.sort(function (a, b) {
        return a.play_time - b.play_time //작은 순 정렬
    });
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        $("#cardHolder2").append(result[i].t_html);
    }
    cards_arr = [];
});

//찾아주세요! 버튼 함수 (아무것도 누르지 않았을때, 결과페이지에 누른 버튼 삽입)
//찾아주세요! 버튼 함수 (아무것도 누르지 않았을때 alert, 결과페이지에 누른 버튼 삽입)
function btn_next() {
    $(".selected-items").empty();
    $('#cardHolder2').css('display','grid')
    var k_str = "";
    active_elements = document.getElementsByClassName('btn-clicked');
    console.log(active_elements);
    k_str = "";
    for (var i = 0; i < active_elements.length; i++) {
        if (k_str == "")
            k_str = active_elements[i].innerHTML;
        else
            k_str = k_str + "," + active_elements[i].innerHTML;
    }
    console.log(k_str);
    if (k_str == "") {
        alert('1개 이상의 키워드를 선택해 주세요!')
    } else {
        gameKeywordFinder();
    }
}

// 메인 페이지 텍스트 검색 함수
function gameTextFinder() {
    $('#autoMaker').hide();
    let newValue = document.querySelector(".search-input").value;
    let value_cnt = 0;

    $("#cardHolder1").empty();
    $.ajax({
        type: "GET",
        url: "/search",
        data: {},
        success: function (response) {
            let games = response['all_games'];
            for (let i = 0; i < games.length; i++) {
                let num_person = games[i]['num_person'];
                let play_time = games[i]['play_time'];
                let img = games[i]['img'];
                let category = games[i]['category'];
                let when = games[i]['when'];
                let title = games[i]['title'];
                let rb_img = games[i]['RB_img']
                let temp_html = ``;

                const searchBtn = $("input.search-input");
                let title_length = title.length;
                let text_length = newValue.length;
                if (text_length <= title_length && text_length != 0) {
                    if (newValue.substr(0, text_length) === title.substr(0, text_length)) {
                        value_cnt++;
                        temp_html = `<div class="card text-result">
                                    <div class="card-body">
                                      <div class="card-top"> 
                                         <img src="${rb_img}" class="card-img-top" alt="...">
                                       </div>
                                       
                                       <div class="card-bottom"> 
                                          <h5 class="game-title">${title}</h5>
                                       </div>
                                    </div>
                                  </div>`;
                    }
                }
                $("#cardHolder1").append(temp_html);
                let root = document.querySelector("b");
                root.innerHTML = `${newValue}`;
                root = document.querySelector("i");
                root.innerHTML = `${value_cnt}`;
            }
        },
    });
}

// 자동완성 배열 만들기
var ref = [];

$.ajax({
    type: "GET",
    url: "/search",
    data: {},
    success: function (response) {
        let games = response['all_games'];
        for (let i = 0; i < games.length; i++) {
            var temp_arr = {key: i, name: games[i]['title']};
            ref.push(temp_arr);
        }
    },
});

// 자동완성 함수
var isComplete = false;  //autoMaker 자식이 선택 되었는지 여부
$('.search-input').keyup(function () {
    var txt = $(this).val();
    if (txt != '') {  //빈줄이 들어오면
        $('#autoMaker').children().remove();
        $('#autoMaker').hide();
        ref.forEach(function (arg) {
            if (arg.name.indexOf(txt) > -1) {
                $('#autoMaker').append(
                    $('<div class="hint">').text(arg.name).attr({'key': arg.key})
                );
                $("#autoMaker").show();
            }
        });
        $('#autoMaker').children().each(function () {
            $(this).click(function () {
                $('.search-input').val($(this).text());
                $('#insert_target').val("key : " + $(this).attr('key') + ", data : " + $(this).text());
                isComplete = true;
            });
        });
    } else {
        $('#autoMaker').children().remove();
        $("#autoMaker").hide();
    }
});
$('.search-input').keydown(function (event) {
    if (isComplete) {  //autoMaker 자식이 선택 되었으면 초기화
        $('#insert_target').val('')
        $("#autoMaker").hide();
    }
})


// 메인페이지 랜덤 추천
const selectIndex = (totalIndex, selectingNumber) => {
    let randomIndexArray = []
    for (let i = 0; i < selectingNumber; i++) {   //check if there is any duplicate index
        let randomNum = Math.floor(Math.random() * totalIndex);
        if (randomIndexArray.indexOf(randomNum) === -1) {
            randomIndexArray.push(randomNum);
        } else { //if the randomNum is already in the array retry
            i--;
        }
    }
    return randomIndexArray;
}
window.onload = function () {
    $.ajax({
        type: "GET",
        url: "/search",
        data: {},
        success: function (response) {
            let games = response['all_games'];
            let ran = selectIndex(games.length - 1, 5)
            for (let i = 0; i < 5; i++) {
                let title = games[ran[i]]['title'];
                let num_person = games[ran[i]]['num_person'];
                let play_time = games[ran[i]]['play_time'];
                let img = games[ran[i]]['img'];
                let rb_img = games[ran[i]]['RB_img'];
                let category = games[ran[i]]['category'];
                let when = games[ran[i]]['when'];
                let temp_html = `<div class="card">
                                    <div class="card-body">
                                      <div class="card-top"> 
                                         <img src="${rb_img}" class="card-img-top" alt="...">
                                       </div>
                                       
                                       <div class="card-bottom"> 
                                          <h5 class="game-title">${title}</h5>
                                       </div>
                                    </div>
                                  </div>
                                 `;
                let root = document.querySelector("#recommend");
                root.innerHTML += temp_html;
            }
        }
    },)
}

// dark mode
let isBright = true;
const darkModeBtn = document.querySelector(".dark-mode-btn");
$("button.dark-mode-btn").click(function () {
    if (isBright === true) {
        isBright = false;
        darkModeBtn.innerHTML = "bright";
        $("body").css("background-color", "var(--main-dark-color)");
        $("body").css("color", "#fff");
        $(".logo h2:first-child").css("color", "seashell");
        $("h5.game-title").css("color", "#000");
        $(".dark-mode-btn").css("background-color", "seashell");
        $(".dark-mode-btn").css("color", "#000");
        $('.modal_content').css('color', '#000');
    } else {
        isBright = true;
        darkModeBtn.innerHTML = "dark";
        $("body").removeAttr("style");
        $(".logo h2:first-child").removeAttr("style");
        $("#search h5").removeAttr("style");
        $(".dark-mode-btn").removeAttr("style");
        $(".dark-mode-btn").removeAttr("style");
    }
});

// 모달창 생성
$(document).on('click', ".card", function (event) {
    $(".modal_content").empty();
    let target_path_1 = $(this)[0]
    let target_path_2 = target_path_1.querySelector('.game-title').innerText
    let target_path_3 = target_path_1.querySelector('img').attributes[0].value

    $.ajax({
        type: "GET",
        url: "/search",
        data: {},
        success: function (response) {
            let games = response['all_games']
            console.log(games)
            for (let i = 0; i < games.length; i++) {
                let rb_img = games[i]['RB_img']
                let rb_category = games[i]['category']
                let rb_desc = games[i]['desc']
                let rb_person = games[i]['num_person']
                let rb_playtime = games[i]['play_time']
                let rb_title = games[i]['title']
                let rb_when = games[i]['when']
                let rb_yt_link = games[i]['youtube_link']
                let rb_yt_title = games[i]['youtube_titlle']


                if (target_path_2 === rb_title) {
                    let desc_1 = rb_desc.substr(0, 26)
                    let desc_2 = rb_desc.substr(26)
                    let yt_title_1 = rb_yt_title.substr(0, 26)
                    let yt_title_2 = rb_yt_title.substr(26)

                    let temp_html = `
      <div id="wrapper" class="content-box">
        <div class="content-inner">
            <div class="content-left">
              <div class="content-left__img"><img src="${rb_img}"></div>
            </div>
    
            <div class="content-right">
              <div class="content-info">
                <div class="info-top">
                  <span class='content-top__close'><img src="../static/images/close-btn.png"></span>
                </div>
                <div class ="info-content">
                  <span class="content-top__title">${rb_title}</span>
                </div>
                <div class="info-content">
                  <div class="info-content__detail">
                    <p>${desc_1}<br>${desc_2} 
                    </p>
                  </div>
                </div>
                <div class="info-content">
                  <span class="content-rule">
                    <b>난이도</b> Normal
                  </span>
                  <span class="content-rule">
                    <b>인원</b> ${rb_person}
                  </span>
                  <span class="content-rule">
                    <b>게임시간</b> ${rb_playtime}
                  </span>
                </div>
                <div class="info-content">
                  <a href="${rb_yt_link}" target="_blank" class="content_url"><b>게임영상</b>: ${yt_title_1}<br>${yt_title_2}</a>
                </div>
              </div>
            </div>
        </div>
      </div>
      `;
                    $(".modal_content").append(temp_html);
                } else if (target_path_3 == 'undefined') {
                    $('.modal').fadeOut()
                }

            }

        }
    })
    $('.modal').fadeIn()
})
$(document).on('click', ".content-top__close", function (event) {
    $('.modal').fadeOut()
})

// 전체 게임 보여주기
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/search",
        data: {},
        success: function (response) {
            let all_games = response['all_games']
            for (let i = 0; i < all_games.length; i++) {
                let title = all_games[i]['title'];
                let rb_img = all_games[i]['RB_img']
                let temp_html = `
                <div class="card all-games">
                                    <div class="card-body">
                                      <div class="card-top"> 
                                         <img src="${rb_img}" class="card-img-top" alt="...">
                                       </div>
                                       
                                       <div class="card-bottom"> 
                                          <h5 class="game-title">${title}</h5>
                                       </div>
                                    </div>
                                  </div>
                `
                if (i < 10) {
                    $('#cardHolder3').append(temp_html)
                } else if (i >= 10) {
                    $('#cardHolder3-hide').append(temp_html)
                }
            }
        }
    })
})

$(document).on('click', ".show-all", function (event) {
    let innerText = $('.show-all')[0].innerText
    if (innerText === '모든 게임 보기') {
        $('.show-all')[0].innerText = '접어두기'
        $('#cardHolder3-hide').show()
        $('#cardHolder3-hide').css('display', 'grid')
    } else if (innerText === '접어두기') {
        $('.show-all')[0].innerText = '모든 게임 보기'
        $('#cardHolder3-hide').hide()
    }

})