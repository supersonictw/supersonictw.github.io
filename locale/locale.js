//  WebService js-i18n
//      ===
// VERSION: 1.0
// LICENSE: GNU Affero General Public License
// COPYRIGHT: (c)2020 Star Inc.

function locale_set(lang) {
    if (lang === "en") return;
    langs = {
        "zh": "zh_TW.json",
        "zh-TW": "zh_TW.json"
    };
    if (!(lang in langs)) console.log("No Language Package found");
    texts = $(".i18n");
    $.ajax("/locale/packages/" + langs[lang]).done(function (json_data) {
        i18n.translator.add(json_data);
        for (var i = 0; i < texts.length; i++) {
            $(texts[i]).text(
                i18n(
                    $(texts[i]).text()
                )
            );
        }
    });
}