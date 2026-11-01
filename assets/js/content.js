(() => {
    const year = new Date().getFullYear();
    const prismColors = [
        "#5CE1E6",
        "#3876F2",
        "#8C52FF",
        "#FF66C4",
        "#FF914D",
        "#FFDE59",
        "#7ED957",
        "#5CE1E6"
    ];

    const prefersReducedMotion = () =>
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createStageStore = () => ({
        isLoading: true,
        isTransitioning: false,
        phase: "opening",
        prisms: prismColors,
        init() {
            const openDelay = prefersReducedMotion() ? 120 : 1150;
            window.setTimeout(() => {
                this.phase = "open";
                this.isLoading = false;
            }, openDelay);

            window.addEventListener("pageshow", (event) => {
                if (event.persisted) {
                    this.isTransitioning = false;
                    this.isLoading = false;
                    this.phase = "open";
                }
            });
        },
        navigate(event, href) {
            if (!href) return;
            if (
                event &&
                (event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0)
            ) {
                return;
            }
            if (event) {
                event.preventDefault();
            }
            this.navigateTo(href);
        },
        navigateTo(href) {
            if (!href || this.isTransitioning) return;
            if (window.Alpine && window.Alpine.store("menu")) {
                window.Alpine.store("menu").close();
            }
            if (prefersReducedMotion()) {
                window.location.href = href;
                return;
            }
            this.isTransitioning = true;
            this.phase = "closing";
            window.setTimeout(() => {
                window.location.href = href;
            }, 640);
        }
    });

    const registerStores = () => {
        if (!window.Alpine) return;
        Alpine.store("year", year);
        Alpine.store("prisms", prismColors);
        if (!Alpine.store("menu")) {
            Alpine.store("menu", {
                isOpen: false,
                toggle() {
                    this.isOpen = !this.isOpen;
                },
                close() {
                    this.isOpen = false;
                }
            });
        }
        if (!Alpine.store("socialLinks")) {
            Alpine.store("socialLinks", []);
        }
        if (!Alpine.store("projects")) {
            Alpine.store("projects", []);
        }
        if (!Alpine.store("stage")) {
            Alpine.store("stage", createStageStore());
        }
    };

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && window.Alpine && window.Alpine.store("menu")) {
            window.Alpine.store("menu").close();
        }
    });

    if (window.Alpine) {
        registerStores();
    } else {
        document.addEventListener("alpine:init", registerStores);
    }

    const { pathname } = window.location;
    const dataPath = (filename) => `/assets/data/${filename}.json`;
    const dataFetch = (filename) =>
        fetch(dataPath(filename))
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .catch(() => []);

    (async () => {
        if (pathname === "/" || pathname.endsWith("/index.html")) {
            const social = await dataFetch("social");
            if (window.Alpine) {
                Alpine.store("socialLinks", social || []);
            }
        } else if (
            pathname.endsWith("/gallery") ||
            pathname.endsWith("/gallery.html")
        ) {
            const projects = await dataFetch("projects");
            if (window.Alpine) {
                Alpine.store("projects", projects || []);
            }
        }
    })();
})();
