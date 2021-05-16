const menu = [
  {
    icon: "el-icon-document-copy",
    path: "enterjump",
    title: "新增设备",
  },
  {
    icon: "el-icon-s-operation",
    path: "components",
    title: "设备详情",
    children: [
      {
        icon: "el-icon-notebook-2",
        path: "table",
        title: "设备列表",
      },
      // {
      //   icon: "",
      //   path: "form",
      //   title: "Form",
      // },
      // {
      //   icon: "",
      //   path: "export",
      //   title: "导出设备",
      // },
      // {
      //   icon: "",
      //   path: "verificationCode",
      //   title: "verificationCode",
      // },
    ],
  },
  // {
  //   icon: "el-icon-menu",
  //   path: "simulationVuex",
  //   title: "simulationVuex",
  // },
  // {
  //   icon: "el-icon-menu",
  //   path: "ws",
  //   title: "webSocket",
  // },
  // {
  //   icon: "el-icon-menu",
  //   path: "echarts",
  //   title: "echarts",
  // }
]

menu.forEach((item) => {
  const split = '/'
  item.href = `${split}${item.path}`
  if (item.children) {
    const menuHref = item.path ? `${item.href}/` : item.href
    item.children.forEach((itm) => {
      itm.href = `${menuHref}${itm.path}`
      if (itm.children) {
        const tplHref = `${itm.href}/`
        itm.children.forEach((cItm) => {
          cItm.href = `${tplHref}${cItm.path}`
        })
      }
    })
  }
})

export default menu