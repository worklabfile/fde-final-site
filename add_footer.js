const fs = require('fs');
const path = require('path');

// Функция для рекурсивного поиска всех HTML файлов
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.')) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Функция для определения относительного пути к корню
function getRelativePathToRoot(filePath) {
    const depth = filePath.split('/').length - 1;
    return '../'.repeat(depth);
}

// Функция для замены футера в HTML файле
function replaceFooterInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Удаляем старый футер
    const oldFooterRegex = /<div class="footer">[\s\S]*?<\/div>/g;
    content = content.replace(oldFooterRegex, '');
    
    // Удаляем старый скрипт загрузки футера, если он есть
    const oldScriptRegex = /<script>\s*fetch\('.*?footer\.html'\)[\s\S]*?<\/script>/g;
    content = content.replace(oldScriptRegex, '');
    
    // Удаляем старую ссылку на CSS футера
    const oldCssRegex = /<link rel="stylesheet" href=".*?footer\.css">/g;
    content = content.replace(oldCssRegex, '');
    
    // Находим закрывающий тег body
    const bodyEndIndex = content.lastIndexOf('</body>');
    if (bodyEndIndex === -1) {
        console.log(`Не найден закрывающий тег body в файле: ${filePath}`);
        return;
    }
    
    // Определяем относительный путь к корню
    const relativePath = getRelativePathToRoot(filePath);
    
    // Добавляем новый футер перед закрывающим тегом body
    const footerHtml = `
    <div id="footer-container"></div>
    <script>
        fetch('${relativePath}components/footer/footer.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('footer-container').innerHTML = html;
            });
    </script>
</body>`;
    
    content = content.substring(0, bodyEndIndex) + footerHtml;
    
    // Добавляем ссылку на CSS футера
    const headEndIndex = content.indexOf('</head>');
    if (headEndIndex !== -1) {
        content = content.substring(0, headEndIndex) + 
            `\n    <link rel="stylesheet" href="${relativePath}components/footer/footer.css">` + 
            content.substring(headEndIndex);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Футер обновлен в файле: ${filePath}`);
}

// Основная функция
function main() {
    const htmlFiles = findHtmlFiles('.');
    
    htmlFiles.forEach(filePath => {
        try {
            replaceFooterInFile(filePath);
        } catch (error) {
            console.error(`Ошибка при обработке файла ${filePath}:`, error);
        }
    });
}

main(); 