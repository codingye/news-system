const { createProxyMiddleware } = require('http-proxy-middleware');
//注意，每次修改需要重新启动服务器
module.exports = function(app) {
  app.use(
    createProxyMiddleware( '/api',{
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite:{'^/api':''}
    })
  );
};