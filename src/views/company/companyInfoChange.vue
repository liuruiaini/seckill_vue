
<template >

  <div id="companyInfoChange">
    <div class="title">
      <div class="title-left">
         <p style="margin-top: 10px">修改信息</p>
      </div>
      <div class="title-right">
        <a style="text-decoration: none;color: #1999B9FF;"  href="http://localhost:8080/companyInfo"><p style="margin-top: 15px;margin-left: 1200px"><i class="el-icon-thumb"></i>  返回上一页</p></a>
      </div>

    </div>
    <div class="main">
      <div class="top-1">
          <el-button style="margin-left: 1000px;margin-top: 70px" @click="download">取消</el-button>
          <el-button style="background-color:  #1999B9FF;border-style: none" type="primary" @click="updateInfo" >保存</el-button>
        </div>
      <p style="text-align: left">一.工商信息</p>
      <div class="registerInfo-1">
        <div class="r-line1">
          企业类型：
          <el-radio v-model="CompanyRegisteredInfo.companyType" label="1">有限责任公司</el-radio>
          <el-radio v-model="CompanyRegisteredInfo.companyType" label="2">个体工商户</el-radio>
          <el-radio v-model="CompanyRegisteredInfo.companyType" label="3">个人独资企业</el-radio>
          <el-radio v-model="CompanyRegisteredInfo.companyType" label="4">其他</el-radio>
        </div>
        <div class="r-line2">

        <span>统一社会信用代码：<el-input style="width: 200px;margin-left: 0px"  v-model="CompanyRegisteredInfo.companyCreditCode" ></el-input></span>
          <span style="margin-left: 160px">法定代表人：<el-input style="width: 100px;margin-left: 0px"  v-model="CompanyRegisteredInfo.companyCorporate" ></el-input></span>
        </div>
        <div class="r-line3">
          <span>住所：<el-input style="width: 300px;margin-left: 0px"  v-model="CompanyRegisteredInfo.companyLocation" ></el-input></span>
          <span style="margin-left: 150px">注册资本：<el-input style="width: 100px;margin-left: 0px"  v-model="CompanyRegisteredInfo.companyRegisteredCapital" ></el-input></span>
        </div>
        <div class="r-line4">
          <span>成立日期：
             <el-date-picker
                 v-model="CompanyRegisteredInfo.companyInitDate"
                 style="margin-left: 0px"
                 type="datetime"
                 :placeholder="CompanyRegisteredInfo.companyInitDate"
                 default-time="12:00:00">
            </el-date-picker>
          </span>
          <span style="margin-left: 285px">营业期限：
             <el-radio v-model="CompanyRegisteredInfo.companyPeriod" label=0>无期限</el-radio>
             <el-radio v-model="CompanyRegisteredInfo.companyPeriod" label=1>有期限</el-radio>
          </span>
        </div>
        <div class="r-line5">
          <span>
            <div style="display: inline;float: left;margin-left: 0px">经营范围：</div>
            <div style="display: inline;float: left;margin-left: 0px"><el-input
                type="textarea"
                :rows="3"
                style="margin-left: 0px;font-size: 10px;width: 850px"
                v-model="CompanyRegisteredInfo.companyRange">
                 </el-input></div>
          </span>
        </div>
        <div class="r-line6">
          <span style="float: left">营业执照：
          </span>
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8088/upload/uploadImg/"

            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
          <img v-if="CompanyRegisteredInfo.comyanyLicense" :src="CompanyRegisteredInfo.comyanyLicense" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
