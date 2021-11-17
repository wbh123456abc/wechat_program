const key = 'OZKBZ-MDACI-K5QGG-5XJUX-35WE6-GAB47'; //使用在腾讯位置服务申请的key
const referer = '腾讯位置服务地图选点'; //调用插件的app的名称
var location = JSON.stringify({
  latitude: 39.89631551,
  longitude: 116.323459711
});
const chooseLocation = requirePlugin('chooseLocation');
const category = '生活服务,娱乐休闲';
 
 Page({
   data:{
    time :"",
    money:"",
    dizhi:{
      lat:"",
      lon:"",
    },
    location:{
      lat:"",
      lon:""
    },
    ans:"true"
   },
  onLoad:function(options)
  {
    var pages = getCurrentPages();
    var pre = pages[pages.length-2];
    this.setData({
      location:pre.data.location,
    })
    console.log(this.data.location)
    this.setData({
      time:options.time,
      money:options.money,
    })
    console.log(this.data.time)
    console.log(this.data.money)
  },
  f:function()
  {
    location = JSON.stringify({
      latitude:this.data.location.lat,
      longitude:this.data.location.lon
    })
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    });
  },
  g:function()
  {
    if(this.data.ans != "true")
    {
      wx.showModal({
        title: '提示',
        content: '请先选取初始地点',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log("queding")
          } 
          else {//这里是点击了取消以后
            console.log(quxiao);
          }
        }
      })
    }
    else{
      wx.navigateTo({
        url: '../daohang/daohang',
      })
    }
  },
  onShow () {
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，
    if(location != null)
    {
      this.setData({
        dizhi:{
          lat:location.latitude,
          lon:location.longitude
        },
        ans:"true"
      })
      console.log(this.data.dizhi.lat);
      console.log(this.data.dizhi.lon)
    }
},
onUnload () {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
}
})
