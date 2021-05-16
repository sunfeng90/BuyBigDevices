import request from '@/utils/request'

let basicApi = {
  deviceList: 'device/list',
  deviceAdd: 'device/add',
  deviceUpdata: 'device/update',
  deviceDelete: 'device/delete',
  deviceDeletes: 'device/deletes',
}
let tableApi ={
  deviceList(data){
    return request({
      url: basicApi.deviceList,
      method: 'get',
      params: data,
    })
  },
  deviceAdd(data){
    return request({
      url: basicApi.deviceAdd,
      method: 'post',
      data,
      loading: false, //取消loading
    })
  },
  tableUpdata(data){
    return request({
      url: basicApi.deviceUpdata,
      method: 'post',
      data
    })
  },
  tableDelete(data){
    return request({
      url: basicApi.deviceDelete,
      method: 'post',
      data,
    })
  },
  tableDeletes(data){
    return request({
      url: basicApi.deviceDeletes,
      method: 'post',
      data,
    })
  }
}

export default tableApi
