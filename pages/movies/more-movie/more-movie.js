// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
    data: {
        movies: [],
        navigateTitle: '',
        requestUrl: '',
        totalCount: 0,
        isEmpty: 0
    },
    onLoad: function (options) {
        var category = options.category;
        var dataUrl = '';
        switch (category) {
            case '正在上映的电影-北京':
                dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';break;
            case '即将上映的电影':
                dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon'; break;
            case '豆瓣电影Top250':
                dataUrl = app.globalData.doubanBase + '/v2/movie/top250'; break;
        }
        this.setData({
            navigateTitle: category,
            requestUrl: dataUrl
        });
        this.getMovieListData(dataUrl);
        
    },

    // 下拉加载
    onScrollLower() {
        var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
        this.getMovieListData(nextUrl);
        wx.showNavigationBarLoading();
    },

    onPullDownRefresh(ev){
        var refreshUrl = this.data.dataUrl + '?start=0&count=20';
        this.set({
            movies: [],
            totalCount: 0
        })
        this.getMovieListData(refreshUrl);
    },

    getMovieListData(url){
        var that = this;
        wx.request({
            url: url,
            method: 'get',
            data: {},
            header: {
                'Content-Type': 'application/xml'
            },
            success: function (res) {
                that.processDoubanData(res.data);
            }
        });
    },

    // 整理数据
    processDoubanData (moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + '...';
            }
            // [1,1,1,1,1] [1,1,1,0,0]
            var temp = {
                starsArr: util.convertToStarsArray(subject.rating.average),
                title: title,
                average: subject.rating.average,
                image: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }
        var totalCount = this.data.totalCount + 20;
        if(!this.data.isEmpty){
            var tempMovies = this.data.movies.concat(movies);
        }
        
        this.setData({
            movies: tempMovies?tempMovies:movies,
            totalCount: totalCount
        });
        wx.hideNavigationBarLoading();
    },

    onReady: function (event) {
        //动态设置标题栏内容
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle
        })
    }
})