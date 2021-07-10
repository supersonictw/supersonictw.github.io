// (c) 2021 SuperSonic (https://randychen.tk)

const conversion_table_for_add = {
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

const conversion_table_for_cv = {
    cie: "cv4cie.html"
}

const get_url_parameter = (index) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(index)
}

const redirect = () => {
    // SNS Add Links
    const dom_id_for_add_url = conversion_table_for_add[get_url_parameter("add")];
    if (dom_id_for_add_url != null) {
        window.location.href = $(dom_id_for_add_url).attr("href");
        return 1;
    }
    // Curriculum Vitae Links
    const id_for_cv = get_url_parameter("cv");
    if (id_for_cv != null) {
        window.location.href = conversion_table_for_cv[id_for_cv];
        return 2;
    }
}

redirect();
