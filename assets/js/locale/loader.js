//  WebService js-i18n
//      ===
// VERSION: 1.0
// LICENSE: GNU Affero General Public License
// COPYRIGHT: (c)2020 Star Inc.

(() => {
    loadLocale(
        localStorage.getItem("lang")
        || navigator.language
        || navigator.userLanguage
    );
})();
