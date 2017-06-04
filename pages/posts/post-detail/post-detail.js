// post-detail.js
var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({

    data: {
        isPlayingMusic: false
    },

    onLoad(options) {
        var globalData = app.globalData; // 获取全局app下的data
        var postId = options.id;
        var postData = postsData.postsList[postId];
        //   this.data.postData = postData;
        this.setData({
            postData: postData
        });

        // 从缓存中获取，判断收藏状态与否
        var postsCollected = wx.getStorageSync('postsCollected');
        if (postsCollected) {
            var collected = postsCollected[postId];
            this.setData({
                collected: collected,
                currPostId: postId
            });
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('postsCollected', postsCollected)
        }
        if(globalData.isPlayingMusic_g){
            this.setData({
                isPlayingMusic: true
            })
        }

        this.setAudioMonitor();
    },

    // 监听音乐的播放和暂停状态的改变
    setAudioMonitor() {
        wx.onBackgroundAudioPlay(() => {
            this.setData({
                isPlayingMusic: true
            });
            app.globalData.isPlayingMusic = true;
        });
        wx.onBackgroundAudioPause(() => {
            this.setData({
                isPlayingMusic: false
            });
        });
        app.globalData.isPlayingMusic = false;
    },

    onCollectionTap(ev) {
        // 收藏变成未收藏，为收藏变为收藏
        // 更新数据绑定变量，从而切换图片
        this.setData({
            collected: !this.data.collected
        });
        var postsCollected = wx.getStorageSync('postsCollected');
        postsCollected[this.data.currPostId] = this.data.collected;
        // 更新文章是否收藏的缓存值
        wx.setStorageSync('postsCollected', postsCollected);

        wx.showToast({
            title: this.data.collected ? '收藏成功' : '取消成功',
            mask: true,
            success: function (ev) {
                console.log(ev)
            }
        });

    },

    onShareTap(ev) {
        var itemList = ['分享给微信好友', '分享到朋友圈', '分享到微博', '分享到QQ'];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: '#405f80',
            success(res) {
                //   console.log(res)
                // res.cancel 取消
                // res.tapIndex 点击的是哪个的索引值
                wx.showModal({
                    title: '用户分享到了' + itemList[res.tapIndex]
                });
            }
        })
    },

    // 控制音乐播放器
    onMusicTap(ev) {
        var isPlayingMusic = this.data.isPlayingMusic;
        var currPostId = this.data.currPostId;
        var music = postsData.postsList[currPostId].music
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            });
        } else {
            wx.playBackgroundAudio({
                dataUrl: music.url,
                title: music.title,
                coverImgUrl: music.coverImg
            });
            this.setData({
                isPlayingMusic: true
            });
        }
    }
})