var Common = function () {
    this.selectSpec = [{specName: '瀹归噺', specItems: ['16G', '64G', '128G']},
        {specName: '棰滆壊', specItems: ['鍦熻豹閲�', '閾惰壊', '榛戣壊', 'pink']},
        {specName: '缃戠粶', specItems: ['鑱旈€�', '绉诲姩', '鐢典俊']}];
    this.dateObj = new Date();
    this.input = 'input';
    this.mySkin = 'layui-layer-molv';
    this.index = '';
    this.errorId = 'errorText';
    this.errLayID = 'modal_error';
    this.errorText = '';
    this.objMsg = {'error': 1, 'items': '', 'url': '', 'timer': 0};
    this.area = 'area';
    this.delMsgTxt = '鎮ㄧ‘瀹氳鍒犻櫎 鈥�###鈥� 鍚楋紵';
    this.delCustormMsgTxt = '鎮ㄧ‘瀹氳鍒犻櫎###鍚楋紵';
    this.sureMsgTxt = '鎮ㄧ‘瀹氳 鈥�###鈥� 鍚楋紵';
    this.iconType = 3;
    this.offset = 0;
    this.shift = 6;
    this.formID = '#formID'
    this.requestError = '璇锋眰鍑虹幇寮傚父!';
    this.batchEditTxt = '鎵归噺缂栬緫';
    this.borderSkin = 'layui-layer-rim';
    this.layer = (typeof(layer) == 'object' ? layer : '');
    this.tmpDataArray = new Array();
    this.editColor = '#FFBB78';
    this.isTrue = false;
    this.tempDataObj = '';
    this.currenBrandArray = new Array();
    this.minDate;
    this.maxDate;
    this.submitText = '姝ｅ湪鎻愪氦...';
    this.submitHtml = '淇濆瓨';
    this.datefmt = 'yy-mm-dd';
    this.storeUrl = '';
    this.dateObjArray = new Array();
    this.alertTitle = '鎻愮ず';
    this.alertText = '纭畾鎻愪氦鍚楋紵';
    this.dateFormat = 'YYYY-MM-DD HH:mm:ss';
    this.cur_page = 1;
    this.smsHasSend = '鐭俊楠岀爜宸插彂閫佽嚦浣犵殑鎵嬫満锛岃鏌ユ敹';
    this.smsSendFailTxt = '鐭俊楠岀爜鍙戦€佸け璐�';
    this.rulesObj = {};
    this.messagesObj = {};
    this.sureValue = '';
    this.intValue = '';
    this.offsetX = '';
    this.offsetY = '';
    this.dateArray = [];
    this.ctime = 0;
    this.hastime = 0;

}
Common.prototype = {

    bigImageEvent: function (argument) {
        var that = this;

        $(document).ready(function () {
            that.offsetX = 20 - $(argument).offset().left;
            that.offsetY = 20 - $(argument).offset().top;
            console.log(that.offsetX)
            var size = 8 * $(argument + ' img').width();
            $(argument + " img").mouseover(function (event) {
                var $target = $(event.target);
                if ($target.is('img')) {
                    $("<images id='tip' src='" + $target.attr("src") + "'>").css({
                        "height": size,
                        "width": size,
                        'position': 'absolute',
                        'border': '5px solid #FFF',
                        'z-index': 99999,
                        "top": event.pageX + that.offsetX + 200,
                        "left": event.pageY + that.offsetY + 200,
                    }).appendTo($(argument).parent());
                }
            }).mouseout(function () {
                $("#tip").remove();
            }).mousemove(function (event) {

                $("#tip").css(
                    {
                        "left": event.pageX + that.offsetX + 280,
                        "top": event.pageY + that.offsetY + 280
                    });
            });
        })

    },
    datePack: function (cls, maxDate,minDate) {
        var that = this;

        $(cls).datepicker();

        /*浠ヤ笅浠ｇ爜灏嗚嫳鏂囨敼鎴愪簡涓枃*/
        maxDate = maxDate ? maxDate : '';
        minDate = minDate ? minDate : '';
        //that.setDefaultDate(cls, that.getimeEnevt('Y-m-d'));
        $.datepicker.regional['zh-CN'] = {
            closeText: '鍏抽棴',
            prevText: '<涓婃湀',
            nextText: '涓嬫湀>',
            currentText: '浠婂ぉ',
            monthNames: ['涓€鏈�', '浜屾湀', '涓夋湀', '鍥涙湀', '浜旀湀', '鍏湀',
                '涓冩湀', '鍏湀', '涔濇湀', '鍗佹湀', '鍗佷竴鏈�', '鍗佷簩鏈�'
            ],
            monthNamesShort: ['涓€', '浜�', '涓�', '鍥�', '浜�', '鍏�',
                '涓�', '鍏�', '涔�', '鍗�', '鍗佷竴', '鍗佷簩'
            ],
            dayNames: ['鏄熸湡鏃�', '鏄熸湡涓€', '鏄熸湡浜�', '鏄熸湡涓�', '鏄熸湡鍥�', '鏄熸湡浜�', '鏄熸湡鍏�'],
            dayNamesShort: ['鍛ㄦ棩', '鍛ㄤ竴', '鍛ㄤ簩', '鍛ㄤ笁', '鍛ㄥ洓', '鍛ㄤ簲', '鍛ㄥ叚'],
            dayNamesMin: ['鏃�', '涓€', '浜�', '涓�', '鍥�', '浜�', '鍏�'],
            weekHeader: '鍛�',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: '骞�',
            minDate: minDate,
            maxDate: maxDate,
        };
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
    },
    /**
     * [datePick 鏃ユ湡鎺т欢]
     * @author yangkun 2016-11-25
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          clsId                       [description]
     * @return    {[type]}                                      [description]
     */
    datePickEvent: function (clsId, ifMinDate) {
        var that = this
        if (ifMinDate === false) {
            ifMinDate = false;
        } else {
            ifMinDate = that.getimeEnevt();
        }
        that.setDefaultDate(clsId, that.getimeEnevt());
        $(clsId).daterangepicker({
            format: that.dateFormat,
            singleDatePicker: true,
            showDropdowns: true,
            minDate: ifMinDate,
            timePicker: true, //鏄惁鏄剧ず灏忔椂鍜屽垎閽�
            timePickerIncrement: 1, //time閫夋嫨閫掑鏁�
            timePicker12Hour: false, //鏄惁浣跨敤12灏忔椂鍒舵潵鏄剧ず鏃堕棿
            locale: {
                applyLabel: '纭畾',
                cancelLabel: '鍙栨秷',
                fromLabel: '璧峰鏃堕棿',
                toLabel: '缁撴潫鏃堕棿',
                customRangeLabel: '鑷畾涔�',
                daysOfWeek: ['鏃�', '涓€', '浜�', '涓�', '鍥�', '浜�', '鍏�'],
                monthNames: ['涓€鏈�', '浜屾湀', '涓夋湀', '鍥涙湀', '浜旀湀', '鍏湀', '涓冩湀', '鍏湀', '涔濇湀', '鍗佹湀', '鍗佷竴鏈�', '鍗佷簩鏈�'],
                firstDay: 1
            }
        });
    },
    /**
     * [setDefaultDate 璁剧疆榛樿鏃堕棿]
     * @author yangkun 2016-11-25
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          obj                         [description]
     */
    setDefaultDate: function (clsID, def) {
        var thisVal = $(clsID).val();
        $(clsID).attr('readonly', 'readonly');
        if (!thisVal) {
            $(clsID).val(def);
        }
    },
    /**
     * [dateFormatEnevt 鏍煎紡鍖栨椂闂碷
     * @author yangkun 2016-09-23
     * @copyright [Copyright (c)2016-09-23]
     * @version   [1.5]
     * @param     {[type]}       fmt             [description]
     * @return    {[type]}                       [description]
     */
    dateFormatEnevt: function (fmt, strtime) {
        var date = this.dateObj;
        var o = {
            "M+": this.plusZero(date.getMonth() + 1), //鏈堜唤
            "d+": this.plusZero(date.getDate()), //鏃�
            "h+": this.plusZero(date.getHours()), //灏忔椂
            "m+": this.plusZero(date.getMinutes()), //鍒�
            "s+": this.plusZero(date.getSeconds()), //绉�
            "q+": Math.floor((date.getMonth() + 3) / 3), //瀛ｅ害
            "S": date.getMilliseconds() //姣
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    /**
     * [getimeEnevt 寰楀埌褰撳墠鏃堕棿]
     * @author yangkun 2016-09-30
     * @copyright [Copyright (c)2016-09-30]
     * @version   [1.5]
     * @param     {[type]}       fmt             [鏃堕棿鏍煎紡]
     * @param     {[type]}       ifstr           [鏄惁杩斿洖瀛楃涓瞉
     * @return    {[type]}                       [description]
     */
    getimeEnevt: function (fmt, ifstr) {
        var fmt = fmt ? fmt : this.dateFormat;
        var ifstr = ifstr ? ifstr : false;
        var currenTime;
        var myDate = {
            'Y': this.dateObj.getFullYear(),
            'M': this.plusZero(this.dateObj.getMonth() + 1),
            'D': this.plusZero(this.dateObj.getDate()),
            'H': this.plusZero(this.dateObj.getHours()),
            'I': this.plusZero(this.dateObj.getMinutes()),
            'S': this.plusZero(this.dateObj.getSeconds()),
            'Ymd': this.dateObj.toLocaleDateString()
        }
        if (!ifstr) {
            switch (fmt) {
                case 'Y-m-d':
                    currenTime = myDate['Y'] + '-' + myDate['M'] + '-' + myDate['D'];
                    break;
                case 'Y/m/d':
                    currenTime = myDate['Ymd'];
                    break;
                default:
                    currenTime = myDate['Y'] + '-' + myDate['M'] + '-' + myDate['D'] + ' ' + myDate['H'] + ':' + myDate['I'] + ':' + myDate['S'];
                    break;
            }
        } else {
            currenTime = this.dateObj.getTime()
        }
        return (currenTime)
    },
    getimeEnevtY: function (fmt, ifstr) {
        var fmt = fmt ? fmt : this.dateFormat;
        var ifstr = ifstr ? ifstr : false;
        var currenTime;
        var myDate = {
            'Y': this.dateObj.getFullYear(),
            'M': this.plusZero(this.dateObj.getMonth() + 1),
            'D': this.plusZero(this.dateObj.getDate()-1),
            'H': this.plusZero(this.dateObj.getHours()),
            'I': this.plusZero(this.dateObj.getMinutes()),
            'S': this.plusZero(this.dateObj.getSeconds()),
            'Ymd': this.dateObj.toLocaleDateString()
        }
        if (!ifstr) {
            switch (fmt) {
                case 'Y-m-d':
                    currenTime = myDate['Y'] + '-' + myDate['M'] + '-' + myDate['D'];
                    break;
                case 'Y/m/d':
                    currenTime = myDate['Ymd'];
                    break;
                default:
                    currenTime = myDate['Y'] + '-' + myDate['M'] + '-' + myDate['D'] + ' ' + myDate['H'] + ':' + myDate['I'] + ':' + myDate['S'];
                    break;
            }
        } else {
            currenTime = this.dateObj.getTime()
        }
        return (currenTime)
    },
    /**
     * [showmsgEvent layer鏄剧ず娑堟伅]
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       res             [json杩斿洖]
     * @param     {[type]}       ifParent        [鏄惁涓虹埗绫籡
     * @return    {[type]}                       [description]
     */
    showmsgEvent: function (res, ifParent) {
        if (typeof res != 'object') {
            res = eval('(' + res + ')');
        }
        //alert(ifParent)
        if (res.msg) {
            this.alertEvent(res.msg, res.type);
            if (res.url) {
                this.hrefEvent(res, ifParent);
            } else {
                this.alertEvent(res.msg, res.type);
            }
        } else {
            this.hrefEvent(res, ifParent);
        }
    },
    /**
     * [hrefEvent 璺宠浆浜嬩欢]
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       res             [杩斿洖json]
     * @param     {[type]}       ifParent        [鏄惁涓虹埗绫籡
     * @return    {[type]}                       [description]
     */
    hrefEvent: function (res, ifParent) {
        ifParent = ifParent ? ifParent : "parent";
        if (res.url !== 'reload' && res.url) {
            setTimeout(function () {
                if (ifParent == 'parent') {
                    parent.window.location.href = res.url;
                } else {
                    window.location.href = res.url;
                }
            }, res.timer);
        } else {
            //alert(ifParent)
            setTimeout(function () {
                if (ifParent == 'parent') {
                    parent.window.location.reload();
                } else {
                    window.location.reload();
                }
            }, res.timer);
        }
    },
    /**
     * [offsetEvent 鏈€涓婃柟鎻愮ず]
     * @author yangkun 2016-11-28
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          msg                    [description]
     * @return    {[type]}                                 [Null]
     */
    offsetEvent: function (msg) {
        Common.layer.msg(msg, {
            offset: 't'
        });
    },
    /**
     * [alertEvent alert浜嬩欢]
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       msg             [娑堟伅鏂囨湰]
     * @param     {[type]}       type            [绫诲瀷[1,2,3,4]]
     * @return    {[type]}                       [description]
     */
    alertEvent: function (msg, type) {
        //alert(msg)
        if (type) {
            ty = type;
        } else {
            ty = this.iconType;
        }
        if (!msg) {
            return;
        }
        this.layer.msg(msg, {
            icon: ty
            //offset: this.offset,
        });
    },
    /**
     * [simpleMsgEvnent 鍙彁绀篯
     * @author yangkun 2016-12-01
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          msg                         [description]
     * @return    {[type]}                                      [description]
     */
    simpleMsgEvnent: function (msg, offs, url) {
        var that = this;
        offs = offs ? offs : 1;
        this.layer.alert(msg, {
            icon: offs,
            skin: that.mySkin,
            closeBtn: 0,
            title: false,
            shade: 0.001,
            shadeClose: true,
            time: 2000 //2绉掑叧闂�
        }, function (index) {
            that.layer.closeAll();
            that.jumpEvent(url, 0);
        });
    },

    msgEvent: function (obj, offs) {
        var offs = offs ? offs : 0;
        var that = this;
        if (!obj.error) {
            if (!obj.items) {
                that.jumpEvent(obj.url, 0);
                return;
            }
            this.layer.alert(obj.items, {
                skin: that.mySkin,
                icon: 1,
                closeBtn: 0,
                title: false,
                shade: 0.001,
                time: 2000 //2绉掑叧闂�,
            }, function (index) {
                that.layer.closeAll();
                that.jumpEvent(obj.url, 0);
            });
            that.jumpEvent(obj.url, obj.timer);
            return;
        }
        this.layer.alert(obj.items, {
            skin: that.mySkin,
            icon: 2,
            closeBtn: 0,
            title: false,
            shade: 0.001,
            time: 2000 //2绉掑叧闂�
        }, function (index) {
            that.layer.closeAll();
            that.jumpEvent(obj.url, 0);
        });
    },
    jumpEvent: function (url, timer) {
        if (!url || url == '') {
            return;
        }
        if (url == 'reload') {
            setTimeout(function () {
                window.location.reload();
            }, timer);
        } else if (url == 'back') {
            setTimeout(function () {
                window.history.go(-1);
            }, timer);
        } else {
            setTimeout(function () {
                window.location.href = url;
            }, timer);
        }
    },
    /**
     * [promptEvent 鍗曠函鐨勬彁绀轰簨浠禲
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       msg             [娑堟伅鏂囨湰]
     * @param     {[type]}       type            [绫诲瀷[1,2,3,4]]
     * @return    {[type]}                       [description]
     */
    promptEvent: function (msg, type) {
        if (type) {
            ty = type;
        } else {
            ty = this.iconType;
        }
        if (!msg) {
            return;
        }
        var that = this;
        this.layer.alert(msg, {
            icon: ty,
            title: false,
            shade: 0.001,
            closeBtn: 0,
            shadeClose: true,
            skin: that.mySkin,
            //offset: this.offset,
        });
    },
    /**
     * [submitValidEvent ajax閫氫俊鍚庣杩涜鏁版嵁妫€鏌
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       obj             [琛ㄥ崟瀵硅薄]
     * @param     {[type]}       url             [鎺ュ彛url]
     * @return    {[type]}                       [description]
     */
    submitValidEvent: function (obj, url) {
        var data = $(obj).serialize();
        var thatComon = this;
        $.ajax({
            url: url,
            data: data,
            type: 'POST',
            cache: false,
            dataType: 'json',
            success: function (res) {
                if (res) {
                    thatComon.promptEvent(res.msg, res.status);
                    Common.isTrue = true;
                }
            },
            error: function () {
            }
        });
        return Common.isTrue;
    },
    /**
     * [ajaxEvent ajax鎻愪氦鏁版嵁]
     * @author yangkun 2016-11-30
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          url                         [description]
     * @param     {[type]}          data                        [description]
     * @param     {[type]}          method                      [description]
     * @return    {[type]}                                      [description]
     */
    ajaxEvent: function (url, data, callback, alert) {
        var that = this;
        $.ajax({
            url: url,
            data: data,
            type: 'POST',
            cache: false,
            dataType: 'json',
            success: function (res) {
                if (alert) {
                    that.createMsgEvent(res);
                }
                if (typeof callback === "function") {
                    callback(res);
                }
            },
            error: function (res) {
                if (typeof callback === "function") {
                    callback(res);
                }
            }
        });
    },
    ajaxDataEvent: function (url, getData, obj, callback, method) {
        var that = this;
        var msg;
        var alertMsg = that.sureMsgTxt;
        if (typeof(obj) == "string") {
            alertMsg = obj;
        } else {
            msg = !$(obj).attr('msg') ? '姝ゆ潯璁板綍' : $(obj).attr('msg');
            alertMsg = alertMsg.replace('###', msg);
        }
        that.layer.confirm(alertMsg, {
            skin: that.mySkin,
            closeBtn: false,
            shade: 0.001,
            title: false,
            icon: this.iconType,
            shift: 1,
            shadeClose: true
        }, function (index) {
            $.ajax({
                url: url,
                data: getData,
                type: method ? method : 'POST',
                cache: false,
                dataType: 'json',
                success: function (res) {
                    that.createMsgEvent(res);
                    if (typeof callback === "function") {
                        callback(res);
                    }
                },
                error: function () {
                }
            });
        });
    },
    ajaxDataEvent2: function (url, getData, obj, callback, method) {
        var that = this;
        var msg = $(obj).attr('msg');
        var alertMsg = that.sureMsgTxt;
        if (typeof(msg) == "undefined") {
            alertMsg = alertMsg.replace('###', '姝ゆ潯璁板綍');
        } else {
            alertMsg = msg;
        }
        that.layer.confirm(alertMsg, {
            skin: that.mySkin,
            closeBtn: false,
            shade: 0.001,
            title: false,
            icon: this.iconType,
            shift: 1,
            shadeClose: true
        }, function (index) {
            $.ajax({
                url: url,
                data: getData,
                type: method ? method : 'POST',
                cache: false,
                dataType: 'json',
                success: function (res) {
                    that.createMsgEvent(res);
                    if (typeof callback === "function") {
                        callback(res);
                    }
                },
                error: function () {
                }
            });
        });
    },

    /**
     * [deleteEvent deleteEvent ajax鍒犻櫎浜嬩欢]
     * @author yangkun 2016-12-13
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          url                         [url]
     * @param     {[type]}          getData                     [鏁版嵁]
     * @param     {[type]}          obj                         [dom瀵硅薄]
     * @param     {[type]}          method                      [post|get]
     * @return    {[type]}                                      [description]
     */
    deleteEvent: function (url, getData, obj, callback, method,no_ajax) {
        var that = this;
        var msg ;
        var alertMsg = that.delMsgTxt;
        if (typeof(obj) == "string") {
            alertMsg = obj;
        } else {
            msg = !$(obj).attr('msg') ? '姝ゆ潯璁板綍' : $(obj).attr('msg');
            alertMsg = alertMsg.replace('###', msg);
        }
        that.layer.confirm(alertMsg, {
            skin: that.mySkin,
            closeBtn: false,
            shade: 0.001,
            title: false,
            icon: this.iconType,
            shift: 1,
            shadeClose: true
        }, function (index) {
            if(no_ajax){
                if (typeof callback === "function") {
                    callback(obj);
                }
                that.layer.closeAll();
                return false;
            }else {

                $.ajax({
                    url     : url,
                    data    : getData,
                    type    : method ? method : 'POST',
                    cache   : false,
                    dataType: 'json',
                    success : function (res) {
                        that.createMsgEvent(res);
                        if (typeof callback === "function") {
                            callback(res);
                        }
                    },
                    error   : function () {
                    }
                });
            }
        });

    },

    /**
     * [deleteEvent deleteEvent ajax鍒犻櫎浜嬩欢]
     * @author yangkun 2016-12-13
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          url                         [url]
     * @param     {[type]}          getData                     [鏁版嵁]
     * @param     {[type]}          obj                         [dom瀵硅薄]
     * @param     {[type]}          method                      [post|get]
     * @return    {[type]}                                      [description]
     */
    deleteCustormEvent: function (url, getData, obj, callback, method) {
        var that = this;
        var msg ;
        var alertMsg = that.delCustormMsgTxt;
        if (typeof(obj) == "string") {
            alertMsg = obj;
        } else {
            msg = $(obj).attr('msg').trim() == '' ? '姝ゆ潯璁板綍' : $(obj).attr('msg');
            alertMsg = alertMsg.replace('###', msg);
        }
        that.layer.confirm(alertMsg, {
            skin: that.mySkin,
            closeBtn: false,
            shade: 0.001,
            title: false,
            icon: this.iconType,
            shift: 1,
            shadeClose: true
        }, function (index) {
            $.ajax({
                url: url,
                data: getData,
                type: method ? method : 'POST',
                cache: false,
                dataType: 'json',
                success: function (res) {
                    that.createMsgEvent(res);
                    if (typeof callback === "function") {
                        callback(res);
                    }
                },
                error: function () {
                }
            });
        });
    },
    /**
     * [noSelectEvent 鍒ゆ柇鏈夋病鏈夐€夋嫨input [type=checkbok]]
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       area            [鍖哄煙id]
     * @return    {[type]}                       [description]
     */
    noSelectEvent: function (area) {
        var IdArray = new Array();
        area = area ? area : this.area;
        var IdArea = $("#" + area);
        var tmp = '';
        var i = 0;
        IdArea.find('input[name="items[]"]:checked').each(function () {
            IdArray[i] = $(this).val();
            i++;
        });
        //alert(IdArray)
        if (IdArray.length <= 0) {
            this.alertEvent('璇峰厛閫夋嫨瑕佹搷浣滅殑鍒�', 2);
            return false;
        }
        return IdArray;
    },
    /**
     * [batchDeleteEvent 鎵归噺鍒犻櫎浜嬩欢]
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       url             [鎺ュ彛url]
     * @return    {[type]}                       [description]
     */
    batchDeleteEvent: function (url) {
        IdArray = this.noSelectEvent();
        if (!IdArray) {
            return;
        }
        this.deleteEvent(url, IdArray);
    },
    /**
     *
     * @param url
     */
    openViewEvent: function (url, title,w,h) {
        var that = this;
        this.index = parent.layer.getFrameIndex(window.name);
        var title = title ? title : false;
        var width= w?w:'500px';
        var height= h?h:'600px';
        that.layer.open({
            type: 2,
            title: title,
            skin: that.mySkin,
            area: [width, height],
            shadeClose: true,
            shade: 0.001,
            fix: false, //涓嶅浐瀹�
            content: url
        });
    },
    /**
     * [batchEditEvent 鎵归噺缂栬緫浜嬩欢]
     * @author yangkun 2016-09-25
     * @copyright [Copyright (c)2016-09-25]
     * @version   [1.5]
     * @param     {[type]}       url             [鎺ュ彛url]
     * @return    {[type]}                       [description]
     */
    batchEditEvent: function (url) {
        var that = this;
        IdArray = this.noSelectEvent();
        if (!IdArray) {
            return;
        }
        this.index = parent.layer.getFrameIndex(window.name);
        that.layer.open({
            type: 2,
            skin: that.borderSkin,
            shadeClose: true,
            title: that.batchEditTxt,
            area: ['700px', '530px'],
            fix: false, //涓嶅浐瀹�
            content: url + "?data=" + IdArray
        });
    },
    layerFormEvent: function (res) {
        if (res) {
            this.showmsgEvent(res, 'parent');
        }
    },
    /**
     *
     * @param json
     * @returns {boolean}
     */
    createMsgEvent: function (json) {
        try {
            if (json.code) {
                if (typeof  json.data == 'object') {
                    this.objMsg.items = json.data.data ? json.data.data : json.data.items;
                    this.objMsg.error = (json.data.status === 0 ? 1 : 0);
                    this.objMsg.timer = (json.data.timer === 0 ? 0 : 3000);
                } else {
                    this.objMsg.items = json.data ? json.data : json.items;
                    this.objMsg.error = (json.status === 0 ? 1 : 0);
                    this.objMsg.timer = 3000;

                }
                this.msgEvent(this.objMsg);
            } else {
                this.msgEvent(json);
            }

            return true;
        } catch (err) {

        }
    },
    /**
     * [ajaxFormEvent ajax鎻愪氦琛ㄥ崟]
     * @author yangkun 2016-11-25
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          formID                      [琛ㄥ崟id]
     * @param     {[type]}          submitID                    [纭鎸夐挳id]
     * @param     {[type]}          sureSubmit                  [浜屾纭鎸夐挳id]
     * @param     {[type]}          ifMore                      [鏄惁瑕佸脊绐楁彁绀篯
     * @param     {[type]}          method                      [post|get]
     * @return    {[type]}                                      [json]
     */
    ajaxFormEvent: function (formID, submitID, sureSubmit, pageID, callback, method, ErrorCls) { //#create_check_submit
        var that = this
        var crfCls = '#hidden_Crf_token';
        var ifButton = false;
        $(sureSubmit).bind('click', function () {
            if (!$(crfCls).val() || $(crfCls).val() == 'undefined') {
                $(formID).append('<input type=hidden id=hidden_Crf_token value=2>');
            }
            if ($(crfCls).val() == 1) {
                return;
            }
            $(formID).submit();
        });
        var submitTxt = $(submitID).val();
        if (submitTxt == 'undefined' || submitTxt == '') {
            submitTxt = $(submitID).html();
            ifButton = true;
        }
        $(formID).ajaxForm({
            dataType: 'json',
            type: method ? method : 'POST',
            beforeSend: function () {
                $(submitID).attr('disabled', 'disabled');
                $(sureSubmit).attr('disabled', 'disabled');
                $(crfCls).val(1);
                return;
            },
            success: function (responseText, statusText, xhr, $form) {
                that.createMsgEvent(responseText);
                if (typeof callback === "function") {
                    callback(responseText);
                }

                if (responseText) {
                    if (responseText && typeof responseText == 'object') {
                        setTimeout(function () {
                            $(crfCls).val(2);
                            $(submitID).removeAttr('disabled');
                            $(sureSubmit).removeAttr('disabled');
                        }, 3000);
                        if (ifButton) {

                            $(submitID).html(submitTxt);
                        } else {
                            $(submitID).val(submitTxt);
                        }
                    }

                }

            },
            error: function (responseText, statusText, xhr) {

                var json = responseText.responseJSON;
                //console.log(json);
                if(!json){
                    return;
                }
                if (pageID) {
                    var k = 0;
                    var errArray = [];
                    var error_id;
                    $('.erroricon').remove();

                    if (ErrorCls) {
                        for (var y in json) {
                            error_id = y.replace('.', '_');
                            errArray[k] = error_id;
                            k++;
                            $(formID+' .' + error_id).html('<font  class="erroricon" style="color: #ff0000;">'
                                + json[y][0] + '</font>');

                        }
                    } else {
                        for (var y in json) {
                            error_id = y.replace('.', '_');
                            errArray[k] = error_id;
                            k++;
                            $('#' + error_id).html('<font  class="erroricon" style="color: #ff0000;">'
                                + json[y][0] + '</font>');

                        }
                    }
                    // if (errArray[0]) {
                    //     location.href = "#" + errArray[0];
                    // }
                } else {

                    for (var y in json) {
                        that.objMsg.items = json[y][0];
                        that.objMsg.error = 1;
                        break;

                    }
                    that.msgEvent(that.objMsg);
                }
                if (json && typeof json == 'object') {
                    $(submitID).removeAttr('disabled');
                    $(sureSubmit).removeAttr('disabled');
                    setTimeout(function () {
                        $(crfCls).val(2);
                    }, 3000);
                }

                return;
            }
        });
    },
    /**
     * [tipEvent tip浜嬩欢]
     * @author yangkun 2016-11-25
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          msgObj                      [description]
     * @return    {[type]}                                      [description]
     */
    tipEvent: function (msgObj) {
        if (msgObj.error) {
            var that = this;
            items = msgObj.items;
            $('.error').html('');
            for (var i in items) {
                $('.' + i).html('<font color=red>' + items[i] + '</font>');
            }
        }
    },
    textEnevt: function (textID, toolbars, maximumWords, height) {
        var editor;
        //鍏蜂綋鍙傛暟閰嶇疆鍦�  editor_config.js 涓�
        var options = {
            zIndex: 999,
            initialFrameWidth: "100%", //鍒濆寲瀹藉害
            initialFrameHeight: height ? height : 350, //鍒濆寲楂樺害
            focus: false, //鍒濆鍖栨椂锛屾槸鍚﹁缂栬緫鍣ㄨ幏寰楃劍鐐箃rue鎴杅alse
            maximumWords: maximumWords ? maximumWords : 999999,
            removeFormatAttributes: 'class,style,lang,width,height,align,hspace,valign', //鍏佽鐨勬渶澶у瓧绗︽暟 'fullscreen',
            pasteplain: true,
            elementPathEnabled: false,
            autoHeightEnabled: true,
            autotypeset: {
                mergeEmptyline: true, //鍚堝苟绌鸿
                removeClass: true, //鍘绘帀鍐椾綑鐨刢lass
                removeEmptyline: false, //鍘绘帀绌鸿
                textAlign: "left", //娈佃惤鐨勬帓鐗堟柟寮忥紝鍙互鏄� left,right,center,justify 鍘绘帀杩欎釜灞炴€ц〃绀轰笉鎵ц鎺掔増
                imageBlockLine: 'center', //鍥剧墖鐨勬诞鍔ㄦ柟寮忥紝鐙崰涓€琛屽墽涓�,宸﹀彸娴姩锛岄粯璁�: center,left,right,none 鍘绘帀杩欎釜灞炴€ц〃绀轰笉鎵ц鎺掔増
                pasteFilter: false, //鏍规嵁瑙勫垯杩囨护娌′簨绮樿创杩涙潵鐨勫唴瀹�
                clearFontSize: false, //鍘绘帀鎵€鏈夌殑鍐呭祵瀛楀彿锛屼娇鐢ㄧ紪杈戝櫒榛樿鐨勫瓧鍙�
                clearFontFamily: false, //鍘绘帀鎵€鏈夌殑鍐呭祵瀛椾綋锛屼娇鐢ㄧ紪杈戝櫒榛樿鐨勫瓧浣�
                removeEmptyNode: false, //鍘绘帀绌鸿妭鐐�
                removeTagNames: {
                    "font": 1
                },
                indent: false, // 琛岄缂╄繘
                indentValue: '0em' //琛岄缂╄繘鐨勫ぇ灏�
            },
            toolbars: toolbars ? [
                toolbars
            ] : [
                ['fullscreen', 'source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|', 'directionalityltr', 'directionalityrtl', 'indent', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|', 'insertimage', 'emotion', 'insertvideo', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|', 'horizontal', 'date', 'time', 'spechars', 'wordimage', '|', 'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|', 'print', 'preview', 'searchreplace']
            ]
        };

        try {
            editor = new UE.ui.Editor(options);
            editor.render(textID);
        }
        catch (err) {
        }
        return true;

    },

    /**
     *
     * @param cls
     */
    getAllPermissionEvent: function (cls, inputId) {
        var permissionArray = new Array();
        var i = 0
        $(cls).each(function () {
            if ($(this).is(':checked') && $(this).val() != '') {
                permissionArray[i] = $(this).val();
                i++;
            }
        });
        $(inputId).val(permissionArray.join("||"));
    },

    radioCheckedEvent:function (cls,v,attName) {
        $(cls).each(function () {
            if(!attName){
                if ($(this).val() == v) {
                    $(this).prop('checked', true);
                }else{
                    $(this).prop('checked', false);
                }
            }else{
                if ($(this).attr(attName) == v) {
                    $(this).prop('checked', true);
                }else{
                    $(this).prop('checked', false);
                }
            }

        })
    },
    checkBoxCheckedEvent:function (cls,v,rule,attName) {
        rule = rule ? rule : '||';
        var arr = [];
        if (v == '' || !v) {
            return;
        }
        arr = v.split(rule);
        $(cls).each(function () {
            if (!attName) {
                if ($.inArray($(this).val(),arr) >= 0) {
                    $(this).prop('checked', true);
                }else{
                    $(this).prop('checked', false);
                }
            } else {
                if ($.inArray($(this).attr(attName),arr) >= 0 ) {
                    $(this).prop('checked', true);
                }else{
                    $(this).prop('checked', false);
                }
            }


        });
    },
    /**
     * [checkedEvent 涓嬫媺鎴栧崟閫夌粰鍊兼椂閫変腑鐘舵€乚
     * @author yangkun 2016-11-30
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          cls                         [id | class]
     * @param     {[type]}          v                           [涓庤繖涓€肩浉绛夋椂灏遍€変腑]
     * @param     {[type]}          type                        [cselect|radio]
     * @return    {[type]}                                      [description]
     */
    checkedEvent: function (cls, v, type, rule, attName) {
        var type = type ? type : "select";
        var rule = rule ? rule : '||';
        if (type == 'select') {
            $(cls).find('option').each(function () {
                if ($(this).val() == v) {
                    $(this).attr('selected', 'selected');
                }
            })
        }
        if (type == 'radio') {
            $(cls).each(function () {
                if ($(this).val() == v) {
                    $(this).prop('checked', true);
                }else{
                    $(this).prop('checked', false);
                }
            })
        }
        if (type == 'checkbox') {
            if (v == '' || !v) {
                return;
            }
            var arr = new Array();
            arr = v.split(rule);
            $(cls).each(function () {
                if (!attName) {
                    if ($.inArray($(this).val(),arr) >= 0) {
                        $(this).prop('checked', true);
                    }else{
                        $(this).prop('checked', false);
                    }
                } else {
                    if ($.inArray($(this).attr(attName),arr) >= 0 ) {
                        $(this).prop('checked', true);
                    }else{
                        $(this).prop('checked', false);
                    }
                }
            });
        }
    },

    checkedCustomEvent: function (cls, v, type, rule, attName) {
        var type = type ? type : "select";
        var rule = rule ? rule : '||';
        if (type == 'select') {
            var has = 0;
            $(cls).find('option').each(function () {
                if ($(this).val() == v) {
                    has = 1;
                    $(this).attr('selected', 'selected');
                }
            });
            if (!has) {
                $(cls).append('<option value="' + v + '" selected>' + v + '</option>');
            }
        }
        if (type == 'radio') {
            $(cls).each(function () {
                if ($(this).val() == v) {
                    $(this).attr('checked', 'checked');
                }
            })
        }
        if (type == 'checkbox') {
            if (v == '' || !v) {
                return;
            }
            var arr = new Array();
            arr = v.split(rule);
            $(cls).each(function () {
                for (var x in arr) {
                    if (!attName) {
                        if ($(this).val() === arr[x]) {
                            $(this).attr('checked', 'checked');
                            break;
                        }
                    } else {
                        if ($(this).attr(attName) == arr[x]) {
                            $(this).attr('checked', 'checked');
                            break;
                        }
                    }

                }
            });
        }
    },
    /**
     * [ajaxGetTable jax 鎶撳彇椤甸潰]
     * @author yangkun 2016-11-30
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          formID                      [琛ㄥ崟id]
     * @param     {[type]}          page                        [褰撳墠椤礭
     * @return    {[type]}                                      [description]
     */
    ajaxGetTable: function (formID, url, page, ajax_return) {
        this.cur_page = page; //褰撳墠椤甸潰 淇濆瓨涓哄叏灞€鍙橀噺
        $.ajax({
            type: "POST",
            url: url + '/p/' + page, //+tab,
            data: $(formID).serialize(), // 浣犵殑formid
            success: function (data) {
                $(ajax_return).html('');
                $(ajax_return).append(data);
            }
        });
    },
    /**
     * [showMsgPageEvent ]
     * @author yangkun 2016-12-13
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          pageID                      [description]
     * @param     {[type]}          obj                         [description]
     * @return    {[type]}                                      [description]
     */
    showMsgPageEvent: function (pageID, obj) {
        if (!obj.error) {
            //$(pageID).html(obj.items);
            if (obj.url == 'reload') {
                setTimeout(function () {
                    window.location.reload();
                }, obj.timer);
            } else {
                setTimeout(function () {
                    window.location.href = obj.url;
                }, obj.timer);
            }
            return;
        }
        $(pageID).html(obj.items);
    },
    /**
     * [ajaxGetHtmlEvent description]
     * @author yangkun 2016-12-15
     * @copyright [Copyright(c) Email:jiuduyumail@163.com]
     * @version   [1.5]
     * @param     {[type]}          listID                      [description]
     * @param     {[type]}          url                         [description]
     * @param     {[type]}          datas                       [description]
     * @param     {[type]}          method                      [description]
     * @return    {[type]}                                      [description]
     */
    ajaxGetHtmlEvent: function (listID, url, datas, crf) {
        if (crf == 1) {
            return;
        }
        $.post(url, datas, function (res) {
            $(listID).html(res);
        })
    },
    /**
     * [secondEvent 璇荤浜嬩欢]
     * @author yangkun 2016-10-06
     * @copyright [Copyright (c)2016-10-06]
     * @version   [1.5]
     * @param     {[type]}       button          [description]
     * @return    {[type]}                       [description]
     */
    secondEvent: function (button, forgetPwd, timer) {
        var countdown = timer;
        var timeCount = setInterval(function () {
            if (countdown == 0) {
                $(button).removeAttr("disabled");
                $(button).val("鑾峰彇楠岃瘉鐮�");
                $(button).html("鑾峰彇楠岃瘉鐮�");
                countdown = timer;
                if(forgetPwd){
                    $(forgetPwd).val(0);
                }
                clearTimeout(timeCount);
                return;
            } else {
                $(button).attr("disabled", "disabled");
                $(button).val("閲嶆柊鍙戦€�(" + countdown + "s)");
                countdown--;
            }
        }, 1000);
    },
    /**
     * [ajaxRequestEvent ajax鍙戦€侀獙璇佺爜]
     * @author yangkun 2016-10-06
     * @copyright [Copyright (c)2016-10-06]
     * @version   [1.5]
     * @param     {[type]}       obj             [description]
     * @param     {[type]}       button          [description]
     * @return    {[type]}                       [description]
     */
    ajaxRequestEvent: function (codeUrl, dataObj, button, ifModifly, forgetPwd) {
        var forgetPwd = forgetPwd ? forgetPwd : '#forgetPwd';
        var tmpv = $(forgetPwd).val();
        var link = {};
        var that = this
        link = dataObj;
        if (!ifModifly) {
            if (!that.mobileCheckEvent(m, button)) {
                return false;
            }
        }
        if (tmpv == 1) {
            return;
        }
        $(forgetPwd).val(1)
        $.ajax({
            url: codeUrl,
            data: link,
            type: 'POST',
            cache: false,
            dataType: 'json',
            success: function (res) {
                var str;
                if (res.error === 1) {
                    that.secondEvent(button, forgetPwd);
                    that.textShowEvent(button, '', '', 'black');
                } else {
                    that.textShowEvent(button, that.smsSendFailTxt);
                }
            },
            error: function (res) {
                var resObj = res;
                $(forgetPwd).val(0);
                that.textShowEvent(button, '璇锋眰澶辫触');
            }
        });
    },
    /**
     * [mobileCheckEvent 鎵嬫満鍙锋槸鍚︽弧瓒虫潯浠舵鏌
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       mobile          [鎵嬫満鍙穄
     * @return    {[type]}                       [description]
     */
    mobileCheckEvent: function (mobile, button) {
        var buttonObj = button ? button : false;
        if (!mobile) {
            if (buttonObj) {
                this.textShowEvent(buttonObj, this.pleaseMobile, this.iconfontError);
            } else {
                this.alertEvent(this.pleaseMobile, 2);
            }
            return false;
        }
        if (!(this.mobileReg.test(mobile))) {
            if (buttonObj) {
                this.textShowEvent(buttonObj, this.mobileFormatErr, this.iconfontError);
            } else {
                this.alertEvent(his.mobileFormatErr, 2);
            }
            return false;
        }
        return true;
    },
    /**
     * [textShowEvent 鎴愬姛鎴栧け璐ユ椂鏂囨湰淇℃伅鏄剧ず]
     * @author yangkun 2016-10-10
     * @copyright [Copyright (c)2016-10-10]
     * @version   [1.5]
     * @param     {[type]}       button          [鎸夐挳瀵硅薄]
     * @param     {[type]}       txtMsg          [鏄剧ず鏂囨湰]
     * @param     {[type]}       iconfont        [鏍峰紡]
     * @return    {[type]}                       [description]
     */
    textShowEvent: function (button, txtMsg, color) {
        var that = this
        var labelObj = $(button).parent().find('.error');
        var txtMsg = txtMsg ? txtMsg : that.smsHasSend;
        var color = color ? color : 'red';
        var smsOkStr = '<i></i><span style="color:' + color + '">' + txtMsg + '</span>';
        labelObj.html(smsOkStr);
        labelObj.css('display', 'block');
    },
    /**
     * [mobileModiflySuccessEvent 淇敼鎵嬫満鍙穄
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       res             [description]
     * @param     {[type]}       textId          [description]
     * @return    {[type]}                       [description]
     */
    mobileModiflySuccessEvent: function (res, textId) {
        var that = this;
        if (res) {
            var resObj = eval('(' + res + ')');
            if (resObj.mobile) {
                parent.$(textId).html(resObj.mobile)
            }
            that.alertEvent(resObj.msg, resObj.type, true)
            parent.layer.close(that.index);
        }
    },
    /**
     * [addJqueryCheckMethodEvent 娣诲姞jquery.Validate 妫€鏌ユ柟娉昡
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       methodName      [鏂规硶鍚峕
     * @param     {[type]}       preg            [瑙勫垯]
     */
    addJqueryCheckMethodEvent: function (methodName, preg) {
        var preg = preg ? preg : this.mobileReg;
        var that = this;
        var methodName = methodName ? methodName : 'method';
        jQuery.validator.addMethod(methodName, function (value, element) {
            return this.optional(element) || (preg.test(value));
        }, that.mobileErr);
    },
    /**
     * [mobileValidEvent 鎵嬫満鍙锋鏌
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [琛ㄥ崟id]
     * @param     {[type]}       name            [input name]
     * @return    {[type]}                       [description]
     */
    mobileValidEvent: function (formID, name, ifRequire) {
        var Require = true;
        if (ifRequire === false) {
            Require = false;
        }
        var formID = formID ? formID : this.formID;
        var that = this;
        var name = name ? name : 'name';
        $(document).ready(function () {
            that.rulesObj[name] = {
                required: Require,
                digits: true,
                maxlength: 11,
                phone: true
            };
            that.messagesObj[name] = {
                required: that.pleaseMobile,
                phone: that.mobileFormatErr,
                digits: that.mobileFormatErr,
                maxlength: jQuery.format("鎵嬫満鍙峰彧鑳界敱 {0} 鏁板瓧缁勬垚")
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [passwordValidEvent 鐧诲綍鏃跺瘑鐮佹鏌
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [琛ㄥ崟id]
     * @param     {[type]}       password        [input name]
     * @return    {[type]}                       [description]
     */
    passwordValidEvent: function (formID, password, ifRequire) {
        var formID = formID ? formID : this.formID;
        var password = password ? password : 'password';
        var that = this;
        var Require = true;
        if (ifRequire === false) {
            Require = false;
        }
        $(document).ready(function () {
            that.rulesObj[password] = {
                required: Require
            };
            that.messagesObj[password] = {
                required: that.nPasswordPlease
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [codeValidEvent 楠岃瘉鐮佹鏌
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [description]
     * @param     {[type]}       password        [description]
     * @return    {[type]}                       [description]
     */
    codeValidEvent: function (formID, password, ifRequire) {
        var formID = formID ? formID : this.formID;
        var code = code ? code : 'code';
        var that = this;
        var Require = true;
        if (ifRequire === false) {
            Require = false;
        }
        $(document).ready(function () {
            that.rulesObj[code] = {
                required: Require
            };
            that.messagesObj[code] = {
                required: that.codeNeed
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [passwordConfirmValidEvent 涓ゆ瀵嗙爜鏄惁涓€鍒癩
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [琛ㄥ崟id]
     * @param     {[type]}       password        [input name]
     * @param     {[type]}       equalToID       [equalToID]
     * @return    {[type]}                       [description]
     */
    passwordConfirmValidEvent: function (formID, password, equalToID, ifRequire) {
        var formID = formID ? formID : this.formID;
        var comfirmPassword = comfirmPassword ? comfirmPassword : 'comfirmPassword';
        var equalToID = equalToID ? equalToID : '#password';
        var that = this;
        var Require = true;
        if (ifRequire === false) {
            Require = false;
        }
        $(document).ready(function () {
            that.rulesObj[comfirmPassword] = {
                required: Require,
                equalTo: equalToID
            };
            that.messagesObj[comfirmPassword] = {
                required: that.cPasswordPlease,
                equalTo: that.passwordNotSame
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [nameValidEvent 鐢ㄦ埛鍚嶉獙璇乚
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [description]
     * @param     {[type]}       password        [description]
     * @param     {[type]}       userName        [description]
     * @return    {[type]}                       [description]
     */
    nameValidEvent: function (formID, userName, len, ifRequire) {
        var formID = formID ? formID : this.formID;
        var userName = userName ? userName : 'userName';
        var that = this;
        var len = len ? len : 2;
        var Require = true;
        if (ifRequire === false) {
            Require = false;
        }
        $(document).ready(function () {
            that.rulesObj[userName] = {
                required: Require,
                minlength: len
            };
            that.messagesObj[userName] = {
                required: that.namePlease,
                minlength: jQuery.format("鐢ㄦ埛鍚嶄笉鑳藉皬浜� {0} 浣嶅瓧绗�")
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [emailValidEvent 閭鍦板潃楠岃瘉]
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [description]
     * @param     {[type]}       pwdCheck        [description]
     * @return    {[type]}                       [description]
     */
    emailValidEvent: function (formID, emailInput, ifRequire) {
        var Require = true;
        if (ifRequire === false) {
            Require = false;
        }
        var formID = formID ? formID : this.formID;
        var emailInput = emailInput ? emailInput : 'email';
        var that = this;
        $(document).ready(function () {
            that.rulesObj[emailInput] = {
                required: Require,
                email: true
            };
            that.messagesObj[emailInput] = {
                required: that.emailAddress,
                email: that.emailRightAddress
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [oPasswordValidEvent 鍘熷瘑鐮佹椂妫€鏌
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [琛ㄥ崟id]
     * @param     {[type]}       password        [input name]
     * @return    {[type]}                       [description]
     */
    oPasswordValidEvent: function (formID, pwdCheck) {
        var formID = formID ? formID : this.formID;
        var password = password ? password : 'opassword';
        var that = this;
        $(document).ready(function () {
            that.rulesObj[password] = {
                required: true,
                pwdCheck: true
            };
            that.messagesObj[password] = {
                required: that.oPasswordPlease,
                pwdCheck: that.passwordRegx
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [passwordModiflyValidEvent 淇敼瀵嗙爜鏃舵鏌
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @param     {[type]}       formID          [琛ㄥ崟id]
     * @param     {[type]}       password        [input name]
     * @return    {[type]}                       [description]
     */
    passwordModiflyValidEvent: function (formID, pwdCheck) {
        var formID = formID ? formID : this.formID;
        var password = password ? password : 'password';
        var that = this;
        $(document).ready(function () {
            that.rulesObj[password] = {
                required: true,
                pwdCheck: true
            };
            that.messagesObj[password] = {
                required: that.nPasswordPlease,
                pwdCheck: that.passwordRegx
            };
            that.validInitEvent(formID);
        });
    },
    /**
     * [passwordModiflyValidEvent 鎵嬫満鍙锋垨鑰呭浐瀹氱數璇漖
     * @author yangkun 2016-10-09
     * @copyright [Copyright (c)2016-10-09]
     * @version   [1.5]
     * @param     {[type]}       formID          [description]
     * @param     {[type]}       pwdCheck        [description]
     * @return    {[type]}                       [description]
     */
    mobileOrTelValidEvent: function (formID, tel, telId) {
        var formID = formID ? formID : this.formID;
        var tel = tel ? tel : 'tel';
        var that = this;
        var t = $(telId).val();
        if (this.mobileCheckEvent(t)) {
            this.mobileValidEvent(formID, tel);
        } else {
            $(document).ready(function () {
                that.rulesObj[tel] = {
                    required: true
                };
                that.messagesObj[tel] = {
                    required: that.linkPlease
                };
                that.validInitEvent(formID);
            });
        }
    },
    /**
     * [validInitEvent jquery.validation鍒濆鍖朷
     * @author yangkun 2016-10-08
     * @copyright [Copyright (c)2016-10-08]
     * @version   [1.5]
     * @return    {[type]}       [description]
     */
    validInitEvent: function (formID) {
        var formID = formID ? formID : this.formID;
        var that = this;
        $(document).ready(function () {
            var validatorObj = $(formID).validate({
                rules: that.rulesObj,
                messages: that.messagesObj
            });
        });
    },
    plusZero: function (num) {
        num = num * 1;
        return num * 1 > 9 ? num : '0' + num;
    },
    siampleSubmit: function (id) {
        $(id).submit();
    },
    /**
     * yangkun
     * @param url
     * @param idOrCls
     * @param data
     */
    viewInfoEvent: function (url, idOrCls, data, ifview) {

        var that = this;
        var data = data ? data : {};
        var ifview = ifview ? ifview : true;
        var permissionClass = '.permissionClass';
        $.post(url, data, function (res) {

            $(idOrCls).html(res);
            that.checkedEvent(permissionClass, permissionString, 'checkbox');
            if (ifview) {
                makeChecked();
                $(permissionClass).each(function () {
                    $(this).attr('readonly', 'readonly');
                    $(this).attr('disabled', 'disabled');
                    $(this).attr('onclick', 'common.noClickEvent()');
                });
            }
        });

    },
    /**
     * yangkun
     * 涓嶅厑璁歌繘琛岀偣鍑讳慨鏀�
     */
    noClickEvent: function () {
        this.objMsg.items = '浠呬緵鏌ョ湅锛屼慨鏀硅杩涜缂栬緫';
        common.msgEvent(this.objMsg);
    },
    /**
     * yk 鍒涘缓鍟嗗搧灞炴€х殑绗涘崱灏旂Н specObj.createSpecDecare(0,{});console.log(result)
     * @param index
     * @param current
     */
    createSpecDecare: function (index, current, selectSpec) {
        if (index < selectSpec.length - 1) {
            var specItem = selectSpec[index];
            var keya = specItem.specName;
            var items = specItem.specItems;
            if (items.length == 0) {
                this.createSpecDecare(index + 1, current, selectSpec);
            }
            for (var i = 0; i < items.length; i++) {
                if (!items[i])continue;
                var newMap = {};
                newMap = $.extend(newMap, current);
                newMap[keya] = items[i];
                this.createSpecDecare(index + 1, newMap, selectSpec);
            }
        } else if (index == selectSpec.length - 1) {
            var specItem = selectSpec[index];
            var keya = specItem.specName;
            var items = specItem.specItems;
            if (items.length == 0) {
                result.push(current);
            }
            for (var i = 0; i < items.length; i++) {
                if (!items[i])continue;
                var newMap = {};
                newMap = $.extend(newMap, current);
                newMap[keya] = items[i];
                result.push(newMap);
            }
        }
    },
    /**
     *
     * @param reatoion
     * @param func
     * @param obj
     */
    selectAllEvent: function (cls, obj, callback) {
        var objInputs = document.getElementsByName(cls);
        if (obj.checked) {
            for (var i = 0; i < objInputs.length; i++) {
                objInputs[i].checked = 1;
            }
        } else {
            for (var i = 0; i < objInputs.length; i++) {
                objInputs[i].checked = 0;
            }
        }
        if (typeof callback === "function") {
            callback(object, objInputs);
        }
    },
    /**
     *
     * @param  ob this
     */
    keyIntEvent: function (ob) {

        if (!ob.value.match(/^[\+\-]?\d*?\d*?$/)) {
            ob.value = this.intValue;
        } else {
            this.intValue = ob.value;
        }
        if (ob.value.match(/^(?:[\+\-]?\d+(?:\d+)?)?$/)) {
            this.intValue = ob.value;
        }
    },
    /**
     *
     * @param ob this
     */
    keyUpEvent: function (ob) {

        if (!ob.value.match(/^[\+\-]?\d*?\.?\d{0,2}?$/)) {
            ob.value = this.sureValue;
        } else {
            this.sureValue = ob.value;
        }
        if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d{0,2})?)?$/)) {
            this.sureValue = ob.value;
        }
    },
    findSimleValueEvent: function (specClass, currentValue, attr) {
        var that = this;
        var flag = true;
        $(specClass).each(function () {
            if (attr) {
                var currenV = $(this).attr(attr);
            } else {
                var currenV = $(this).val();
            }
            if (currenV == currentValue) {

                flag = false;
                return;
            }
        });
        return flag;

    },
    calteStringLength: function (strClass, count, showStringLength) {
        var jmz = $(strClass).val();
        //jmz.replace(/[\u0391-\uFFE5]*/g,"a").length;  //鍏堟妸涓枃鏇挎崲鎴愪袱涓瓧鑺傜殑鑻辨枃锛屽湪璁＄畻闀垮害
        if (jmz.length > count) {
            $(strClass).attr('maxlength', count);
            $(showStringLength).html('<font style="color:red">'+jmz.length + '/' + count + '瀛�</font>');
            return;
        } else {
            if (showStringLength) {
                $(showStringLength).html(jmz.length + '/' + count + '瀛�');
            }

        }

    },
    sortEvent: function (sortable, li, callback) {
        $(sortable).sortable({
            cursor: "move",
            items: li,                        //鍙槸li鍙互鎷栧姩
            opacity: 0.6,                       //鎷栧姩鏃讹紝閫忔槑搴︿负0.6
            revert: true,                       //閲婃斁鏃讹紝澧炲姞鍔ㄧ敾
            update: function (event, ui) {       //鏇存柊鎺掑簭涔嬪悗
                if (typeof  callback == 'function') {
                    callback($(this).sortable("toArray"));
                }
            }
        });
    },
    /**
     *
     * @param year
     * @param month
     * @param day
     * @param hours
     * @param minu
     * @param sec
     * @param divid
     */
    countTimeEvent: function (year, month, day, hours, minu, sec, divid) {
        var now = this.dateObj;
        var endDate = new Date(year, month - 1, day, hours, minu, sec);
        var leftTime = endDate.getTime() - now.getTime();
        var leftsecond = parseInt(leftTime / 1000);
        var day1 = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        var cc = document.getElementById(divid);
        cc.innerHTML = "鍓╀綑" + day1 + "澶�" + hour + "灏忔椂";
    },
    deleteEventMsg: function (url, getData, obj, callback, method) {
        var that = this;
        var msg = $(obj).attr('msg');
        var alertMsg = that.delMsgTxt;
        if (typeof(msg) == "undefined") {
            alertMsg = alertMsg.replace('###', '姝ゆ潯璁板綍');

        } else {

            //alertMsg = alertMsg.replace('###', msg);
            alertMsg=$(obj).attr('msg');
        }
        that.layer.confirm(alertMsg, {
            skin: that.mySkin,
            closeBtn: false,
            shade: 0.001,
            title: false,
            icon: this.iconType,
            shift: 1,
            shadeClose: true
        }, function (index) {
            $.ajax({
                url: url,
                data: getData,
                type: method ? method : 'POST',
                cache: false,
                dataType: 'json',
                success: function (res) {
                    that.createMsgEvent(res);
                    if (typeof callback === "function") {
                        callback(res);
                    }
                },
                error: function () {
                }
            });
        });
    }
}
var common = new Common();
