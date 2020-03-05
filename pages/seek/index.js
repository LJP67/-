// pages/seek/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // input输入时的值
  inputvalue:'',
  // 下拉的数据
  DropDownDataWindow:[],

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
    if (!value){
      this.setData({
        // 把搜索的内容清空
        DropDownDataWindow: []
      })
      return;
    };
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
  // 下拉消失术
  showCan(e){
    this.setData({
      // input输入时的内容
      inputvalue: '',
      // 下拉的数据
      DropDownDataWindow:''
    })
  }


})