<template>
<div id="protocolDetail">
<!--{{protocolId}}-->
<!--  {{state}}-->
  <el-tabs v-model="activeName" type="card"  @tab-click="handleClick">
    <el-tab-pane label="协议详情" name="first">
      <div v-show="this.state==0"> <el-button type="primary"  style="background-color: #1999B9FF;margin-left: 1300px" @click="agreeSignIn">同意签约</el-button></div>
      <div class="info">
        <p style="font-size: 15px;color: #213C50FF;line-height: 20px">基本信息：</p>
        <div class="baseInfo">
               <p style="margin-left: 200px">签约号：<span style="color: gray">{{protocolInfo.protocolId}}</span></p>

               <p style="margin-left: 200px">
                 <span >甲方：<span style="color: gray">{{protocolInfo.jiaCompanyName}}</span></span>
                 <span style="margin-left: 200px">乙方：<span style="color: gray">{{protocolInfo.yiCompanyName}}</span></span>
               </p>
        </div>
        <p style="font-size: 15px;color: #213C50FF;line-height: 20px">签约信息：</p>
        <div class="signingInfo">


            <p style="margin-left: 200px"> <span>签约状态：<span style="color: gray">{{protocolInfo.state==1?"已签约":""}}{{protocolInfo.state==0?"等待签约":""}}</span ></span> <span style="margin-left: 300px">协议用途：</span></p>
             <p style="margin-left: 200px">签约方式：</p>
            <p style="margin-left: 200px">
              <span>甲方发起时间：<span style="color: gray">{{protocolInfo.jiaInitTime}}</span></span>
              <span style="margin-left: 200px">甲方发起人：<span style="color: gray">{{protocolInfo.jiaInitPerson}}</span></span>
            </p>
          <p style="margin-left: 200px">
            <span>乙方同意时间：<span style="color: gray">{{protocolInfo.yiInitTime}}</span></span>
            <span style="margin-left: 200px">乙方协议签订人：<span style="color: gray">{{protocolInfo.yiInitPerson}}</span></span>
          </p>

        </div>
        <p style="font-size: 15px;color: #213C50FF;line-height: 20px">业务信息：</p>
        <div class="businessInfo">
          <div style="margin-left: 200px;height: 200px;width:700px;">
            <div style="width:100px;height: 200px;display: inline-block;float: left">
              推广产品:
            </div>
          <div style="width:600px;height: 200px;display: inline-block;float: left;color: gray" >
            <p v-for="(value,index) in this.protocolInfo.productInfoList" :key="index">{{value.productName}}【{{value.productSize}}】，{{value.manufacturer}}</p>
          </div>
          </div>

          <p style="margin-left: 200px">
            <span>业务区域：<span style="color: gray">{{protocolInfo.protocolLocation}}</span></span>
            <span style="margin-left: 320px">协议预算：<span style="color: gray">{{protocolInfo.protocolLeftMoney}} 元</span></span>
          </p>

          <p style="margin-left: 200px">
            <span>推广周期：<span style="color: gray">{{protocolInfo.protocolInitTime}}至{{protocolInfo.protocolEndTime}}</span></span>
            <span style="margin-left: 200px">已完成推广任务：</span>
          </p>
          <p style="margin-left: 200px">推广协议:下载协议</p>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="预算管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="异常项检索标准" name="third">
      <div class="big-box" v-for="(item,key,index) in this.activeInfoList" :key="index">
        <div class="box">
          <div class="box-top">
            <i class="el-icon-s-order" ></i><span>{{item.activeName}}</span>
          </div>
          <div class="box-middle">
            <div style="height: 40px;line-height:40px;font-size: 8px;margin-top: 0px;margin-bottom: 0px">
              <span>已开启的检索</span>
            </div>
            <div style="height: 70px;font-size: 40px;margin-left: 30px">
              <div style="color: black;position: absolute;z-index: 30">
                {{item.num}}条
              </div>
              <div style="position:absolute;z-index: 20;line-height: 50px;font-size: 70px">
                <i class="el-icon-search" style="color:#DEE3DFFF"></i>
              </div>

            </div>
            <div style="height: 40px;line-height: 20px">
              <el-button type="primary" size="small" style="background-color: #1999B9FF;border-style: none" @click="quchakan(item.id)">去查看</el-button>
            </div>
          </div>

        </div>
      </div>


    </el-tab-pane>
    <el-tab-pane label="结算标准" name="fourth">
      <div style="width: 900px;height: 40px;border-style: solid;border-color: #188FFEFF;border-width:1px;border-radius:5px;background:#E5F6FEFF;line-height: 30px;font-size: 14px">
       <p style="margin-top: 5px;color: #8c939d"><i class="el-icon-warning" style="margin-left: 15px;margin-right:10px;color:#188FFEFF "></i>此处为与委托方签约登记时约定的结算标准，结算推广任务时应按此结算各推广服务项目</p>
      </div>
      <div style="line-height: 30px;margin-top: 20px">
        <el-table
            :data="activePayInfoList"
            border
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="activeName"
              label="推广服务项目"
              width="270">
          </el-table-column>
          <el-table-column
              prop="cityGrade"
              label="城市类型"
              width="270"
          >
            <template slot-scope="scope">
              {{scope.row.cityGrade==1?"一线城市":""}}
              {{scope.row.cityGrade==2?"新一线城市":""}}
              {{scope.row.cityGrade==3?"二线城市":""}}
              {{scope.row.cityGrade==4?"三线城市及以下城市":""}}

            </template>
          </el-table-column>
          <el-table-column
              prop="money"
              label="单价"
              width="270"
          >
          </el-table-column>
          <el-table-column
              prop="detail"
              label="标准说明"
          >
          </el-table-column>

        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import signIn from "@/views/Control/signIn.vue";

