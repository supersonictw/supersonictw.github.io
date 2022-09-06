(() => {
    fetch('./assets/data/social.json?rev=__REV__')
        .then(response => response.json())
        .then(data => {
            document.addEventListener('alpine:init', () => {
                Alpine.store('socialLinks', data);
            });
            Alpine.start();
        });
})();
