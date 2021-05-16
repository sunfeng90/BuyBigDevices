<!-- 导出 -->
<template>
  <div class="G-home G-flex">
    <ExportPdf :pdfData="pdfData" />
    <ExportExcel class="G-mgl-5" :excelData="excelData" />
  </div>
</template>

<script>
import ExportPdf from "@/components/ExportPdf";
import ExportExcel from "@/components/ExportExcel";
export default {
  name: "export",
  components: {
    ExportPdf,
    ExportExcel,
  },
  data() {
    return {
      pageObj: {
        size: 1000,
        currentPage: 1,
      },
      excelData: [ // 导出xlxs的数据
        ["设备名称", "估算价格（万元）", "建议人", "联系电话", "可共享学科", "主要规格和技术参数", "主要功能及特色"],
      ],
      //导处pdf的数据
      pdfData: [
        { name: "设备名称" }, { price: "估算价格（万元）" }, {person: "建议人"}, {tel: "联系电话"}, {subject: "可共享学科"}, {parameters: "主要规格和技术参数"}, {functions: "主要功能及特色"},
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // this.getDeviceList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // //获取列表数据
    // getDeviceList(val) {
    //   let obj = {
    //     pageSize: this.pageObj.size,
    //     curPage: this.pageObj.currentPage,
    //     data:{
    //       keyword: val ? val.keyword : null
    //     }
    //   }
    //   this.$api.tableApi.deviceList(obj).then((res) => {
    //     if (res) {
    //       this.formationExcelData(res.data);
    //     }
    //   });
    // },
    // formationExcelData(data) {
    //   console.log('1')
    //   if (data.length) {
    //     this.excelData.push(data)
    //     console.log(this.excelData)
    //   }
    // }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>