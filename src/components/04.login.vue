<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link> &gt;
                <router-link to="/login">会员登录</router-link>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box" @keyup.enter="login">
                        <el-input v-model.trim="user_name" placeholder="用户名/手机/邮箱" style="width: 342px;" />
                        <br><br><br>
                        <el-input v-model="password" placeholder="输入登录密码" type="password" style="width: 342px;" />
                        <br><br><br>
                        <div class="btn-box">
                            <Button @click="login" type="success" long>立即登录</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                user_name: "",
                password: ""
            };
        },
        beforeCreate() {
            this.$axios.get('site/account/islogin').then(res => {
                if (res.data.code === 'logined') this.$router.go(-1)
            })
        },
        methods: {
            login() {
                this.$Loading.start();
                this.$axios
                    .post("site/account/login", {
                        user_name: this.user_name,
                        password: this.password
                    })
                    .then(res => {
                        this.$Loading.finish();
                        this.$Message.info(res.data.message);
                        if (res.data.status === 0) {
                            this.$store.commit('toggleLoginStatus', true)
                            this.$router.go(-1)
                        }
                        this.user_name = "";
                        this.password = "";
                    });
            }
        }
    };
</script>

<style>
</style>