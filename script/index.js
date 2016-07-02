/**
 * Created by HuangKai on 2016/6/30.
 */
$(function () {

    init();

    function init() {
        renderRankList(users);
        //renderImages(images)
    }

    $('.item-link').click(function() {
        localStorage.userId = $(this).attr('userId');
        localStorage.userName = $(this).attr('userName');
        renderImages(images);
    });

    function renderRankList(users) {
        for (var i = 0, ii = users.length; i < ii; i++) {
            var user = users[i];
            var item =
                '<li><a href="#images" userId="'+ user.id +'" userName="'+ user.name +'" class="item-link item-content">' +
                '<div class="item-media"><i class="icon icon-f7"></i></div>' +
                '<div class="item-inner">' +
                '<div class="item-title">' + user.name + '&nbsp&nbsp' +
                '</div></div></a></li>';
            $('.users-list').append(item);
        }
    }

    function getImagesOfUser(userId, images) {
        var results = [];
        for (var i = 0, ii = images.length; i < ii; i++) {
            if (images[i].userId == userId) {
                results.push(images[i]);
            }
        }
        return results;
    }

    function renderImages(datas) {
        $('.images-list').empty();
        var images = getImagesOfUser(localStorage.userId, datas);
        for (var i = 0, ii = images.length; i < ii; i++) {
            var image = images[i];
            var num = i + 1;
            var url = 'data/' + localStorage.userId + '/' + num + '.JPG';
            if (image.userId == localStorage.userId) {
                var item =
                    '<div class="card facebook-card">' +
                    '<div class="card-header no-border">' +
                    '<p>'+ image.description +'</p>' +
                    '</div>' +
                    '<div class="card-content">' +
                    '<img class="card-cover" src="'+ url +'" alt="" width="100%">' +
                        //'<p class="color-gray">发表于 2015/01/15</p>' +
                    '</div>' +
                        //'<div class="card-footer">' +
                        //'<a href="#" class="link">赞</a>' +
                        //'<a href="#" class="link">更多</a>' +
                        //'</div>' +
                    '</div>';
                $('.images-list').append(item);
                $('.user-name').text(localStorage.userName + '精选');
            }
        }
    }

});