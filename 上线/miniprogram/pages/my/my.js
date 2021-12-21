// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      plan:"",
      ans:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      type:"gcj02",
      success:function(res)
      {
        that.setData({
          location:{
            lat:res.latitude,
            lon:res.longitude
          }
        })
        console.log(that.data.location.lat)
        console.log(that.data.location.lon)
      }
    })
    var plan = wx.getStorageSync('plan');
    if(plan)
    {
        this.setData({
          plan:plan,
          ans:true,
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  func:function()
  {
    if(!this.data.ans)
    {
      wx.showModal({
        title: '提示',
        content: '请先选取路线',
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
        url: '../plan/plan',
      })
    }
  },
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