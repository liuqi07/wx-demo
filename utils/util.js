function convertToStarsArray(average) {
    var arr = [];
    var num = Math.ceil(average / 2);
    for (var i = 0; i < 5; i++) {
        i < num ? arr.push(1) : arr.push(0);
    }
    return arr;
}

function http(url, callback) {
    wx.request({
        url: url,
        method: 'get',
        data: {},
        header: {
            'Content-Type': 'application/xml'
        },
        success: function (res) {
            callback && callback(res);
        }
    });
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http
}