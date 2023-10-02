import { createPluginBall } from "./createBall";
import html2canvas from "html2canvas";
import { bugReportFunc } from "./bugReportFunc";

export function commentFunc () {

    //Находим контейнер в котором будут храниться шарики
    const ballsContainer = document.querySelector('.plugin-balls');
    const bugReport = document.querySelector('.bug-report');
    const pluginContainer = document.getElementById('pluginContainer');






    //ПОСТАВИТЬ В ИНДЕКСЕ ПРОВЕРКУ НА DATATRUE У КНОПКИ ВКЛЮЧЕНИЯ ФУНКЦИОНАЛА И В ЭТОМ МЕСТЕ ПОЛУЧАТЬ ДАННЫЕ С СЕРВЕРА И ЗАПОЛНЯТЬ ballsData




   
    // Обработчик клика на странице
    document.body.addEventListener("click", function (event) {


        // Создаем пустую FormData
        const formData = new FormData();

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

            // // Вызываем makeScreenshot и передаем ей колбэк
            // makeScreenshot(formData);

            // Записываем данные о шарике в formData, включая XPath путь
            // formData.append('xRelatively', xRelatively);
            // formData.append('yRelatively', yRelatively);
            // formData.append('xpath', xpath);

            //открываем форму Репортера и устанавливаем позицию молдалки под шариком
            bugReport.style.display = 'block';
            bugReport.style.left = xElement + xRelatively - 19 + "px";
            bugReport.style.top = yElement + yRelatively + 24 + "px";

            

           

            // const bugReportForm = document.querySelector('.bug-report__form'); // Выберите форму
            // const bugTitle = document.querySelector('#bug-title');
            // const bugDescription = document.querySelector('#bug-description');
            // const bugReportContainer = document.querySelector('.bug-report');
            // const bugReportCloseBtn = document.querySelector('.bug-report__cancel-button');

            // //Отравка формы
            // bugReportForm.addEventListener('submit', (e) => {
            //     e.preventDefault();
            //     formData.append('bugTitle', bugTitle.value);
            //     formData.append('bugDescription', bugDescription.value);

            //     //Очищаю поля
            //     bugTitle.value = '';
            //     bugDescription.value = '';

                
                
            //     console.log('ВЫВОД ФОРМДАТЫ SUBMIT');
            //     // Для проверки, выведем содержимое объекта FormData в консоль
            //     formData.forEach(function (value, key) {
            //         console.log(key + ": " + value);
            //     });

            //     // Сбрасываем formData
            //     formData.delete('xRelatively');
            //     formData.delete('yRelatively');
            //     formData.delete('xpath');
            //     formData.delete('screenshot');
            //     formData.delete('bugTitle');
            //     formData.delete('bugDescription');
            // })


            // // Закрывает модалку и очищает поля формы
            // bugReportCloseBtn.addEventListener('click', () => {
            //     //Очищаю поля
            //     bugTitle.value = '';
            //     bugDescription.value = '';
                
            //     // Теперь скройте модальное окно и покажите контейнер с кнопками навигации
            //     bugReportContainer.style.display = 'none';
            //     pluginContainer.style.display = 'block';

            //     // Сбрасываем formData
            //     formData.delete('xRelatively');
            //     formData.delete('yRelatively');
            //     formData.delete('xpath');
            //     formData.delete('screenshot');
            //     formData.delete('bugTitle');
            //     formData.delete('bugDescription');

            //     console.log('ВЫВОД ФОРМДАТЫ ЗАКРЫТЬ');
            //     // Для проверки, выведем содержимое объекта FormData в консоль
            //     formData.forEach(function (value, key) {
            //         console.log(key + ": " + value);
            //     });


            // });
        }

    });
    





    function makeScreenshot(formData) {
        // Получаем размеры видимой части страницы
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;

        // Если элемент существует, отключаем его
        if (pluginContainer) {
            pluginContainer.style.display = 'none';
        }

        // Здесь сделаем скриншот видимой части страницы
        html2canvas(document.body, {
            width: screenWidth,
            height: screenHeight,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
        }).then(function (canvas) {
            // Получаем данные из Canvas в бинарном виде
            canvas.toBlob(function (blob) {
                // Добавляем бинарное изображение в FormData с ключом "screenshot"
                formData.append('screenshot', blob, 'screenshot.jpg');
            }, 'image/jpeg'); // Указываем формат изображения
            
        });
    }


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