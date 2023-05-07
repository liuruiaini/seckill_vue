<template>

  <div id="companyInfo">
    <div class="main">
      <div class="top" >
         <div class="top_1">
           <el-image
               style="width: 190px; height: 140px;margin-top: 10px;margin-left: 10px"
               src="http://rrz5xaeyu.hd-bkt.clouddn.com/3150d2ea-b586-405e-a3b5-697d5e041220"
               fit="fill"></el-image>
         </div>
         <div class="top_2">
           <div class="top_2_1">
             <span style="float: left" >{{ CompanyBaseInfo.companyName }}</span><img style="float: left;margin-top: 5px" src="../../assets/img/mainPage/img_1.png" >
           </div>
           <el-divider class="el_divider_1"></el-divider>
           <div class="top_2_2" style="margin-top: 0px">
             <span style="float: left;font-size: small" >企业ID：{{ CompanyBaseInfo.companyId
               }}</span>
           </div>

         </div>
         <div class="top_3">
           <div class="top_3_1">
             资质评分:<span class="span1"><span class="span2">45</span>分</span>
           </div>
           <div class="top_3_2">
             <el-button @click="download">下载报告</el-button>
             <el-button type="primary" @click="updateInfo">去完善</el-button>
           </div>
         </div>
      </div>
      <p style="text-align: left">一.工商信息</p>
      <div class="registerInfo">
        <div class="r-line1">
          <span>企业类型：<span style="color: gray">
            {{ CompanyRegisteredInfo.companyType==1?"有限责任公司":""}}
            {{ CompanyRegisteredInfo.companyType==2?"个体工商户":""}}
            {{ CompanyRegisteredInfo.companyType==3?"个人独资企业":""}}
            {{ CompanyRegisteredInfo.companyType==4?"其他":""}}
          </span></span>
        </div>
        <div class="r-line2">
          <span>统一社会信用代码：<span style="color: gray">{{ CompanyRegisteredInfo.companyCreditCode }}</span></span>
          <span style="margin-left: 200px">法定代表人：<span style="color: gray">{{ CompanyRegisteredInfo.companyCorporate }}</span></span>
        </div>
        <div class="r-line3">
          <span>住所：<span style="color: gray">{{ CompanyRegisteredInfo.companyLocation }}</span></span>
          <span style="margin-left: 210px">注册资本：<span style="color: gray">{{ CompanyRegisteredInfo.companyRegisteredCapital }}元</span></span>
        </div>
        <div class="r-line4">
          <span>成立日期：<span style="color: gray">{{ CompanyRegisteredInfo.companyInitDate }}</span></span>
          <span style="margin-left: 285px">营业期限：<span style="color: gray">{{ CompanyRegisteredInfo.companyPeriod==0?"无期限":"" }}
          {{ CompanyRegisteredInfo.companyPeriod==1?"有期限":"" }}
          </span></span>
        </div>
        <div class="r-line5">
          经营范围：<span style="color: gray">{{ CompanyRegisteredInfo.companyRange }}</span>
        </div>
        <div class="r-line6">
          <span style="float: left">营业执照：</span><el-image
            style="width: 150px; height: 100px;margin-top: 0px;margin-left: 0px"
            :src="this.CompanyRegisteredInfo.comyanyLicense"
            fit="fill"></el-image>
        </div>
      </div>
      <p style="text-align: left">二.企业介绍</p>
      <div class="introduce">
        <div class="introduce-1">
          <i class="el-icon-caret-right"></i><span>企业简介</span>
          &nbsp;&nbsp;&nbsp;<p style="color: gray" >{{CompanyIntroduceInfo.companyBriefly}}</p>
          <i class="el-icon-caret-right" style="margin-top: 30px"></i><span style="margin-top: 30px">企业文化</span>
          &nbsp;&nbsp;&nbsp;<p style="color: gray">{{CompanyIntroduceInfo.companyCulture}}</p>
        </div>

      </div>
      <p style="text-align: left">三.商务信息</p>
      <div class="bussiness">
        <div class="bussiness-1">

        </div>
        <div class="bussiness-2">
          核心业务领域：<span v-for="(item,index) in CompanyBussinessInfo.depList" :key="index">
