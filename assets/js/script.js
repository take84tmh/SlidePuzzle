$(function() {
    // グローバル
    var image_num = 0;
    var difficulty = 0;
    tiles = [];
    var puzzle_image = [['url(assets/img/crossword_puzzle_man_1.png)',
                        'url(assets/img/crossword_puzzle_man_2.png)',
                        'url(assets/img/crossword_puzzle_man_3.png)',
                        'url(assets/img/crossword_puzzle_man_4.png)',
                        'url(assets/img/crossword_puzzle_man_5.png)',
                        'url(assets/img/crossword_puzzle_man_6.png)',
                        'url(assets/img/crossword_puzzle_man_7.png)',
                        'url(assets/img/crossword_puzzle_man_8.png)'],
                        ['url(assets/img/cult_kanyuu_1.png)',
                        'url(assets/img/cult_kanyuu_2.png)',
                        'url(assets/img/cult_kanyuu_3.png)',
                        'url(assets/img/cult_kanyuu_4.png)',
                        'url(assets/img/cult_kanyuu_5.png)',
                        'url(assets/img/cult_kanyuu_6.png)',
                        'url(assets/img/cult_kanyuu_7.png)',
                        'url(assets/img/cult_kanyuu_8.png)'],
                        ['url(assets/img/pikachu_1.png)',
                        'url(assets/img/pikachu_2.png)',
                        'url(assets/img/pikachu_3.png)',
                        'url(assets/img/pikachu_4.png)',
                        'url(assets/img/pikachu_5.png)',
                        'url(assets/img/pikachu_6.png)',
                        'url(assets/img/pikachu_7.png)',
                        'url(assets/img/pikachu_8.png)'],
                        ['url(assets/img/not_human_1.png)',
                        'url(assets/img/not_human_2.png)',
                        'url(assets/img/not_human_3.png)',
                        'url(assets/img/not_human_4.png)',
                        'url(assets/img/not_human_5.png)',
                        'url(assets/img/not_human_6.png)',
                        'url(assets/img/not_human_7.png)',
                        'url(assets/img/not_human_8.png)'],
                        ['url(assets/img/hiroshi_1.png)',
                        'url(assets/img/hiroshi_2.png)',
                        'url(assets/img/hiroshi_3.png)',
                        'url(assets/img/hiroshi_4.png)',
                        'url(assets/img/hiroshi_5.png)',
                        'url(assets/img/hiroshi_6.png)',
                        'url(assets/img/hiroshi_7.png)',
                        'url(assets/img/hiroshi_8.png)'],
                        ['url(assets/img/tatsuo_1.png)',
                        'url(assets/img/tatsuo_2.png)',
                        'url(assets/img/tatsuo_3.png)',
                        'url(assets/img/tatsuo_4.png)',
                        'url(assets/img/tatsuo_5.png)',
                        'url(assets/img/tatsuo_6.png)',
                        'url(assets/img/tatsuo_7.png)',
                        'url(assets/img/tatsuo_8.png)']];

    window.onload = function() {
        
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', ''];
        
        // シャッフル
        shuffle(arr);

        var panel = document.getElementById('panel');
        
        // div要素作成
        for (i = 0; i < 9; i++){
            var div = document.createElement('div');
            div.className = 'tile';
            div.index = i;
            div.textContent = arr[i];
            div.style.backgroundImage = puzzle_image[image_num][arr[i]];
            div.onclick = click;
            panel.appendChild(div);
            tiles.push(div);
        }
    } 

    // シャッフル用関数
    function shuffle(arr) {
        var n = arr.length;
        var temp, i;

        while (n) {
            i = Math.floor(Math.random() * n--);
            temp = arr[n];
            arr[n] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    // タイルを入れ替える
    function swapContent(i, k){
        var temp = tiles[i].textContent;
        tiles[i].textContent = tiles[k].textContent;
        tiles[k].textContent = temp;
        $(tiles[i]).css('backgroundImage', 'url(assets/img/white.png)');
        $(tiles[k]).css('backgroundImage', puzzle_image[image_num][tiles[k].textContent]);
    }

    // クリック時の処理
    function click(e) {
        if (difficulty) {
            for (i = 0; i < 9; i++) {
                tiles[i].textContent = text[i];
            }
        }

        var i = e.target.index;

        if (i <= 5 && tiles[i + 3].textContent == '' ){
            // 下と入れ替え
            swapContent(i, i + 3);
        }else if ( i >= 3 && tiles[i - 3].textContent == ''){
            // 上と入れ替え
            swapContent(i, i - 3);
        }else if (i % 3 !== 2 && tiles[i + 1].textContent == ''){
            // 右と入れ替え
            swapContent(i, i + 1);
        }else if (i % 3 !== 0 && tiles[i - 1].textContent == ''){
            // 左と入れ替え
            swapContent(i, i - 1);
        }

        text = [];

        for (i = 0; i < 9; i++) {
            text[i] = tiles[i].textContent;
        }

        if (difficulty) {
            for (i = 0; i < 9; i++) {
                tiles[i].textContent = '';
            }
        }

        var data = {"data" :
                    text[0] + ", " +
                    text[1] + ", " +
                    text[2] + ", " +
                    text[3] + ", " +
                    text[4] + ", " +
                    text[5] + ", " +
                    text[6] + ", " +
                    text[7]};

        $.post('../send.php', data, function(result) {
            console.log('recv : ' + result);
        });

        if (text[0] == '0' &&
            text[1] == '1' &&
            text[2] == '2' &&
            text[3] == '3' &&
            text[4] == '4' &&
            text[5] == '5' &&
            text[6] == '6' &&
            text[7] == '7') {
            alert('CLEAR!!');
            if (image_num % 2 == 0) {
                $('.difficulty').text("難易度：ふつう");
                difficulty = 1;
                image_num++;
                image_change();
                for (i = 0; i < 9; i++) {
                    text[i] = tiles[i].textContent;
                    tiles[i].textContent = '';
                }
            }
            else {
                alert('この先は有料です。');
            }
        }
    }

    $('.navbar-brand').click(function(){
        $('html,body').animate({
          'scrollTop': 0
        }, 'slow');
    });

    $('.scroll').click(function(){
        var id = $(this).attr('href');
        var position = $(id).offset().top;
        $('html,body').animate({
        'scrollTop': position
        }, 500);
    })

    function image_change(){
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', ''];
        shuffle(arr);
        for (i = 0; i < 9; i++){
            tiles[i].textContent = arr[i];
            if (tiles[i].textContent == '') {
                $(tiles[i]).css('backgroundImage', 'url(assets/img/white.png)');
            }
            else {
                $(tiles[i]).css('backgroundImage', puzzle_image[image_num][tiles[i].textContent]);
            }
        }
    }

    $('.Irasutoya').click(function(){
        $('.difficulty').text("難易度：かんたん");
        difficulty = 0;
        image_num = 0;
        image_change();
    });

    $('.Pokemon').click(function(){
        $('.difficulty').text("難易度：かんたん");
        difficulty = 0;
        image_num = 2;
        image_change();
    });

    $('.MrSuzuki').click(function(){
        $('.difficulty').text("難易度：かんたん");
        difficulty = 0;
        image_num = 4;
        image_change();
    });
});
