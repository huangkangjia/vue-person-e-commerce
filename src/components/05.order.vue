<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form ref="orderForm" :model="orderForm" label-width="320px" :rules="ruleValidate"
                            label-position="right">
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名：" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width: 450px"></el-input>
                                        <span class="Validform_checktip">&nbsp;&nbsp;收货人姓名</span>
                                    </el-form-item>
                                    <el-form-item label="所属地区：" required>
                                        <v-distpicker :placeholders="dpPlaceholder" style="width: 450px;display: inline-block;"
                                            @selected="selectArea"></v-distpicker>
                                        <span class="Validform_checktip">&nbsp;&nbsp;请选择您所在的地区</span>
                                    </el-form-item>
                                    <el-form-item label="详细地址：" prop="address">
                                        <el-input v-model="orderForm.address" style="width: 450px"></el-input>
                                        <span class="Validform_checktip">&nbsp;&nbsp;除上面所属地区外的详细地址</span>
                                    </el-form-item>
                                    <el-form-item label="手机号码：" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width: 450px"></el-input>
                                        <span class="Validform_checktip">&nbsp;&nbsp;收货人的手机号码</span>
                                    </el-form-item>
                                    <el-form-item label="联系电话：">
                                        <el-input v-model="orderForm.telphone" style="width: 450px"></el-input>
                                        <span class="Validform_checktip">&nbsp;&nbsp;收货人的联系电话，非必填</span>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱：" prop="email">
                                        <el-input v-model="orderForm.email" style="width: 450px"></el-input>
                                        <span class="Validform_checktip">&nbsp;&nbsp;方便通知订单状态，非必填</span>
                                    </el-form-item>
                                    <el-form-item label="邮政编码：" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width: 120px"></el-input>
                                        <span class="Validform_checktip">&nbsp;&nbsp;所在地区的邮政编码，非必填</span>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <!-- 单选框组 -->
                                <el-form-item label-width="60px" style="margin-top:24px">
                                    <el-radio-group v-model="orderForm.payment_id">
                                        <el-radio :label="1">在线支付<em style="font-style:normal;color:#999;font-size:12px">&nbsp;&nbsp;手续费：0.00元</em></el-radio>

                                    </el-radio-group>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <el-form-item label-width="60px" style="margin-top:24px">
                                    <el-radio-group v-model="orderForm.express_id" @change="setExpressMoment">
                                        <el-radio :label="1">顺丰快递<em style="font-style:normal;color:#999;font-size:12px">&nbsp;&nbsp;费用：20.00元</em></el-radio>
                                        <el-radio :label="2">圆通快递<em style="font-style:normal;color:#999;font-size:12px">&nbsp;&nbsp;费用：10.00元</em></el-radio>

                                    </el-radio-group>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item) in goodsList" :key="item.id">
                                            <td width="68">
                                                <router-link target="_blank" :to="'/goods/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link target="_blank" :to="'/goods/'+item.id">{{item.title}}</router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price|NumFormat}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price*item.buycount|NumFormat}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <el-form-item label="订单备注(100字符以内)" label-width="160px">
                                            <el-input type="textarea" v-model="orderForm.message" rows="2" resize="none"
                                                style="width: 600px;"></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalGoods}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp;
                                            商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice()|NumFormat}}</label>
                                            元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{(totalPrice() + orderForm.expressMoment)|NumFormat}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" @click="$router.go(-1)">返回购物车</a>
                                            <a id="btnSubmit" class="btn submit" @click="submitOrder">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from "v-distpicker";
    export default {
        name: "order",
        data() {
            const validateMobile = (rule, value, callback) => {
                let res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                    value
                );
                if (!res) callback(new Error("请输入正确的手机号码"));
                else callback();
            };
            const validatePost_code = (rule, value, callback) => {
                let res = /^[1-9]\d{5}(?!\d)$/.test(value);
                if (!res) callback(new Error("请输入正确的邮政编码"));
                else callback();
            };
            return {
                orderForm: {
                    goodsAmount: 0,
                    expressMoment: 0,
                    accept_name: "",
                    area: {
                        province: {},
                        city: {},
                        area: {}
                    },
                    address: "",
                    mobile: "",
                    telphone: "",
                    email: "",
                    post_code: "",
                    payment_id: "",
                    express_id: "",
                    message: "",
                    goodsids: "",
                    cargoodsobj: {}
                },
                dpPlaceholder: {
                    province: "所属省份",
                    city: "所属城市",
                    area: "所属地区"
                },
                goodsList: [],
                ruleValidate: {
                    accept_name: [{
                        required: true,
                        message: "名字不能为空",
                        trigger: "blur"
                    }],
                    address: [{
                        required: true,
                        message: "请填写详细地址",
                        trigger: "blur"
                    }],
                    mobile: [{
                            required: true,
                            message: "请填写手机号码",
                            trigger: "blur"
                        },
                        {
                            validator: validateMobile,
                            trigger: "change"
                        }
                    ],
                    email: [{
                        type: "email",
                        message: "请填写正确的邮箱地址",
                        trigger: "change"
                    }],
                    post_code: [{
                            required: false,
                            trigger: "blur"
                        },
                        {
                            validator: validatePost_code,
                            trigger: "change"
                        }
                    ]
                }
            };
        },
        components: {
            VDistpicker
        },
        created() {
            this.orderForm.cargoodsobj = this.$store.state.cartInfo;
            let ids = [];
            for (const key in this.orderForm.cargoodsobj) {
                ids.push(key);
            }
            this.orderForm.goodsids = ids.join();
            this.$axios
                .get("site/validate/order/getgoodslist/" + this.orderForm.goodsids)
                .then(res => {
                    this.goodsList = res.data.message;
                    this.goodsList.forEach((v, i) => {
                        v.buycount = this.$store.state.cartInfo[v.id];
                        if(v.buycount === 0) this.goodsList.splice(i, 1)
                    });
                });
        },
        computed: {
            totalGoods() {
                let num = 0;
                this.goodsList.forEach(v => {
                    num += v.buycount;
                });
                return num;
            }
        },
        methods: {
            selectArea(data) {
                this.orderForm.area = data;
            },
            submitOrder() {
                for (const key in this.orderForm) {
                    if(key != 'telphone' && key != 'email' && key != 'post_code' && key != 'message' && this.orderForm[key] == ''){
                        this.$Message.error('请将必填信息填写完整');
                        return
                    }
                }
                for (const key in this.orderForm.area) {
                    if (!this.orderForm.area[key].hasOwnProperty('value')) {
                        this.$Message.error('请选择所属地区');
                        return
                    }
                }
                this.$axios.post('site/validate/order/setorder',this.orderForm).then(res => {
                    if(res.data.status !== 0){
                        this.$Message.error('出错啦，请稍后重试');
                    }else {
                        this.$router.push('/orderPay/'+res.data.message.orderid)
                    }
                })
            },
            setExpressMoment(val) {
                switch (val) {
                    case 1:
                        this.orderForm.expressMoment = 20;
                        break;
                    case 2:
                        this.orderForm.expressMoment = 10;
                        break;
                    default:
                        break;
                }
            },
            totalPrice() {
                let price = 0;
                this.goodsList.forEach(v => {
                    price += v.buycount * v.sell_price;
                });
                this.orderForm.goodsAmount = price
                return price;
            }
        }
    };
</script>

<style>
    .distpicker-address-wrapper select {
        width: 140px;
    }
</style>