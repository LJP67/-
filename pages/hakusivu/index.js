import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 关键字
    keyword: '',
    // 商品的列表
    goods: [],
    // 加载与底部文字状态管理
    hidesmore: true,
    // 当前的页数
    pagenum: 1,
    //  是否加载中
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    // url的参数 就是关键字
    const {
      keyword
    } = options
    // 获取到并修改
    this.setData({
      keyword
    });
    // 商品列表
    this.getGoods();
  },
  // 封装
  getGoods() {
    // 如果没有数据了就不要在请求
    if (this.data.hidesmore == !true) {
      return;
    }
    setTimeout(v => {
      // 商品请求的列表
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum, //页数
          pagesize: 15
        }
      }).then(res => {
        console.log(res)
        const {
          message
        } = res.data;
        // 遍历修改价格
        const goods = message.goods.map(v => {
          // 价格添加两位小数点
          v.goods_price = Number(v.goods_price).toFixed(2)
          return v
        })
        // 把message的数据保存到list
        this.setData({
          // 合并原来的列表和请求回来的列表
          goods: [...this.data.goods, ...goods],
          // 当前请求完毕
          loading: false
        })
        // 判断是否最后一页 
        if (this.data.goods.length >= message.total) {
          this.setData({
            hidesmore: false
          })
        }
      })
    }, 1000)
  },



  // 页面上拉触底时候触发
  onReachBottom() {
    // 等到上次一回来在请求数据,不然pagenum会一直+1
    if (this.data.loading === false) {
      this.setData({
        // 重新加载
        loading: true,
        pagenum: this.data.pagenum + 1
      });

      // 商品列表
      this.getGoods();
    }



  },

















  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})