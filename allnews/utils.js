import { translations } from './translations.js';

// Convert Google Drive link to direct image URL
export function convertGoogleDriveLink(url) {
    if (!url) return "";
    
    // If it's already a direct image link (jpg, png etc.)
    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
        return url;
    }
    
    // Handle standard Google Drive links
    const fileIdMatch = url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([^&]+)/) || url.match(/\/([^\/]{33})/);
    if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1000`;
    }
    
    // If link is not recognized, return as is
    return url;
}

// Format date
export function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = date.getDate();
    let month = date.toLocaleString('ru-RU', { month: 'long' });
    month = month.slice(0, -1) + 'я';
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

// Translate page content
export function translatePage(language) {
    document.documentElement.lang = language;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Toggle between mobile and desktop versions
export function toggleVersions() {
    const isDesktop = window.innerWidth > 1220;
    document.querySelector(".mobile-version").style.display = isDesktop ? "none" : "block";
    document.querySelector(".desktop-version").style.display = isDesktop ? "block" : "none";
} 