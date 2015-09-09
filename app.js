/**
 * Created by GUERIN Olivier, on 09/09/2015.
 * Twitter: @MisterRaton
 */

const koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const Jade = require('koa-jade');
const jade = new Jade({
    viewPath: './views',
    debug: true
});
const errorHandler = require('./errorHandler/errorHandler');
//routers
const post = require('./routes/post/posts')(new Router({prefix:'/post'}));



const app = koa();

//error handler
app.use(errorHandler);

//jade middleware
app.use(jade.middleware);

//inject routers
app.use(post.routes());


//log error: server-side
app.on('error', function (err, ctx) {
    "use strict";
    console.error('server error', err, ctx);
});

http.createServer(app.callback()).listen(3000);