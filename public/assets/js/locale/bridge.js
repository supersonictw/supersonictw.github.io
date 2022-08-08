//  WebService js-i18n
//      ===
// VERSION: 1.0
// LICENSE: GNU Affero General Public License
// COPYRIGHT: (c)2020 Star Inc.

(() => {
    const i18nPackageNames = {
        "zh": "zh_TW.json",
        "zh-TW": "zh_TW.json"
    };

    window.setLocale = (langCode) => {
        if (langCode !== "en" && !(langCode in i18nPackageNames)) {
            console.warn("No i18n package match.");
            return;
        }
        Cookies.set("lang", langCode, {
            expires: 3650,
        });
        document.location.href = "/";
    };

    window.loadLocale = (langCode) => {
        if (langCode === "en") {
            return;
        }
        if (!(langCode in i18nPackageNames)) {
            console.warn("No i18n package match.");
            return;
        }
        const textDOMs = $(".i18n");
        const i18nPackageName = i18nPackageNames[langCode];
        $.ajax(`/assets/i18n/${i18nPackageName}`)
            .done((xhr) => {
                i18n.translator.add(xhr);
                textDOMs.each((_, dom) => {
                    const originalText = $(dom).text()
                        .replace(/\n/g, "")
                        .replace(/ +/g, " ")
                        .trim();
                    $(dom).text(i18n(originalText));
                });
            })
            .fail((error) => {
                console.error(error);
            });
    };
})();
