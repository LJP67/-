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
  inputvalue:'',
  // 下拉的数据
  DropDownDataWindow:[],
  // 下拉隐藏
  isShow:false
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
    // 发请求获取后台数据
    request({
      url:'/goods/qsearch',
      data:{
        query:value
      }
    }).then(res=>{
      console.log(res)
      const { message } = res.data
      this.setData({
        DropDownDataWindow:message
      })
    })
  },


})