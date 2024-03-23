const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://webhook.site',
      changeOrigin: true,
      pathRewrite:{
        '^api':''
    },
    router:{
        'localhost:3000/api':'https://webhook.site'
    }
    }),
    
  );
};
