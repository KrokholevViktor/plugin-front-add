export function bugSidebar() {

    // Получаем сайдбар бага
    const bugSidebar = document.getElementById('bug-sidebar');

    // Получаем ссылки на все карточки багов
    const bugCards = document.querySelectorAll('.fbr-bug-card');

    // Обработчик клика для каждой карточки бага
    bugCards.forEach((bugCard, index) => {
        bugCard.addEventListener('click', () => {
            console.log("ТЫК2 ТЫКУ2 ТЫУ2");
            // Создаем содержимое для окна сайдбара бага на основе данных карточки бага
            const bugTitle = bugCard.querySelector('.fbr-bug-card__title').textContent;
            const bugDetails = bugCard.querySelectorAll('p');

            // Генерируем HTML-содержимое для окна сайдбара бага
            let sidebarContent = `
                                <button id="closeBugButton"><img class="fbr-bug-sidebar__close-icon" src="img/icons/sidebar-close.png"></button>
                                <h2>${bugTitle}</h2>`;
            bugDetails.forEach((detail) => {
            sidebarContent += `<p>${detail.textContent}</p>`;
            });

            // Устанавливаем содержимое окна сайдбара бага
            bugSidebar.querySelector('.fbr-bug-sidebar-content').innerHTML = sidebarContent;

            // Открываем сайдбар бага
            bugSidebar.classList.add('bug-sidebar-open');
            bugSidebar.classList.add('fbr-sidebar--active');
        });
    });

    bugSidebar.addEventListener('click', (event) => {
    // Проверяем, была ли нажата кнопка closeBugButton
    if (event.target.id === 'closeBugButton') {
        // Закрываем сайдбар бага, устанавливая left в '-282px'
        bugSidebar.classList.remove('fbr-sidebar--active');
    }
    });

}