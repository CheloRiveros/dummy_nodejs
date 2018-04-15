const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadCourse(ctx, next){
  ctx.state.course = await ctx.orm.Course.findById(ctx.params.id);
  return next();
}

router.get('course.list', '/', async (ctx) => {
  const coursesList = await ctx.orm.Course.findAll();
  await ctx.render('course/index', {
    coursesList,
    newCoursePath: ctx.router.url('course.new'),
    deleteCoursePath: course => ctx.router.url('course.del', {id: course.id}),
    editCoursePath: course => ctx.router.url('course.edit', {id: course.id}),
  });
});

router.get('course.new', '/new', async (ctx) => {
  const course = ctx.orm.Course.build();
  await ctx.render('course/new', {
    course,
    submitCoursePath: ctx.router.url('course.create'),
  });
});

router.post('course.create', '/', async (ctx) => {
  const course = ctx.orm.Course.build(ctx.request.body);
  try {
    await course.save({fields: ['code', 'name', 'description']});
    ctx.redirect(ctx.router.url('course.list'));
  } catch (validationError){
    console.log(validationError);
    await ctx.render('course/new', {
      course,
      errors: validationError.errors,
      submitCoursePath: ctx.router.url('course.create'),
    });
  }
});

router.get('course.edit', '/:id/edit', loadCourse, async  (ctx) => {
  const { course} = ctx.state;
  await ctx.render('course/edit', {
    course,
    submitCoursePath: ctx.router.url('course.update', {id: course.id}),
  });
});

router.patch('course.update', '/:id', loadCourse, async (ctx) =>{
  const { course} = ctx.state;
  try {
    const { code, name, description} = ctx.request.body;
    await course.update({ code, name, description});
    ctx.redirect(ctx.router.url('course.list'));
  } catch (validationError){
    await ctx.render('course.edit', {
      course, errors: validationError.errors,
      submitCoursePath: ctx.router.url('course.update'),
    })
  }
})

router.del('course.del', '/:id', loadCourse, async (ctx) => {
  const {course} = ctx.state;
  await course.destroy();
  ctx.redirect(ctx.router.url('course.list'));
});

module.exports = router;
