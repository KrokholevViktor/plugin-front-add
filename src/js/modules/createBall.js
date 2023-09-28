// Функция, которая создает новый элемент с классом plugin-ball
export function createPluginBall(xRelatively, yRelatively, xPath, container) {
    // Используем xPath, чтобы найти элементы
    const xPathElement = document.evaluate(xPath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
    
    if (xPathElement) {
        // Получаем координаты найденного элемента
        const { x, y } = xPathElement.getBoundingClientRect();
        
        // Создаем ваш элемент "ball"
        const ball = document.createElement("div");
        ball.classList.add("plugin-ball");
        ball.innerHTML = `
            <div class="plugin-ball__number"></div>
            <div class="plugin-ball__peek">
                <div class="plugin-ball__inner">
                    <div class="plugin-ball__author"></div>
                    <div class="plugin-ball__date"></div>
                    <div class="plugin-ball__title"></div>
                </div>
            </div>
        `;
        
        // Устанавливаем координаты на основе xPathElement и заданных сдвигов
        ball.style.left = x + window.pageXOffset + xRelatively - 20 + "px";
        ball.style.top = y + window.pageYOffset + yRelatively - 20 + "px";
      
        // Добавляем элемент в контейнер
        container.appendChild(ball);
        } else {
        console.error("Элемент не найден по указанному XPath.");
        }
}