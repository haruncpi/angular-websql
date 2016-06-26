$('.deleteRecord').each(function () {
    $(this).click(function () {
        var r = confirm("Do you want to delete?");
        if (r == true) {
            return true;
        }
        return false;
    });
});

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

});


$(function () {
    $('.datepicker').datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true
    });
});


/* ============== CMS laravel ===================*/
var siteurl = $('meta[name=siteurl]').attr('content');
$(function () {
    editor_config.selector = ".editor";
    editor_config.relative_urls = false;
    editor_config.remove_script_host = false;
    editor_config.path_absolute = siteurl + '/admin/';
    tinymce.init(editor_config);
});

$(function () {
    var url = window.location.href;
    $('.subMenu a').filter(function () {
        return this.href == url;
    }).parent().parent().addClass('active');//active class
})

//file browser by click button
var urlobj;

function BrowseServer(obj) {
    urlobj = obj;
    OpenServerBrowser(
        adminUrl + '/filemanager/show',
        screen.width * 0.7,
        screen.height * 0.7
    );
}

function OpenServerBrowser(url, width, height) {
    var iLeft = (screen.width - width) / 2;
    var iTop = (screen.height - height) / 2;
    var sOptions = "toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,dependent=yes";
    sOptions += ",width=" + width;
    sOptions += ",height=" + height;
    sOptions += ",left=" + iLeft;
    sOptions += ",top=" + iTop;
    var oWindow = window.open(url, "BrowseWindow", sOptions);
}

function SetUrl(url, width, height, alt) {
    document.getElementById(urlobj).value = url;
    var input = $('#' + urlobj);
    input.val(url);
    input.trigger('input');
    $('.' + urlobj).attr('src', url);
    oWindow = null;
}