// Конфигурация Google Sheets
const SHEET_ID = "1-j3eXzrevdn5KSf0SCFeSsdMu1athvjH9WfSBY9F5UQ";
const API_KEY = "AIzaSyBUhb0WZJP5J4XvgYshB31SrVenUdBm6go";
const RANGE = "A1:E";
const MAX_NEWS_COUNT = 5;

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

// Локализация
const translations = {
    'ru': {
        'header.title': 'Мы делаем умных успешнее, а успешных — мудрее',
        'news.all_news': 'Все новости',
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
        'submenu.faculty_description': 'О факультете',
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
        'submenu.faculty_title_main': 'Факультет Цифровой Экономики',
        'header.subtitle': 'Мы делаем умных успешнее, а успешных — мудрее'
    },
    'be': {
        'header.title': 'Мы робім разумных больш паспяховымі, а паспяховых — мудрэйшымі',
        'news.all_news': 'Усе навіны',
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
        'submenu.directions': 'Навука',
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
        'submenu.faculty_title_main': 'Факультэт лічбавай эканомікі',
        'header.subtitle': 'Мы робім разумных больш паспяховымі, а паспяховых — мудрэйшымі'
    },
    'en': {
        'header.title': 'We make the smart more successful, and the successful wiser',
        'news.all_news': 'All news',
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
        'submenu.faculty_title_main': 'Faculty of Digital Economy',
        'header.subtitle': 'We make the smart more successful, and the successful — wiser'
    },
    'zh': {
        'header.title': '我们让聪明人更成功，让成功者更智慧',
        'news.all_news': '所有新闻',
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
        'submenu.faculty_title_main': '数字经济学院',
        'header.subtitle': '我们让聪明的人更成功，让成功的人更睿智'
    }
};

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
                    <div class="main-news-date">{date}</div>
                </div>
            `
        }
    }
};

// Форматирование даты
function formatDate(dateString) {
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

// Загрузка данных
async function fetchNews() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.values?.length > 1) {
            // Преобразуем ссылки на изображения сразу после получения данных
            const processedData = data.values.slice(1).map(row => {
                if (row[2]) {
                    row[2] = convertGoogleDriveLink(row[2]);
                }
                return row;
            });
            renderNews(processedData);
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
        // Мобильная версия (оставляем без изменений)
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
        // Десктопная версия (ограничиваем 2 рядами)
        const maxRows = 2;
        let rowsCreated = 0;
        
        for (const rowConfig of gridConfig) {
            if (rowsCreated >= maxRows) break;
            
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
                rowsCreated++;
            }
        }
    }
    
    return html;
}

// Рендер новостей
function renderNews(newsData) {
    // Реверсируем массив новостей для отображения в обратном порядке
    const reversedNewsData = [...newsData].reverse();
    const limitedNewsData = reversedNewsData.slice(0, MAX_NEWS_COUNT);
    
    // Мобильная версия
    const mobileWrapper = document.getElementById("mobile-news-wrapper");
    if (mobileWrapper) {
        mobileWrapper.innerHTML = generateNewsGrid(limitedNewsData, "mobile");
        mobileWrapper.querySelectorAll('[data-news-id]').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.getAttribute('data-news-id')) - 1;
                const newsId = limitedNewsData[index][4];
                window.location.href = `allnews/news1/index.html?id=${newsId}`;
            });
        });
    }

    // Десктопная версия
    const desktopWrapper = document.getElementById("desktop-news-wrapper");
    if (desktopWrapper) {
        desktopWrapper.innerHTML = generateNewsGrid(limitedNewsData, "desktop");
        desktopWrapper.querySelectorAll('[data-news-id]').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.getAttribute('data-news-id')) - 1;
                const newsId = limitedNewsData[index][4];
                window.location.href = `allnews/news1/index.html?id=${newsId}`;
            });
        });
    }
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
});

document.querySelector('.desktop-version .all-news-link')?.addEventListener('click', () => {
    window.location.href = 'allnews/';
});

document.querySelector('.mobile-version .mobile-all-news')?.addEventListener('click', () => {
    window.location.href = 'allnews/';
});

// Автообновление каждые 5 минут
setInterval(fetchNews, 300000);

// ============================================================
// АВТОМАТИЧЕСКИЙ СЛАЙДЕР HERO-ИЗОБРАЖЕНИЙ
// ============================================================
// Описание: Переключает фоновые изображения каждые 2 секунды
// Адаптивность: Работает на desktop (≥1024px), tablet (768-1023px), mobile (≤767px)
// Оптимизация: Прямое изменение background-image через CSS без DOM-манипуляций
// Производительность: Минимальная нагрузка, подходит для слабых устройств
// Cross-browser: Chrome, Firefox, Safari, Edge
// ============================================================

(function() {
    // Массив изображений для слайдера (5 изображений)
    // ЗАМЕНИТЕ на свои изображения: background1.jpg, background2.jpg и т.д.
    const heroImages = [
        'background1.jpg',
        'background2.jpg',
        'background3.jpg',
        'background4.jpg',
        'background5.jpg'
    ];
    
    let currentImageIndex = 0;
    
    // Функция смены изображения
    function changeHeroImage() {
        // Переключаем на следующее изображение (циклично)
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        const nextImage = heroImages[currentImageIndex];
        
        // Градиенты (одинаковые для desktop и mobile)
        const gradients = 'linear-gradient(180deg, #333 0%, rgba(217, 217, 217, 0.00) 100%), linear-gradient(180deg, rgba(217, 217, 217, 0.00) 50%, #14427F 100%)';
        
        // DESKTOP версия (≥1220px): обновляем .desktop-header-wrapper
        const desktopHeader = document.querySelector('.desktop-header-wrapper');
        if (desktopHeader) {
            desktopHeader.style.backgroundImage = `${gradients}, url("${nextImage}")`;
        }
        
        // MOBILE/TABLET версия (<1220px): обновляем .mobile-header
        const mobileHeader = document.querySelector('.mobile-header');
        if (mobileHeader) {
            mobileHeader.style.backgroundImage = `${gradients}, url("${nextImage}")`;
        }
    }
    
    // Запускаем слайдер каждые 2 секунды (2000 мс)
    // ВАЖНО: Интервал начинается после загрузки страницы
    setInterval(changeHeroImage, 2000);
    
    // Опционально: Предзагрузка изображений для плавности (предотвращает мигание)
    // Это улучшает UX, особенно на медленных соединениях
    heroImages.forEach(function(imageSrc) {
        const img = new Image();
        img.src = imageSrc;
    });
})();

