// pages/shopping/index.js
Page({
  data:{
    // 收货地址
    formdz:{}
  },
  // 生命周期的函数 监听页面的加载
  // 页面一加载就把里面的数据拿出来渲染
  onLoad:function(options){
    // 获取本地存储,即便刷新后页面数据任在
    this.setData({
      // 如果本地没有数据就设置成空对象
      formdz: wx.getStorageSync("formdz") || {}
    })
  },
  // 获取收货地址
  handshow(){
    // 看官网有
    wx.chooseAddress({
      success:(res) =>{
        this.setData({
          formdz:{
              // 姓名
              name:res.userName,
              // 电话
              tel:res.telNumber,
              // 收货地址
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        });
        // 保存到本地
        wx.setStorageSync('formdz', this.data.formdz)
      }
    })
  },


})