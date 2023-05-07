<template>
  <div id="login">
    <el-form label-width="120px" ref="user" :model="user" v-bind:rules="rules">
      <h2 align="center">医彩药事</h2>
      <el-row>
        <el-col v-bind:span="6" :offset="8" >
          <el-form-item label="账号" prop="userName">
            <el-input v-model="user.userName" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col v-bind:span="6" :offset="8" >
          <el-form-item label="密码" prop="userPwd">
            <el-input type="password" v-model="user.userPwd" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-bind:span="6" :offset="8" >
          <el-form-item label="">
            <el-button @click="login()">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>

<script>
//import {query} from "vue/src/platforms/web/util";

export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        userPwd: ""

      },
      token:'',
      rules: {
        // rules的key是双向绑定的对象属性名
        userName: [{
          // 必填规则
          required: true,
          // 提示信息
          message: "请输入账号。。。",
          // 验证触发条件,事件类型
          trigger: "blur"
        }, {
          min: 5,
          max: 20,
          message: "长度要在10-20之间",
          trigger: "blur"
        }],
        userPwd: [{
          // 必填规则
          required: true,
          // 提示信息
          message: "请输入密码。。。",
          // 验证触发条件,事件类型
          trigger: "blur"
        }, {
          min: 3,
          max: 8,
          message: "长度要在3-8之间",
          trigger: "blur"
        }]
      }
    }
  },
  methods: {
    login(){
      this.$refs["user"].validate((flag)=>{// flag:表单数据验证的结果
        if(flag){
          // 将json的数据格式转为 name=value&name=value
          //var data1 = this.$qs.stringify(this.user);
          //console.log(data1);
          this.$axios.post("http://localhost:80/user11/user/login", this.user).then(response => {
            let returnData = response.data;
            //console.log(returnData);
            this.token=returnData.token;

            if (returnData.msg == "登录成功!!!") {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$router.push({name:'mainPage',params:{token:this.token}});
            }else{
              this.$message.error('登录失败');
            }

          });


        }else{
          // alert("数据验证失败");
          return false;
        }
      });

    }
  }
}
</script>

<style>

</style>