<!--                             <el-tag type="info">消化科</el-tag>&nbsp;&nbsp;-->
<!--                            <el-tag type="info">肾内科</el-tag>&nbsp;&nbsp;-->
<!--                            <el-tag type="info">肿瘤科</el-tag>&nbsp;&nbsp;-->
<!--                             <el-tag type="info">心血管科</el-tag>&nbsp;&nbsp;-->
<!--                             <el-tag type="info">内分泌科</el-tag>&nbsp;&nbsp;-->
<!--                             <el-tag type="info">老年科</el-tag>&nbsp;&nbsp;-->
<!--                             <el-tag type="info">康复医学科</el-tag>&nbsp;&nbsp;-->
<!--                             <el-tag type="info">精神心理科</el-tag>&nbsp;&nbsp;-->


               <el-tag  type="info">
                 {{item.departmentsName}}
               </el-tag>&nbsp;&nbsp;
             </span>
             <p style="margin-top: 20px">
               核心业务区域：
               <span v-for="(item,index) in CompanyBussinessInfo.chinaList" :key="index">
                 <el-tag type="info">{{item.name}}</el-tag>&nbsp;&nbsp;
               </span>
             </p>
        </div>
      </div>
      <p style="text-align: left">四.其他信息</p>
      <div class="others">
           <div class="others-1">
             <p ><i class="el-icon-caret-right"></i><span style="font-size: 12px">开户信息</span></p>
             <el-divider></el-divider>
             <p style="margin-left: 400px;margin-bottom: 50px;margin-top: 70px">户名：<span style="color: gray">{{ CompanyOtherInfo.companyAccountName }}</span></p>
             <p style="margin-left: 400px;margin-bottom: 50px">开户银行：<span style="color: gray">{{ CompanyOtherInfo.companyTaxId }}</span></p>
             <p style="margin-left: 400px;margin-bottom: 50px">户名：<span style="color: gray">{{ CompanyOtherInfo.companyBankName }}</span></p>
             <p style="margin-left: 400px;margin-bottom: 50px">账号：<span style="color: gray">{{ CompanyOtherInfo.companyAccoutId }}</span></p>
             <p style="margin-left: 400px;margin-bottom: 50px">电话：<span style="color: gray">{{ CompanyOtherInfo.companyBankTel }}</span></p>
           </div>
           <div class="others-2">
             <p ><i class="el-icon-caret-right"></i><span style="font-size: 12px">完税证明</span></p>
             <el-divider></el-divider>
             <div class="others-2-pic-1">
               证明图片：
             </div>
             <div v-for="(item,index) in CompanyOtherInfo.companyTaxClearanceCertificateList" :key="index"  class="others-2-pic-2">

