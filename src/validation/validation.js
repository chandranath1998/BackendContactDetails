const isValidEmail = function (value) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/

    if (emailRegex.test(value)) return true;
};

function checkPHnumber(str) {
    var re = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return re.test(str);
}



module.exports.isValidEmail = isValidEmail;
module.exports.checkPHnumber = checkPHnumber;