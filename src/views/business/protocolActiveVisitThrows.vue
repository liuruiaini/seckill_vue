<template>
<div id="protocolActiveVisitThrows">
  <div class="title">
    <div class="title-left">
      <p style="margin-top: 10px">临床拜访标准</p>
    </div>
    <div class="title-right"></div>
    </div>
  <div class="protocolActiveVisitThrows-main">
    <el-table
        :data="visitThrowsInfoList"
        border
        style="width: 100%">
      <el-table-column
          type="index"
          label="序号"
          width="100"
           >
      </el-table-column>
      <el-table-column
          prop="visitThrowsName"
          label="检索项目"
          width="600">
      </el-table-column>
      <el-table-column
          prop="visitThrowsComtext"
          label="检索标准"
         >
      </el-table-column>

    </el-table>
  </div>

</div>
</template>

<script>
export default {
  name: "protocolActiveVisitThrows",
  data(){
    return{
      id:0,
      visitThrowsInfoList:[]
    }
  },
  methods:{
    initVisitThrowsInfoList(){
      this.$axios.get("http://localhost:8088/active/initVisitThrowsInfoList?activeId="+this.id).then(
          response => {
            var returnData=response.data;
            console.log(returnData);
            if (returnData.message == "代码正确") {

              this.visitThrowsInfoList = returnData.t;
            } else {
              this.$message.error('查询数据失败');
            }

          });
    }
  },
  created() {
    this.id=this.$route.query.id;
    this.initVisitThrowsInfoList();
  }
}
</script>

<style >
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

.protocolActiveVisitThrows-main {
  line-height: 35px;
  text-align: center;
}
</style>