<!--               <div>-->
<!--                 <div>-->
<!--                   <el-image-->
<!--                       style="width: 40px; height: 48px;margin-left: 40px;margin-top: 20px"-->
<!--                       src="https://img.hooshine.com/2020/5/7/icon_pdf@2x-20200507104942568.png"-->
<!--                       fit="fill"></el-image>-->
<!--                 </div>-->
<!--                 <div>-->
<!--                   <a href="http://rrz5xaeyu.hd-bkt.clouddn.com/tax2.pdf"-->
<!--                      style="text-decoration: none;margin-left: 50px;color: gray">-->
<!--                     <i class="el-icon-view"></i>-->
<!--                   </a>-->
<!--                 </div>-->
<!--               </div>-->
<!--               <div>-->
<!--                 <div>-->
<!--                   <el-image-->
<!--                       style="width: 40px; height: 48px;margin-left: 40px;margin-top: 20px"-->
<!--                       src="https://img.hooshine.com/2020/5/7/icon_pdf@2x-20200507104942568.png"-->
<!--                       fit="fill"></el-image>-->
<!--                 </div>-->
<!--                 <div>-->
<!--                   <a href="http://rrz5xaeyu.hd-bkt.clouddn.com/tax2.pdf"-->
<!--                      style="text-decoration: none;margin-left: 50px;color: gray">-->
<!--                     <i class="el-icon-view"></i>-->
<!--                   </a>-->
<!--                 </div>-->
<!--               </div>-->
<!--               <div>-->
<!--                 <div>-->
<!--                   <el-image-->
<!--                       style="width: 40px; height: 48px;margin-left: 40px;margin-top: 20px"-->
<!--                       src="https://img.hooshine.com/2020/5/7/icon_pdf@2x-20200507104942568.png"-->
<!--                       fit="fill"></el-image>-->
<!--                 </div>-->
<!--                 <div>-->
<!--                   <a href="http://rrz5xaeyu.hd-bkt.clouddn.com/tax2.pdf"-->
<!--                      style="text-decoration: none;margin-left: 50px;color: gray">-->
<!--                     <i class="el-icon-view"></i>-->
<!--                   </a>-->
<!--                 </div>-->
<!--               </div>-->
<!--               <div>-->
<!--                 <div>-->
<!--                   <el-image-->
<!--                       style="width: 40px; height: 48px;margin-left: 40px;margin-top: 20px"-->
<!--                       src="https://img.hooshine.com/2020/5/7/icon_pdf@2x-20200507104942568.png"-->
<!--                       fit="fill"></el-image>-->
<!--                 </div>-->
<!--                 <div>-->
<!--                   <a href="http://rrz5xaeyu.hd-bkt.clouddn.com/tax2.pdf"-->
<!--                      style="text-decoration: none;margin-left: 50px;color: gray">-->
<!--                     <i class="el-icon-view"></i>-->
<!--                   </a>-->
<!--                 </div>-->
<!--               </div>-->
<!--               <div>-->
<!--                 <el-image-->
<!--                     style="width: 120px; height: 90px;margin-top: 5px;margin-bottom: 5px;margin-left: 5px;margin-right: 5px"-->
<!--                     src="http://rrz5xaeyu.hd-bkt.clouddn.com/tax3.jpeg"-->
<!--                     fit="fill"></el-image>-->
<!--               </div>-->
<!--               <div>-->
<!--                 <el-image-->
<!--                     style="width: 120px; height: 90px;margin-top: 5px;margin-bottom: 5px;margin-left: 5px;margin-right: 5px"-->
<!--                     src="http://rrz5xaeyu.hd-bkt.clouddn.com/tax3.jpeg"-->
<!--                     fit="fill"></el-image>-->
<!--               </div>-->
<!--               <div>-->
<!--                 <el-image-->
<!--                     style="width: 120px; height: 90px;margin-top: 5px;margin-bottom: 5px;margin-left: 5px;margin-right: 5px"-->
<!--                     src="http://rrz5xaeyu.hd-bkt.clouddn.com/tax3.jpeg"-->
<!--                     fit="fill"></el-image>-->
<!--               </div>-->
<!--               <div>-->
<!--                 <el-image-->
<!--                     style="width: 120px; height: 90px;margin-top: 5px;margin-bottom: 5px;margin-left: 5px;margin-right: 5px"-->
<!--                     src="http://rrz5xaeyu.hd-bkt.clouddn.com/tax3.jpeg"-->
<!--                     fit="fill"></el-image>-->
<!--               </div>-->
                 <div v-if="item.includes('pdf')" style="display: inline-block;
                                                          float: left;
                                                          width: 130px;
                                                          height: 100px;
                                                          border-style:solid;
                                                          border-width: 1px;
                                                          border-color: #C8CBD0FF;
                                                          border-radius: 10px;
                                                          margin-right: 10px;
                                                          margin-bottom: 10px;">
                   <div>
                     <el-image
                         style="width: 40px; height: 48px;margin-left: 40px;margin-top: 20px"
                         src="https://img.hooshine.com/2020/5/7/icon_pdf@2x-20200507104942568.png"
                         fit="fill"></el-image>
                   </div>
                   <div>
                     <a :href="item"
                        style="text-decoration: none;margin-left: 50px;color: gray">
                       <i class="el-icon-view"></i>
                     </a>
                   </div>
                 </div>
                 <div v-else="" style="display: inline-block;
  float: left;
  width: 130px;
  height: 100px;
  border-style:solid;
  border-width: 1px;
  border-color: #C8CBD0FF;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;">
                   <el-image
                       style="width: 120px; height: 90px;margin-top: 5px;margin-bottom: 5px;margin-left: 5px;margin-right: 5px"
                       :src="item"
                       fit="fill"></el-image>
                 </div>



             </div>
           </div>
           <div class="others-3">
             <p style="margin-left: 0px"><i class="el-icon-caret-right"></i><span style="font-size: 12px">企业税率</span></p>
             <el-divider></el-divider>
             <p style="margin-left: 150px;margin-top: 50px;font-size: 13px">税率：<span style="color: gray">
               {{CompanyOtherInfo.companyTaxRate==0?"小规模3%":""}}
               {{CompanyOtherInfo.companyTaxRate==1?"一般纳税人3%":""}}
             </span></p>
           </div>
      </div>
    </div>


  </div>
</template>


<script>
//import {right} from "core-js/internals/array-reduce";

