

exports.token = function(){
    return rand() + rand() +rand();
}
var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};
