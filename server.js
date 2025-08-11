// 引入 express 模块
import express from 'express';
import cors from 'cors';

// 创建 express 应用
const app = express();

// 定义端口号
const port = 3000;

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 启用 cors 中间件
app.use(cors());

// 定义路由
app.get('/api/data', (req, res) => {
  res.send([
    { name: '光光', sex: '男', birthday: new Date('1994-07-07').getTime() },
    { name: '东东', sex: '男', birthday: new Date('1995-06-06').getTime() },
    { name: '小红', sex: '女', birthday: new Date('1996-08-08').getTime() }
  ]);
});
