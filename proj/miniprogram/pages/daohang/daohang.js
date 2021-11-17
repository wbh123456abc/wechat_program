// pages/daohang/daohang.js
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'FRGBZ-SOY3U-XLXVL-B4T3E-S4G56-SVBMS' // 必填
});
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function tt(){
  //for(var i = 0; i < 500000000;i++){}
  await sleep(200)
}
async function calladd(p){
  return new Promise(function(resolve, reject){
    wx.cloud.callFunction({
      name:'add',
      data:{
        name:p.name,
        id:p.id
      }
    }).then(res=>{
      resolve(res)
    })
  })
}
async function calldp(dis){
  return new Promise(function(resolve,reject){
    wx.cloud.callFunction({
      name:'dp',
      data:{
        dis:dis.dis,
        t:dis.t,
        mon:dis.mon
      }
    }).then(res=>{
      resolve(res)
    })
  })
}
async function getdis(from,to){
  return new Promise(function(resolve, reject)
  {
      qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: from || '', //若起点有数据则采用起点坐标，若为空默认当前地址
      to: to, //终点坐标
      success: function(res) {//成功后的回调
        //console.log(res);
        var res = res.result;
        //console.log(res)
        
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        }
        //var d = dis[0]
        resolve(dis)
      },
      fail: function(error) {
        console.log(error)
      },
      complete: function(res) {
      }
      });
  })
}
async function route(pos, mon, t,page){

  var jingdian = await calladd({name:'jingdiandz', id:'fa24ce1a61923f9d06b8949d1813e775'})
  jingdian = jingdian.result.data.list
  var disarray = new Array()
  for(var i = 0; i < 10; i++)
  {
    var dic = jingdian[i]
    var p = [{latitude:dic.lat, longitude:dic.lng}]
    var dis = await getdis(pos, p);
    dis = dis[0]
    //console.log(i)
    page.setData({
      ans:i
    })
    await tt()
    disarray.push(dis)
  }
  console.log(disarray)
  console.log(mon)
  console.log(t)
  var route = await calldp({dis:disarray, mon:mon, t:t})
  return route.result
}
Page({
  data:{
    time :"",
    money:"",
    dizhi:{
      lat:"",
      lon:"",
    },
    i:0,
    location:{
      lat:"",
      lon:""
    },
    ans:"-1",
    aans:false,
    aaans:false,
    first:{
      lat:"",
      lon:""
    },
    second:{
      lat:"",
      lon:""
    },
    s:"开始",
    plan:""
   },
  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.aans)
    var pages = getCurrentPages();
    var pre = pages[pages.length-2];
    this.setData({
      time:pre.data.time,
      money:pre.data.money,
      dizhi:pre.data.dizhi,
      location:pre.data.location,
      first:pre.data.location
    })
    
    console.log(this.data)
    // var _this = this;
    // //调用距离计算接口
    // qqmapsdk.direction({
    //   mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
    //   //from参数不填默认当前地址
    //   from: this.data.first.lat+','+this.data.first.lon,
    //   to: this.data.second.lat+','+this.data.second.lon, 
    //   success: function (res) {
    //     console.log(res);
    //     var ret = res;
    //     var coors = ret.result.routes[0].polyline, pl = [];
    //     //坐标解压（返回的点串坐标，通过前向差分进行压缩）
    //     var kr = 1000000;
    //     for (var i = 2; i < coors.length; i++) {
    //       coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
    //     }
    //     //将解压后的坐标放入点串数组pl中
    //     for (var i = 0; i < coors.length; i += 2) {
    //       pl.push({ latitude: coors[i], longitude: coors[i + 1] })
    //     }
    //     console.log(pl)
    //     console.log(_this.data.aans)
    //     //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
    //     _this.setData({
    //       latitude:pl[0].latitude,
    //       longitude:pl[0].longitude,
    //       polyline: [{
    //         points: pl,
    //         color: '#FF0000DD',
    //         width: 4
    //       }]
    //     })
    //   },
    //   fail: function (error) {
    //     console.log("fuckckck")
    //     console.error(error);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // })
  },
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
        console.log(_this.data.aans)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    console.log("start");
    console.log(that.data.dizhi.lat)
    console.log(that.data.dizhi.lon)
    route({latitude:that.data.dizhi.lat, longitude:that.data.dizhi.lon}, Number(that.data.money), Number(that.data.time),that).then(res=>{
      console.log(res)

      console.log(res[0].lat)
      console.log(res[0].lng)
      that.setData({
        aans:true,
        answer:res
      })
      var plan = "";
      for(var i = 0; i < res.length - 1; ++i)
      {
        plan = plan + res[i].name + "  ->  "
      }
      plan = plan + res[res.length - 1].name
      that.setData({
        plan: plan
      })
    })
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