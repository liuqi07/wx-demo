// post.js
var postsData = require('../../data/posts-data.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 小程序总是会读取data对象来做数据绑定
        // 而这个动作的执行，是在onLoad函数执行之后发生的
        // postsList: []
    },

    onPostTap: function(ev){
      var postId = ev.currentTarget.dataset.postid;
      wx.navigateTo({
          url: 'post-detail/post-detail?id=' + postId
      });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 如果设置data是在异步操作里面，需要使用setData方法来更新
        this.setData({
            postsList: postsData.postsList
        });
        // this.data.postsList = postsData.postsList
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log('onReady');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log('onShow');
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // console.log('onHide');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // console.log('onUnload');
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})