const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session.new', '/new', async (ctx)=>{
  ctx.render('session/new', {
    createSessionPath: ctx.router.url('session.create'),
    notice: ctx.flashMessage.notice,
  });
});

router.put('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  console.log(email, password);
});

router.delete('session.delete', '/', (ctx) => {
  ctx.session = null;
  ctx.redirect(ctx.url('session.new'));
});

module.exports = router;
