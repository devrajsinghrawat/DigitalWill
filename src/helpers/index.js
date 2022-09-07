let helper = {};

helper.errorHandler = function (res, options, httpStatuCode = 501) {
    let status = '';
    if (options.status == '') {
        status = options.status;
    } else {
        status = true;
    }
    let obj = {
        status: status || false,
        code: httpStatuCode,
        message: (options && options.message) || 'Something went wrong',
        data: (options && options.data) || []
    }
    res.status(httpStatuCode).json(obj);
}

helper.successHandler = function (res, options, httpStatuCode) {
    let status = '';
    if (options.status == false) {
        status = options.status;
    } else {
        status = true;
    }
    let obj = {
        status: status,
        code: httpStatuCode,
        message: (options && options.message) || 'Operation performed successfully',
        data: (options && options.data) || []
    }

    console.log('obj======', obj);

    res.send(obj);
}

module.exports = helper;