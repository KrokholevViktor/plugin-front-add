export function toggleComment () {
    const commentTogle = document.querySelector('#plugin-comment-togle');
    const commentSwitch = document.querySelector('.fbr-comment__switch');
    const commentSwitchToggle = document.querySelector('.fbr-comment__switch-togle');
    
    commentTogle.addEventListener('click', () => {
        // Получите текущее значение атрибута data-active
        const currentDataActive = commentTogle.getAttribute('data-active');

        // Проверьте текущее значение и измените его
        if (currentDataActive === 'false') {
            commentTogle.setAttribute('data-active', 'true');
        } else {
            commentTogle.setAttribute('data-active', 'false');
        }
        
        //Тоглится класс активности на свитче для css анимации
        commentSwitch.classList.toggle('fbr-comment__switch--active')

        //Тоглится класс активности на кнопке для css анимации
        commentSwitchToggle.classList.toggle('fbr-comment__switch-togle--active')
    });
}