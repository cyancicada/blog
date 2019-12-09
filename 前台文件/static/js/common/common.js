var Common = function () {
    this.method = 'POST';
    this.data = {};
    this.dataType = 'json';
    this.url = window.location.href;
    this.layer = (typeof(layer) === 'object' ? layer : '');
    this.mySkin = 'layui-layer-lan';
    this.msgOkSkin = 'layui-layer-hui-success';
    this.msgFailSkin = 'layui-layer-hui-fail';
    this.offset = ['0px'];
    this.delMsgTxt = '您确定要删除 “###” 吗？';
    this.delCustormMsgTxt = '您确定要删除###吗？';
    this.iconType = 3;
    this.alertType = 2;//1 alert , 2 msg
    this.laydate = null;
    this.form = null;
    this.host = "http://127.0.0.1:8080";
    this.uploadApi = this.host + "/admin/upload";

};


Common.prototype = {

    initLayer: function () {
        var that = this;
        layui.use('layer', function () {
            that.layer = layui.layer;
        });
    },
    loadPlug: function (name) {
        var that = this;
        switch (name) {
            case 'laydate':
                layui.use('laydate', function () {
                    that.laydate = layui.laydate;
                });
                break;
            case 'form':
                layui.use('form', function () {
                    that.form = layui.form;
                });
                break;
        }

    },
    date: function (id) {
        this.laydate.render({
            elem: id, //指定元素,
            format: 'yyyy-MM-dd HH:mm:ss'
        });
    },
    ajax: function (successCallback, errorCallback) {
        var that = this;
        $.ajax({
            type: that.method,
            url: that.url,
            data: that.data,
            dataType: that.dataType,
            success: function (data) {
                if (typeof successCallback === 'function') return successCallback(data);
                return that.alert(data);
            },
            error: function (data) {
                if (typeof errorCallback === 'function') return errorCallback(data);
                that.alert(data);
            }
        });
    },


    delete: function (msg, successCallback, errorCallback) {
        var that = this;
        var alertMsg = that.delMsgTxt;

        alertMsg = alertMsg.replace('###', msg);
        that.layer.confirm(alertMsg, {
            skin: that.mySkin,
            closeBtn: false,
            shade: 0.001,
            title: false,
            icon: this.iconType,
            shift: 1,
            shadeClose: true
        }, function (index) {
            that.ajax(successCallback, errorCallback);
            common.layer.close(index)
        });

    },


    alert: function (obj) {
        var that = this;
        if (obj.code !== 0) {
            if (!obj.msg) {
                that.jump(obj.url, 0);
                return;
            }

            if (that.alertType === 1) that.layerAlert(obj);
            else that.layerMsg(obj.msg, obj.url, obj.code);
            that.jump(obj.url, obj.timer);
            return;
        }
        if (that.alertType === 1) that.layerAlert(obj);
        else that.layerMsg(obj.msg, obj.url, obj.code);
    },

    layerAlert: function (obj, ok) {
        var that = this;
        var ic = ok ? 1 : 2;
        this.layer.alert(obj.msg, {
            skin: that.mySkin,
            icon: ic,
            closeBtn: 0,
            title: false,
            shade: 0.001,
            time: 2000
        }, function () {
            that.layer.closeAll();
            layer.closeAll();
            that.jump(obj.url, 0);
        });
    },
    layerMsg: function (message, url, ok) {
        var that = this;
        var comObject = parent.common ? parent.common : that;
        var skin = ok === 0 ? that.msgOkSkin : that.msgFailSkin;
        comObject.layer.msg(message, {
            offset: that.offset,
            skin: skin,
            time: 2000
        }, function () {
            comObject.layer.closeAll();
            that.jump(url, 0);
        });
    },
    jump: function (url, timer) {
        if (!url || url === '') return;
        if (url === 'reload') {
            setTimeout(function () {
                window.location.reload();
            }, timer);
        } else if (url === 'back') {
            setTimeout(function () {
                window.history.go(-1);
            }, timer);
        } else {
            setTimeout(function () {
                window.location.href = url;
            }, timer);
        }
    },
    radioChecked: function (cls, v, attName) {
        var b = false;
        $(cls).each(function () {
            if (!attName) {
                if (parseInt($(this).val()) === v) {
                    b = true;
                }
                $(this).prop('checked', b);
            } else {
                if ($(this).attr(attName) === v) {
                    b = true;
                }
                $(this).prop('checked', b);
            }

        })
    },
    checkBoxChecked: function (cls, v, rule, attName) {
        rule = rule ? rule : '||';
        var arr = [];
        var b = false;
        if (v === '' || !v) {
            return;
        }
        arr = v.split(rule);

        $(cls).each(function () {
            if (!attName) {
                if ($.inArray($(this).val(), arr) >= 0) {
                    b = true;
                }
                $(this).prop('checked', b);
            } else {
                if ($.inArray($(this).attr(attName), arr) >= 0) {
                    b = true;
                }
                $(this).prop('checked', b);
            }


        });
    },
    selected: function (cls, v, type, rule, attName) {
        $(cls).find('option').each(function () {
            if ($(this).val() === v) {
                $(this).attr('selected', 'selected');
            }
        })
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

};

var common = new Common();
common.initLayer();