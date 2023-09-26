'use strict';

module.exports = secret => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization; // 若是没有token, 返回的是null字符串
    let decode;
    if (token !== 'null' && token) {
      try {
        decode = ctx.app.jwt.verify(token, secret); // 验证token
        await next();
      } catch (error) {
        console.log('error', error);
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期, 请重新登录',
          code: 401,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  };
};
