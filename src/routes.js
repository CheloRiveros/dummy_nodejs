const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const courses = require('./routes/course');
const session = require('./routes/session');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    currentUser: ctx.session.userId && await ctx.orm.user.findById(ctx.session.userId),
    newSessionPath: ctx.router.url('session.new'),
    destroySessionPath: ctx.router.url('session.destroy'),
    coursesPath: ctx.router.url('course.list'),
  });
  return next();
});

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/course', courses.routes());
router.use('/session', session.routes());

module.exports = router;
