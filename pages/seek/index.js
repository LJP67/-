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
  // 1 节流的变量
    throttle:false,
    // input上一个的值
    PreviousRequest:'',
    // 历史记录-本地存储
    keyStorage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储
    let arr = wx.getStorageSync("keyStorage")
    if(!Array.isArray(arr)){
      // 如果Array不是一个数组 就让它成为数组
      arr=[];
    }
    this.setData({
      keyStorage:arr
    });
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
    // 调用节流方法请求数据
    this.IfTheThrottle()
  },
  // 下拉消失术  取消按钮
  showCan(e){
    console.log(123)
    this.setData({
      // input输入时的内容
      inputvalue: '',
      // 下拉的数据
      DropDownDataWindow:[]
  
    })
  },
  // 节流 优化服务器性能
  IfTheThrottle(){
    // 2 判断 并修改状态
    if (this.data.throttle === false) {
      this.setData({
        throttle: true,
        // 记录当前input的值
        PreviousRequest: this.data.inputvalue
      })
      // 3 请求数据
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.inputvalue
        }
      }).then(res => { 
        const { message } = res.data
        this.setData({
          DropDownDataWindow: message,
          // 4 请求完之后改变状态
          throttle: false
        })
      });

      // 有个bug, 判断服务器最后一次请求时的那个值。跟最后一次用户输入的数据是不是一致
      // 如果一致的话，就不发送请求，如果不一致的话，你要用最后一个用户输入的值在发一次请求
      // this.data.PreviousRequest: 之前的数据
      // this.data.inputvalue: 当前的数据
      if (this.data.PreviousRequest !== this.data.inputvalue) {
        this.IfTheThrottle();
      }
    }
  },
  // 输入框失焦时候触发
  handunfocused(){
    this.setData({
      keyStorage: []
    })
   },
  //  清空本地存储
  handempty(){
    // 点击清空数据
    this.setData({
      keyStorage:[]
    })
    // 清空本地的历史数据
    wx.setStorageSync("keyStorage", [])
  },
  // 回车按钮时候触发的事件
handleEnter(){
  // 每次存储之前先把本地的数据先获取回来
  let arr = wx.getStorageSync("keyStorage")
  if (!Array.isArray(arr)) {
    // 如果Array不是一个数组 就让它成为数组
    arr = [];
  }
  // 把input输入的值添加到数组的首位
  // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度 js方法
  arr.unshift(this.data.inputvalue);
  
  // 数组去重
  arr = [...new Set(arr)]

  // 把关键字存到本地
  wx.setStorageSync("keyStorage", arr)

  // 跳转到商品搜索列表页
  wx.redirectTo({
    url: "/pages/hakusivu/index?keyword=" + this.data.inputvalue
  })
}

})