Page({
    onTap: function(){

        wx.switchTab({
            url: '../posts/post',
        });
    },
    
    onUnload: function(){
        // console.log('welcome page is unload');
    },

    onHide: function(){
        // console.log('welcome page is hide');
    }
});