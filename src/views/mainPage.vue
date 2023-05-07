<template >
  <div id="mainPage">
   <div class="mainPage-head">
     秒杀商品表
   </div>
    <div class="mainPage-table">
      <el-table
          :data="goodsList"
          border
          style="width: 100%">
        <el-table-column
            prop="goodsName"
            label="商品名称"
            width="300">
        </el-table-column>
        <el-table-column
            prop="goodsImg"
            label="商品图片"
            width="300">
          <template slot-scope="scope">
            <el-image
                style="width: 100px; height: 100px"
                :src="getImage(scope.row.goodsImg)"
                fit="fill">
            </el-image>

          </template>
        </el-table-column>
          <el-table-column
            prop="goodsPrice"
            label="商品原价"
            width="300">
        </el-table-column>
        <el-table-column
            prop="seckillPrice"
            label="秒杀价"
            width="300">
        </el-table-column>
        <el-table-column
            prop="stockCount"
            label="库存数量"
            width="300">
        </el-table-column>
        <el-table-column
            prop="address"
            label="操作"
            width="300">
          <template slot-scope="scope">
<!--            <router-link :to="{name:'secGoodsDetail',params:{id:scope.row.id,token:this.token}}">-->
<!--              详情-->
<!--            </router-link>-->
            <el-link type="primary" @click="toSecGoods(scope.row.id)">详情</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    {{token}}
  </div>

</template>

<script>



export default {
  name: "mainPage",
  data() {
    return {
      employeeInfo:[],
      goodsList:[],
      token:''
    }
  },
  methods: {

    initEmployeeInfo(){//传token验证是否登陆
      this.$axios.get("http://localhost:8088/mainPage/initEmployeeInfo?").then(response => {
        this.employeeInfo=response.data.t;
        console.log(this.employeeInfo);
      });
    },
    initgoodsList(){//初始化秒杀商品列表
      this.$axios.get("http://localhost:80/goods11/goods/initTable?").then(response => {
        this.goodsList=response.data.t;
        console.log(this.goodsList);
      });
    },
    getImage(imagePath) {
      console.log(imagePath);
      return require('../assets/img/'+imagePath);
    },
    toSecGoods(id){
      this.$router.push({name:'secGoodsDetail',params:{id:id,token:this.token}});
    }


  },created: function () {
    // this.$axios.get("http://localhost:8088/mainPage.do?").then(response => {
    //   this.navDataList=response.data;
    //   // console.log(this.navDataList);
    // });
    //this.initEmployeeInfo();
    this.initgoodsList();
    this.token=this.$route.params.token;
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#mainPage{
  background-color: #EFF1F4FF;
}



</style>