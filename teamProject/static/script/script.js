// 게임 이름 검색 버튼 누를 시 나타나는 검색 결과 구역  - 은경
$(".text-search-btn").click(function () {
    $(".text-result-section").show();
});

// 우측 네비게이션 리모콘 가이드 함수 - 은경
$("#menu > li > a:nth-child(2)").mouseenter(function () {
    $(this).siblings().removeClass('hide-nav');

});
$("#menu > li a:nth-child(2)").mouseleave(function () {
    $(this).siblings().addClass('hide-nav');
});

// 키워드 페이지 버튼 함수 - 종원
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

// 키워드 검색용 배열 - 은경
var keywords = [
    2, 3, 4, 5, 6, 7,
    '친구와 함께', '연인과 함께', '가족과 함께', '아이스브레이킹',
    '추리', '카드', '전략', '가족', '역동적'
];

//인원 수 검색에서 range를 array로 만드는 함수 - 은경
function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

let cards_arr = [];

// 키워드 검색 버튼 함수 - 은경 / 종원
function gameKeywordFinder() {
    cards_arr = [];
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
                let rb_img = games[i]['S3_img']
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
                    let temp_arr = {
                        key: j, title: title, play_time: play_time.slice(0, -1), t_html: temp_html
                    }
                    cards_arr.push(temp_arr);
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
                    $(".result").show();
                    $(".section-array").hide();
                }
            }
        },
    });
}

// 카드 정렬 - 은경
$('#title_arr').click(function () { //제목 ㄱㄴㄷ순 정렬
    $("#cardHolder2").empty();
    var result;
    result = cards_arr.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
    });

    for (let i = 0; i < result.length; i++) {
        $("#cardHolder2").append(result[i].t_html);
    }
});
$('#time_arr').click(function () { //플탐순 정렬
    $("#cardHolder2").empty();
    var result;
    result = cards_arr.sort(function (a, b) {
        return a.play_time - b.play_time //작은 순 정렬
    });

    for (let i = 0; i < result.length; i++) {
        $("#cardHolder2").append(result[i].t_html);
    }
});

//찾아주세요! 버튼 함수 (아무것도 누르지 않았을때 alert, 결과페이지에 누른 버튼 삽입) - 은경
function btn_next() {
    $(".selected-items").empty();
    $('#cardHolder2').css('display', 'grid')
    var k_str = "";
    active_elements = document.getElementsByClassName('btn-clicked');

    k_str = "";
    for (var i = 0; i < active_elements.length; i++) {
        if (k_str == "")
            k_str = active_elements[i].innerHTML;
        else
            k_str = k_str + "," + active_elements[i].innerHTML;
    }

    if (k_str == "") {
        alert('1개 이상의 키워드를 선택해 주세요!')
    } else {
        gameKeywordFinder();
    }
}

// 메인 페이지 텍스트 검색 함수 - 은경
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
                let title = games[i]['title'];
                let rb_img = games[i]['S3_img']
                let temp_html = ``;
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

// 자동완성 배열 만들기 - 은경
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

// 자동완성 함수 - 은경
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


