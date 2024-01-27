const Responses = {};

Responses.returnResponse = function (res, statusCode = 200, message = '', value = true, result = '') {
    if (statusCode == 200 && value == true) {
      value = true
    } else {
      value = false
    }
    console.log(message);
    res.status(parseInt(statusCode)).json({
      message: message,
      success: value,
      result: result,
    })
};

module.exports = Responses;