export default {
  name: "protocolDetail",
  computed: {
    signIn() {
      return signIn
    }
  },
  data(){
    return {
      protocolId:'',
      state:0,
      activeName: 'first',
      protocolInfo:{},
      activeInfoList:[],
      activePayInfoList:[]
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    findProtecolInfoById(){
      this.$axios.get("http://localhost:8088/protocol/findProtecolInfoById?ProtecolId=" + this.protocolId).then(
          response => {
             var returnData=response.data;
             console.log(returnData);
            if (returnData.message == "代码正确") {

              this.protocolInfo = returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    initActiveInfoList(){
      this.$axios.get("http://localhost:8088/active/initActiveInfoList?").then(
          response => {
            var returnData=response.data;
            console.log(returnData);
            if (returnData.message == "代码正确") {

              this.activeInfoList = returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    initActivePayInfoList(){
      this.$axios.get("http://localhost:8088/active/initActivePayInfoList?").then(
          response => {
            var returnData=response.data;
            console.log(returnData);
            if (returnData.message == "代码正确") {

              this.activePayInfoList = returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    },
    quchakan(val){
      console.log(val);
      this.$router.push({path:'/protocolActiveVisitThrows',query: {id:val}})
    },
    agreeSignIn(){
      this.$axios.get("http://localhost:8088/protocol/agreeSignIn?protecolId=" + this.protocolId).then(
          response => {
            var returnData=response.data;
            console.log(returnData);
            if (returnData.message == "代码正确") {
              this.$message.info('签约成功');

            } else {
              this.$message.error('签约失败');
            }

          });
    }
  },
  created() {
    this.protocolId = this.$route.query.protocolId;
    this.state = this.$route.query.state;
    this.findProtecolInfoById();
    this.initActiveInfoList();
    this.initActivePayInfoList();

  }
}
</script>

<style >
#protocolDetail{
  background-color: #ffffff;
  color: #333333FF;
  margin-left: 10px;
  margin-right: 10px;
  text-align: left;
  line-height: 50px;
}

.info {
  margin-left: 200px;
  margin-right: 200px;
  font-size: 15px;
}

.baseInfo {
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 150px;
  line-height: 60px;
  margin-bottom: 10px;
}

.signingInfo {
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 300px;
  line-height: 60px;
  margin-bottom: 10px;
}

.businessInfo {
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 500px;
  line-height: 60px;
  margin-bottom: 10px;
}

.box {



  background-color:#DFE4E0FF ;
  /*background: linear-gradient(to bottom right, #DFE4E0FF , #FDFDFEFF);*/
  border-radius: 10px;
  height: 240px;
  width: 180px;
  line-height: 60px;
  text-align: center;

}

.box-top {
  height: 50px;
  width: 180px;
  background-color: #F9F9F9FF;
  font-size: 20px;
  color: gray;
}

.big-box {
  display: inline-block;
  float: left;
  margin-right: 50px;
  margin-bottom: 50px;
  border-style: solid;
  border-width: 1px;
  border-color:#DFE4E0FF ;
  background-color:#F9F9F9FF ;

  border-radius: 10px;
  height: 250px;
  width: 180px;
  line-height: 60px;
}

.box-middle {
  height: 150px;
  width: 130px;
  margin-left: 25px;
  margin-top: 25px;
  background-color: #FDFDFEFF;
  border-radius: 5px;
  box-shadow: 2px 2px 1px gray;
  color: gray;

}
</style>