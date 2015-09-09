/**
 * Created by GUERIN Olivier, on 09/09/2015.
 * Twitter: @MisterRaton
 */
"use strict";
module.exports = function (post) {
    post.get('/', function *() {
        let w = 'post!';
        this.render('index', {someVar: `hello ${w}`});
    });
    return post;
};