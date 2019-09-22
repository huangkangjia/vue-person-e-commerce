<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}&nbsp;&nbsp;{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                    <!-- 测试按钮开始 -->
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>测试按钮</dt>
                                            <dd><a target="_blank" :href="'http://47.106.148.205:8899/site/validate/pay/alipay/' + $route.params.orderid">点击跳转</a></dd>
                                        </dl>
                                    </div>
                                    <!-- 测试按钮结束 -->
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/' + $route.params.orderid" :options="{ size: 200, level: 'H', padding: '10', foregroundAlpha: this.countdown <= 0 ? 0 : 1 }"></qrcode>
                                    <!-- <canvas width="300" height="300"></canvas> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueQrcode from "@xkeshi/vue-qrcode";
    export default {
        name: "orderPay",
        data() {
            return {
                orderInfo: {},
                intervalId: undefined,
                countdown: 10
            };
        },
        created() {
            this.$axios
                .get("site/validate/order/getorder/" + this.$route.params.orderid)
                .then(res => {
                    if (res.data.status !== 0) {
                        this.$router.push("/");
                    } else {
                        this.orderInfo = res.data.message[0];
                    }
                });
            this.intervalId = setInterval(() => {
                if(this.countdown <= 1) {
                    clearInterval(this.intervalId)
                    this.$Modal.info({
                        content: '操作超时，请重新刷新以继续支付'
                    });
                }
                this.$axios
                    .get("site/validate/order/getorder/" + this.$route.params.orderid)
                    .then(res => {
                        if (res.data.message[0].status === 2) {
                            this.$router.push("/paySuccess/");
                            clearInterval(this.intervalId);
                        }else {
                            -- this.countdown
                        }
                    });
            }, 1500);
        },
        components: {
            qrcode: VueQrcode
        },
        destroyed() {
            clearInterval(this.intervalId);
        }
    };
</script>

<style>

</style>