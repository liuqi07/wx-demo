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

function convertToCastString(casts){
    var castsJoin = '';
    for(var idx in casts){
        castsJoin += casts[idx].name + ' / ';
    }
    return castsJoin.substring(0, castsJoin.length-3);
}

function convertToCastArray(casts){
    var castsArray = [];
    for(var idx in casts){
        var tempObj = {
            name: casts[idx].name,
            imgUrl: casts[idx].avatars.large
        }
        castsArray.push(tempObj);
    }
    return castsArray;
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http,
    convertToCastString: convertToCastString,
    convertToCastArray: convertToCastArray 
}