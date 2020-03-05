// pages/seek/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 关键字
    keyword:'',
  // input输入时的值
  inputvalue:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  // 监听用户的输入事件 
 
  handleInput(e){
    console.log(e)
    const {value} = e.detail
  this.setData({
    inputvalue: value
  });
    // 没有值就暂停请求
    if (!value) return;


  },


})