<!--          {{CompanyRegisteredInfo}}-->
        </div>
      </div>
      <p style="text-align: left">二.企业介绍</p>
      <div class="introduce">
        <div class="introduce-1">
          <div>
            <i class="el-icon-caret-right"></i><span>企业简介</span>
          </div>
          <div>
            <el-input
                type="textarea"
                :rows="3"
                style="margin-left: 0px;font-size: 10px;width: 850px"
                v-model="CompanyIntroduceInfo.companyBriefly">
            </el-input>
          </div>
        </div>
        <div class="introduce-2">
          <div>
            <i class="el-icon-caret-right" style="margin-top: 30px"></i><span style="margin-top: 30px">企业文化</span>
          </div>
          <div>
            <el-input
                type="textarea"
                :rows="3"
                style="margin-left: 0px;font-size: 10px;width: 850px"
                v-model="CompanyIntroduceInfo.companyCulture">
            </el-input>
          </div>
        </div>

      </div>
      <p style="text-align: left">三.商务信息</p>
      <div class="bussiness">
        <div class="bussiness-1">
     数据库返回的城市和科室的LIst：{{CompanyBussinessInfo}}<br>
         上一个选择器： {{inputValue}}<br>
         级联： {{selectedTwo}}
        </div>
        <div class="bussiness-2">
          核心业务领域：
          <el-tag
              :key="tag.departmentsName"
              v-for="tag in CompanyBussinessInfo.depList"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{tag.departmentsName}}
          </el-tag>
          <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue.departmentsName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 科室</el-button>


          <p style="margin-top: 20px">
            核心业务区域：
            <span v-for="(item,index) in CompanyBussinessInfo.chinaList" :key="index">
                 <el-tag type="info">{{item.name}}</el-tag>&nbsp;&nbsp;
            </span>
            <el-cascader
                :options="optionsTwo"
                v-model="selectedTwo"
                v-if="inputVisible1"
                placeholder="省市区二级联动"
                @change="handleInputConfirm1"
            ></el-cascader>
            <el-button v-else class="button-new-tag" size="small" @click="showInput1">+ 城市</el-button>
          </p>






        </div>
      </div>
      <p style="text-align: left">四.其他信息</p>
      <div class="others">
        <div class="others-1">
          <p ><i class="el-icon-caret-right"></i><span style="font-size: 12px">开户信息</span>
          </p>

          <el-divider></el-divider>
          <p style="margin-left: 400px;margin-bottom: 50px;margin-top: 70px">户名：<el-input style="width: 300px;margin-left: 0px"  v-model="CompanyOtherInfo.companyAccountName" ></el-input></p>
          <p style="margin-left: 400px;margin-bottom: 50px">开户银行：<el-input style="width: 300px;margin-left: 0px"  v-model="CompanyOtherInfo.companyBankName" ></el-input></p>
          <p style="margin-left: 400px;margin-bottom: 50px">税号：<el-input style="width: 200px;margin-left: 0px"  v-model="CompanyOtherInfo.companyTaxId" ></el-input></p>
          <p style="margin-left: 400px;margin-bottom: 50px">账号：<el-input style="width: 200px;margin-left: 0px"  v-model="CompanyOtherInfo.companyAccoutId" ></el-input></p>
          <p style="margin-left: 400px;margin-bottom: 50px">电话：<el-input style="width: 200px;margin-left: 0px"  v-model="CompanyOtherInfo.companyBankTel" ></el-input></p>
        </div>
        <div class="others-2">
          <p ><i class="el-icon-caret-right"></i><span style="font-size: 12px">完税证明</span></p>
          <el-divider></el-divider>
          <div class="others-2-pic-1">
            证明图片：
          </div>

          <div v-for="(item,index) in CompanyOtherInfo.companyTaxClearanceCertificateList" :key="index"  class="others-2-pic-2">
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
            <div v-else-if="item.includes('jpeg')" style="display: inline-block;
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
<!--            <el-upload-->
<!--                class="avatar-uploader"-->
<!--                action="http://localhost:8088/upload/uploadImg/"-->
<!--                v-else=""-->
<!--                :show-file-list="false"-->
<!--                :on-success="handleAvatarSuccess1"-->
<!--                :before-upload="beforeAvatarUpload">-->
<!--              <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--            </el-upload>-->
          </div>

        </div>
        <div class="others-3">
          <p style="margin-left: 0px"><i class="el-icon-caret-right"></i><span style="font-size: 12px">企业税率</span></p>
          <el-divider></el-divider>
          <p style="margin-left: 150px;margin-top: 50px;font-size: 13px">税率：<span style="color: gray">
               <el-radio v-model="CompanyOtherInfo.companyTaxRate" label=0>小规模3%</el-radio>
             <el-radio v-model="CompanyOtherInfo.companyTaxRate" label=1>一般规模6%</el-radio>
             </span></p>
        </div>
      </div>
<!--      {{CompanyOtherInfo}}-->
    </div>
  </div>
</template>
<script>
import { provinceAndCityData } from "element-china-area-data";

