// Auto Redirect
// (c) 2024 SuperSonic (https://shiranui.xyz)

(() => {
    const getUrlParameter = (index) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(index)
    };

    const redirectWorker = (type, target) => {
        fetch(`./assets/data/${type}.json`)
            .then((res) => res.json())
            .then((data) => {
                const targetData = data.find((item) => item.slug === target);
                if (!targetData) return;
                window.location.href = targetData.href;
            });
    };

    (() => {
        const target = getUrlParameter("add");
        if (!target) return false;
        redirectWorker("social", target);
        return true;
    })();
})();
