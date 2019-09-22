# 用vue做的一个电商网站

### npm 命令
```bash
# Project setup
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint

```

## 功能简介
1. elementui框架的使用
1. v-for循环的嵌套
1. vue-lazyload的图片懒加载
1. vuerouter的基本使用
1. iView框架的使用
1. vue-product-zoomer的商品放大镜
1. vuex的状态管理
1. 导航守卫以及路由元信息
1. iView的网页加载条显示
1. elementui的表单验证
1. v-distpicker省市联动插件
1. vue-qrcode的二维码
1. 订单支付页的计时器与定时器逻辑

## 采坑记录
- vue-lazyload的加载图需要require引入
- vue-product-zoomer的数据需要手动组装并且需要用v-if控制渲染时机
- vuex若全局state的新增需要调用Vue.set或是this.$set;删除需要调用Vue.delete或是this.$delete;
- 导航守卫在判断登录逻辑的时候陷入死循环,是因为next有别于$router.push,我的解决方案是再加一层判断
- iView框架的表单控件的label-width属性判断有bug,当时全部换成elementui的时候很烦躁
- 订单支付页的计时器当时忘了清楚