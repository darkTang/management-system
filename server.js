const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/prod-api', createProxyMiddleware({
  target: 'http://ihrm.itheima.net/api',
  changeOrigin: true,
  pathRewrite: {
    '^/prod-api': ''
  }
}));

app.use(express.static('./dist'));


app.listen('80', (err) => {
  if (!err) console.log('http://localhost');
});