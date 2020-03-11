// pages/shopping/index.js
import request from "../../utils/request.js"
Page({
  data: {
    // 收货地址
    formdz: {},
    // 本地的商品列表
    goods: [],
    // 计算总价格
    zjgprice: 0,

  },
  // 生命周期的函数 监听页面的加载
  // 页面一加载就把里面的数据拿出来渲染
  onLoad: function(options) {
    // 获取本地存储,即便刷新后页面数据任在
    this.setData({
      // 如果本地没有数据就设置成空对象
      formdz: wx.getStorageSync("formdz") || {}
    })
  },
  onShow() {
    this.setData({
      goods: wx.getStorageSync("goods") || []
    });
    // 计算总价格
    this.handprice();

  },
  // 获取收货地址
  handshow() {
    // 看官网有
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          formdz: {
            // 姓名
            name: res.userName,
            // 电话
            tel: res.telNumber,
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
  handprice() {
    let price = 0;
    // 循环添加商品的价格
    this.data.goods.forEach(v => {
      //  如果是选中状态则重新计算价格
      if (v.select) {
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

  //1 立即支付
  zhifu() {
    // 判断是否有token
    const token = wx.getStorageSync("token")
    // console.log(token)
    // 如果没有tokenkoi跳转到授权页
    if (!token) {
      wx.navigateTo({
        url: '/pages/accredit/index'
      })
    } else {
      // 如果有token
      let {
        zjgprice,
        formdz,
        goods
      } = this.data;
      // 接口需要的参数
      goods = goods.map(v => {
        return {
          goods_id: v.goods_id,
          goods_number: v.number,
          goods_price: v.goods_price
        }
      })
      console.log(goods)

      //2 创建订单
      request({
        url: '/my/orders/create',
        method: 'POST',
        header: {
          Authorization: token
        },
        data: {
          order_price: zjgprice,
          consignee_addr: formdz.name + formdz.tel + formdz.detail,
          goods
        }
      }).then(res => {
        // console.log(res)
        // 订单创建成功
        wx.showToast({
          title: '订单创建成功',
          type: 'success'
        })
        //3 发起支付
        request({
          url: '/my/orders/req_unifiedorder',
          method: 'POST',
          header: {
            Authorization: token
          },
          data: {
            // 订单编号
            order_number: res.data.message.order_number
          }
        }).then(res => {
          console.log(res)
          // 支付需要的参数
          const {
            pay
          } = res.data.message;

          // 3.发起微信支付
          wx.requestPayment(pay)
        })
        // 订单创建成功后把购物车select为true的商品删除掉
        // filter会返回一个新数组，循环里面return为true就会当前项加入新数组
        const filterGoods = this.data.goods.filter(v => {
          // 只保留select为false的元素
          return !v.select;
        })
        // 返回是上一个页面
        wx.navigateBack();
        // 修改本地的数据
        wx.setStorageSync("goods", filterGoods)
      });
    }
  }

})