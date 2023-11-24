import { DataCollector } from './dataCollector';
import { BugMarks } from './bugMarks';
import { BugData } from './bugData';
import { createPluginBall } from "./createBall";


export class ModalHandler {
    constructor() {
        this.dataCollector = new DataCollector();
        this.formData = new FormData();
        this.bugData = new BugData();
        this.bugMarks = new BugMarks();

        this.modalElement = document.querySelector('.FBRfbr-bug-report');
        this.cancelButton = this.modalElement.querySelector('.FBRfbr-bug-report__cancel-button');
        this.submitButton = this.modalElement.querySelector('.FBRfbr-bug-report__submit-button');
        this.fbrpluginContainer = document.getElementById('fbrpluginContainer');
        this.inputSummary = document.querySelector('#fbr-bug-title');
        this.inputDescription = document.querySelector('#fbr-bug-description');
        this.bugFileInput = document.getElementById('fbr-bug-file');

        // Проверяем существование элемента с классом .FBRfbr-bug-report
        if (!this.modalElement) {
            throw new Error('Элемент с классом .FBRfbr-bug-report не найден на странице.');
        }
        // Вызываем метод openModal при клике на любую точку страницы
        document.addEventListener('click', (event) => {
            // Получаем целевой элемент, на который кликнули
            const targetElement = event.target;
        
            // Получаем контейнер с классом fbr-plugin-container
            const container = document.querySelector('.fbr-plugin-container');
        
            // Проверяем, является ли целевой элемент потомком контейнера с классом fbr-plugin-container
            const isInsideContainer = container.contains(targetElement);
        
            // Если клик был вне контейнера, выполняйте ваш код
            if (!isInsideContainer) {
                this.openModal(event); 
                event.stopPropagation();
            }
        });

        // Находим кнопку с классом FBRfbr-bug-report__cancel-button
        this.cancelButton = this.modalElement.querySelector('.FBRfbr-bug-report__cancel-button');
        if (!this.cancelButton) {
            throw new Error('Кнопка с классом .FBRfbr-bug-report__cancel-button не найдена в модальном окне.');
        }

        // Добавляем обработчик клика на кнопку
        this.cancelButton.addEventListener('click', (event) => {
            this.closeModal(); // Вызываем метод closeModal при клике
            event.stopPropagation();
        });

        this.submitButton = this.modalElement.querySelector('.FBRfbr-bug-report__submit-button');

        this.submitButton.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.sendBugReport(this.formData); // Вызываем метод closeModal при клике
            event.stopPropagation();
        });

        this.bugFileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            this.addToFormData("expectedScreenshot", file);
        });
        
    }

    async openModal(event) {
        // Проверяем, что модальное окно закрыто
        if (this.modalElement.style.display === 'none' || this.modalElement.style.display === '') {
            try {  
                // Остальной код
                const { xClick, yClick, xRelatively, yRelatively, heightRatio, widthRatio } =  this.dataCollector.getClickCoordinates(event);

                const xpath = this.dataCollector.getXPath(event.target);
                this.addToFormData("xpath", xpath)
                this.addToFormData("heightRatio", heightRatio)
                this.addToFormData("widthRatio", widthRatio)

                createPluginBall(xRelatively, yRelatively, xpath, document.querySelector('.FBRfbr-plugin-balls'));
                const dataUrl = await this.dataCollector.makeScreenshot();
                const dataBlob = this.dataURLToBlob(dataUrl)
        
                this.addToFormData("actualScreenshot", dataBlob)
    
                this.modalElement.style.display = 'block';
                this.modalElement.style.setProperty('display', 'block', 'important');
                this.modalElement.style.left = xClick - 19 + 'px';
                this.modalElement.style.top = yClick + 24 + 'px';
                // const modalOpenedEvent = new Event('modalOpened');
            } catch (error) {
                console.error(error);
            }
        }
    } 

    closeModal() {
        // Закрываем модальное окно
        this.fbrpluginContainer.style.display = 'block'
        this.fbrpluginContainer.style.setProperty('display', 'block', 'important');
        this.modalElement.style.display = 'none';
        this.modalElement.style.setProperty('display', 'none', 'important');
    }
    
    addToFormData(name, value) {  
        this.formData.append(name, value);
        return this.formData
    }

    dataURLToBlob(dataURL) {

        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const byteCharacters = atob(parts[1]);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
 
        return new Blob(byteArrays, { type: contentType });
    }


    async sendBugReport() {

        this.addToFormData("url", this.dataCollector.getCurrentURL())
        this.addToFormData("OSVersion", this.dataCollector.getOSVersion())
        this.addToFormData("browser", this.dataCollector.getBrowserInfo())
        this.addToFormData("pageResolution", this.dataCollector.getPageResolution())

        this.addToFormData("summary", this.inputSummary.value)
        this.addToFormData("description", this.inputDescription.value)

        // for (const pair of this.formData.entries()) {
        //     console.log(`1Ключ: ${pair[0]}, Значение: ${pair[1]}`);
        // }
        try {
            const apiUrl = 'http://localhost:3000/api/bug';

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: this.formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Ответ от сервера:', data);

            this.bugData.setBugs(data)

            this.formData = new FormData();
            this.modalElement.style.display = 'none';
            this.modalElement.style.setProperty('display', 'none', 'important');
            this.fbrpluginContainer.style.display = 'block';
            this.fbrpluginContainer.style.setProperty('display', 'block', 'important');
            this.bugMarks.renderBugMark()
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }
    
}

