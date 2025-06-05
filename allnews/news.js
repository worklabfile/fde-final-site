// Конфигурация Google Sheets
const SHEET_ID = "1im3Fhc0zgbmK-POT8zx5-DtcJhkmCCEn_ZkN0c4UCRQ";
const API_KEY = "AIzaSyBMLJP7krMPDG_Y-OZQuNEDR8Dvu4FhgVs";
const RANGE = "A1:E";
const MAX_NEWS_COUNT = 29;

// Локализация
const translations = {
    'ru': {
        'menu.about': 'О факультете',
        'menu.for_students': 'Студенту',
        'menu.for_applicants': 'Абитуриенту',
        'menu.science': 'Наука',
        'menu.departments': 'Кафедры',
        'submenu.history': 'История',
        'submenu.deans_office': 'Деканат',
        'submenu.student_council': 'Студенческая жизнь',
        'submenu.schedule': 'Новости факультета',
        'submenu.courses': 'Специальности',
        'submenu.hostel': 'Общежитие',
        'submenu.admission_rules': 'Перечень документов',
        'submenu.open_days': 'Сроки приема документов',
        'submenu.open_door_day': 'Дни открытых дверей',
        'submenu.introductory_campaign': 'Вступительная кампания',
        'submenu.directions': 'Наука',
        'submenu.economic_informatics': 'Кафедры',
        'submenu.faculty_title': 'Факультет Цифровой Экономики',
        'submenu.faculty_description': 'Мы лучшие!',
        'submenu.for_students_title': 'Для студентов',
        'submenu.for_students_desc': 'Все необходимое для учебы',
        'submenu.for_applicants_title': 'Для абитуриентов',
        'submenu.for_applicants_desc': 'Всё о поступлении',
        'submenu.science_title': 'Научная деятельность',
        'submenu.science_desc': 'Исследования и разработки',
        'submenu.departments_title': 'Наши кафедры',
        'submenu.departments_desc': 'Профессиональное образование',
        'news.title': 'Новости',
        'footer.questions': 'Если у Вас возникли вопросы, обращайтесь по адресу',
        'footer.suggestions': 'Если есть предложения, можете написать нам',
        'menu.links': 'Ссылки',
        'menu.sitemap': 'Карта сайта',
        'footer.contacts': 'Контакты',
        'footer.address': '220070, г. Минск, пр. Партизанский 26, корпус 1, ауд. 1205',
        'footer.copyright': '© 2019-2025 БГЭУ ФЦЭ',
        'filter.title': 'Фильтр новостей',
        'filter.year': 'Год',
        'filter.month': 'Месяц',
        'filter.button': 'Фильтр',
        'filter.reset': 'Сбросить фильтры',
        'filter.months.january': 'Январь',
        'filter.months.february': 'Февраль',
        'filter.months.march': 'Март',
        'filter.months.april': 'Апрель',
        'filter.months.may': 'Май',
        'filter.months.june': 'Июнь',
        'filter.months.july': 'Июль',
        'filter.months.august': 'Август',
        'filter.months.september': 'Сентябрь',
        'filter.months.october': 'Октябрь',
        'filter.months.november': 'Ноябрь',
        'filter.months.december': 'Декабрь'
    },
    'be': {
        'menu.about': 'Аб факультэце',
        'menu.for_students': 'Студэнту',
        'menu.for_applicants': 'Абітурыенту',
        'menu.science': 'Навука',
        'menu.departments': 'Кафедры',
        'submenu.history': 'Гісторыя',
        'submenu.deans_office': 'Дэканат',
        'submenu.student_council': 'Студэнцкае жыццё',
        'submenu.schedule': 'Навіны факультэта',
        'submenu.courses': 'Спецыяльнасці',
        'submenu.hostel': 'Інтэрнат',
        'submenu.admission_rules': 'Пералік дакументаў',
        'submenu.open_days': 'Тэрміны прыёму дакументаў',
        'submenu.open_door_day': 'Дні адкрытых дзвярэй',
        'submenu.introductory_campaign': 'Уступная кампанія',
        'submenu.directions': 'Наука',
        'submenu.economic_informatics': 'Кафедры',
        'submenu.faculty_title': 'Факультэт Лічбавай Эканомікі',
        'submenu.faculty_description': 'Мы лепшыя!',
        'submenu.for_students_title': 'Для студэнтаў',
        'submenu.for_students_desc': 'Усё неабходнае для вучобы',
        'submenu.for_applicants_title': 'Для абітурыентаў',
        'submenu.for_applicants_desc': 'Усё аб паступленні',
        'submenu.science_title': 'Навуковая дзейнасць',
        'submenu.science_desc': 'Дасьледаваньні і распрацоўкі',
        'submenu.departments_title': 'Нашы кафедры',
        'submenu.departments_desc': 'Прафесійная адукацыя',
        'news.title': 'Навіны',
        'footer.questions': 'Калі ў вас узніклі пытанні, звяртайцеся па адрасе',
        'footer.suggestions': 'Калі ёсць прапановы, можаце напісаць нам',
        'menu.links': 'Спасылкі',
        'menu.sitemap': 'Карта сайта',
        'footer.contacts': 'Кантакты',
        'footer.address': '220070, г. Мінск, пр. Партызанскі 26, корпус 1, аўд. 1205',
        'footer.copyright': '© 2019-2025 БДЭУ ФЦЭ',
        'filter.title': 'Фільтр навін',
        'filter.year': 'Год',
        'filter.month': 'Месяц',
        'filter.button': 'Фільтр',
        'filter.reset': 'Скінуць фільтры',
        'filter.months.january': 'Студзень',
        'filter.months.february': 'Люты',
        'filter.months.march': 'Сакавік',
        'filter.months.april': 'Красавік',
        'filter.months.may': 'Травень',
        'filter.months.june': 'Чэрвень',
        'filter.months.july': 'Ліпень',
        'filter.months.august': 'Жнівень',
        'filter.months.september': 'Верасень',
        'filter.months.october': 'Кастрычнік',
        'filter.months.november': 'Лістапад',
        'filter.months.december': 'Снежань'
    },
    'en': {
        'menu.about': 'About Faculty',
        'menu.for_students': 'For Students',
        'menu.for_applicants': 'For Applicants',
        'menu.science': 'Science',
        'menu.departments': 'Departments',
        'submenu.history': 'History',
        'submenu.deans_office': 'Dean\'s Office',
        'submenu.student_council': 'Student Life',
        'submenu.schedule': 'Faculty News',
        'submenu.courses': 'Specialties',
        'submenu.hostel': 'Dormitory',
        'submenu.admission_rules': 'List of documents',
        'submenu.open_days': 'Document submission deadlines',
        'submenu.open_door_day': 'Open days',
        'submenu.introductory_campaign': 'Admission campaign',
        'submenu.directions': 'Science',
        'submenu.economic_informatics': 'Departments',
        'submenu.faculty_title': 'Faculty of Digital Economy',
        'submenu.faculty_description': 'We are the best!',
        'submenu.for_students_title': 'For Students',
        'submenu.for_students_desc': 'Everything you need for studying',
        'submenu.for_applicants_title': 'For Applicants',
        'submenu.for_applicants_desc': 'All about admission',
        'submenu.science_title': 'Research activities',
        'submenu.science_desc': 'Research and development',
        'submenu.departments_title': 'Our Departments',
        'submenu.departments_desc': 'Professional education',
        'news.title': 'News',
        'footer.questions': 'If you have any questions, please contact us at',
        'footer.suggestions': 'If you have suggestions, you can write to us',
        'menu.links': 'Links',
        'menu.sitemap': 'Sitemap',
        'footer.contacts': 'Contacts',
        'footer.address': '220070, Minsk, Partizansky Ave. 26, Building 1, Room 1205',
        'footer.copyright': '© 2019-2025 BSEU FDE',
        'filter.title': 'News Filter',
        'filter.year': 'Year',
        'filter.month': 'Month',
        'filter.button': 'Filter',
        'filter.reset': 'Reset Filters',
        'filter.months.january': 'January',
        'filter.months.february': 'February',
        'filter.months.march': 'March',
        'filter.months.april': 'April',
        'filter.months.may': 'May',
        'filter.months.june': 'June',
        'filter.months.july': 'July',
        'filter.months.august': 'August',
        'filter.months.september': 'September',
        'filter.months.october': 'October',
        'filter.months.november': 'November',
        'filter.months.december': 'December'
    },
    'zh': {
        'menu.about': '关于学院',
        'menu.for_students': '给学生',
        'menu.for_applicants': '给申请人',
        'menu.science': '科学',
        'menu.departments': '部门',
        'submenu.history': '历史',
        'submenu.deans_office': '院长办公室',
        'submenu.student_council': '学生生活',
        'submenu.schedule': '学院新闻',
        'submenu.courses': '专业',
        'submenu.hostel': '宿舍',
        'submenu.admission_rules': '文件清单',
        'submenu.open_days': '文件提交截止日期',
        'submenu.open_door_day': '开放日',
        'submenu.introductory_campaign': '招生活动',
        'submenu.directions': '科学',
        'submenu.economic_informatics': '部门',
        'submenu.faculty_title': '数字经济学院',
        'submenu.faculty_description': '我们是最棒的!',
        'submenu.for_students_title': '给学生',
        'submenu.for_students_desc': '学习所需的一切',
        'submenu.for_applicants_title': '给申请人',
        'submenu.for_applicants_desc': '关于入学的一切',
        'submenu.science_title': '科研活动',
        'submenu.science_desc': '研究与开发',
        'submenu.departments_title': '我们的部门',
        'submenu.departments_desc': '专业教育',
        'news.title': '新闻',
        'footer.questions': '如果您有任何问题，请通过以下地址联系我们',
        'footer.suggestions': '如果您有建议，可以写信给我们',
        'menu.links': '链接',
        'menu.sitemap': '网站地图',
        'footer.contacts': '联系方式',
        'footer.address': '220070, 明斯克, Partizansky 大道 26, 1号楼, 1205室',
        'footer.copyright': '© 2019-2025 BSEU FDE',
        'filter.title': '新闻筛选',
        'filter.year': '年份',
        'filter.month': '月份',
        'filter.button': '筛选',
        'filter.reset': '重置筛选',
        'filter.months.january': '一月',
        'filter.months.february': '二月',
        'filter.months.march': '三月',
        'filter.months.april': '四月',
        'filter.months.may': '五月',
        'filter.months.june': '六月',
        'filter.months.july': '七月',
        'filter.months.august': '八月',
        'filter.months.september': '九月',
        'filter.months.october': '十月',
        'filter.months.november': '十一月',
        'filter.months.december': '十二月'
    }
};

