import { BugList } from './bugList';
import { BugData } from './bugData';

export function sidebar() {
    
    const tabButtons = document.querySelectorAll(".sidebar__tab");
    const tabContents = document.querySelectorAll(".sidebar__tab-content");

    tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Убираем активный класс у всех вкладок и контента
        tabButtons.forEach((btn) => btn.classList.remove("sidebar__tab--active"));
        tabContents.forEach((content) => content.classList.remove("sidebar__tab-content--active"));

        // Добавляем активный класс к выбранной вкладке и соответствующему контенту
        const tabId = button.getAttribute("data-tab");
        const tabContent = document.getElementById(tabId);

        button.classList.add("sidebar__tab--active");
        tabContent.classList.add("sidebar__tab-content--active");
    });
    });


    function toggleSidebar() {
        const fbrsidebarToggleBtn = document.getElementById("fbrsidebarToggleBtn");
        const sidebar = document.getElementById("sidebar");

        fbrsidebarToggleBtn.addEventListener("click", function () {
            sidebar.classList.toggle('sidebar--active');
        });
    }
    toggleSidebar();



    // Получаем ссылки на основной сайдбар и сайдбар бага
    const bugSidebar = document.getElementById('bug-sidebar');

    // Получаем ссылки на все карточки багов
    const bugCards = document.querySelectorAll('.bug-card');

    // Обработчик клика для каждой карточки бага
    bugCards.forEach((bugCard, index) => {
        bugCard.addEventListener('click', () => {
            // Создаем содержимое для окна сайдбара бага на основе данных карточки бага
            const bugTitle = bugCard.querySelector('.bug-card__title').textContent;
            const bugDetails = bugCard.querySelectorAll('p');

            // Генерируем HTML-содержимое для окна сайдбара бага
            let sidebarContent = `
                                <button id="closeBugButton"><img class="bug-sidebar__close-icon" src="img/icons/sidebar-close.png"></button>
                                <h2>${bugTitle}</h2>`;
            bugDetails.forEach((detail) => {
            sidebarContent += `<p>${detail.textContent}</p>`;
            });

            // Устанавливаем содержимое окна сайдбара бага
            bugSidebar.querySelector('.bug-sidebar-content').innerHTML = sidebarContent;

            // Открываем сайдбар бага
            bugSidebar.style.left = '0';
        });
    });

    bugSidebar.addEventListener('click', (event) => {
    // Проверяем, была ли нажата кнопка closeBugButton
    if (event.target.id === 'closeBugButton') {
        // Закрываем сайдбар бага, устанавливая left в '-282px'
        bugSidebar.style.left = '-282px';
    }
    });

}