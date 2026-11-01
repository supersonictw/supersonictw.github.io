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
        localStorage.setItem("lang", langCode);
        if (window.Alpine && typeof window.Alpine.store === "function") {
            const stage = window.Alpine.store("stage");
            if (stage && typeof stage.navigateTo === "function") {
                stage.navigateTo("/");
                return;
            }
        }
        document.location.href = "/";
    };

    let typingTimer = null;

    window.runStageTypewriter = (el, fullText) => {
        if (!el) return;
        if (typingTimer) {
            window.clearTimeout(typingTimer);
            typingTimer = null;
        }
        const reducedMotion =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
            el.textContent = fullText;
            return;
        }
        el.textContent = "";
        const chars = Array.from(fullText);
        let index = 0;
        const startDelay = 950;

        const step = () => {
            if (index <= chars.length) {
                el.textContent = chars.slice(0, index).join("");
                const currentChar = chars[index - 1];
                index += 1;
                const delay = currentChar === "\n" ? 260 : 95;
                typingTimer = window.setTimeout(step, delay);
            }
        };

        typingTimer = window.setTimeout(step, startDelay);
    };

    window.loadLocale = (langCode) => {
        const textDOMs = $(".i18n");
        if (langCode === "en" || !(langCode in i18nPackageNames)) {
            if (langCode !== "en") {
                console.warn("No i18n package match.");
            } else {
                document.documentElement.setAttribute("lang", "en");
            }
            textDOMs.each((_, dom) => {
                if (dom.getAttribute("data-typing") === "true") {
                    const key = dom.getAttribute("data-i18n-key") || dom.textContent.trim();
                    window.runStageTypewriter(dom, key);
                }
            });
            return;
        }
        document.documentElement.setAttribute("lang", "zh-TW");
        const i18nPackageName = i18nPackageNames[langCode];
        $.ajax(`/assets/i18n/${i18nPackageName}`)
            .done((xhr) => {
                i18n.translator.add(xhr);
                textDOMs.each((_, dom) => {
                    const $dom = $(dom);
                    const savedKey = $dom.attr("data-i18n-key");
                    const originalText = savedKey || $dom.text()
                        .replace(/\n/g, " ")
                        .replace(/ +/g, " ")
                        .trim();
                    if (!savedKey) {
                        $dom.attr("data-i18n-key", originalText);
                    }
                    const translated = i18n(originalText);
                    if ($dom.attr("data-typing") === "true") {
                        window.runStageTypewriter(dom, translated);
                    } else {
                        $dom.text(translated);
                    }
                });
            })
            .fail(() => {
                console.warn("Failed to load locale dictionary.");
            });
    };
})();
