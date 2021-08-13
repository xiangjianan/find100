// 动画
jQuery.extend(jQuery.easing, {
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
});

// 初始化
function init_html(mode) {
    // 初始化html
    $('.container.game').html('')
    $('.win').text('');
    $('.find_num').text(0);
    let div_num_1 = `<div class="col-md-1 offset-md-1">
        <div class="num"></div>
    </div>`
    let div_num = `<div class="col-md-1">
        <div class="num" id=""></div>
    </div>`
    let div_container = '';
    let div_row = '<div class="row">';
    for (let i = 1; i <= 10; i++) {
        if (i == 1) {
            div_row += div_num_1;
        } else {
            div_row += div_num;
        }
    }
    div_row += '</div>';

    for (let i = 1; i <= 10; i++) {
        div_container += div_row;
    }
    $('.container.game').html(div_container);
    // 初始化随机数字
    let allNum = [];
    for (let i = 1; i <= 100; i++) {
        allNum.push(i);
    }
    $('.num').each(
        function () {
            let index = Math.floor((Math.random() * allNum.length));
            $(this).text(allNum[index]);
            $(this).attr('id', allNum[index]);
            allNum.splice(index, 1);
        }
    )
    chooseMode(mode);
}

// 普通模式
function normalMode(mode) {
    let curNum = 0;
    $('.num').removeClass('master');
    $('.num').click(function name(params) {
        if ($(this).text() == curNum + 1) {
            $(this).css('box-shadow', 'inset .15rem .15rem .25rem var(--greyLight-2), inset -.15rem -.15rem .3rem #fff');
            $(this).css('color', 'var(--darkorange)');
            $(this).css('font-size', '26px');
            if (curNum + 1 == 100) {
                youWin(mode);
                $('.find_num').text(curNum + 1);
            } else {
                curNum += 1;
                $('.find_num').text(curNum);
            }

        }
    })
}

// 大师模式
function masterMode(params) {
    let curNum = 0;
    $('.num').removeClass('master');
    $(`#${curNum + 1}`).addClass('master');
    $('.num').click(function name(params) {
        if ($(this).text() == curNum + 1) {
            if (curNum + 1 == 100) {
                youWin(mode);
                $('.find_num').text(curNum + 1);
            } else {
                curNum += 1;
                $('.find_num').text(curNum);
            }
            $('.num').removeClass('master');
            $(`#${curNum + 1}`).addClass('master');
        }
    })
}
// 判断模式
function chooseMode(mode) {
    if (mode == 'normal') {
        normalMode(mode);
    } else {
        masterMode(mode);
    }
}
// 通关动画
function win(like_height_rand, like_height, like_left, like_left_margin, ease_kind) {
    let $game = $('.game');
    let num = Math.floor(Math.random() * 10 + 1);
    num = (num <= 6) ? num : 1;
    let index = $game.children('img').length;
    $game.append("<img src='' class='like-img'>");
    let $like_img = $('img.like-img:eq(' + index + ')');
    $like_img.attr('src', 'static/img/like' + num + '.png');
    let rand_width = parseInt(Math.random() * 50 + 26);
    let rand_rotate = parseInt(Math.random() * 40 - 15);
    $like_img.css('left', `${rand_width}%`);
    $like_img.css('transform', `rotate(${rand_rotate}deg)`);
    $like_img.animate({
        bottom: parseInt(Math.random() * like_height_rand + like_height),
        opacity: "0.9",
        height: 70,
        left: `${rand_width + parseInt(Math.random() * like_left - like_left_margin)}%`,
    }, 800, ease_kind);
    setTimeout(function () {
        $like_img.animate({
            opacity: "0",
        }, 1000);
        setTimeout(function () {
            $like_img.remove();
        }, 2000);
    }, 2000);
}
// 通关动画
function youWin(mode) {
    let likeNum = 10;
    let like_height_rand = 335;
    let like_height = 250;
    let msg = '恭喜！你找到了100';
    if (mode == 'master') {
        likeNum = 100;
        like_height_rand = 635;
        like_height = 50;
        msg = '👏👏👏👏👏优秀👏👏👏👏👏'
    }
    for (let i = 0; i < likeNum; i++) {
        let time = Math.floor((Math.random() * 1500)) + 500;
        setTimeout(function () {
            win(like_height_rand, like_height, 5, 3, 'easeOutQuart');
        }, time);
    }
    $('.win').text(msg);
}

// 初始化
let mode = 'normal';
init_html(mode);
$('.pause').click(function name(params) {
    init_html(mode);
});

// 点击普通模式
$('.segmented-control__1').click(function name(params) {
    if (mode == 'master') {
        mode = 'normal';
        init_html(mode);
    }
});
// 点击大师模式
$('.segmented-control__2').click(function name(params) {
    if (mode == 'normal') {
        mode = 'master';
        init_html(mode);
    }
});

// 图片预加载
$("div.like-img-loaded>img").each(function (index) {
    $(this).attr('src', `static/img/like${index + 1}.png`);
});