export default {
  name: "companyInfo",

  data() {
    return {
      //企业基础信息
      CompanyBaseInfo:{},
      //企业工商信息(注册信息)
      CompanyRegisteredInfo:{},
      //企业介绍
      CompanyIntroduceInfo:{},
      //企业商务信息
      CompanyBussinessInfo:{
        chinaList:[],
        depList:[]
      },
      //企业其他信息
      CompanyOtherInfo:{}
    }

  },
  methods: {
    //下载报告
    download(){

    },
    //更新公司信息
    updateInfo(){
      this.$router.push('/companyInfoChange');
    },
    //初始化企业基础信息
    initCompanyBaseInfo(){
      this.$axios.get("http://localhost:8088/companyInfo/initCompanyBaseInfo?").then(response => {
        this.CompanyBaseInfo = response.data.t;
        console.log(this.CompanyBaseInfo);
      });
    },
    //初始化企业工商信息
    initCompanyRegisteredInfo(){
      this.$axios.get("http://localhost:8088/companyInfo/initCompanyRegisteredInfo?").then(response => {
        this.CompanyRegisteredInfo = response.data.t;
        console.log(this.CompanyRegisteredInfo);
      });
    },
    initCompanyIntroduceInfo(){
      this.$axios.get("http://localhost:8088/companyInfo/initCompanyIntroduceInfo?").then(response => {
        this.CompanyIntroduceInfo = response.data.t;
        console.log(this.CompanyIntroduceInfo);
      });
    },
    initCompanyBussinessInfo(){
      this.$axios.get("http://localhost:8088/companyInfo/initCompanyBussinessInfo?").then(response => {
        this.CompanyBussinessInfo = response.data.t;
        console.log(this.CompanyBussinessInfo);
      });
    },
    initCompanyOtherInfo(){
      this.$axios.get("http://localhost:8088/companyInfo/initCompanyOtherInfo?").then(response => {
        this.CompanyOtherInfo = response.data.t;
        console.log(this.CompanyOtherInfo);
      });
    },

  },
  created() {
    this.initCompanyBaseInfo();
    this.initCompanyRegisteredInfo();
    this.initCompanyIntroduceInfo();
    this.initCompanyBussinessInfo();
    this.initCompanyOtherInfo();
  }
}
</script>

<style>
#companyInfo{
  background-color: #ffffff;
  color: #333333FF;
  margin-left: 10px;
  margin-right: 10px;
  text-align: left;
  line-height: 50px;



}
.main{
  margin-left: 160px;
  width: 1200px;
}
.top{
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 160px;
  margin-bottom: 10px;
}
.top_1{
  width: 210px;
  height: 160px;
  display: inline-block;
  float: left;
  margin-right: 20px;

}
.el_divider_1{
  margin-bottom: 5px;
}
.top_2{
  width: 600px;
  height: 160px;
 display: inline-block;
  float: left;

}
.top_2_1{
  height: 30px;
  line-height: 40px;
  margin-top: 10px;
  font-size: larger;

}
.top_2_2{
  height: 30px;

  margin-top: 0px;

}
.top_3{
  width: 200px;
  height: 200px;
  display: inline-block;
  float: right;

}
.top_3_1{
  margin-top: 35px;
}
.span1{
  color: #FD8F01FF;
}
.span2{
  font-size: 50px;
}
.registerInfo{
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 500px;
  line-height: 20px;
  margin-bottom: 10px;
}
.registerInfo div{
  margin-left: 200px;
  height: 70px;
  font-size: 15px;
}
.r-line1{
  margin-top: 40px;
}
.introduce{
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 300px;
  line-height: 20px;
  margin-bottom: 10px;
  font-size: small;
}
.introduce-1{
  margin-top: 30px;
  margin-left: 50px;
}

.bussiness{
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 600px;
  line-height: 20px;
  margin-bottom: 10px;
}
.bussiness-1{
  height: 450px;
}
.bussiness-2{
  height: 150px;
  margin-left: 200px;
}
.others{
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 1050px;
  line-height: 20px;
  margin-bottom: 10px;
}
.others-1{
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
}
.others-2{
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  height: 300px;
}
.others-3{
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  height: 150px;
}
.others-2-pic-1{
  display: inline-block;
  float: left;
  width: 100px;
  height: 250px;
  margin-left: 250px;
}
.others-2-pic-2{
    display: inline-block;
    float: left;
    width: 130px;
    height: 100px;
    border-style:solid;
    border-width: 1px;
    border-color: #C8CBD0FF;
    border-radius: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
}

/*.others-2-pic-2>div{*/
/*  display: inline-block;*/
/*  float: left;*/
/*  width: 130px;*/
/*  height: 100px;*/
/*  border-style:solid;*/
/*  border-width: 1px;*/
/*  border-color: #C8CBD0FF;*/
/*  border-radius: 10px;*/
/*  margin-right: 10px;*/
/*  margin-bottom: 10px;*/
/*}*/
</style>