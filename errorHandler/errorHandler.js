/**
 * Created by GUERIN Olivier, on 09/09/2015.
 * Twitter: @MisterRaton
 */
"use strict";
module.exports = function *(next) {
    try {
        yield next;
        var status = this.status || 404;
        if (status === 404) {
            this.throw(404);
        }
    } catch (err) {
        err.status = err.status || 500;
        err.message = err.expose ? err.message : 'Internal Server Error';
        this.status = err.status;
        this.render('error', {err: err});
        this.app.emit('error', err, this);
    }
}
