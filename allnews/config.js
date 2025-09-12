// Google Sheets configuration
export const SHEET_ID = "1-j3eXzrevdn5KSf0SCFeSsdMu1athvjH9WfSBY9F5UQ";
export const API_KEY = "AIzaSyBUhb0WZJP5J4XvgYshB31SrVenUdBm6go";
export const RANGE = "A1:E";
export const MAX_NEWS_COUNT = 29;

// Grid configuration
export const GRID_CONFIG = {
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

// News templates
export const NEWS_TEMPLATES = {
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