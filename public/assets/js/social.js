(() => {
    fetch('./assets/data/social.json')
        .then(response => response.json())
        .then(data => {
            document.addEventListener('alpine:init', () => {
                Alpine.store('socialLinks', data);
            });
            Alpine.start();
        });
})();
