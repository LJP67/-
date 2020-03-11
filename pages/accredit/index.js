// pages/accredit/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击授权拿到参数
  // 主要获取token,就需要获取token5个参数
  handuserinfo(e){
    console.log(e)
    // 解构出四个参数
    const { encryptedData, iv, rawData, signature} = e.detail
    wx.login({
      // 通过wx.login获取code
      success(res) {
        if (res.code) {
          const  data ={
            encryptedData, iv, rawData, signature,code:res.code
          }
          // 请求接口获取token
          request({
            url: '/users/wxlogin',
            data,
            method:'POST'
          }).then(res =>{
            // 获取token
            const {token} = res.data.message
            // 把token保存到本地
            wx.setStorageSync("token", token)
            // 返回是上一个页面
            wx.navigateBack();
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },


})