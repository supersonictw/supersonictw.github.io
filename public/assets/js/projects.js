(() => {
    fetch('./assets/data/projects.json')
        .then(response => response.json())
        .then(data => {
            document.addEventListener('alpine:init', () => {
                Alpine.store('projects', data);
            });
            Alpine.start();
        });
})();
