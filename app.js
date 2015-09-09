/**
 * Created by GUERIN Olivier, on 09/09/2015.
 * Twitter: @MisterRaton
 */

var koa = require('koa');
var app = koa();

//koajs run twice, one to get the '/'
//the second to get the '/favicon.ico'

app.use(function *(next) {
    "use strict";
    console.log(this);
    console.log(app);
    console.log('1');
    yield next;
    var date = new Date();
    console.log(`5 ${date}`);

});

app.use(function *(next){
    "use strict";
    console.log('2');
    yield next;
    console.log('4');
});

app.use(function *() {
    console.log('3');
    this.body = 'hello World';
});
app.listen(3000);