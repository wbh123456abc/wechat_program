//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    canIUseOpenData:false,
    canIUseGetUserProfile: false,
    remind: '加载中',
    angle: 0,
    year: 2021,
    userInfo: {},
    ans:false,
    name:"请登陆",
    fun:"fuck"
  },

  goToIndex: function () {
    wx.switchTab({
      url: '/pages/main',
    });
  },
  
  onLoad: function () {
    console.log(this.data.canIUseOpenData)
  },
  fuck:function()
  {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          ans:true,
          name:res.userInfo.nickName,
          fun:"goToIndex"
        })
      }
    })
  },
  onShow: function () {
    
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
});