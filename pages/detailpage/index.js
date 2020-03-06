import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品的详情
    shang:{},
    // tab的索引
    current: 0,
    // 点击图片预览功能-放大
    picUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 请求商品详情
    request({
      url:"/goods/detail",
      data:{
        goods_id: options.keyword
      }
    }).then(res =>{
      console.log(res)
      const { message } = res.data;
      // 获取图片的url路径实现预览效果 
      const picUrls = message.pics.map(v =>{
        return v.pics_big;
      })
      this.setData({
        shang: message,
        picUrls //图片预览
      })
    })
  },

  // tab切换
  handleTab(e){
    console.log(e)
    const {index} = e.currentTarget.dataset

    this.setData({
      current:index
    })
  },
  // 轮播图点击放大预览效果
  handlePreview(e){
    const {index} = e.currentTarget.dataset;
    wx.previewImage({
      current: this.data.picUrls[index], // 当前显示图片的http链接
      urls: this.data.picUrls // 需要预览的图片http链接列表
    })
  },
  // 通过事件方式跳转到购物车页面
  handleToCart(e){
    wx.switchTab({
      url: '/pages/shopping/index',
    })
  },
  // 加入购物车
  handjiaru(){
    // 每次加入商品之前应该先判断下本地有没有数据,如果没有的话就给个空数组
      const goods = wx.getStorageSync("goods") || [];
    // 然后还要判断商品的详情是否有在goods数组里面
    // 如果有,购物车同款样品加1,如果没有就unshift
    const exit = goods.some(v =>{
      // 存在就+1  通过id判断当前的商品是否在本地数组中
      const isjia = v.goods_id === this.data.shang.goods_id;
      if(isjia){
        v.number += 1;
        // 提示用户已添加 在官网的api界面---交互里面
        wx.showToast({
          title: '已添加',
          icon: 'success'
        })
      }
      return isjia;
    })
    // 如果上面的id判断与本地存储的id相等话 下面unshift里面的代码就不会执行
    // 如果没有的话就执行
    if (!exit){
      // 把当前的商品添加到本地的数组中去
      goods.unshift({
        goods_id: this.data.shang.goods_id,
        goods_name: this.data.shang.goods_name,
        goods_price: this.data.shang.goods_price,
        goods_small_logo: this.data.shang.goods_small_logo,
        number: 1
      })
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
    }
    // 保存到本地
    wx.setStorageSync("goods", goods)
  }

})