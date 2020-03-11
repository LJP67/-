// pages/mine/index.js
Page({

  // 收货地址
  handleAddress() {
    // 根据接口的名字在文档里搜索
    wx.chooseAddress();
  },

  // 联系客服
  handleContact() {
    // 根据接口的名字在文档里搜索
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  }
})