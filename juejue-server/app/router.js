'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.post('/api/user/register', controller.user.register); // register
  router.post('/api/user/login', controller.user.login); // login
  router.get('/api/user/test', _jwt, controller.user.test); // 放入第二个参数，作为中间件过滤项
};
