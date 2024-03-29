const { json } = require('express');
let express = require('express');//引入express模块
const mysql = require("mysql");

let app = express();

// 连接basictest数据库
var db = mysql.createConnection({ host: 'localhost', port: '3306', user: "root", password: '123456', database: 'buydevices' });

app.all('*', function (req, res, next) {//允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//登录
app.post('/login', function (req, res) {
  let data = '';
  let result
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    data = JSON.parse(data)
    if (data.username == '123' && data.password == '123') {
      result = {
        code: 0,
        msg: 'ok',
      }
    } else {
      result = {
        code: 1,
        msg: '账号或密码错误',
      }
    }
    res.send(result);
  })
});

//权限设置
app.post('/roleAuth',(req, res)=>{
  let result = {
    code: 0,
    msg: 'ok',
    data: {
      data: [
        { id:'0', name: "index", pid: '-1', auth:'/index' },
        { id:'1', name: "home", pid: '0', auth:'/home' },
        { id:'2', name: "components", pid: '0', auth:'/components' },
        { id:'3', name: "Table", pid: '2', auth:'/components/table' },
        { id:'4', name: "Form", pid: '2', auth:'/components/form' },
        { id:'5', name: "Export", pid: '2', auth:'/components/export' },
        { id:'6', name: "verificationCode", pid: '2', auth:'/components/verificationCode' },
        { id:'7', name: "enterJump", pid: '0', auth:'/enterjump' },
        { id:'8', name: "simulationVuex", pid: '0', auth:'/simulationVuex' },
        // { id:'9', name: "webSocket", pid: '0', auth:'/ws' },
        // { id:'10', name: "echarts", pid: '0', auth:'/echarts' }
      ]
    },
  }
  res.send(result) 
})

//device模块新增
app.post('/device/add', function (req, res) {
  let addSql = 'INSERT INTO devices(name, price, person, tel, subject, parameters, functions, sharesubject, depart, benefit) VALUES(?,?,?,?,?,?,?,?,?,?)';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { name,  price, person, tel, subject,  parameters, functions, sharesubject,  depart,  benefit } = JSON.parse(postdata)
    db.query(addSql, [name,  price, person, tel, subject, parameters,  functions, sharesubject,  depart,  benefit], (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//device模块编辑
app.post('/device/update', function (req, res) {
  let updataSql = 'UPDATE devices SET name = ?,price = ?, person = ?, tel = ?, subject = ?, parameters = ?,  functions = ?,  WHERE id = ?';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { name, price, person, tel, subject, parameters, functions, id } = JSON.parse(postdata)
    db.query(updataSql, [name, price, person, tel, subject, parameters, functions, id], (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//device模块删除
app.post('/device/delete', function (req, res) {
  let delSql = 'DELETE FROM devices WHERE id = ?';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { id } = JSON.parse(postdata)
    db.query(delSql, [id], (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//device模块批量删除
app.post('/device/deletes', function (req, res) {
  let delSqls = 'DELETE FROM devices WHERE id in (';
  let postdata = '';
  let result
  req.on('data', function (chunk) {
    postdata += chunk;
  });
  req.on('end', function () {
    postdata = postdata
    let { ids } = JSON.parse(postdata)
    let str = ids.join(',')
    delSqls = `${delSqls}${str})`
    db.query(delSqls, (err, data) => {
      if (err) {
        result = err
      } else {
        result = {
          code: 0,
          msg: 'ok',
        }
      }
      res.send(result);
    });
  })
});

//device模块查询
app.get('/device/list', function (req, res) {
  /* 为了在没有数据库的情况下不影响页面显示，使用以上的假数据(当然也就没有了增删改查和分页的功能)
   * 当你创建了符合本项目的数据库时可使用以下的代码 
  */

  let { curPage, pageSize } = req.query
  curPage = Number(curPage)
  pageSize = Number(pageSize)
  let params = JSON.parse(req.query.data) 
  let isMore = false; //是否有多个查询参数
  let sql = "SELECT count(*) as kkk FROM devices" //查询总条数
  let searchSql = `SELECT * FROM devices`
  if (params.keyword) {
    sql += ` WHERE username = ${params.keyword}` //根据条件查询总条数
    searchSql += ` WHERE name in (${params.keyword}) limit ${(curPage-1)* pageSize},${pageSize}`
    isMore = true;
  } else {
    searchSql += ` limit ${(curPage-1)* pageSize},${pageSize}`
  } 
  let result
  db.query(sql, (err, data) => {
    if (err) {
      result = err
    } else {
      let total = data[0].kkk 
      db.query(searchSql, (err, data) => {
        if (err) {
          result = err
        } else {
          result = {
            code: 0,
            msg: 'ok',
            data: {
              data,
              total
            },
          }
        }
        res.send(result)
      });
    }
  })
})

//test接口
app.get('/list/product', function (req, res) {
  let result = {
    code: 0,
    msg: 'ok',
    data: {
      "name": "huawei",
      "price": "1999",
      "title": "huawei huawei huawei",
      "id": "1"
    }
  }
  res.send(result)
})

//定义端口，此处所用为3000端口，可自行更改
let server = app.listen(3000, function () {
  console.log('runing 3000...');
})


//Websocket
let ws = require("nodejs-websocket");
console.log("开始建立链接");
ws.createServer(function (conn) {
  conn.on("text", function (str) {
    console.log("info", str);
    conn.send(`${str}（机器人`)
  });
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  })
}).listen(8001);
console.log("链接建立完毕");