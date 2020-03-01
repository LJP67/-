 
 import request from "../../utils/request.js"
//获取应用实例
Page({
 data:{
  //  轮播图
  inputshu:[],
   // 菜单栏
   images_src: [],
  //  楼层部分
  floor_tu:[],
  // 置顶
   isShowTob:true
 },
    onLoad(){
      // 轮播图
      request({
        url:"/home/swiperdata"
      }).then(res=>{
        // console.log(res)
        const { message } = res.data
        this.setData({
          inputshu: message
        })
      })
    // 菜单栏
    request({
      url:"/home/catitems"
      }).then(res=>{
        const { message } = res.data
        this.setData({
          images_src: message
        })
      })

      // 楼层部分
      request({
        url: "/home/floordata"
      }).then(res=>{
        console.log(res)
        const { message } = res.data
        this.setData({
          floor_tu: message
        })
      })
    },
  // 小程序回到顶部
  clickTob() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
})
