<template>
  <div id="app">

  </div>
</template>

<script>
export default {
  name: "employee",
  data() {
    return {
      employeeInfo:{}
    }
  },
  methods: {
    initEmployeeInfo(){
      this.$axios.get("http://localhost:8088/mainPage/initEmployeeInfo?").then(response => {
        this.employeeInfo=response.data.t;
        console.log(this.employeeInfo);
      });
    }
  },
  created() {
    this.initEmployeeInfo();

  }
}
</script>

<style>
</style>
