const express = require("express")

const app = express()

//token的密钥，这个值应该是要放到环境变量里面的，这里是为了简单展示
app.set('secret','dhga3jhq8h67b6hhgv')

//引用跨域模块
app.use(require('cors')())
//为了使req.body的数据可以使用
app.use(express.json())
//静态文件托管，表示uploads文件夹里面的所有文件可以通过接口/uploads来访问
app.use('/uploads',express.static(__dirname + '/uploads'))
//admin静态文件托管，表示admin文件夹里面的所有文件可以通过接口/admin来访问
app.use('/admin',express.static(__dirname + '/admin'))
//web静态文件托管，表示admin文件夹里面的所有文件可以通过接口/web来访问
app.use('/web',express.static(__dirname + '/web'))

//引用PC端项目路由，后台界面的路由，并传参app过去
require("./routes/admin")(app)
//引用手机端项目路由，后台界面的路由，并传参app过去
require("./routes/web")(app)
// 引用数据库
require("./plugins/db.js")(app)

app.listen(3000,()=>{
    console.log('htpp://localhost:3000')
})