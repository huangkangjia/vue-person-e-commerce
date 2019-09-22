<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/" class="router-link-active">首页</router-link> &gt;
                <router-link to="/" class="router-link-exact-active router-link-active">购物商城</router-link>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(subitem, subindex) in item.subcates" :key="subindex">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(subitem, subindex) in item.subcates" :key="subindex" href="#">{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box block">
                                <el-carousel class="slides">
                                    <el-carousel-item v-for="(item, index) in sliderlist" :key="index">
                                        <router-link :to="'/goods/'+item.id">
                                            <img style="width: 100%;height:100%;" :src="item.img_url" draggable="false">
                                        </router-link>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="index">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <router-link :to="'/goods/'+item.id">{{item.title}}</router-link>
                                    <span>{{item.add_time | dateFormat}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(item, index) in catedata" :key="index" class="section">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(level2item, level2index) in item.level2catelist" :key="level2index">{{level2item.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(dataitem, dataindex) in item.datas" :key="dataindex">
                            <router-link :to="'/goods/' + dataitem.artID">
                                <div class="img-box">
                                    <!-- <img :src="dataitem.img_url"> -->
                                    <img v-lazy="dataitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{dataitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{dataitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{dataitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{dataitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                catelist: [],
                sliderlist: [],
                toplist: [],
                catedata: []
            };
        },
        created() {
            this.$axios
                .get("site/goods/gettopdata/goods")
                .then(response => {
                    this.catelist = response.data.message.catelist;
                    this.sliderlist = response.data.message.sliderlist;
                    this.toplist = response.data.message.toplist;
                });
            this.$axios
                .get("site/goods/getgoodsgroup")
                .then(response => {
                    this.catedata = response.data.message;
                });
        }
    };
</script>
<style>
    body {
        background-color: transparent;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }
</style>