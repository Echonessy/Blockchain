/**
 * Created by Echonessy on 2018/12/13.
 */


$(function () {
    //Tab切换
    manaTabEvt()
    function manaTabEvt() {
        $('#mana_Tab>li').on('click',function () {
            $(this).siblings().removeClass();
            $(this).addClass('this_Tab');
            $('#mana_TabCon>li').css('display','none');
            $('#mana_TabCon>li').eq($(this).index()).stop(true).fadeIn(150);
        });
        $(".fade_Close").on('click',function () {
            $(this).parents('.fade_Box').stop(true).fadeOut(150);
        })
        $("#alias").val(window.localStorage.getItem('c_pid'))
    }
    messageUpdateRead();
    function messageUpdateRead() {
        var Url = '/messageUpdateRead';
        var SubData = {};
        SubData.id = ''
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                renderDoneHtml(res.data)
            })
        })
    }
    
    //阻止冒泡
    function stopBubble(evt) {
        var evt = evt||window.event;
        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
        else {
            window.event.cancelBubble = true;
        }
    }
    //模拟跳转
    mockRedirect()
    function mockRedirect() {
        $('.to_Passivesign').on('click',function () {
            window.location.href  = '/passivesign'
        })
        $('.to_Signinfo').on('click',function () {
            window.location.href  = '/signinfo'
        })
        $('.to_Agreeinfo').on('click',function () {
            window.location.href  = '/agreeinfo'
        })
        $('.to_Refuseinfo').on('click',function () {
            window.location.href  = '/refuseinfo'
        })
        $('.to_Signnext').on('click',function () {
            window.location.href  = '/signnext'
        })
    }



    //获取全部文件Ajax
    getAllAjax();
    function getAllAjax() {
        var Url = '/contractAll';
        var SubData = {};
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                renderAllHtml(res.data)
            })
        })
    }
    //全部文件头部html
    function creAllTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>发起人</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>截止时间</span>';
        Html += '<span>状态</span>';
        Html += '</li>';
        return Html;
    }
    //全部文件列表Html
    function creAllListHtml(data) {
        var Html = '<ul class="single total_List">'
        Html += creAllTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                if(this_Data.status == '待我签') {
                    Html += '<span data-id="'+this_Data.id+'"><a href="/passivesign?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';

                } else {
                    Html += '<span data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
                }
                Html += '<span>'+this_Data.initiator+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.endTime+'</span>';
                Html += '<span>'+this_Data.status+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderAllHtml(data) {
        $('#total_List').html(creAllListHtml(data))
    }




    //获取待我签Ajax
    getWaitMineAjax()
    function getWaitMineAjax() {
        var Url = '/waitMineList';
        var SubData = {};
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                renderWaitMineHtml(res.data)
            })
        })
    }
    //待我签头部html
    function creWaitMineTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>发起人</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>截止时间</span>';
        Html += '</li>';
        return Html;
    }
    //待我签列表Html
    function creWaitMineHtml(data) {
        var Html = '<ul class="single wait_Me">'
        Html += creWaitMineTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span data-id="'+this_Data.id+'"><a href="/passivesign?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
                Html += '<span>'+this_Data.initiator+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.endTime+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderWaitMineHtml(data) {
        $('#wait_Me').html(creWaitMineHtml(data))

    }
    //获取待对方签Ajax
    getWaitYouAjax()
    function getWaitYouAjax() {
            var Url = '/waitOtherList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderWaitYouHtml(res.data)
                })
            })
        }
    //待对方签头部html
    function creWaitYoueTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>待签方</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>截止时间</span>';
        Html += '</li>';
        return Html;
    }
    //待对方签列表Html
    function creWaitYouHtml(data) {
        var Html = '<ul class="single wait_You">'
        Html += creWaitYoueTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
                Html += '<span>'+this_Data.signinArticle+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.endTime+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderWaitYouHtml(data) {
        $('#wait_You').html(creWaitYouHtml(data))
    }





    //获取已完成Ajax
    getDoneAjax()
    function getDoneAjax() {
            var Url = '/completeList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderDoneHtml(res.data)
                })
            })
        }
    //已完成头部html
    function creDoneTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>签署方</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>完成时间</span>';
        Html += '<span>操作</span>';
        Html += '</li>';
        return Html;
    }
    //已完成列表Html
    function creDoneHtml(data) {
        var Html = '<ul class="single sign_Done">'
        Html += creDoneTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
                Html += '<span>'+this_Data.signin+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.endTime+'</span>';
                if(this_Data.flag == 'Y') {
                    Html +="<button class='btn btn-primary wasmSignBtn' data-this_Data='"+JSON.stringify(this_Data)+"'>签名</button>"
                } else {
                    Html +="<button class='btn btn-primary ' disabled data-this_Data='"+JSON.stringify(this_Data)+"'>签名</button>"
                }
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderDoneHtml(data) {
        $('#sign_Done').html(creDoneHtml(data))
        wasmSignBtnEvt();
    }
    //签名
    function wasmSignBtnEvt() {
        $('.wasmSignBtn').on('click',function () {
            var this_Data = JSON.parse($(this).attr('data-this_Data'));
            $("#creatSign").stop(true).fadeIn(150);
            $("#creatSignBtn").attr('data-this_Data',$(this).attr('data-this_Data'));
        })
    }
    creatSignBtn();
    function creatSignBtn() {
        $("#creatSignBtn").on('click',function () {
            var this_Data = JSON.parse($(this).attr('data-this_Data'));
            var message = this_Data.fileHash;
            var id = this_Data.id;
            var alias = $('#alias').val();
            var auth = $('#auth').val();
            if(!alias) {layer.msg('请输入用户名(注册时的手机号)');return}
            if(!echo.fun.checkPhone(alias)) {
                layer.msg('账户格式错误，请重新输入');
                return
            }
            if(!auth) {layer.msg('请输入密码');return}
            readKeyFile(alias,auth,message,id);
        })
    }
    //文件读取
    function readKeyFile(alias,auth,message,id) {
        layer.msg('签名中，请稍后...签名结束自动关闭此弹窗.')
        var SubData = {};
        var Url = '/readKeyFile';
        SubData.alias = alias;
        SubData.auth = auth;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback( res,function () {
                console.log(res)
                var key = res.data;
                var signData = {message:message, key: key, password: auth}
                // var signData = {message:'91c3ea050a9226ca95348ba2ed6f98ab6fd8ec1ce43a7b140476592d4406c449', key: key, password: auth}
                createSignMessage(signData,id)
            })
        })
    }

    //创建签名
    function createSignMessage(signData,id) {
        signMessage(signData).then(r =>{
            var signature = r.data;
            console.log(signature)
            contractSaveSignature(signature,id)
        }).catch(err => {
            echo.box.alert(err)
        })
    }
    //请求后台
    function contractSaveSignature(signature,id) {
        var Url = '/contractSaveSignature';
        var SubData = {};
        SubData.id = id
        SubData.signature = signature
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                getDoneAjax()
            })
        })
    }
    //获取已拒绝Ajax
    getRefuseAjax()
    function getRefuseAjax() {
            var Url = '/refuseList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderRefuseHtml(res.data)
                })
            })
        }
    //已拒绝头部html
    function creRefuseTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>发起人</span>';
        Html += '<span>发起时间</span>';
        Html += '<span>拒签主体</span>';
        Html += '<span>拒签时间</span>';
        Html += '</li>';
        return Html;
    }
    //已拒绝列表Html
    function creRefuseHtml(data) {
        var Html = '<ul class="single refuse_List">'
        Html += creRefuseTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
                Html += '<span>'+this_Data.initiator+'</span>';
                Html += '<span>'+this_Data.denied+'</span>';
                Html += '<span>'+this_Data.startTime+'</span>';
                Html += '<span>'+this_Data.deniedTime+'</span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderRefuseHtml(data) {
        $('#refuse_List').html(creRefuseHtml(data))
    }



    //获取草稿箱Ajax
    getDraftAjax()
    function getDraftAjax() {
            var Url = '/draftList';
            var SubData = {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderDraftHtml(res.data)
                })
            })
        }
    //草稿箱html
    function creDraftTopHtml() {
        var Html = '';
        Html += '<li class="top">';
        Html += '<span>合同名称</span>';
        Html += '<span>签署对象</span>';
        Html += '<span>最后一次编辑时间</span>';
        Html += '<span></span>';
        Html += '</li>';
        return Html;
    }
    //草稿箱列表Html
    function creDraftHtml(data) {
        var Html = '<ul class="single sign_Draft">'
        Html += creDraftTopHtml();
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li>';
                Html += '<span data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
                Html += '<span>'+this_Data.signUser+'</span>';
                Html += '<span>'+this_Data.lastEditTime+'</span>';
                Html += '<span><img src="/static/img/model/del.png" data-id="'+this_Data.id+'" class="del_Ico" alt=""></span>';
                Html += '</li>';
            }
        }
        Html += '</ul>';
        return Html;
    }
    //渲染数据
    function renderDraftHtml(data) {
        $('#sign_Draft').html(creDraftHtml(data));
        deleteEvt()
    }
    // 删除草稿事件
    function deleteEvt() {
        $('.del_Ico').off('click');
        $('.del_Ico').on('click',function (evt) {
            stopBubble(evt);
            var that = this;
            var id = $(this).attr('data-id');
            $('#is_Del').stop(true).fadeIn(150);
            $('.del_Ok').off('click');
            $('.del_No').off('click');
            $('.del_Ok').on('click',function (evt) {
                stopBubble(evt)
                deleteDraftAjax(id);
                $('#is_Del').stop(true).fadeOut(150);
            })
            $('.del_No').on('click',function (evt) {
                stopBubble(evt)
                $('#is_Del').stop(true).fadeOut(150);
            })
        })
    }
    // 删除草稿
    function deleteDraftAjax(id) {
        var Url = '/deleteDraft';
        var SubData = {};
        SubData.id = id;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('删除成功');
                getDraftAjax();
            })
        })
    }
})