// 메인페이지 랜덤 추천 - 은경
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
            let ran = selectIndex(games.length - 1, 4)
            for (let i = 0; i < 4; i++) {
                let title = games[ran[i]]['title'];
                let num_person = games[ran[i]]['num_person'];
                let play_time = games[ran[i]]['play_time'];
                let img = games[ran[i]]['img'];
                let rb_img = games[ran[i]]['S3_img'];
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


// dark mode - 종원
let isBright = true;
const darkModeBtn = document.querySelector(".dark-mode-btn");
$("button.dark-mode-btn").click(function () {
    if (isBright === true) {
        isBright = false;
        darkModeBtn.innerHTML = "bright";
        $("body").css("background-color", "#282828");
        $("body").css("color", "#fff");
        $(".logo h1:first-child").css("color", "seashell");
        $("h5.game-title").css("color", "#000");
        $(".dark-mode-btn").css("background-color", "seashell");
        $(".dark-mode-btn").css("color", "#000");
        $('.modal_content').css('color', '#000');
        $('.game-title').css("color", "#fff");
        $('.member').css("color", "#000");
        $('#section-4').css("background-color", "seagreen");
        $('#autoMaker').css("color", "#000");

    } else {
        isBright = true;
        darkModeBtn.innerHTML = "dark";
        $("body").removeAttr("style");
        $(".logo h1:first-child").removeAttr("style");
        $("#search h5").removeAttr("style");
        $(".dark-mode-btn").removeAttr("style");
        $(".dark-mode-btn").removeAttr("style");
        $('.game-title').css("color", "#000");
        $('#section-4').css("background-color", "mediumseagreen");
    }
});


let newCommentInfo = {title: '', id: '', comment: ''}
// 모달창 생성 - 종원
$(document).on('click', ".card", function (event) {
    $(".modal_content").empty();
    let target_path_1 = $(this)[0]
    let target_path_2 = target_path_1.querySelector('.game-title').innerText
    let target_path_3 = target_path_1.querySelector('img').attributes[0].value
    let temp_comments
    $.ajax({
        type: "GET",
        url: "/comment",
        data: {},
        success: function (response) {
            let comment_data = response['comment_data']
            for (let i = 0; i < comment_data.length; i++) {
                let gameComments = comment_data[i]['COMMENT']
                let gameTitle = comment_data[i]['title']
                if (target_path_2 === gameTitle) {
                    let temp_comment = gameComments.map((data) => {
                            return `<li><span>${data.ID}</span><span>${data.comment}</span></li>`
                        }
                    )
                    temp_comments = temp_comment.toString().replaceAll(",", "")
                }


            }


        }
    })

    $.ajax({
            type: "GET",
            url: "/search",
            data: {},
            success: function (response) {
                let games = response['all_games']
                for (let i = 0; i < games.length; i++) {
                    let rb_img = games[i]['S3_img']
                    let rb_category = games[i]['category']
                    let rb_desc = games[i]['desc']
                    let rb_person = games[i]['num_person']
                    let rb_playtime = games[i]['play_time']
                    let rb_title = games[i]['title']
                    let rb_when = games[i]['when']
                    let rb_yt_link = games[i]['youtube_link']
                    let rb_level = games[i]['level']
                    let KEY = rb_title.replace(" ", "")
                    let likes_num = games[i]['recommend'].length
                    let like = games[i]['recommend']
                    let n;
                    let like_svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>`;
                    for (n = 0; n < like.length; n++) {
                        if (like[n] == login_info.id) {
                            like_svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>`
                        }
                    }
                    if (target_path_2 === rb_title) {
                        newCommentInfo.title = rb_title
                        newCommentInfo.id = login_info.id

                        let desc_1 = rb_desc.substr(0, 26)
                        let desc_2 = rb_desc.substr(26)


                        let temp_html = `
    
                                          <div class="content-inner" >
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
                                                    <span class="content-rule">
                                                      <b>난이도</b> ${rb_level}
                                                    </span>
                                                    <span class="content-rule">
                                                      <b>인원</b> ${rb_person}
                                                    </span>
                                                    <span class="content-rule">
                                                      <b>게임시간</b> ${rb_playtime}
                                                    </span>
                                                  </div>
                                                  <div class="info-content">
                                                    <div class="info-content__detail">
                                                      <p>${desc_1}${desc_2} 
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div class="info-content">
                                                    <b>게임 소개 영상</b>
                                                    <a href="${rb_yt_link}" target="_blank" class="content_url"><svg xmlns="http://www.w3.org/2000/svg" fill="tomato" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
                                                  </div>
                                                </div>
                                              </div>
                                              <form class="content-bottom" id=${KEY} >
                                                <div class="content-interaction">
                                                    <div class="interaction-button">
                                                    <button type="button" class="recommend-btn" id=${KEY}>
                                                        ${like_svg}
                                                        <b class="recommend-number">${likes_num}</b>
                                                    </button>
                                                    <button type="button">댓글</button>
                                                    </div>
                                                    <ul class="interaction-comment" id="${KEY}">
                                                         ${temp_comments}
                                                    </ul>
                                                    <div class="interaction-input"><input class="interaction-input__comment" type="text" placeholder="댓글 달기..." /><button type="submit">게시</button></div>
                                                </div>      
                                              </form>
                                          </div>
                                        
                                        `;
                        $(".modal_content").append(temp_html);


                        $(".content-bottom").submit(function (event) {
                                event.preventDefault()
                                const newComment = event.target[2]
                                newCommentInfo.comment = newComment.value
                                console.log(newCommentInfo.title, newCommentInfo.id, newCommentInfo.comment)
                                if (newCommentInfo.id === null) {
                                    alert('로그인을 먼저 해주세요')
                                    return
                                }

                                $.ajax({
                                    type: "POST",
                                    url: "/comment",
                                    data: {
                                        game_title_give: newCommentInfo.title,
                                        ID_give: newCommentInfo.id,
                                        comment_give: newCommentInfo.comment,
                                    },
                                    success: function (response) {
                                    }
                                })

                                if (target_path_2 === newCommentInfo.title) {
                                    let temp_html = `<li><span>${login_info.id}</span><span>${newComment.value}</span></li>`

                                    if (newComment.value.trim().length > 0) {
                                        $(".interaction-comment").append(temp_html)
                                    }
                                    newComment.value = ""
                                }
                            }
                        )


                    } else if (target_path_3 == 'undefined') {
                        $('.modal').fadeOut()
                    }

                }


            }
        }
    )
    $('.modal').fadeIn()
})
$(document).on('click', ".content-top__close", function (event) {
    $('.modal').fadeOut()
})


