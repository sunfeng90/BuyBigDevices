/*
 * @Descripttion: 全局方法: 已挂载到vue实例，可通过this.$_.xxx调用
 * @Author: Lrl
 * @Date: 2020-09-09 09:51:50
 * @LastEditors: Lrl
 * @LastEditTime: 2020-09-29 16:17:57
 */

let utils = {
  //封装操作localstorage本地存储的方法
  //存储
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key);
  },
  //判断对象是否存在
  isEmptyObject(obj) {
    if (obj === undefined || obj === null || (typeof obj === 'string' && obj.trim() === '')) {
      return true
    }
    return false
  },
  //格式化时间
  formatTime(time) {
    let d = new Date(time);
    let times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + 
            d.getDate()
    return times;
  },
  
}

// 暴露给外部访问
export default utils;