export default {
  name: "companyInfoChange",

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
      //depNameList:[],
      //企业其他信息
      CompanyOtherInfo:{},

      inputVisible: false,
      inputVisible1:false,
      inputValue: {
        departmentsId:null,
        departmentsName:'',
        departmentsState:1

      },
      optionsTwo: provinceAndCityData,
      selectedTwo: [ ],
      // imageUrl:""

    }
  },
  methods: {
    //下载报告
    download(){

    },
    //更新公司信息
    updateInfo(){
      let mapData={companyRegisteredInfo:this.CompanyRegisteredInfo,
        companyIntroduceInfo:this.CompanyIntroduceInfo,
        companyOtherInfo:this.CompanyOtherInfo,
        chinaList:this.CompanyBussinessInfo.chinaList,
        depList:this.CompanyBussinessInfo.depList};
       //let mapData = JSON.stringify(MapData)

      // this.$axios({
      //   method: "post",
      //   url: "http://localhost:8088/companyInfo/updateInfo/",
      //   data: mapData,
      //   headers: {
      //     'Content-Type': 'application/json;charset=UTF-8'
      //   }
      // })
        this.$axios.post("http://localhost:8088/companyInfo/updateInfo/",
            mapData
        ).then(rep=>{
          let message=rep.data.message;
          if(message=="代码正确"){
            this.$message.success('插入成功');
            this.$router.push('/companyInfo');
          }else {
            this.$message.error("插入失败")
          }
        })
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
        // this.CompanyOtherInfo.companyTaxClearanceCertificateList.push("end");
      });
    },
    handleAvatarSuccess(res) {
      let returnData=res;
      console.log(returnData);
      this.CompanyRegisteredInfo.comyanyLicense = returnData.t;
    },
    // handleAvatarSuccess1(res){
    //   let returnData=res;
    //   console.log(returnData);
    //   let index=this.CompanyOtherInfo.companyTaxClearanceCertificateList.indexOf("end");
    //   this.CompanyOtherInfo.companyTaxClearanceCertificateList.splice(index,1);
    //   this.CompanyOtherInfo.companyTaxClearanceCertificateList.push(returnData);
    //   this.CompanyOtherInfo.companyTaxClearanceCertificateList.push("end");
    //   this.imageUrl='';
    //
    // },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleClose(tag) {
      this.CompanyBussinessInfo.depList.splice(this.CompanyBussinessInfo.depList.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      // eslint-disable-next-line no-unused-vars
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
    },
    showInput1(){
      this.inputVisible1 = true;
    },
    handleInputConfirm() {
      let inputValueTemp = this.inputValue;
      if (inputValueTemp.departmentsName) {
        this.CompanyBussinessInfo.depList.push(inputValueTemp);
        console.log(this.CompanyBussinessInfo.depList);
      }
      this.inputVisible = false;
      //this.inputValue.departmentsName = '';
    },
    handleInputConfirm1(val){
      console.log(val);
      let inputValueTemp = {id:null,name:"",pid:null};
          inputValueTemp.id=this.selectedTwo[1];
          inputValueTemp.pid=this.selectedTwo[0];
      if (inputValueTemp) {
        this.CompanyBussinessInfo.chinaList.push(inputValueTemp);
        console.log(this.CompanyBussinessInfo.chinaList);
      }
      this.inputVisible1 = false;
    }

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
#companyInfoChange{
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
.top-1{

  height: 100px;
  margin-bottom: 10px;
}

.registerInfo-1{
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 530px;
  line-height: 20px;
  margin-bottom: 10px;
}
/*.registerInfo div{*/
/*  margin-left: 200px;*/
/*  height: 70px;*/
/*  font-size: 15px;*/
/*}*/

.r-line1{
  margin-top: 40px;
  margin-left: 200px;
  height: 70px;
  font-size: 15px;
}
.r-line2{

  margin-left: 200px;
  height: 70px;
  font-size: 15px;
}
.r-line3{

  margin-left: 200px;
  height: 70px;
  font-size: 15px;
}
.r-line4{

  margin-left: 200px;
  height: 70px;
  font-size: 15px;
}
.r-line5{

  margin-left: 200px;
  height: 70px;
  font-size: 15px;
}
.r-line6{
  margin-left: 200px;
  height: 120px;
}
.introduce{
  border-style: dashed;
  border-width: 1px;
  border-color: #C8CBD0FF;
  height: 250px;
  line-height: 20px;
  margin-bottom: 10px;
  font-size: small;
}
.introduce-1{
  margin-top: 30px;
  margin-left: 50px;
}
.introduce-2{
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
  height: 1100px;
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
.title {
  height: 40px;
  margin-bottom: 10px;
}
.title-left{
  display: inline-block;
  float: left;
  height: 40px;
  width: 100px;
  border-left-style: solid;
  border-top-style: solid;
  border-right-style: solid;

  border-width: 1px;
  border-color: #C8CBD0FF;
  border-radius: 2px;
  color: #1999B9FF;
  text-align: center;
  line-height: 15px;
  font-size: 15px;

}
.title-right{
  display: inline-block;
  float: left;
  height: 40px;
  width: 1470px;
  border-bottom-style: solid;

  border-width: 1px;
  border-color: #C8CBD0FF;
  border-radius: 2px;
  color: #1999B9FF;
  text-align: center;
  line-height: 15px;
  font-size: 15px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 120px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 120px;
  display: block;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>