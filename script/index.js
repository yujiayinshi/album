/**
 * Created by HuangKai on 2016/6/30.
 */
$(function () {

    var userRef = new Wilddog("https://album.wilddogio.com/users");
    var imageRef = new Wilddog("https://album.wilddogio.com/images");

    $(document).on("pageInit", "#admin", function(e, id, page) {

        var vm = new Vue({
            el: '#admin',
            data: {
                users: {},
                images: {},
                userId: {}
            },
            methods: {
                saveUser: function () {
                    userRef.push({
                        nickName: this.nickName
                    });
                    $.toast("操作成功");
                },
                removeUser: function (key) {
                    var ref = new Wilddog("https://album.wilddogio.com/users/"+ key);
                    ref.remove();
                    $.toast("操作成功");
                },
                selectUser: function (key) {
                    vm.$data.userId = key;
                    imageRef.orderByChild("userId").equalTo(vm.$data.userId).on("value", function(data) {
                        vm.$data.images = data.val();
                    });
                },
                saveImage: function () {
                    imageRef.push({
                        userId: this.userId,
                        description: this.description,
                        url: this.url
                    });
                    $.toast("操作成功");
                },
                removeImage: function (key) {
                    var ref = new Wilddog("https://album.wilddogio.com/images/"+ key);
                    ref.remove();
                    $.toast("操作成功");
                }
            }
        });

        userRef.on("value", function(data) {
            vm.$data.users = data.val();
        });

    });

    $(document).on("pageInit", "#rank", function(e, id, page) {
        var vm = new Vue({
            el: '#rank',
            data: {
                users: {},
                userId: {}
            },
            methods: {
                selectUser: function(key, item) {
                    localStorage.userId = key;
                    localStorage.userName = item.nickName;
                    $.router.load('#images', true);
                    location.reload();
                }
            }
        });

        userRef.on("value", function(data) {
            vm.$data.users = data.val();
        });
    });

    $(document).on("pageInit", "#images", function(e, id, page) {

        var vm = new Vue({
            el: '#images',
            data: {
                images: {},
                userName: localStorage.userName
            }
        });

        imageRef.orderByChild("userId").equalTo(localStorage.userId).on("value", function(data) {
            vm.$data.images = data.val();
        })
    });

    $.init();

});