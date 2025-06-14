import { SHEET_ID, API_KEY, RANGE } from './config.js';
import { convertGoogleDriveLink, formatDate, correctKeyboardLayout, translatePage } from './utils.js';
import { NEWS_TEMPLATES, GRID_CONFIG } from './config.js';

// Generate news block HTML
function generateNewsBlock(data, version, type, newsId) {
    if (!data || !data[0]) return "";
    
    const imageUrl = data[2] ? convertGoogleDriveLink(data[2]) : "";
    const hasImage = !!imageUrl;
    
    const templateType = hasImage ? "withImage" : "withoutImage";
    const template = NEWS_TEMPLATES[version][type][templateType];
    if (!template) return "";
    
    return template
        .replace(/{newsId}/g, newsId)
        .replace(/{title}/g, data[0] || "")
        .replace(/{image}/g, imageUrl)
        .replace(/{date}/g, formatDate(data[3]) || "");
}

// Generate news grid HTML
function generateNewsGrid(newsData, version) {
    if (!newsData || newsData.length === 0) return "";
    
    let html = "";
    let newsIndex = 0;
    const gridConfig = GRID_CONFIG[version];
    
    if (version === "mobile") {
        const configLength = gridConfig.length;
        while (newsIndex < newsData.length) {
            for (let i = 0; i < configLength && newsIndex < newsData.length; i++) {
                const gridItem = gridConfig[i];
                const itemsToTake = Math.min(gridItem.count, newsData.length - newsIndex);
                const items = newsData.slice(newsIndex, newsIndex + itemsToTake);
                newsIndex += itemsToTake;
                
                if (gridItem.type === "main") {
                    html += generateNewsBlock(items[0], version, "main", newsIndex);
                } else {
                    const rowClass = gridItem.count > 2 ? "news-row-bottom" : "news-row";
                    html += `<div class="${rowClass}">`;
                    let localIndex = newsIndex - itemsToTake + 1;
                    for (const item of items) {
                        html += generateNewsBlock(item, version, "small", localIndex);
                        localIndex++;
                    }
                    for (let j = items.length; j < gridItem.count; j++) {
                        html += generateNewsBlock([], version, "small", localIndex);
                        localIndex++;
                    }
                    html += `</div>`;
                }
            }
        }
    } else {
        while (newsIndex < newsData.length) {
            for (const rowConfig of gridConfig) {
                if (rowConfig.type === "row") {
                    html += `<div class="news-row">`;
                    let localIndex = newsIndex + 1;
                    for (const itemConfig of rowConfig.items) {
                        const itemsToTake = Math.min(itemConfig.count, newsData.length - newsIndex);
                        const items = newsData.slice(newsIndex, newsIndex + itemsToTake);
                        newsIndex += itemsToTake;
                        
                        for (const item of items) {
                            html += generateNewsBlock(item, version, itemConfig.type, localIndex);
                            localIndex++;
                        }
                        for (let j = items.length; j < itemConfig.count; j++) {
                            html += generateNewsBlock([], version, itemConfig.type, localIndex);
                            localIndex++;
                        }
                    }
                    html += `</div>`;
                }
            }
        }
    }
    
    return html;
}

// Add click handlers to news items
function addNewsClickHandlers(wrapper, newsData) {
    wrapper.querySelectorAll('[data-news-id]').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-news-id')) - 1;
            const newsId = newsData[index][4];
            window.location.href = `news1/index.html?id=${newsId}`;
        });
    });
}

// Fetch news from Google Sheets
export async function fetchNews() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.values?.length > 1) {
            renderNews(data.values.slice(1));
        }
    } catch (error) {
        console.error("Error loading news:", error);
    }
}

