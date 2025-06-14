import { translations } from './translations.js';
import { renderNews } from './newsService.js';

let currentFilter = { year: null, month: null };
let filteredNewsData = [];

// Create filter menu
export function createFilterMenu() {
    // Check screen width
    if (window.innerWidth <= 999) {
        return null; // Don't create filter menu on mobile and tablets
    }

    const filterMenu = document.createElement('div');
    filterMenu.className = 'news-filter-menu';
    filterMenu.innerHTML = `
        <div class="filter-menu-header">
            <h3 data-i18n="filter.title">Фильтр новостей</h3>
            <button class="close-filter">&times;</button>
        </div>
        <div class="filter-menu-content">
            <div class="filter-section">
                <h4 data-i18n="filter.year">Год</h4>
                <div class="year-buttons"></div>
            </div>
            <div class="filter-section">
                <h4 data-i18n="filter.month">Месяц</h4>
                <div class="month-buttons"></div>
            </div>
            <button class="reset-filter" data-i18n="filter.reset">Сбросить фильтры</button>
        </div>
    `;
    document.body.appendChild(filterMenu);

    // Add filter button only on desktop
    const filterButton = document.createElement('button');
    filterButton.className = 'filter-button';
    filterButton.innerHTML = `
        <span data-i18n="filter.button">Фильтр</span>
        <img src="images/filter.svg" alt="Фильтр">
    `;
    document.querySelector('.news-container').insertBefore(filterButton, document.querySelector('.news-title'));

    return filterMenu;
}

// Update filter menu
export function updateFilterMenu(newsData) {
    // Check screen width
    if (window.innerWidth <= 999) {
        return; // Don't update filter menu on mobile and tablets
    }

    const years = new Set();
    const months = new Set();
    const currentLang = document.documentElement.lang || 'ru';
    
    newsData.forEach(item => {
        if (item[3]) {
            const date = new Date(item[3]);
            if (!isNaN(date.getTime())) {
                years.add(date.getFullYear());
                months.add(date.getMonth());
            }
        }
    });

    const yearButtons = document.querySelector('.year-buttons');
    const monthButtons = document.querySelector('.month-buttons');
    
    yearButtons.innerHTML = '';
    monthButtons.innerHTML = '';

    // Add year buttons
    Array.from(years).sort((a, b) => b - a).forEach(year => {
        const button = document.createElement('button');
        button.textContent = year;
        button.className = currentFilter.year === year ? 'active' : '';
        button.onclick = () => toggleYearFilter(year);
        yearButtons.appendChild(button);
    });

    // Add month buttons with translations
    const monthKeys = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    Array.from(months).sort((a, b) => a - b).forEach(month => {
        const button = document.createElement('button');
        button.textContent = translations[currentLang][`filter.months.${monthKeys[month]}`];
        button.className = currentFilter.month === month ? 'active' : '';
        button.onclick = () => toggleMonthFilter(month);
        monthButtons.appendChild(button);
    });
}

// Toggle year filter
function toggleYearFilter(year) {
    currentFilter.year = currentFilter.year === year ? null : year;
    applyFilters();
}

// Toggle month filter
function toggleMonthFilter(month) {
    currentFilter.month = currentFilter.month === month ? null : month;
    applyFilters();
}

// Apply filters
export function applyFilters() {
    const originalNewsData = JSON.parse(document.querySelector('#desktop-news-wrapper').dataset.originalNews || '[]');
    filteredNewsData = originalNewsData.filter(item => {
        if (!item[3]) return false;
        const date = new Date(item[3]);
        if (isNaN(date.getTime())) return false;
        
        if (currentFilter.year && date.getFullYear() !== currentFilter.year) return false;
        if (currentFilter.month !== null && date.getMonth() !== currentFilter.month) return false;
        
        return true;
    });

    renderNews(filteredNewsData);
    updateFilterMenu(filteredNewsData);
}

// Initialize filter event listeners
export function initFilterListeners(filterMenu) {
    document.querySelector('.filter-button').addEventListener('click', () => {
        filterMenu.classList.add('active');
    });

    document.querySelector('.close-filter').addEventListener('click', () => {
        filterMenu.classList.remove('active');
    });

    document.querySelector('.reset-filter').addEventListener('click', () => {
        currentFilter = { year: null, month: null };
        applyFilters();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterMenu.contains(e.target) && !e.target.closest('.filter-button')) {
            filterMenu.classList.remove('active');
        }
    });
} 