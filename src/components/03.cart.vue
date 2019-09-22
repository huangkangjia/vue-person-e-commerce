<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link> &gt;
                <router-link to="/cart">购物车</router-link>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <Checkbox v-model="isSelectedAll" @on-change="selectAll"></Checkbox>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item) in cartList" :key="item.id">
                                    <td width="48" align="center">
                                        <Checkbox v-model="item.isSelected"></Checkbox>
                                    </td>
                                    <td align="left" colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;<img :src="item.img_url" alt=""
                                            width="60" style="vertical-align: middle">&nbsp;&nbsp;&nbsp;&nbsp;{{item.title}}</td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number @change="changeGoodsNum(item.id, item.buycount)" :min="0"
                                            v-model="item.buycount"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center"><Button @click="deleteOneGoods(item.id)" type="error"
                                            shape="circle" icon="md-trash"></Button></td>
                                </tr>
                                <tr v-if="!cartList.length">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/">马上去购物</router-link>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalQuantity}}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link style="color:#fff" to="/" tag="button" class="button">继续购物</router-link>
                            <router-link style="color:#fff" to="/order" tag="button" class="submit">立即结算</router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cart",
        data() {
            return {
                cartList: [],
                isSelectedAll: false,
                tempGoodsNum: 0
            };
        },
        created() {
            let ids = [];
            for (const key in this.$store.state.cartInfo) {
                ids.push(key);
            }
            if (!ids.length) return;
            this.$axios.get("site/comment/getshopcargoods/" + ids.join()).then(res => {
                this.cartList = res.data.message;
                this.cartList.forEach((v, i) => {
                    // v.isSelected = true;
                    this.$set(this.cartList[i], "isSelected", true);
                    v.buycount = this.$store.state.cartInfo[v.id];
                });
            });
        },
        watch: {
            cartList: {
                handler() {
                    let tempArr = this.cartList.filter(v => {
                        return v["isSelected"];
                    });
                    this.isSelectedAll = tempArr.length == this.cartList.length;
                },
                deep: true
            }
        },
        methods: {
            selectAll(val) {
                this.cartList.forEach(v => {
                    v["isSelected"] = val;
                });
            },
            changeGoodsNum(id, val) {
                let isSelected = val === 0 ? false : true
                this.cartList.forEach(v => {
                    if (v.id === id) v.isSelected = isSelected
                })
                this.$store.commit("updateGoodsInfo", {
                    id: id,
                    buycount: val
                });
            },
            deleteOneGoods(id) {
                this.$store.commit('deleteGoods', id)
                this.cartList.forEach((v, i) => {
                    if (v.id === id) {
                        this.cartList.splice(i, 1)
                    }
                })
            }
        },
        computed: {
            totalQuantity() {
                let num = 0
                this.cartList.forEach(v => {
                    if (v.isSelected) num += v.buycount
                })
                return num
            },
            totalAmount() {
                let price = 0
                this.cartList.forEach(v => {
                    if (v.isSelected) price += v.buycount * v.sell_price
                })
                return price
            }
        }
    };
</script>

<style>
</style>