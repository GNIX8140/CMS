const allowAPI = ['/', '/login'];
function Filter(ctx) {
    let url = ctx.originalUrl;
    if (allowAPI.indexOf(url) > -1) {
        console.log('allow');
    } else {
        console.log('reject');
    }
}

module.exports = { Filter };