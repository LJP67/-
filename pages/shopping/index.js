// pages/shopping/index.js
Page({
  data:{
    // 收货地址
    formdz:{}
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
        })
      }
    })
  },
})