//  WebService js-i18n
//      ===
// VERSION: 1.0
// LICENSE: GNU Affero General Public License
// COPYRIGHT: (c)2020 Star Inc.

var userLang = navigator.language || navigator.userLanguage;
if (Cookies.get("lang")) {
    userLang = Cookies.get("lang");
}
locale_set(userLang);