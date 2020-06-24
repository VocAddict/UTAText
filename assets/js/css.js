// Light/Dark Toggle

window.addEventListener('load', function() {
    if (document.documentElement.getAttribute('data-theme') == null) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.querySelector('.btn-color').setAttribute('aria-label', 'Toggle Theme - Current: light');
    } else if (document.documentElement.getAttribute('data-theme') === 'light') {
        document.querySelector('.btn-color').setAttribute('aria-label', 'Toggle Theme - Current: light');
    } else if (document.documentElement.getAttribute('data-theme') === 'sepia') {
        document.querySelector('.btn-color').setAttribute('aria-label', 'Toggle Theme - Current: sepia');
    } else if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.querySelector('.btn-color').setAttribute('aria-label', 'Toggle Theme - Current: dark');
    }
})

function toggleTheme() 
{
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        document.querySelector('.btn-color').setAttribute('aria-label', 'Toggle Theme - Current: sepia');
        document.documentElement.setAttribute('data-theme', 'sepia');
        localStorage.setItem('theme', 'sepia');
    } else if (document.documentElement.getAttribute('data-theme') === 'sepia') {
        document.querySelector('.btn-color').setAttribute('aria-label', 'Toggle Theme - Current: dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.querySelector('.btn-color').setAttribute('aria-label', 'Toggle Theme - Current: light');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}