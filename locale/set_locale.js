//  WebService js-i18n
//      ===
// VERSION: 1.0
// LICENSE: GNU Affero General Public License
// COPYRIGHT: (c)2020 Star Inc.

function set_language(code) {
    list = [
        "zh-TW",
        "en",
    ];
    if (code < 0) {
        Cookies.remove('lang');
    } else {
        Cookies.set("lang", list[code], {
            expires: 3650,
        });
    }
    document.location.href = "/";
}