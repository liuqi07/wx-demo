var app = getApp();
var util = require('../../utils/util.js');

Page({

	data: {
		inTheaters: {},
		comingSoon: {},
		top250: {}
	},

	onLoad(ev) {
		var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3',
			comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3',
			top250Url = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';
		
		this.getMovieListData(inTheatersUrl, 'inTheaters');
		this.getMovieListData(comingSoonUrl, 'comingSoon');
		this.getMovieListData(top250Url, 'top250');
	},

	getMovieListData(url, settedKey){
		var that = this;
		wx.request({
			url: url,
			method: 'get',
			header: {
				'Content-Type': 'application/xml'
			},
			success: function (res) {
				// console.log(res);
				that.processDoubanData(res.data, settedKey);
				// if (res.statusCode == 200) {
				// 	this.setData({
				// 		top250: res.data.subjects
				// 	});
				// }
			}
		})
	},

	// 获取并整理数据
	processDoubanData(moviesDouban, settedKey) {
		var movies = [];
		var subject = moviesDouban.subjects;
		subject.forEach(item => {
			var temp = {};
			temp.movieId = item.id; // id
			temp.title = (item.title.length>6)?(item.title.substr(0,5)+'...'):item.title; // 电影名称
			temp.image = item.images.large; // 图片
			temp.average = item.rating.average; // 评分
            temp.starsArr = util.convertToStarsArray(item.rating.average); //星星评分数组
			movies.push(temp);
		});
		
		var readyData = {};
		readyData[settedKey] = {
			title: moviesDouban.title,// 即将上映的电影
			movies: movies
		};
		// console.log(readyData)
		this.setData(readyData);
	},

    onMoreTap(ev){
        var category = ev.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category
        })
    }
});