// Render news on the page
export function renderNews(newsData) {
    // Reverse news array to display in reverse order
    const reversedNewsData = [...newsData].reverse();
    const itemsPerPage = 10;
    const totalPages = Math.ceil(reversedNewsData.length / itemsPerPage);
    let currentPage = 1;
    let filteredNewsData = [...reversedNewsData];
    let selectedYear = 'all';
    let selectedMonth = 'all';

    // Get unique years and months from news data
    const years = [...new Set(reversedNewsData.map(item => {
        const [day, month, year] = item[3].split('.');
        return parseInt(year);
    }))].sort((a, b) => b - a);

    const months = [
        { value: '1', label: 'filter.months.january' },
        { value: '2', label: 'filter.months.february' },
        { value: '3', label: 'filter.months.march' },
        { value: '4', label: 'filter.months.april' },
        { value: '5', label: 'filter.months.may' },
        { value: '6', label: 'filter.months.june' },
        { value: '7', label: 'filter.months.july' },
        { value: '8', label: 'filter.months.august' },
        { value: '9', label: 'filter.months.september' },
        { value: '10', label: 'filter.months.october' },
        { value: '11', label: 'filter.months.november' },
        { value: '12', label: 'filter.months.december' }
    ];

    function createFiltersBar(container) {
        if (!container) return;
        
        let filtersContainer = container.querySelector(".filters-container");
        if (!filtersContainer) {
            filtersContainer = document.createElement("div");
            filtersContainer.className = "filters-container";
            container.insertBefore(filtersContainer, container.firstChild);
        }

        filtersContainer.innerHTML = `
            <div class="filters-wrapper">
                <div class="search-wrapper">
                    <input type="text" class="search-input" data-i18n-placeholder="search.placeholder" placeholder="Поиск по новостям..." onkeyup="window.searchNews(this.value)">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#1651A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.5 17.5L13.875 13.875" stroke="#1651A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="filters-group">
                    <select class="filter-select year-select" onchange="window.filterByYear(this.value)">
                        <option value="all" data-i18n="filter.all_years">Все годы</option>
                        ${years.map(year => `<option value="${year}">${year}</option>`).join('')}
                    </select>
                    <select class="filter-select month-select" onchange="window.filterByMonth(this.value)">
                        <option value="all" data-i18n="filter.all_months">Все месяцы</option>
                        ${months.map(month => `<option value="${month.value}" data-i18n="${month.label}">${month.label}</option>`).join('')}
                    </select>
                </div>
            </div>
        `;

        // Apply translations to the newly created elements
        const currentLang = document.documentElement.lang || 'ru';
        translatePage(currentLang);
    }

    function updateNewsDisplay() {
        const startIndex = 0;
        const endIndex = currentPage * itemsPerPage;
        const currentPageData = filteredNewsData.slice(startIndex, endIndex);

        // Update news display
        const mobileWrapper = document.getElementById("mobile-news-wrapper");
        const desktopWrapper = document.getElementById("desktop-news-wrapper");
        
        if (mobileWrapper) {
            mobileWrapper.innerHTML = generateNewsGrid(currentPageData, "mobile");
            addNewsClickHandlers(mobileWrapper, currentPageData);
        }

        if (desktopWrapper) {
            desktopWrapper.innerHTML = generateNewsGrid(currentPageData, "desktop");
            addNewsClickHandlers(desktopWrapper, currentPageData);
        }

        // Update load more button
        updateLoadMoreButton();
    }

    function updateLoadMoreButton() {
        const mobileContainer = document.querySelector(".mobile-version");
        const desktopContainer = document.querySelector(".desktop-version");
        const tabletContainer = document.querySelector(".tablet-version");

        function createLoadMoreButton(container) {
            if (!container) return;
            
            let loadMoreContainer = container.querySelector(".load-more-container");
            if (!loadMoreContainer) {
                loadMoreContainer = document.createElement("div");
                loadMoreContainer.className = "load-more-container";
                container.appendChild(loadMoreContainer);
            }

            const totalFilteredPages = Math.ceil(filteredNewsData.length / itemsPerPage);
            if (currentPage < totalFilteredPages) {
                loadMoreContainer.innerHTML = `
                    <button class="load-more-btn" onclick="window.loadMoreNews()">
                        <span class="load-more-text" data-i18n="load_more">Еще</span>
                        <svg class="load-more-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                `;
            } else {
                loadMoreContainer.innerHTML = '';
            }
        }

        createLoadMoreButton(mobileContainer);
        createLoadMoreButton(desktopContainer);
        createLoadMoreButton(tabletContainer);
    }

    // Add loadMoreNews function to window object
    window.loadMoreNews = function() {
        currentPage++;
        updateNewsDisplay();
    };

    // Add filter functions to window object
    window.filterByYear = function(year) {
        selectedYear = year;
        applyFilters();
    };

    window.filterByMonth = function(month) {
        selectedMonth = month;
        applyFilters();
    };

    function applyFilters() {
        filteredNewsData = reversedNewsData.filter(item => {
            const [day, month, year] = item[3].split('.');
            const itemYear = year;
            const itemMonth = parseInt(month).toString(); // Convert to number and back to string to remove leading zeros
            
            const yearMatch = selectedYear === 'all' || itemYear === selectedYear;
            const monthMatch = selectedMonth === 'all' || itemMonth === selectedMonth;
            
            return yearMatch && monthMatch;
        });

        currentPage = 1;
        updateNewsDisplay();
    }

    // Update search function to work with filters
    window.searchNews = function(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        let searchResults = reversedNewsData;
        
        if (searchTerm !== '') {
            // Get both original and corrected search terms
            const correctedSearchTerm = correctKeyboardLayout(searchTerm);
            
            searchResults = reversedNewsData.filter(item => {
                const title = (item[0] || '').toLowerCase();
                const description = (item[1] || '').toLowerCase();
                
                // Check both original and corrected search terms
                return title.includes(searchTerm) || 
                       description.includes(searchTerm) ||
                       title.includes(correctedSearchTerm) || 
                       description.includes(correctedSearchTerm);
            });
        }

        // Apply year and month filters
        filteredNewsData = searchResults.filter(item => {
            const [day, month, year] = item[3].split('.');
            const itemYear = year;
            const itemMonth = parseInt(month).toString(); // Convert to number and back to string to remove leading zeros
            
            const yearMatch = selectedYear === 'all' || itemYear === selectedYear;
            const monthMatch = selectedMonth === 'all' || itemMonth === selectedMonth;
            
            return yearMatch && monthMatch;
        });

        currentPage = 1;
        updateNewsDisplay();
    };

    // Add filters bars to all versions
    const mobileContainer = document.querySelector(".mobile-version");
    const desktopContainer = document.querySelector(".desktop-version");
    const tabletContainer = document.querySelector(".tablet-version");

    createFiltersBar(mobileContainer);
    createFiltersBar(desktopContainer);
    createFiltersBar(tabletContainer);

    // Initial display
    updateNewsDisplay();
} 