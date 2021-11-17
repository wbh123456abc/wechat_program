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
            that.setData({
              time:"",
              money:"",
            })
            console.log(that.data.time);
            console.log(that.data.money);
            console.log('用户点击取消')
          }
        }
      })
    }
  })