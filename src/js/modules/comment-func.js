import { createPluginBall } from "./createBall";
import html2canvas from "html2canvas";

export function commentFunc () {

    //Находим контейнер в котором будут храниться шарики
    const ballsContainer = document.querySelector('.plugin-balls');
    const bugReport = document.querySelector('.bug-report');
     // Создаем объект для хранения данных о шариках







    //ПОСТАВИТЬ В ИНДЕКСЕ ПРОВЕРКУ НА DATATRUE У КНОПКИ ВКЛЮЧЕНИЯ ФУНКЦИОНАЛА И В ЭТОМ МЕСТЕ ПОЛУЧАТЬ ДАННЫЕ С СЕРВЕРА И ЗАПОЛНЯТЬ ballsData






   
    // Обработчик клика на странице
    document.body.addEventListener("click", async function (event) {

        // Создаем пустую FormData
        var formData = new FormData();

        const target = event.target;
        const isPluginContainer = target.classList.contains("plugin-container");
        const isPluginLayout = target.classList.contains("plugin-layout");
    
        if (!isPluginContainer && !target.closest(".plugin-container") && !isPluginLayout && !target.closest(".plugin-layout")) {
          const xClick = event.clientX + window.pageXOffset;
          const yClick = event.clientY + window.pageYOffset;

        // Сохраняем координаты элемента
        const rect = target.getBoundingClientRect();
        const xElement = rect.left + window.pageXOffset;
        const yElement = rect.top + window.pageYOffset;

        // Вычисляем координаты клика относительно элемента
        const xRelatively = xClick - xElement;
        const yRelatively = yClick - yElement;

        // Получаем XPath путь элемента
        const xpath = getAbsoluteXPath(target);
        
         // Создаем шарик
        createPluginBall(xRelatively, yRelatively, xpath, ballsContainer);


        // Получаем размеры видимой части страницы
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;

        try {
            // Здесь сделаем скриншот видимой части страницы с использованием HTML2Canvas
            const canvas = await html2canvas(document.body, {
                width: screenWidth,
                height: screenHeight,
                scrollX: window.scrollX,
                scrollY: window.scrollY,
            });
            
            // Получаем данные из Canvas в бинарном виде
            const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/jpeg'); // Указываем формат изображения
            });

            // Добавляем бинарное изображение в FormData с ключом "screenshot"
            formData.append('screenshot', blob, 'screenshot.jpg');
        } catch (error) {
            console.error('Ошибка при создании скриншота:', error);
            return; // Прекращаем выполнение кода в случае ошибки
        }

        //открываем форму Репортера
        bugReport.style.display = 'block';
        bugReport.style.left = xElement + xRelatively - 19 + "px";
        bugReport.style.top = yElement + yRelatively + 24 + "px";
        
        
    
           // Записываем данные о шарике в объект, включая XPath путь
           formData.append('xRelatively', xRelatively);
           formData.append('yRelatively', yRelatively);
           formData.append('xpath', xpath);

           // Выводим данные из объекта FormData
        formData.forEach(function(value, key){
            console.log(key + ": " + value);
        });
        }
    });









    // Функция для получения XPath пути элемента
    function getAbsoluteXPath(element) {
        if (element && element.id) {
            // Если у элемента есть уникальный id, используйте его для создания XPath
            return '//' + element.tagName.toLowerCase() + '[@id="' + element.id + '"]';
        }
        
        // В противном случае, перейдите к родительскому элементу и составьте XPath
        var path = [];
        while (element.parentNode) {
            var siblingCount = 0;
            var siblingIndex = 0;
            var tagName = element.tagName.toLowerCase();
            
            // Получите всех соседних элементов того же типа
            var siblings = element.parentNode.childNodes;
            for (var i = 0; i < siblings.length; i++) {
                var sibling = siblings[i];
                if (sibling.nodeType === 1 && sibling.tagName.toLowerCase() === tagName) {
                    siblingCount++;
                }
                if (sibling === element) {
                    siblingIndex = siblingCount;
                }
            }
            
            // Создайте часть XPath для текущего элемента
            var part = tagName + '[' + siblingIndex + ']';
            path.unshift(part);
            
            // Перейдите к родительскому элементу
            element = element.parentNode;
        }
        
        // Объедините все части XPath в одну строку
        return '//' + path.join('/');
    }

}