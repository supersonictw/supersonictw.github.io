// (c) 2020 SuperSonic (https://randychen.tk)

switch (function () {
    var reg = new RegExp("(^|&)add=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}()) {
    case "github":
        window.location.href = $("#github").attr("href");
        break;
    case "gitlab":
        window.location.href = $("#gitlab").attr("href");
        break;
    case "leetcode":
        window.location.href = $("#leetcode").attr("href");
        break;
    case "stackoverflow":
        window.location.href = $("#stackoverflow").attr("href");
        break;
    case "apktw":
        window.location.href = $("#apktw").attr("href");
        break;
    case "mdn":
        window.location.href = $("#mdn").attr("href");
        break;
    case "msdn":
        window.location.href = $("#msdn").attr("href");
        break;
    case "blog":
        window.location.href = $("#blog").attr("href");
        break;
    case "fb":
        window.location.href = $("#facebook").attr("href");
        break;
    case "ig":
        window.location.href = $("#instagram").attr("href");
        break;
    case "twitter":
        window.location.href = $("#twitter").attr("href");
        break;
    case "linkedin":
        window.location.href = $("#linkedin").attr("href");
        break;
}
