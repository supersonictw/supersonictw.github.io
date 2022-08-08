// Auto Redirect
// (c) 2022 SuperSonic (https://randychen.tk)

(() => {
    const dataset_sns = {
        blog: "#blog",
        nex: "#nex",
        github: "#github",
        gitlab: "#gitlab",
        medium: "#medium",
        apktw: "#apktw",
        leetcode: "#leetcode",
        stackoverflow: "#stackoverflow",
        mdn: "#mdn",
        msdn: "#msdn",
        ms_docs: "#ms_docs",
        fb: "#facebook",
        ig: "#instagram",
        twitter: "#twitter",
        linkedin: "#linkedin"
    }

    const dataset_cv = {
        cie: "cv4cie.html"
    }

    const getUrlParameter = (index) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(index)
    }

    const doRedirect = () => {
        // SNS Add Links
        const dom_id_for_add_url = dataset_sns[getUrlParameter("add")];
        if (dom_id_for_add_url) {
            window.location.href = $(dom_id_for_add_url).attr("href");
            return;
        }
        // Curriculum Vitae Links
        const id_for_cv = getUrlParameter("cv");
        if (id_for_cv) {
            window.location.href = dataset_cv[id_for_cv];
            return;
        }
    }

    doRedirect();
})();
