<template >
  <div id="secGoods">
   <div style="background-color: #8c939d">
     秒杀商品详情
   </div >
    <div style="height: 100px;border-bottom-style: solid;border-bottom-width: 1px">
      <el-row>
        <el-col :span="12">
          <div >
            商品名称：
          </div>
        </el-col>
        <el-col :span="12">
          <div >
            {{secGoods.goodsName}}
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height: 150px;border-bottom-style: solid;border-bottom-width: 1px">
      <el-row>
        <el-col :span="12">
          <div >
            商品图片：
          </div>
        </el-col>
        <el-col :span="12">
          <div >
            <el-image
                style="width: 100px; height: 100px"
                :src="getImage(this.secGoods.goodsImg)"
                fit="fill">
            </el-image>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height: 100px;border-bottom-style: solid;border-bottom-width: 1px">
      <el-row>
        <el-col :span="12">
          <div >
           秒杀
          </div>
        </el-col>
        <el-col :span="6">
          <div >
            <div v-if="state==0">
              秒杀尚未开始:{{countDownList}}
            </div>
            <div v-else-if="state==1" >
              秒杀剩余时间:{{countDownList}}
            </div>
            <div v-else>
              活动已经结束：{{countDownList}}
            </div>

          </div>
        </el-col>
        <el-col :span="6">
          <div >
            <el-button type="primary" :disabled="state!=1" @click="toOrder">秒杀</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height: 100px;border-bottom-style: solid;border-bottom-width: 1px">
      <el-row>
        <el-col :span="12">
          <div >
            商品原价：
          </div>
        </el-col>
        <el-col :span="12">
          <div >
            {{secGoods.goodsPrice}}
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height: 100px;border-bottom-style: solid;border-bottom-width: 1px">
      <el-row>
        <el-col :span="12">
          <div >
            秒杀价：
          </div>
        </el-col>
        <el-col :span="12">
          <div >
            {{secGoods.seckillPrice}}
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="height: 100px;border-bottom-style: solid;border-bottom-width: 1px">
      <el-row>
        <el-col :span="12">
          <div >
            商品数量：
          </div>
        </el-col>
        <el-col :span="12">
          <div >
            {{secGoods.stockCount}}
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      {{"......活动开始时间......"}}
      {{startDate}}
      {{"......活动结束时间......"}}
      {{endDate}}
      {{"......token......"}}{{token}}
    </div>
  </div>

</template>

<script>



export default {
  name: "mainPage",
  data() {
    return {
      id:0,
      token:'',
      secGoods:{},
      startDate:'',
      endDate:'',
      state:0,  //0.活动尚未开始 1.活动进行中 2.活动已结束
      countDownList: '00天00时00分00秒', //初始化时间

    }
  },
  methods: {

    initEmployeeInfo(){//传token验证是否登陆
      this.$axios.get("http://localhost:8088/mainPage/initEmployeeInfo?").then(response => {
        this.employeeInfo=response.data.t;
        console.log(this.employeeInfo);
      });
    },
    initSecGoods(){//初始化秒杀商品列表
      this.$axios.get("http://localhost:80/goods11/goods/findInitGoodsById?id="+this.id).then(response => {
        this.secGoods=response.data.t;
        this.startDate=response.data.t.startDate;

        this.endDate=response.data.t.endDate;

        console.log(this.secGoods);
        this.countDown();
      });
    },
    getImage(imagePath) {
      console.log(imagePath);
      return require('../assets/img/'+imagePath);
    },
    test(){

      let count=new Date().getTime()-new Date(this.startDate).getTime();

      console.log(count/1000);
    },
    timeFormat(param) {
      //（三元表达式）传入一个值，如果小于10，就在前面加0,如果大于0，就直接显示 传入9 ，返回09 传入30 返回30
      return param < 10 ? '0' + param : param;
    },

    countDown() {
        var interval = setInterval(() => { //(1)定时器
        let newTime = new Date().getTime();// (2)获取当前时间，同时得到活动结束时间数组
        let startTime = new Date(this.startDate).getTime();  // (3)对活动开始时间
          let endTime=new Date(this.endDate).getTime();//活动结束时间
        let obj = null; //（4）设置一个新的数组
        if (startTime - newTime > 0) {  // 如果活动尚未开始，对时间进行处理
          let time = (startTime - newTime) / 1000;
          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt(time % (60 * 60 * 24) / 3600);
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
          obj = {
            day: this.timeFormat(day),
            hour: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          };
          this.state=0;
        } else if (startTime - newTime < 0 && endTime-newTime>0){
          let time = (endTime - newTime) / 1000;
          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24));
          let hou = parseInt(time % (60 * 60 * 24) / 3600);
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
          obj = {
            day: this.timeFormat(day),
            hour: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
          this.state=1;
        }
        else { // 秒杀活动已结束，全部设置为'00'，默认值
          obj = {
            day: '00',
            hour: '00',
            min: '00',
            sec: '00'
          };
          this.state=2;
          clearInterval(interval); //（7）清除定时器
        }
        this.countDownList = obj.day + '天' + obj.hour + '时' + obj.min + '分' + obj.sec + '秒'; //（8）拼接字符串
      }, 1000);
    },
    toOrder(){
      this.$axios.get('http://localhost:80/goods11/goods/secKill',{
        headers:
            {
              'token': this.token
            },
        params:
            {
              id: this.id
            }
            }).then(response => {
              var returnData=response.data;
                   console.log(returnData)
        if (returnData.msg == "订单生成成功") {
          this.$message({
            message: '订单生成成功',
            type: 'success'
          });}
      });

    }





  },created: function () {
    // this.$axios.get("http://localhost:8088/mainPage.do?").then(response => {
    //   this.navDataList=response.data;
    //   // console.log(this.navDataList);
    // });
    //this.initEmployeeInfo();
    this.id = this.$route.params.id;
    this.token=this.$route.params.token;

    this.initSecGoods();

  },mounted() {

  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#secGoods{

}



</style>