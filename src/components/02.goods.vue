<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link> &gt;
                <router-link to="/">购物商城</router-link> &gt;
                <router-link :to="'/goods/'+goodsId">商品详情</router-link>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" style="width: 30%">
                                <ProductZoomer v-if="images.normal_size.length" :base-images="images"
                                    :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="purchaseQuantity" :min="0" :max="goodsinfo.stock_quantity"
                                                    label="购买数量"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button @click="goToCheckout" class="buy">立即购买</button>
                                                <button @click="addToCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="showWhat='content'" href="javascript:;" :class="{'selected':showWhat=='content'}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="showWhat='comment'" href="javascript:;" :class="{'selected':showWhat=='comment'}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-show="showWhat=='content'" class="tab-content entry" style="display: flex;" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div v-show="showWhat=='comment'" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea @keyup.ctrl.enter="submitComment" v-model.trim="commenttxt"
                                                    id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000"
                                                    nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment" id="btnSubmit" name="submit" type="submit"
                                                    value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="comments.totalcount <= 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments.message" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFormat}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination layout="prev, pager, next" :total="comments.totalcount"
                                            prev-text="« 上一页" next-text="下一页 »" @prev-click="commentsPageIndex--"
                                            @next-click="commentsPageIndex++" @current-change="getComments">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="index">
                                        <div class="img-box">
                                            <router-link :to="'/goods/' + item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goods/' + item.id">{{item.title}}</router-link>
                                            <span>{{ item.update_time | dateFormat }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>

<script>
    export default {
        name: "goods",
        data() {
            return {
                goodsId: undefined,
                goodsinfo: {},
                hotgoodslist: [],
                commentsPageIndex: 1,
                comments: [],
                commenttxt: "",
                purchaseQuantity: 1,
                showWhat: "content",
                imglist: [],
                images: {
                    thumbs: [],
                    normal_size: [],
                    large_size: []
                },
                zoomerOptions: {
                    zoomFactor: 4,
                    pane: "pane",
                    hoverDelay: 300,
                    namespace: "container-zoomer",
                    move_by_click: false,
                    scroll_items: 4,
                    choosed_thumb_border_color: "#ff3d00"
                }
            };
        },
        created() {
            this.goodsId = this.$route.params.id;
            this.getGoods();
            this.getComments();
        },
        methods: {
            getGoods() {
                this.images.thumbs = [];
                this.images.normal_size = [];
                this.images.large_size = [];
                this.$axios
                    .get("site/goods/getgoodsinfo/" + this.goodsId)
                    .then(response => {
                        this.goodsinfo = response.data.message.goodsinfo;
                        this.hotgoodslist = response.data.message.hotgoodslist;
                        this.imglist = response.data.message.imglist;

                        this.imglist.forEach(v => {
                            this.images.thumbs.push({
                                id: v.id,
                                url: v.thumb_path
                            });
                            this.images.normal_size.push({
                                id: v.id,
                                url: v.original_path
                            });
                            this.images.large_size.push({
                                id: v.id,
                                url: v.original_path
                            });
                        });
                    });
            },
            submitComment() {
                if (this.commenttxt === "") return;
                this.$axios
                    .post("site/validate/comment/post/goods/" + this.goodsId, {
                        commenttxt: this.commenttxt
                    })
                    .then(response => {
                        if (response.data.message === "评论成功")
                            this.$router.push({
                                path: "/goods/" + this.goodsId + "?" + Date.now()
                            });
                        this.commenttxt = "";
                    });
            },
            getComments(pageIndex, pageSize) {
                pageSize = pageSize > 0 ? parseInt(pageSize) : 10;
                pageIndex = pageIndex || this.commentsPageIndex;
                this.$axios
                    .get("site/comment/getbypage/goods/" + this.goodsId, {
                        params: {
                            pageIndex: pageIndex,
                            pageSize: pageSize
                        }
                    })
                    .then(response => {
                        this.comments = response.data;
                    });
            },
            addToCart() {
                this.$Message.success("添加成功");
                this.$store.commit("addGoods", {
                    id: this.goodsId,
                    buycount: this.purchaseQuantity
                });
            },
            goToCheckout() {
                this.$store.commit("addGoods", {
                    id: this.goodsId,
                    buycount: this.purchaseQuantity
                });
                this.purchaseQuantity = 1;
                this.$router.push("/checkout");
            }
        },
        watch: {
            $route() {
                this.goodsId = this.$route.params.id;

                this.purchaseQuantity = 1;
                this.getGoods();
                this.getComments();
            }
        }
    };
</script>

<style lang="less">
    @import url("../assets/lib/magnifier.css");

    .comment-box .list-box li .inner-box p {
        min-height: 25px;
    }

    #goodsTabs .tab-content.entry {
        flex-direction: column;
        align-items: center;
    }

    #container-zoomer-pane-container {
        width: 300px !important;
        height: 300px !important;
        top: 20px !important;
        left: 320px !important;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
    }
</style>