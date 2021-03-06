/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const manage = require('../proxy/manage');
const responseHelper = require('../common/response_helper');

//合同管理页面
exports.index = function (req, res) {
    return res.render('manage/index');
};
//全部文件
exports.contractAll = function (req, res) {
    let reqData = req.body;
    manage.contractAll(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//待我签
exports.waitMineList = function (req, res) {
    let reqData = req.body;
    manage.waitMineList(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//待对方签
exports.waitOtherList = function (req, res) {
    let reqData = req.body;
    manage.waitOtherList(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//已完成
exports.completeList = function (req, res) {
    let reqData = req.body;
    manage.completeList(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//已拒绝
exports.refuseList = function (req, res) {
    let reqData = req.body;
    manage.refuseList(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//草稿箱
exports.draftList = function (req, res) {
    let reqData = req.body;
    manage.draftList(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//删除草稿箱
exports.deleteDraft = function (req, res) {
    let reqData = req.body;
    manage.deleteDraft(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

