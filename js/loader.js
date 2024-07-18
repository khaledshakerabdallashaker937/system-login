
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('hide-loader');
        document.body.classList.remove('hidden');
        document.body.classList.add('show-content');
    }, 1000);
});