function convertGoogleDriveLink(url) {
    if (!url) return "";
    
    // Если это уже прямая ссылка на изображение (jpg, png и т.д.)
    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
        return url;
    }
    
    // Обработка стандартных ссылок Google Drive
    const fileIdMatch = url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([^&]+)/) || url.match(/\/([^\/]{33})/);
    if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1000`;
    }
    
    // Если ссылка не распознана, возвращаем как есть
    return url;
}

// Функция для перевода текста
function translatePage(language) {
    document.documentElement.lang = language;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
}

// Конфигурация сетки новостей
const GRID_CONFIG = {
    mobile: [
        { type: "main", count: 1 },
        { type: "small", count: 2 },
        { type: "small", count: 2 },
        { type: "main", count: 1 },
        { type: "small", count: 2 }
    ],
    desktop: [
        { type: "row", items: [
            { type: "main", count: 1 },
            { type: "small", count: 1 }
        ]},
        { type: "row", items: [
            { type: "small", count: 3 }
        ]},
        { type: "row", items: [
            { type: "small", count: 1 },
            { type: "main", count: 1 }
        ]},
        { type: "row", items: [
            { type: "small", count: 3 }
        ]}
    ]
};

// Шаблоны новостей
const NEWS_TEMPLATES = {
    mobile: {
        main: {
            withImage: `
                <div class="main-news" data-news-id="{newsId}" style="cursor: pointer;">
                    <div class="main-news-bg"></div>
                    <img class="main-news-img" src="{image}" alt="Новость">
                    <div class="main-news-gradient"></div>
                    <div class="main-news-text">{title}</div>
                    <div class="main-news-date">{date}</div>
                </div>
            `,
            withoutImage: `
                <div class="main-news" data-news-id="{newsId}" style="cursor: pointer;">
                    <div class="main-news-bg"></div>
                    <div class="main-news-text">{title}</div>
                    <div class="main-news-date">{date}</div>
                </div>
            `
        },
        small: {
            withImage: `
                <div class="small-news" data-news-id="{newsId}" style="cursor: pointer;">
                    <div class="small-news-bg"></div>
                    <img class="small-news-img" src="{image}" alt="Новость">
                    <div class="small-news-gradient"></div>
                    <div class="small-news-text light">{title}</div>
                    <div class="small-news-date light">{date}</div>
                </div>
            `,
            withoutImage: `
                <div class="small-news" data-news-id="{newsId}" style="cursor: pointer;">
                    <div class="small-news-bg"></div>
                    <div class="small-news-text">{title}</div>
                    <div class="small-news-date">{date}</div>
                </div>
            `
        }
    },
    desktop: {
        main: {
            withImage: `
                <div class="main-news" data-news-id="{newsId}" style="cursor: pointer; ">
                    <div class="main-news-bg"></div>
                    <img class="main-news-img" src="{image}" alt="Новость">
                    <div class="main-news-gradient"></div>
                    <div class="main-news-text">{title}</div>
                    <div class="main-news-date">{date}</div>
                </div>
            `,
            withoutImage: `
                <div class="main-news" data-news-id="{newsId}" style="cursor: pointer;">
                    <div class="main-news-bg"></div>
                    <div class="main-news-text">{title}</div>
                    <div class="main-news-date">{date}</div>
                </div>
            `
        },
        small: {
            withImage: `
                <div class="small-news" data-news-id="{newsId}" style="cursor: pointer; ">
                    <div class="small-news-bg"></div>
                    <img class="small-news-img" src="{image}" alt="Новость">
                    <div class="small-news-gradient"></div>
                    <div class="small-news-text light">{title}</div>
                    <div class="small-news-date light">{date}</div>
                </div>
            `,
            withoutImage: `
                <div class="small-news" data-news-id="{newsId}" style="cursor: pointer;">
                    <div class="small-news-bg"></div>
                    <div class="small-news-text">{title}</div>
                    <div class="main-news-date">{date}</div>
                </div>
            `
        }
    }
};

// Форматирование даты
function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = date.getDate();
    let month = date.toLocaleString('ru-RU', { month: 'long' });
    month = month.slice(0, -1) + 'я';
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

// Загрузка данных
async function fetchNews() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.values?.length > 1) {
            renderNews(data.values.slice(1));
        }
    } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
    }
}

// Генерация HTML блока новости
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

// Генерация сетки новостей
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

// Константы для пагинации
const NEWS_PER_PAGE = 10;
let currentPage = 1;
let filteredNewsData = [];
let currentFilter = { year: null, month: null };

// Функция для создания меню фильтрации
function createFilterMenu() {
    // Проверяем ширину экрана
    if (window.innerWidth <= 999) {
        return null; // Не создаем меню фильтрации на мобильных и планшетах
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

    // Добавляем кнопку для открытия меню фильтрации только на десктопе
    const filterButton = document.createElement('button');
    filterButton.className = 'filter-button';
    filterButton.innerHTML = `
        <span data-i18n="filter.button">Фильтр</span>
        <img src="images/filter.svg" alt="Фильтр">
    `;
    document.querySelector('.news-container').insertBefore(filterButton, document.querySelector('.news-title'));

    return filterMenu;
}

// Функция для обновления меню фильтрации
function updateFilterMenu(newsData) {
    // Проверяем ширину экрана
    if (window.innerWidth <= 999) {
        return; // Не обновляем меню фильтрации на мобильных и планшетах
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

    // Добавляем кнопки годов
    Array.from(years).sort((a, b) => b - a).forEach(year => {
        const button = document.createElement('button');
        button.textContent = year;
        button.className = currentFilter.year === year ? 'active' : '';
        button.onclick = () => toggleYearFilter(year);
        yearButtons.appendChild(button);
    });

    // Добавляем кнопки месяцев с переводами
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

// Функции для переключения фильтров
function toggleYearFilter(year) {
    currentFilter.year = currentFilter.year === year ? null : year;
    applyFilters();
}

function toggleMonthFilter(month) {
    currentFilter.month = currentFilter.month === month ? null : month;
    applyFilters();
}

// Функция применения фильтров
function applyFilters() {
    const originalNewsData = [...document.querySelector('#desktop-news-wrapper').dataset.originalNews || []];
    filteredNewsData = originalNewsData.filter(item => {
        if (!item[3]) return false;
        const date = new Date(item[3]);
        if (isNaN(date.getTime())) return false;
        
        if (currentFilter.year && date.getFullYear() !== currentFilter.year) return false;
        if (currentFilter.month !== null && date.getMonth() !== currentFilter.month) return false;
        
        return true;
    });

    currentPage = 1;
    renderNews(filteredNewsData);
    updateFilterMenu(filteredNewsData);
}

// Модифицируем функцию renderNews для поддержки пагинации
function renderNews(newsData) {
    // Сохраняем оригинальные данные
    const wrapper = document.querySelector('#desktop-news-wrapper');
    wrapper.dataset.originalNews = JSON.stringify(newsData);

    // Реверсируем массив новостей для отображения в обратном порядке
    const reversedNewsData = [...newsData].reverse();
    
    // Вычисляем индексы для текущей страницы
    const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
    const endIndex = startIndex + NEWS_PER_PAGE;
    const currentPageNews = reversedNewsData.slice(startIndex, endIndex);

    // Обрабатываем данные для отображения
    const processedNewsData = currentPageNews.map(item => {
        if (item[2]) {
            item[2] = convertGoogleDriveLink(item[2]);
        }
        return item;
    });

    // Обновляем отображение новостей
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

    // Добавляем пагинацию
    updatePagination(newsData.length);
}

// Функция для добавления обработчиков кликов по новостям
function addNewsClickHandlers(wrapper, newsData) {
    wrapper.querySelectorAll('[data-news-id]').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-news-id')) - 1;
            const newsId = newsData[index][4];
            window.location.href = `news1/index.html?id=${newsId}`;
        });
    });
}

// Функция для обновления пагинации
function updatePagination(totalNews) {
    const totalPages = Math.ceil(totalNews / NEWS_PER_PAGE);
    const paginationContainer = document.querySelector('.pagination-container') || createPaginationContainer();
    
    paginationContainer.innerHTML = '';
    
    // Кнопка "Назад"
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button' + (currentPage === 1 ? ' disabled' : '');
    prevButton.innerHTML = '←';
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderNews(filteredNewsData);
        }
    };
    paginationContainer.appendChild(prevButton);

    // Номера страниц
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            const pageButton = document.createElement('button');
            pageButton.className = 'pagination-button' + (i === currentPage ? ' active' : '');
            pageButton.textContent = i;
            pageButton.onclick = () => {
                currentPage = i;
                renderNews(filteredNewsData);
            };
            paginationContainer.appendChild(pageButton);
        } else if (
            i === currentPage - 2 || 
            i === currentPage + 2
        ) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationContainer.appendChild(ellipsis);
        }
    }

    // Кнопка "Вперед"
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-button' + (currentPage === totalPages ? ' disabled' : '');
    nextButton.innerHTML = '→';
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderNews(filteredNewsData);
        }
    };
    paginationContainer.appendChild(nextButton);
}

// Функция для создания контейнера пагинации
function createPaginationContainer() {
    const container = document.createElement('div');
    container.className = 'pagination-container';
    document.querySelector('.news-container').appendChild(container);
    return container;
}

// Переключение версий
function toggleVersions() {
    const isDesktop = window.innerWidth > 1220;
    document.querySelector(".mobile-version").style.display = isDesktop ? "none" : "block";
    document.querySelector(".desktop-version").style.display = isDesktop ? "block" : "none";
}

// Инициализация и обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Десктопная версия
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
                if (lang && translations[lang]) {
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

    // Мобильная версия
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

    // Инициализация новостей
    fetchNews();
    toggleVersions();
    
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

    // Начальная загрузка русской версии
    translatePage('ru');

    const filterMenu = createFilterMenu();
    
    // Обработчики для меню фильтрации
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

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!filterMenu.contains(e.target) && !e.target.closest('.filter-button')) {
            filterMenu.classList.remove('active');
        }
    });

    // Загружаем данные
    fetchNews().then(data => {
        if (data && data.values && data.values.length > 1) {
            filteredNewsData = data.values.slice(1);
            updateFilterMenu(filteredNewsData);
            renderNews(filteredNewsData);
        }
    });

    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', () => {
        const filterMenu = document.querySelector('.news-filter-menu');
        const filterButton = document.querySelector('.filter-button');
        
        if (window.innerWidth <= 999) {
            // Скрываем и удаляем элементы фильтрации на мобильных и планшетах
            if (filterMenu) {
                filterMenu.remove();
            }
            if (filterButton) {
                filterButton.remove();
            }
        } else {
            // Восстанавливаем элементы фильтрации на десктопе
            if (!filterMenu) {
                createFilterMenu();
            }
            if (!filterButton) {
                const newFilterButton = document.createElement('button');
                newFilterButton.className = 'filter-button';
                newFilterButton.innerHTML = `
                    <span data-i18n="filter.button">Фильтр</span>
                    <img src="images/filter.svg" alt="Фильтр">
                `;
                document.querySelector('.news-container').insertBefore(newFilterButton, document.querySelector('.news-title'));
            }
        }
    });
});

// Автообновление каждые 5 минут
setInterval(fetchNews, 300000);