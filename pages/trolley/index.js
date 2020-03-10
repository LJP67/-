import request from "../../utils/request.js"
Page({
data:{
  // 索引
  current:0,
  // 分类
  left_cun:[]
},
onLoad(){
  // 分类数据
  request({
    url: "/categories"
  }).then(res => {
    console.log(res)
    const { message } = res.data    
    this.setData({
      left_cun: message
    })
  })
},
// 左侧
  handclick(e){
    console.log(e)
    const {index} = e.currentTarget.dataset
    this.setData({
      current:index
    })
  },

})