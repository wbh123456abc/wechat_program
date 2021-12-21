Page({
    data:{
      time:"",
      money:"",
      location:{
        lat:"",
        long:"",
      }
    },
    func_time:function(e)
    {
      console.log(e.detail.value)
      this.setData({
        time:e.detail.value
      })
      console.log(this.data.time);
    },
    func_money:function(e)
    {
      console.log(e.detail.value)
      this.setData({
        money:e.detail.value
      })
      console.log(this.data.money);
    },
    func_confirm:function()
    {
      var that = this;
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
  

      if(!Number.isInteger(Number(this.data.time)))
      {
        wx.showModal({
          title: '提示',
          content: '旅游时间应该为整数',
          success: function (res) {
            console.log(that.data.time);
            console.log(that.data.money);
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定');
            } 
            else {//这里是点击了取消以后
              console.log(that.data.time);
              console.log(that.data.money);
              console.log('用户点击取消')
            }
          }
        })
      }
      else if(!Number.isInteger(Number(this.data.money)))
      {
        wx.showModal({
          title: '提示',
          content: '预算应该为整数',
          success: function (res) {
            console.log(that.data.time);
            console.log(that.data.money);
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定');
            } 
            else {//这里是点击了取消以后
              console.log(that.data.time);
              console.log(that.data.money);
              console.log('用户点击取消')
            }
          }
        })
      }
      else if(Number(this.data.time) > 20)
      {
        wx.showModal({
          title: '提示',
          content: '时间过长，请重新填写',
          success: function (res) {
            console.log(that.data.time);
            console.log(that.data.money);
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定');
            } 
            else {//这里是点击了取消以后
              console.log(that.data.time);
              console.log(that.data.money);
              console.log('用户点击取消')
            }
          }
        })
      }
      else if(Number(this.data.time) <= 0)
      {
        wx.showModal({
          title: '提示',
          content: '时间应该为正数',
          success: function (res) {
            console.log(that.data.time);
            console.log(that.data.money);
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定');
            } 
            else {//这里是点击了取消以后
              console.log(that.data.time);
              console.log(that.data.money);
              console.log('用户点击取消')
            }
          }
        })
      }



      else if(Number(this.data.money)> 50000)
      {
        wx.showModal({
          title: '提示',
          content: '预算太大',
          success: function (res) {
            console.log(that.data.time);
            console.log(that.data.money);
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定');
            } 
            else {//这里是点击了取消以后
              console.log(that.data.time);
              console.log(that.data.money);
              console.log('用户点击取消')
            }
          }
        })
      }


      else if(Number(this.data.money) <= 500)
      {
        wx.showModal({
          title: '提示',
          content: '预算太小',
          success: function (res) {
            console.log(that.data.time);
            console.log(that.data.money);
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定');
            } 
            else {//这里是点击了取消以后
              console.log(that.data.time);
              console.log(that.data.money);
              console.log('用户点击取消')
            }
          }
        })
      }

      else
      {
        wx.showModal({
          title: '提示',
          content: '已完成填写',
          success: function (res) {
            console.log(that.data.time);
            console.log(that.data.money);
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定');
              wx.navigateTo({
                url: 'index/index?time=' + that.data.time + '&money=' + that.data.money,
              });
            } 
            else {//这里是点击了取消以后
              console.log(that.data.time);
              console.log(that.data.money);
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  })
  function check(money, time) {
    if(money => 50000)return -1;
    if(money <= 500) return -1;
    if(time < 0) return -1;
    if( time > 20) return -1;
    return 1;
  }
  module.exports = check;
  
  