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
    
    // Parse date in DD.MM.YYYY format
    const [day, month, year] = dateString.split('.');
    const date = new Date(year, month - 1, day);
    
    if (isNaN(date.getTime())) return dateString;
    
    const formattedDay = date.getDate();
    let formattedMonth = date.toLocaleString('ru-RU', { month: 'long' });
    formattedMonth = formattedMonth.slice(0, -1) + 'я';
    const formattedYear = date.getFullYear();
    
    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
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

    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });
}

// Toggle between mobile and desktop versions
export function toggleVersions() {
    const isDesktop = window.innerWidth > 1220;
    document.querySelector(".mobile-version").style.display = isDesktop ? "none" : "block";
    document.querySelector(".desktop-version").style.display = isDesktop ? "block" : "none";
}

// Keyboard layout mapping
const keyboardLayoutMap = {
    // Russian to English
    'ф': 'a', 'и': 'b', 'с': 'c', 'в': 'd', 'у': 'e', 'а': 'f', 'п': 'g', 'р': 'h', 'ш': 'i',
    'о': 'j', 'л': 'k', 'д': 'l', 'ь': 'm', 'т': 'n', 'щ': 'o', 'з': 'p', 'й': 'q', 'к': 'r',
    'ы': 's', 'е': 't', 'г': 'u', 'м': 'v', 'ц': 'w', 'ч': 'x', 'н': 'y', 'я': 'z',
    'Ф': 'A', 'И': 'B', 'С': 'C', 'В': 'D', 'У': 'E', 'А': 'F', 'П': 'G', 'Р': 'H', 'Ш': 'I',
    'О': 'J', 'Л': 'K', 'Д': 'L', 'Ь': 'M', 'Т': 'N', 'Щ': 'O', 'З': 'P', 'Й': 'Q', 'К': 'R',
    'Ы': 'S', 'Е': 'T', 'Г': 'U', 'М': 'V', 'Ц': 'W', 'Ч': 'X', 'Н': 'Y', 'Я': 'Z',
    'э': '`', 'Э': '~',
    'ё': 'e', 'Ё': 'E',
    'ъ': '\'', 'Ъ': '"',
    'ж': ';', 'Ж': ':',
    'б': ',', 'Б': '<',
    'ю': '.', 'Ю': '>',
    'х': '[', 'Х': '{',
    'ъ': ']', 'Ъ': '}',
    'ж': ';', 'Ж': ':',
    'э': '`', 'Э': '~',
    // English to Russian
    'a': 'ф', 'b': 'и', 'c': 'с', 'd': 'в', 'e': 'у', 'f': 'а', 'g': 'п', 'h': 'р', 'i': 'ш',
    'j': 'о', 'k': 'л', 'l': 'д', 'm': 'ь', 'n': 'т', 'o': 'щ', 'p': 'з', 'q': 'й', 'r': 'к',
    's': 'ы', 't': 'е', 'u': 'г', 'v': 'м', 'w': 'ц', 'x': 'ч', 'y': 'н', 'z': 'я',
    'A': 'Ф', 'B': 'И', 'C': 'С', 'D': 'В', 'E': 'У', 'F': 'А', 'G': 'П', 'H': 'Р', 'I': 'Ш',
    'J': 'О', 'K': 'Л', 'L': 'Д', 'M': 'Ь', 'N': 'Т', 'O': 'Щ', 'P': 'З', 'Q': 'Й', 'R': 'К',
    'S': 'Ы', 'T': 'Е', 'U': 'Г', 'V': 'М', 'W': 'Ц', 'X': 'Ч', 'Y': 'Н', 'Z': 'Я',
    '`': 'э', '~': 'Э',
    'e': 'ё', 'E': 'Ё',
    '\'': 'ъ', '"': 'Ъ',
    ';': 'ж', ':': 'Ж',
    ',': 'б', '<': 'Б',
    '.': 'ю', '>': 'Ю',
    '[': 'х', '{': 'Х',
    ']': 'ъ', '}': 'Ъ',
    ';': 'ж', ':': 'Ж',
    '`': 'э', '~': 'Э'
};

// Function to correct keyboard layout
export function correctKeyboardLayout(text) {
    if (!text) return '';
    
    let correctedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        correctedText += keyboardLayoutMap[char] || char;
    }
    return correctedText;
} 