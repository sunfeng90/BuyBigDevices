<!-- Json导出execl -->
<template>
  <div>
    <el-button @click="exportExcel" type="primary">导出excel</el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: "",
  props: {
  },
  data() {
    return {
        pageObj: {
          size: 1000,
          currentPage: 1,
        },
        excelData: [ // 导出xlxs的数据
          ["设备名称", "估算价格（万元）", "主要功能和用途", "主要性能参数",  
          "预期效益", "主要使用学科", "可共享的其他学科",  "建议人", "电话", "所在单位(具体到研究室)"],
        ]
        // defaultExcelData: this.excelData
    };
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    async exportExcel() {
      await this.getDeviceList();
      let sheet = XLSX.utils.aoa_to_sheet(this.excelData);
      sheet["!merges"] = [];
      this.openDownloadDialog(this.sheet2blob(sheet), "设备列表.xlsx");
      this.excelData =  [ // 导出xlxs的数据
        ["设备名称", "估算价格（万元）", "主要功能和用途", "主要性能参数",  
          "预期效益", "主要使用学科", "可共享的其他学科",  "建议人", "电话", "所在单位(具体到研究室)"],
      ]
    },
    sheet2blob(sheet, sheetName) {
      sheetName = sheetName || "sheet1";
      let workbook = {
        SheetNames: [sheetName],
        Sheets: {},
      };
      workbook.Sheets[sheetName] = sheet;
      // 生成excel的配置项
      let wopts = {
        bookType: "xlsx", // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: "binary",
      };
      let wbout = XLSX.write(workbook, wopts);
      let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
      // 字符串转ArrayBuffer
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      return blob;
    },
    openDownloadDialog(url, saveName) {
      if (typeof url == "object" && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      let aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      let event;
      if (window.MouseEvent) event = new MouseEvent("click");
      else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
      }
      aLink.dispatchEvent(event);
    },
    // 获取列表数据
    async getDeviceList(val) {
      let obj = {
        pageSize: this.pageObj.size,
        curPage: this.pageObj.currentPage,
        data:{
          keyword: val ? val.keyword : null
        }
      }
      return await this.$api.tableApi.deviceList(obj).then((res) => {
        if (res) {
          return this.formationExcelData(res.data);
        }
      });
    },
    formationExcelData(data) {
      if (data.length) {
        return data.forEach((item, index) => {
          return this.excelData.push([
            item['name'],
            item['price'],
            item['functions'],
            item['parameters'],
            item['benefit'],
            item['subject'],
            item['sharesubject'],
            item['person'],
            item['tel'],
            item['depart']
          ])
        });
      }
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>