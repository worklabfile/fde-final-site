const SHEET_ID = "1-j3eXzrevdn5KSf0SCFeSsdMu1athvjH9WfSBY9F5UQ";
const API_KEY = "AIzaSyBUhb0WZJP5J4XvgYshB31SrVenUdBm6go";
const RANGE = "A1:E"; // Добавляем столбец E (ID новости)

// Функция для преобразования ссылки Google Drive
function convertGoogleImageLink(url) {
    if (!url) return "";
    
    // Если это уже прямая ссылка на изображение, возвращаем как есть
    if (url.startsWith('http') && (url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg'))) {
        return url;
    }
    
    // Если это ссылка на Google Drive
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000` : url;
}

// Загрузка данных
async function fetchNews() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.values && data.values.length > 1) {
            renderNewsDetails(data.values.slice(1));
        } else {
            // Если данные не загрузились, показываем HTML-контент
            document.querySelector('.inner-container').style.display = 'block';
        }
    } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
        // В случае ошибки показываем HTML-контент
        document.querySelector('.inner-container').style.display = 'block';
    }
}

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

// Рендер деталей новости
function renderNewsDetails(newsData) {
    // Получаем ID новости из URL
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id') || "1"; // По умолчанию ID 1
    
    // Находим новость с нужным ID
    const newsItem = newsData.find(item => item[4] === newsId);
    
    if (!newsItem) {
        console.error("Новость не найдена");
        document.querySelector('.inner-container').style.display = 'block';
        return;
    }
    
    // Заполняем данные
    const titleElement = document.querySelector('.inner-title');
    const dateElement = document.querySelector('.date');
    const imageElement = document.querySelector('.image img');
    const descriptionElement = document.querySelector('.description');
    
    if (titleElement) titleElement.textContent = newsItem[0] || 'Нет заголовка';
    if (dateElement) dateElement.textContent = formatDate(newsItem[3]) || 'Дата не указана';
    if (imageElement) imageElement.src = convertGoogleImageLink(newsItem[2]) || 'https://via.placeholder.com/800x400';
    if (descriptionElement) descriptionElement.innerHTML = (newsItem[1] || 'Нет описания').replace(/\n/g, '<br>');
    
    // Показываем контейнер после загрузки данных
    document.querySelector('.inner-container').style.display = 'block';
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
    // Сначала скрываем контейнер
    document.querySelector('.inner-container').style.display = 'none';
    
    // Затем загружаем данные
    fetchNews();
});

const translations = {
    'ru': {
        // Меню
        'menu.about': 'О факультете',
        'menu.for_students': 'Студенту',
        'menu.for_applicants': 'Абитуриенту',
        'menu.science': 'Наука',
        'menu.departments': 'Кафедры',
        'menu.links': 'Ссылки',
        'menu.contacts': 'Контакты',
        'menu.sitemap': 'Карта сайта',

        'submenu.hostel': 'Общежитие',      
        'submenu.open_door_day': 'Дни открытых дверей',
        'submenu.introductory_campaign': 'Вступительная кампания',

        // Подменю
        'submenu.history': 'История',
        'submenu.deans_office': 'Деканат',
        'submenu.student_council': 'Студсовет',
        'submenu.trade_union': 'Профбюро',
        'submenu.brsm': 'БРМС',
        'submenu.faculty_title': 'Факультет Цифровой Экономики',
        'submenu.faculty_description': 'Мы лучшие!',
        'submenu.schedule': 'Новости факультета',
        'submenu.materials': 'Учебные материалы',
        'submenu.scholarships': 'Стипендии',
        'submenu.for_students_title': 'Для студентов',
        'submenu.for_students_desc': 'Все необходимое для учебы',
        'submenu.admission_rules': 'Правила приема',
        'submenu.courses': 'Специальности',
        'submenu.open_days': 'Дни открытых дверей',
        'submenu.for_applicants_title': 'Для абитуриентов',
        'submenu.for_applicants_desc': 'Всё о поступлении',
        'submenu.directions': 'Научные направления',
        'submenu.conferences': 'Конференции',
        'submenu.publications': 'Публикации',
        'submenu.science_title': 'Научная деятельность',
        'submenu.science_desc': 'Исследования и разработки',
        'submenu.economic_informatics': 'Кафедры',
        'submenu.departments_title': 'Наши кафедры',
        'submenu.departments_desc': 'Профессиональное образование',

        // Контакты
        'contacts.title': 'Контакты',
        'contacts.dean': 'декан',
        'contacts.vice_dean': 'заместитель декана',
        'contacts.address': '220070, г. Минск, пр. Партизанский 26, корпус 1, ауд. 120*',
        'contacts.how_to_get': 'Как добраться',

        // Футер
        'footer.questions': 'Если у Вас возникли вопросы, обращайтесь по адресу',
        'footer.suggestions': 'Если есть предложения, можете написать нам',
        'footer.copyright': '© 2019-2025 БГЭУ ФЦЭ'
    },
    'be': {
        // Меню
        'menu.about': 'Аб факультэце',
        'menu.for_students': 'Студэнту',
        'menu.for_applicants': 'Абітурыенту',
        'menu.science': 'Навука',
        'menu.departments': 'Кафедры',
        'menu.links': 'Спасылкі',
        'menu.contacts': 'Кантакты',
        'menu.sitemap': 'Карта сайта',

        'submenu.hostel': 'Інтэрнат',
        'submenu.open_door_day': 'Дні адкрытых дзвярэй',
        'submenu.introductory_campaign': 'Уступная кампанія',

        // Подменю
        'submenu.history': 'Гісторыя',
        'submenu.deans_office': 'Дэканат',
        'submenu.student_council': 'Студсавет',
        'submenu.trade_union': 'Прафбюро',
        'submenu.brsm': 'БРСМ',
        'submenu.faculty_title': 'Факультэт Лічбавай Эканомікі',
        'submenu.faculty_description': 'Мы лепшыя!',
        'submenu.schedule': 'Расклад',
        'submenu.materials': 'Вучэбныя матэрыялы',
        'submenu.scholarships': 'Стыпендыі',
        'submenu.for_students_title': 'Для студэнтаў',
        'submenu.for_students_desc': 'Усё неабходнае для вучобы',
        'submenu.admission_rules': 'Правілы прыёму',
        'submenu.courses': 'Спецыяльнасці',
        'submenu.open_days': 'Дні адкрытых дзвярэй',
        'submenu.for_applicants_title': 'Для абітурыентаў',
        'submenu.for_applicants_desc': 'Усё аб паступленні',
        'submenu.directions': 'Навуковыя кірункі',
        'submenu.conferences': 'Канферэнцыі',
        'submenu.publications': 'Публікацыі',
        'submenu.science_title': 'Навуковая дзейнасць',
        'submenu.science_desc': 'Дасьледаваньні і распрацоўкі',
        'submenu.economic_informatics': 'Кафедры',
        'submenu.departments_title': 'Нашы кафедры',
        'submenu.departments_desc': 'Прафесійная адукацыя',

        // Контакты
        'contacts.title': 'Кантакты',
        'contacts.dean': 'дэкан',
        'contacts.vice_dean': 'намеснік дэкана',
        'contacts.address': '220070, г. Мінск, пр. Партызанскі 26,<br>корпус 1, ауд. 120*',
        'contacts.how_to_get': 'Як дабрацца',

        // Футер
        'footer.questions': 'Калі ў Вас узніклі пытанні, звяртайцеся па адрасе',
        'footer.suggestions': 'Калі ёсць прапановы, можаце напісаць нам',
        'footer.copyright': '© 2019-2025 БДЭУ ФЛЭ'
    },
    'en': {
        // Меню
        'menu.about': 'About Faculty',
        'menu.for_students': 'For Students',
        'menu.for_applicants': 'For Applicants',
        'menu.science': 'Science',
        'menu.departments': 'Departments',
        'menu.links': 'Links',
        'menu.contacts': 'Contacts',
        'menu.sitemap': 'Site Map',

        'submenu.hostel': 'Dormitory',
        'submenu.open_door_day': 'Open days',
        'submenu.introductory_campaign': 'Admission campaign',

        // Подменю
        'submenu.history': 'History',
        'submenu.deans_office': 'Dean\'s Office',
        'submenu.student_council': 'Student Council',
        'submenu.trade_union': 'Trade Union',
        'submenu.brsm': 'BRSM',
        'submenu.faculty_title': 'Faculty of Digital Economy',
        'submenu.faculty_description': 'We are the best!',
        'submenu.schedule': 'Schedule',
        'submenu.materials': 'Study materials',
        'submenu.scholarships': 'Scholarships',
        'submenu.for_students_title': 'For Students',
        'submenu.for_students_desc': 'Everything you need for studying',
        'submenu.admission_rules': 'Admission rules',
        'submenu.courses': 'Specialties',
        'submenu.open_days': 'Open days',
        'submenu.for_applicants_title': 'For Applicants',
        'submenu.for_applicants_desc': 'All about admission',
        'submenu.directions': 'Research areas',
        'submenu.conferences': 'Conferences',
        'submenu.publications': 'Publications',
        'submenu.science_title': 'Research activities',
        'submenu.science_desc': 'Research and development',
        'submenu.economic_informatics': 'Departments',
        'submenu.departments_title': 'Our Departments',
        'submenu.departments_desc': 'Professional education',

        // Контакты
        'contacts.title': 'Contacts',
        'contacts.dean': 'dean',
        'contacts.vice_dean': 'vice dean',
        'contacts.address': '220070, Minsk, Partizansky Ave. 26,<br>building 1, room 120*',
        'contacts.how_to_get': 'How to get',

        // Футер
        'footer.questions': 'If you have any questions, please contact',
        'footer.suggestions': 'If you have suggestions, you can write to us',
        'footer.copyright': '© 2019-2025 BSEU FDE'
    },
    'zh': {
        // Меню
        'menu.about': '关于学院',
        'menu.for_students': '给学生',
        'menu.for_applicants': '给申请人',
        'menu.science': '科学',
        'menu.departments': '部门',
        'menu.links': '链接',
        'menu.contacts': '联系方式',
        'menu.sitemap': '网站地图',

        'submenu.hostel': '宿舍',
        'submenu.open_door_day': '开放日',
        'submenu.introductory_campaign': '招生活动',

        // Подменю
        'submenu.history': '历史',
        'submenu.deans_office': '院长办公室',
        'submenu.student_council': '学生会',
        'submenu.trade_union': '工会',
        'submenu.brsm': '白俄罗斯青年联盟',
        'submenu.faculty_title': '数字经济学院',
        'submenu.faculty_description': '我们是最好的！',
        'submenu.schedule': '时间表',
        'submenu.materials': '学习资料',
        'submenu.scholarships': '奖学金',
        'submenu.for_students_title': '为学生',
        'submenu.for_students_desc': '学习所需的一切',
        'submenu.admission_rules': '录取规则',
        'submenu.courses': '专业',
        'submenu.open_days': '开放日',
        'submenu.for_applicants_title': '给申请人',
        'submenu.for_applicants_desc': '关于入学的一切',
        'submenu.directions': '研究方向',
        'submenu.conferences': '会议',
        'submenu.publications': '出版物',
        'submenu.science_title': '科研活动',
        'submenu.science_desc': '研究与开发',
        'submenu.economic_informatics': '我们的部门',
        'submenu.departments_title': '我们的部门',
        'submenu.departments_desc': '专业教育',

        // Контакты
        'contacts.title': '联系方式',
        'contacts.dean': '院长',
        'contacts.vice_dean': '副院长',
        'contacts.address': '220070, 明斯克, 游击队大街26号,<br>1号楼, 120室*',
        'contacts.how_to_get': '如何到达',

        // Футер
        'footer.questions': '如果您有任何问题，请联系',
        'footer.suggestions': '如果您有建议，可以写信给我们',
        'footer.copyright': '© 2019-2025 白俄罗斯国立经济大学 数字经济学院'
    }
};

// Функция для перевода страницы
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


document.addEventListener('DOMContentLoaded', function() {
   
    // Переключение языка
    const languageItems = document.querySelectorAll('.language-dropdown-item');
    const languageDropdown = document.getElementById('languageDropdown');
    const desktopLanguageIcon = document.getElementById('desktopLanguageIcon');

    if (desktopLanguageIcon) {
        desktopLanguageIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
        });
    }

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

    document.addEventListener('click', function() {
        languageDropdown.style.display = 'none';
    });

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

    // Начальная загрузка русской версии
    translatePage('ru');
});