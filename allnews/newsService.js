import { SHEET_ID, API_KEY, RANGE } from './config.js';
import { convertGoogleDriveLink, formatDate } from './utils.js';
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

    // Process data for display
    const processedNewsData = reversedNewsData.map(item => {
        if (item[2]) {
            item[2] = convertGoogleDriveLink(item[2]);
        }
        return item;
    });

    // Update news display
    const mobileWrapper = document.getElementById("mobile-news-wrapper");
    const desktopWrapper = document.getElementById("desktop-news-wrapper");
    
    if (mobileWrapper) {
        mobileWrapper.innerHTML = generateNewsGrid(processedNewsData, "mobile");
        addNewsClickHandlers(mobileWrapper, processedNewsData);
    }

    if (desktopWrapper) {
        desktopWrapper.innerHTML = generateNewsGrid(processedNewsData, "desktop");
        addNewsClickHandlers(desktopWrapper, processedNewsData);
    }
} 