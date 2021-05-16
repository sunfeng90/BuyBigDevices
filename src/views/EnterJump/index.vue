<!-- 回车跳转 -->
<template>
  <div>
    <h1>2022年校大仪平台设备建议购置表（50万以上）</h1>
    <hr style="margin:20px 0" />
    <el-form ref="form" :model="form" label-width="80px" v-enterJump size="small">
      <el-form-item label="设备名称">
        <el-input v-model="form.name" v-focus placeholder="请输入设备名称（不能为空）"></el-input>
      </el-form-item>
      <el-form-item label="估算价格（万元）" label-width="135px">
        <el-input type="text" placeholder="请输入数字（不能为空）" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="主要功能和用途" label-width="120px">
        <el-input type="textarea" v-model="form.functions" rows=5></el-input>
      </el-form-item>
      <el-form-item label="主要性能参数" label-width="110px">
        <el-input type="textarea" v-model="form.parameters" rows=5></el-input>
      </el-form-item>
      <el-form-item label="预期效益" label-width="85px">
        <el-input v-model="form.benefit" placeholder="请输入预期效益"></el-input>
      </el-form-item>
      <el-form-item label="主要使用学科" label-width="115px">
        <el-input v-model="form.subject" placeholder="请输入主要使用学科（不能为空）"></el-input>
      </el-form-item>
      <el-form-item label="可共享的其他学科" label-width="140px">
        <el-input v-model="form.sharesubject" placeholder="请输入可共享的其他学科"></el-input>
      </el-form-item>
      <el-form-item label="建议人" label-width="70px">
        <el-input v-model="form.person" placeholder="请输入建议人（不能为空）"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="55px">
        <el-input v-model="form.tel" placeholder="请输入电话（不能为空）"></el-input>
      </el-form-item>
      <el-form-item label="所在单位(具体到研究室)" label-width="175px">
        <el-input v-model="form.depart" placeholder="请输入所在单位（不能为空）"></el-input>
      </el-form-item>
      <el-form-item label-width="400px">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onReset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// let self
export default {
  name: "enterjump",
  data() {
    return {
      form: {
        name: "",
        price: "",
        person: "",
        tel: "",
        subject: "",
        sharesubject: "",
        parameters: "",
        functions: "",
        depart: "",
        benefit: ""
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // self = this
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    onSubmit() {
      self = this;
      console.log(self.form)
      let { name, price, person, tel, subject, parameters, functions, sharesubject, depart,  benefit} = self.form;
      if (!name || !price || !person || !tel || !subject) {
        self.$message({
          type: "danger",
          message: "设备名称、估算价格、建议人、电话、主要使用学科都不能为空",
        });
        self.isDialog = false;
        return;
      }
      let obj = {
        name, 
        price, 
        person, 
        tel, 
        subject, 
        parameters, 
        functions,
        sharesubject, 
        depart,  
        benefit
      };
      self.$api.tableApi.deviceAdd(obj).then((res) => {
          if (res) {
            self.$message({
              type: "success",
              message: "添加成功",
            });
            self.isDialog = false;
            this.onReset();
          }
      });
    },
    onReset() {
      this.form = {
        name: "",
        price: "",
        person: "",
        tel: "",
        subject: "",
        sharesubject: "",
        parameters: "",
        functions: "",
        depart: "",
        benefit: ""
      }
    }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>