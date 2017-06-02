Page({
    onTap: function(){

        // wx.navigateTo({
        //     url: '../posts/post'
        // });
        // 平行跳转页面
        wx.redirectTo({
            url: '../posts/post',
        });
    },
    onTextTap: function(){

    },
    
    onUnload: function(){
        // console.log('welcome page is unload');
    },

    onHide: function(){
        // console.log('welcome page is hide');
    }
});