
var app = getApp();
var util = require('../../../utils/util.js');
Page({

    data: {
        movie: {}
    },
    onLoad: function (options) {
        var movieId = options.movieId;
        console.log(movieId);
        var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
        util.http(url, this.processDoubanData);
    },

    // 获取并整理数据
    processDoubanData(moviesDouban) {
        console.log(moviesDouban);
        var tempMoviesData = moviesDouban.data;
        var movieData = {
            title: tempMoviesData.title, // 中文名
            original_title: tempMoviesData.original_title, // 原名
            countries: tempMoviesData.countries[0], // 制片国家/地区
            year: tempMoviesData.year, // 年代
            movieImg: tempMoviesData.images ? tempMoviesData.images.large : '', // 封面
            wishCount: tempMoviesData.wish_count, // 想看人数
            commentsCount: tempMoviesData.comments_count, // 影评人数
            starsArr: util.convertToStarsArray(tempMoviesData.rating.average), // 评分
            average: tempMoviesData.rating.average, // 评分
            directors: tempMoviesData.directors[0].name, // 导演
            casts: util.convertToCastString(tempMoviesData.casts), // 影人
            castsInfo: util.convertToCastArray(tempMoviesData.casts),
            genres: tempMoviesData.genres.join('、'), // 类型
            summary: tempMoviesData.summary // 影片简介
        };
        console.log(movieData);
        this.setData({
            movie: movieData
        });
        wx.hideNavigationBarLoading();
    }
})