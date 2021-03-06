const Router = require('koa-router');
const Auth = require('./middlewares/auth');
const StaticV1 = require('./controllers/v1/static');
const AiderV1 = require('./controllers/v1/aider');
const UserV1 = require('./controllers/v1/user');
const TopicV1 = require('./controllers/v1/topic');
const ReplyV1 = require('./controllers/v1/reply');
const NoticeV1 = require('./controllers/v1/notice');

const routerV1 = new Router({
  prefix: '/v1'
});

routerV1
  .get('/', ctx => { ctx.body = 'Version_1 API'; })
  .get('/static/norms', StaticV1.getNorms) // 获取社区规范文档
  .get('/aider/captcha', AiderV1.getCaptcha) // 获取图形验证码
  .post('/aider/upload_avatar', Auth.userRequired, AiderV1.uploadAvatar) // 头像上传
  .post('/signup', UserV1.signup) // 注册
  .post('/signin', UserV1.signin) // 登录
  .get('/info', Auth.userRequired, UserV1.getCurrentUser) // 获取当前用户信息
  .put('/setting', Auth.userRequired, UserV1.updateSetting) // 更新个人信息
  .patch('/update_pass', Auth.userRequired, UserV1.updatePass) // 修改密码
  .get('/users/top', UserV1.getUserTop) // 获取积分榜用户列表
  .get('/user/:uid', UserV1.getUserById) // 根据ID获取用户信息
  .post('/create', Auth.userRequired, TopicV1.createTopic) // 创建话题
  .delete('/topic/:tid/delete', Auth.userRequired, TopicV1.deleteTopic) // 删除话题
  .put('/topic/:tid/update', Auth.userRequired, TopicV1.updateTopic) // 编辑话题
  .get('/topics/list', TopicV1.getTopicList) // 获取话题列表
  .get('/topics/search', TopicV1.searchTopic) // 搜索话题列表
  .get('/topics/no_reply', TopicV1.getNoReplyTopic) // 获取无人回复的话题
  .post('/topic/:tid/reply', Auth.userRequired, ReplyV1.createReply) // 创建回复
  .delete('/reply/:rid/delete', Auth.userRequired, ReplyV1.deleteReply) // 删除回复
  .put('/reply/:rid/update', Auth.userRequired, ReplyV1.updateReply) // 编辑回复
  .patch('/reply/:rid/up_or_down', Auth.userRequired, ReplyV1.upOrDownReply) // 回复点赞或者取消点赞
  .get('/notice/user', Auth.userRequired, NoticeV1.getUserNotice) // 获取用户消息
  .get('/notice/system', Auth.userRequired, NoticeV1.getSystemNotice); // 获取系统消息

const routerV2 = new Router({
  prefix: '/v2'
});

routerV2
  .get('/', ctx => { ctx.body = 'Version_2 API'; });

module.exports = {
  v1: routerV1.routes(),
  v2: routerV2.routes()
};
