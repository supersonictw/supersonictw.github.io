(async () => {
    const { pathname } = window.location;
    const dataPath = (filename) => `./assets/data/${filename}.json`;
    const dataFetch = (filename) => fetch(dataPath(filename)).
        then(response => response.json()).
        catch(error => console.error(error));

    const context = new Map();

    const year = new Date().getFullYear();
    context.set("year", year);

    switch (pathname) {
        case '/':
        case '/index.html': {
            const social = await dataFetch("social");
            context.set("socialLinks", social);
            break;
        }
        case '/gallery':
        case '/gallery.html': {
            const projects = await dataFetch("projects");
            context.set("projects", projects);
            break;
        }
    };

    document.addEventListener('alpine:init', () => {
        for (const [key, value] of context) {
            console.log(`Setting ${key} to`, value);
            Alpine.store(key, value);
        }
    });
    Alpine.start();
})();
