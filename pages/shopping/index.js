// pages/shopping/index.js
Page({
  data:{
    // 收货地址
    formdz:{},
    // 本地的商品列表
    goods:[],
    // 计算总价格
    zjgprice:0,
    // 全选
    quanxuan:false

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
    // 全选状态
    this.handquan()
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
      //  如果是选中状态则重新计算价格
       if(v.select){
         price = price + v.goods_price * v.number
       }
     })
  // 修改总价格
    this.setData({
      zjgprice: price 
    })
    // 本地存储数据
    wx.setStorageSync("goods", this.data.goods)
  },
  // 数量加减
  numplus(e){
    // index:自定义组件传过来的-索引值,是告诉我们当前点击的是哪个按钮 
    const {index,number} = e.currentTarget.dataset

    this.data.goods[index].number += number

    // 判断输入框是否为0 是的话则弹窗提示删除该商品
    if (this.data.goods[index].number === 0){
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success :(res) => {//这边是一个回调函数
        // 确认删除
          if (res.confirm) {
            // 删掉其中的1个索引
            this.data.goods.splice(index, 1)
            
          }else{
            // 当数值为0时如果点击取消的话就给它加一
            this.data.goods[index].number += 1
           
          } 
          // 重新修改goods值
          this.setData({
            goods: this.data.goods
          })
          // 调用计算总价格 实现价格刷新
          this.handprice()
        }
      })
    }
      // 重新修改goods值
      this.setData({
        goods: this.data.goods
      });
  // 计算总价格
    this.handprice()
    
  },

  // 输入框只能为数字
  handnunber(e){
    console.log(e)
    // index是当前点击商品的索引
    const {index} = e.currentTarget.dataset
    // value则是输入框里面的值
    let {value} = e.detail
    // 取整输入框中的value值
    value = Math.floor(Number(value))
    // 判断value值如果小于1,那就让它等于1
    if( value < 1 ){
        value = 1
    }
    // 输入框的值如果改变.总价格也随着改变
    this.data.goods[index].number = value
    // 重新修改goods值
    this.setData({
      goods: this.data.goods
    });
    // 计算总价格
    this.handprice()
  },

  // 商品选中状态
  handicon(e){
    // console.log(e)
    // 索引
    const { index }= e.currentTarget.dataset
    // console.log(index)
    // 解构出select选中状态
     const { select } = this.data.goods[index]
    //  console.log(select)
    // 取反这个select函数的变化
    this.data.goods[index].select = !select
    // 重新修改goods值
    this.setData({
      goods: this.data.goods
    });
    // 全选状态
    this.handquan()
    // 计算总价格
    this.handprice()
   
  },
  
  // 商品全选
  handquan(){
    //定义一个变量 假设所有都选中
    let zhong = true
    // 遍历所有的商品，只要有一个商品状态是false,select就等于false
    this.data.goods.forEach(v =>{
  // 如果已经有一个商品状态是false，后面的循环不用再判断了
      if (zhong === false){
          return
    }
  // 把全选的中状态修改为false
      if (v.select === false){
        zhong = false
      }
    })
    // 保持全选状态
    this.setData({
      quanxuan: zhong
    });
  },

  // 点击全选选中所有商品
  handqx(){
    // quanxuan:在这边是为false;
    const {quanxuan} =this.data;
    console.log(quanxuan)
    // 然后要给每个商品同时修改它们的状态  所以要循环
    this.data.goods.forEach(v =>{
        // 因为quanxuan变量为false,所以我们在这边取反就可以获得相对应的效果
        v.select = !quanxuan
      // 然后我上面修改了goods中的值 那这边就得重新加载这个goods
    });
    // 重新修改goods值
    this.setData({
      goods: this.data.goods,
      // 保存全选的状态
      quanxuan: !quanxuan
    });
    // 计算总价格
    this.handprice()
  },
  
})