// pages/shopping/index.js
Page({
  data:{
    // 收货地址
    formdz:{},
    // 本地的商品列表
    goods:[],
    // 计算总价格
    zjgprice:0
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
  onShow(){
    this.setData({
      goods: wx.getStorageSync("goods") || []
    });
     // 计算总价格
    this.handprice();
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
  // 计算总价格
  handprice(){
    let price = 0;
    // 循环添加商品的价格
     this.data.goods.forEach(v =>{
       price = price + v.goods_price * v.number
      
     })
  // 修改总价格
    this.setData({
      zjgprice: price 
    })
  },
  // 数量加减
  numplus(e){
    // index:自定义组件传过来的-索引值,是告诉我们当前点击的是哪个按钮 
    const {index,number} = e.currentTarget.dataset
    console.log(index,number)
    this.data.goods[index].number += number
    console.log(this.data.goods)
    this.setData({
      goods:this.data.goods
    })
  },

})