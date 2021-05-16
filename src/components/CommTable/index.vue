<template>
  <div class="home">
    <!-- 表单部分 -->
    <!-- 按钮部分 -->
    <!-- <div class="button">
      <div class="button-left">
        <div v-for="i in ButtonLeft" :key="i.name" class="button-left-sub">
          <el-button size="small" :type="i.type" @click="i.onClick" v-if="!i.hide" :icon="i.icon ? i.icon : ''">{{i.name}}</el-button>
        </div>
      </div>
      <div class="button-right"> -->
        <!-- <div v-for="i in ButtonRight" :key="i.name" class="button-right-sub">
          <el-button size="small" :type="i.type" @click="i.onClick" v-if="!i.hide" :icon="i.icon ? i.icon : ''">{{i.name}}</el-button>
        </div> -->
        <!-- <el-button @click="exportExcel" type="primary">导出excel</el-button> -->
      <!-- </div> -->
    <!-- </div> -->
    <div class="button">
      <div class="button-right">
        <div v-for="i in ButtonRight" :key="i.name" class="button-right-sub">
        <el-button size="small" :type="i.type" @click="i.onClick" v-if="!i.hide" :icon="i.icon ? i.icon : ''">{{i.name}}</el-button>
        </div>
        <el-button @click="exportExcel" type="primary">导出excel</el-button>
      </div>
    </div>
    <!-- 表格部分 -->
    <el-table
      height="100%"
      size="mini"
      :stripe="true"
      ref="commonTable"
      :data="tableData"
      border
      v-loading="loading"
      highlight-current-row
      :span-method="!spanArr.length ? null : objectSpanMethod"
      @current-change="handleClick"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column v-if="selection && columns.length" type="selection" width="40"></el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="left"
        v-if="isShowIndex && columns.length"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <!-- 有分页时，序号显示 -->
          <span v-if="pageObj">{{(pageObj.currentPage - 1)*pageObj.size + scope.$index + 1}}</span>
          <!-- 无分页时，序号显示 -->
          <span v-else>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <slot v-if="col.slot" :name="col.slot"></slot>
        <!-- 普通列 -->
        <el-table-column
          v-else
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
      </template>
    </el-table>
    <!-- 是否调用分页 -->
    <div class="pagination">
      <el-pagination
        v-if="pageObj"
        background
        layout=" total,prev, pager, next, sizes, jumper"
        :pager-count="5"
        :page-sizes="pageObj.sizes"
        :page-size="pageObj.size"
        :total="pageObj.total"
        :current-page="pageObj.currentPage"
        @size-change="pageObj.sizeFunc"
        @current-change="pageObj.func"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: "dataTable",
  props: {
    ButtonRight: {
      type: Array,
      default: () => [],
    },
    // ButtonLeft: {
    //   type: Array,
    //   default: () => [],
    // },
    //合并列表方法
    spanArr: {
      type: Array,
      default: () => [],
    },
    //需要合并行的第几列
    mergeColumns: {
      type: Number,
      default: () => 0,
    },
    //是否可勾选
    selection: {
      type: Boolean,
      default: () => true,
    },
    //列表数据
    tableData: {
      type: Array,
      default: () => [],
    },
    //表头
    columns: {
      type: Array,
      default: () => [],
    },
    //是否需要序号
    isShowIndex: {
      type: Boolean,
      default: () => false,
    },
    //加载
    loading: {
      type: Boolean,
      default: () => false,
    },
    //分页组件
    pageObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
        excelData: [ // 导出xlxs的数据
          ["设备名称", "估算价格（万元）", "主要功能和用途", "主要性能参数",  
          "预期效益", "主要使用学科", "可共享的其他学科",  "建议人", "电话", "所在单位(具体到研究室)"],
        ]
    };
  },
  methods: {
    //勾选的数据
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    //点击某一行返回行数据
    handleClick(val) {
      this.$emit("handleClick", val);
    },
    tableRowClassName({ row, rowIndex }) {
      //添加行序号
      row.index = rowIndex;
      //根据条件设置行的字体颜色
      // if (row.username == '1' ) {
      //   return "color1";
      // } else if (row.username == '2') {
      //   return "color2";
      // }
    },
    //合并行
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === this.mergeColumns) {
        const _row = this.spanArr[rowIndex]; //需要合并的行数
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
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
  },
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>