// (c) 2020 SuperSonic (https://randychen.tk)

const conversion_table_for_add = {
    github: "#github",
    gitlab: "#gitlab",
    leetcode: "#leetcode",
    stackoverflow: "#stackoverflow",
    apktw: "#apktw",
    mdn: "#mdn",
    msdn: "#msdn",
    blog: "#blog",
    fb: "#facebook",
    ig: "#instagram",
    twitter: "#twitter",
    linkedin: "#linkedin"
}

const conversion_table_for_cv = {
    cie: "cv4cie.html"
}

const get_url_parameter = (index) => {
    const query_pattern = "(^|&)" + index + "=([^&]*)(&|$)";
    const reg = new RegExp(query_pattern);
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
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
