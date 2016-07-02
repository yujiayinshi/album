/**
 * Created by HuangKai on 2016/6/30.
 */
$(function () {

    var ref = new Wilddog("https://album.wilddogio.com/users");

    init();

    function init() {
        renderRankList(users);
        renderImages(images);
    }

    function renderRankList(users) {
        for (var i = 0, ii = users.length; i < ii; i++) {
            var user = users[i];
            var item =
                '<li><a href="#images" userId="' + user.id + '" userName="' + user.name + '" class="item-link item-content">' +
                '<div class="item-media"><i class="icon icon-f7"></i></div>' +
                '<div class="item-inner">' +
                '<div class="item-title">' + user.name + '&nbsp&nbsp' + user.count +
                '</div></div></a></li>';
            $('.users-list').append(item);
        }

        $('.item-link').click(function () {
            localStorage.userId = $(this).attr('userId');
            localStorage.userName = $(this).attr('userName');
            renderImages(images);
        });

        //ref.once("value", function(data) {
        //    data.forEach(function(i) {
        //        var user = i.val();
        //        var item =
        //            '<li><a href="#images" userId="'+ i.key() +'" userName="'+ user.name +'" class="item-link item-content">' +
        //            '<div class="item-media"><i class="icon icon-f7"></i></div>' +
        //            '<div class="item-inner">' +
        //            '<div class="item-title">' + user.name + '&nbsp&nbsp' + user.count +
        //            '</div></div></a></li>';
        //        $('.users-list').append(item);
        //    });
        //    $('.item-link').click(function() {
        //        localStorage.userId = $(this).attr('userId');
        //        localStorage.userName = $(this).attr('userName');
        //        renderImages(images);
        //    });
        //});
    }

    function renderImages(images) {
        $('.images-list').empty();
        for (var i = 0, ii = images.length; i < ii; i++) {
            var image = images[i];
            var num = i + 1;
            var url = 'data/' + localStorage.userId + '/' + num + '.png';
            if (image.userId == localStorage.userId) {
                var item =
                    '<div class="card demo-card-header-pic">' +
                    '<div valign="bottom" class="card-header color-white no-border no-padding">' +
                    '<img class="card-cover" src="' + url + '" alt="">' +
                    '</div>' +
                    '<div class="card-content">' +
                    '<div class="card-content-inner">' +
                        //'<p class="color-gray">发表于 2015/01/15</p>' +
                    '<p>' + image.description + '</p>' +
                    '</div>' +
                    '</div>' +
                        //'<div class="card-footer">' +
                        //'<a href="#" class="link">赞</a>' +
                        //'<a href="#" class="link">更多</a>' +
                        //'</div>' +
                    '</div>';
                $('.images-list').append(item);
                $('.user-name').text(localStorage.userName);
            }
        }
    }

});