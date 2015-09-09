/**
 * Created by GUERIN Olivier, on 09/09/2015.
 * Twitter: @MisterRaton
 */

const koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const post = new Router({prefix:'/post'});

const app = koa();

//error handling
app.use(function *(next){
    "use strict";
    try{
        yield next;
        var status = this.status || 404;
        if(status===404){
            this.throw(404);
        }
    } catch(err){
        err.status = err.status || 500;
        err.message = err.expose ? err.message : 'Internal Server Error';
        this.status = err.status;
        this.render('error',{err:err});
        this.app.emit('error',err,this);
    }
});

const Jade = require('koa-jade');
const jade = new Jade({
    viewPath: './views',
    debug: true
});

app.use(jade.middleware);

post.get('/',function *(){
    "use strict";
    console.log('3');
    let w = 'post!';
    this.render('index', {someVar: `hello ${w}`});
});

app.use(post.routes());


//log error: server-side
app.on('error', function (err, ctx) {
    "use strict";
    console.error('server error', err, ctx);
});

http.createServer(app.callback()).listen(3000);