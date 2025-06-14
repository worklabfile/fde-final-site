import { fetchNews, renderNews } from './newsService.js';
import { translatePage, toggleVersions } from './utils.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Desktop version
    const languageItems = document.querySelectorAll('.language-dropdown-item');
    const languageDropdown = document.getElementById('languageDropdown');
    const desktopLanguageIcon = document.getElementById('desktopLanguageIcon');

    if (desktopLanguageIcon) {
        desktopLanguageIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        languageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                if (lang) {
                    languageItems.forEach(el => el.classList.remove('active'));
                    this.classList.add('active');
                    translatePage(lang);
                    languageDropdown.style.display = 'none';
                }
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.language-switcher')) {
                languageDropdown.style.display = 'none';
            }
        });
    }

    // Mobile version
    const burgerMenu = document.querySelector('.burger-menu');
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const mobileLanguageIcon = document.getElementById('mobileLanguageIcon');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
        });

        overlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            sideMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });

        menuItems.forEach(item => {
            const title = item.querySelector('.menu-title');
            title.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                menuItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });

        if (mobileLanguageIcon) {
            mobileLanguageIcon.addEventListener('click', function() {
                const currentLang = document.documentElement.lang || 'ru';
                const langs = ['ru', 'be', 'en', 'zh'];
                const nextLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
                translatePage(nextLang);
            });
        }
    }

    // Initialize news
    fetchNews();
    toggleVersions();
    
    // Setup scroll buttons
    const setupScrollButton = (buttonId) => {
        const button = document.getElementById(buttonId);
        if (button) {
            window.addEventListener("scroll", () => {
                button.classList.toggle("visible", window.scrollY > 100);
            });
            button.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    };
    
    setupScrollButton("upArrow");
    setupScrollButton("upArrowDesktop");
    window.addEventListener("resize", toggleVersions);

    // Initial Russian version
    translatePage('ru');
});

// Auto-update every 5 minutes
setInterval(fetchNews, 300000);