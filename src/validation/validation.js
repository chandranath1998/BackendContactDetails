const isValidEmail = function (value) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/

    if (emailRegex.test(value)) return true;
};

function checkPHnumber(str) {
    var re = /^[6-9]\d{9}$/;
    return re.test(str);
}

function isValidPassword(pass){
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    return reg.test(pass)
}



module.exports.isValidEmail = isValidEmail;
module.exports.checkPHnumber = checkPHnumber;
module.exports.isValidPassword = isValidPassword