//좋아요 함수
let isRecommend = 'false';
$(document).on('click', '.recommend-btn', function (event) {
    let target_game = $(this).attr('id')
    let cur_likes = document.querySelector("b.recommend-number").innerText
    if (login_info.id == null) {
        alert('로그인을 먼저 해주세요')
        makeLogin()
    } else {
        $.ajax({
            type: "GET",
            url: "/search",
            data: {},
            success: function (response) {
                let games = response['all_games'];
                for (let i = 0; i < games.length; i++) {
                    if (target_game == games[i]['title'].replace(" ", "")) {
                        let like = games[i]['recommend']
                        let title = games[i]['title']
                        let n;
                        for (n = 0; n < like.length; n++) {
                            if (like[n] == login_info.id) {
                                isRecommend = 'true'
                                $.ajax({
                                    type: "POST",
                                    url: "/like",
                                    data: {id_give: login_info.id, game_give: title, recommend_give: isRecommend},
                                    success: function (response) {
                                        alert(response["msg"]);
                                    }
                                })
                                cur_likes = parseInt(cur_likes) - 1;
                                document.querySelector("button.recommend-btn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>
                                                                                                        <b class="recommend-number">${cur_likes}</b>`
                                isRecommend = 'false'
                                return;

                            }
                        }
                        if (n == like.length) {
                            $.ajax({
                                type: "POST",
                                url: "/like",
                                data: {id_give: login_info.id, game_give: title, recommend_give: isRecommend},
                                success: function (response) {
                                    alert(response["msg"]);
                                }
                            })
                            cur_likes = parseInt(cur_likes) + 1;
                            document.querySelector("button.recommend-btn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" height="20" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
                                                                                                 <b class="recommend-number">${cur_likes}</b>`
                            isRecommend = 'true'
                        }
                        return;
                    }
                }
            }
        })
    }
})


$("button.dark-mode-btn").click(function () {
    $.ajax({
        type: "POST",
        url: "/search",
        data: {},
        success: function (response) {
            let games = response['all_games'][1]['title']
        }
    })
})

let isRecommended = false

$(document).on('click', '.recommend-btn', function (event) {
    // if (event.target.id === $('.content-top__title')[0].innerText.trim()) {
    let currentRecommend = parseInt($('.recommend-number')[0].innerText, 10)

    if (isRecommended === false) {
        isRecommended = true
        currentRecommend = currentRecommend + 1
    } else if (isRecommended === true) {
        isRecommended = false
        currentRecommend = currentRecommend - 1
    }
    $('.recommend-number')[0].innerText = currentRecommend
    // }

})


$("button.dark-mode-btn").click(function () {
    $.ajax({
        type: "POST",
        url: "/search",
        data: {},
        success: function (response) {
            let games = response['all_games'][1]['title']
        }
    })
})

// 메인페이지 로그인 버튼 기능
let login_info = {isLogin: false, id: null}

function isLogin() {
    if (login_info.isLogin === false) {
        makeLogin();
        $(".modal_content").css("padding-right", "0");
        $(".modal_content").css("padding", "40px");
        $(".modal").fadeIn();
    } else {
        login_info = {isLogin: false, id: null};
        $(".login__btn").text('login');
        $(".login__btn").css("background-color", "mediumseagreen");
        $("#main-body > div.recommend-box > h2").text("지금, 이 보드게임 어때요?");
        localStorage.removeItem('isLogin')
        alert("로그아웃 되었습니다")
    }
}

function makeLogin() {
    $(".modal_content").empty();
    let temp_html = `<div class="login__top">
                        <span class='content-top__close'><img src="../static/images/close-btn.png"></span>
                     </div>
                     <div class="login__form">
                        <h4>환영합니다!</h4>
                        <div>
                            <label for="loginId">ID</label>
                            <input type="email" id="loginId" name="loginId" placeholder="아이디">
                            <br>
                            <label for="loginPwd">PASSWORD</label>
                            <input type="password" id="loginPwd" name="password" placeholder="비밀번호">
                        </div>
                        <span class="login__hint"></span>
                        <button type="submit" onclick="isLoginValid()" >LOG IN</button>
                        <br>
                        <span>계정이 없으신가요? <a href="#" class="join">가입하기</a></span>
                    </div>`
    $(".modal_content").append(temp_html);
}

$(document).on('click', ".longin__func", function (event) {
    isLogin();
});

$(document).on('click', ".join", function (event) {
    $(".modal_content").empty();
    let temp_html = `<div class="join__top">
                        <span class='content-top__close'><img src="../static/images/close-btn.png"></span>
                     </div>
                     <div class="join__form">
                        <h4>회원가입</h4>
                        <div>
                            <label for="joinId">ID</label>
                            <input type="email" id="joinId" name="joinId" placeholder="아이디 (영문 2글자 이상)">
                            <br>
                            <label for="loginPwd">PASSWORD</label>
                            <input type="password" id="joinPwd" name="password" placeholder="비밀번호">
                        </div>
                        <span class="join__hint"></span>
                        <button type="submit" onclick="isJoinValid()">Creat Account</button>
                        <br>
                        <br>
                        <span>아이디가 있으신가요? <a href="#" class="longin__func">로그인하기</a></span>
                    </div>`
    $(".modal_content").append(temp_html);
})


// 회원가입 기능
let member_list = [
    {id: 'id', pwd: 'password'}
]

function isJoinValid() {
    let id = $('#joinId').val()
    let pwd = $('#joinPwd').val()
    if (!id || !pwd) {
        $(".join__hint").text("아이디, 비밀번호를 입력해주세요.");
        return;
    } else {
        let expression = RegExp(/[^a-zA-Z]/);
        if (expression.test($("#joinId").val()) || id.length < 2) {
            $(".join__hint").text("아이디를 영문 2글자 이상으로 만들어주세요.");
        } else {
            $.ajax({
                type: "GET",
                url: "/member",
                data: {},
                success: function (response) {
                    let members = response['all_members']
                    let i;
                    for (i = 0; i < members.length; i++) {
                        if (members[i]['id'] == id) {
                            $(".join__hint").text("이미 존재하는 아이디입니다.");
                            return;
                        }
                    }
                    if (i == members.length) {
                        makeMember();
                    }
                }
            })

        }
    }

}

function makeMember() {
    $(".join__hint").text("");
    let id = $('#joinId').val()
    let pwd = $('#joinPwd').val()
    $.ajax({
        type: "POST",
        url: "/member",
        data: {id_give: id, pwd_give: pwd},
        success: function (response) {
            alert(response["msg"]);
            makeLogin();
        }
    })
}

// 로그인 기능
function isLoginValid() {
    let id = $('#loginId').val()
    let pwd = $('#loginPwd').val()
    if (!id || !pwd) {
        $(".login__hint").text("아이디, 비밀번호를 입력해주세요.");
        return;
    } else {
        $.ajax({
            type: "GET",
            url: "/member",
            data: {},
            success: function (response) {
                let members = response['all_members']
                let i;
                for (i = 0; i < members.length; i++) {
                    if (members[i]['id'] == id) {
                        if ((members[i]['pwd'] == pwd)) {
                            login_info = {isLogin: true, id: id};
                            $(".login__btn").css("background-color", "seagreen");
                            $(".login__btn").text('logout');
                            $("#main-body > div.recommend-box > h2").text(login_info["id"] + "님! 지금, 이 보드게임 어때요?");
                            alert('로그인 완료!');
                            $(".modal").hide();
                            localStorage.setItem("isLogin", id)
                            return;
                        } else {
                            $(".login__hint").text("비밀번호가 틀렸습니다.");
                            return;
                        }
                    }
                }
                if (i == members.length) {
                    $(".login__hint").text("회원 정보가 없습니다.");
                }
            }
        })
    }
}

const storedInfo = localStorage.getItem('isLogin')
login_info.id = storedInfo

if (storedInfo === login_info.id) {
    login_info.id = storedInfo
    if (login_info.id !== null) {
        login_info.isLogin = true
        console.log(login_info)
        $(".login__btn").css("background-color", "seagreen");
        $(".login__btn").text('logout');
        $("#main-body > div.recommend-box > h2").text(login_info["id"] + "님! 지금, 이 보드게임 어때요?");
        console.log($('#cmtDelete'))
    } else {

    }

}


