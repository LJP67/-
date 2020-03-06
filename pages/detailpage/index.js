import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品的详情
    shang:{},
    // tab的索引
    current: 1,
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
  }
})