// pages/plan/plan.js
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'FRGBZ-SOY3U-XLXVL-B4T3E-S4G56-SVBMS' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first:{
      lat:"",
      lon:""
    },
    second:{
      lat:"",
      lon:""
    },
    location:{
      lat:"",
      lon:""
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  g:function()
  {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: this.data.first.lat+','+this.data.first.lon,
      to: this.data.second.lat+','+this.data.second.lon, 
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          aaans:true,
          latitude:pl[0].latitude,
          longitude:pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }]
        })
      },
      fail: function (error) {
        console.log("fuckckck")
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  func:function()
  {
    var i = this.data.i
    if(i == this.data.answer.length)
    {
       wx.showModal({
          title: '提示',
          content: '行程已结束',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log("queding")
              return
            } 
            else {//这里是点击了取消以后
              console.log("quxiao");
              return
            }
          }
        })
    }
    else{
      this.next()
    }
  },
  next:function()
  {
    var i = this.data.i
    if(i == 0)
    {
      this.setData({
        first:{
          lat:this.data.location.lat,
          lon:this.data.location.lon
        },
        second:{
          lat:this.data.answer[0].lat,
          lon:this.data.answer[0].lng
        }
      })
      console.log(this.data.first)
      console.log(this.data.second)
    }
    else{

      this.setData({
        first:{
          lat:this.data.answer[i-1].lat,
          lon:this.data.answer[i-1].lng
        },
        second:{
          lat:this.data.answer[i].lat,
          lon:this.data.answer[i].lng
        }
      })
  }
    this.setData({
      i: this.data.i+1,
      s: "("+ i  +")"+ " "+ this.data.answer[i].name
    })
    this.g();
  },



  onLoad: function (options) {
    var pages = getCurrentPages();
    var pre = pages[pages.length-2];
    console.log(pre.data.location)
    this.setData({
      answer:pre.data.plan,
      location:pre.data.location,
      i:0,
      s:"开始",
      aaans:false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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