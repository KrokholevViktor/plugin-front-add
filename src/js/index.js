import { toggleComment } from "./modules/toggleComment";
import { sidebar } from "./modules/sidebar";
import { bugSidebar } from "./modules/bugSidebar";
import { ModalHandler } from './modules/modal';
import { DataCollector } from './modules/dataCollector';
import { BugMarks } from './modules/bugMarks';
import { BugList } from './modules/bugList';

document.addEventListener('DOMContentLoaded', async () => {
    const bugMarks = new BugMarks();
    const bugList = new BugList();
    
    // Дождитесь завершения выполнения асинхронных функций
    await bugMarks.getResponseBugsMarks();
    await bugList.getResponseBugsList();

    // Теперь можно выполнить остальной код, который зависит от результатов асинхронных функций
    toggleComment();
    sidebar();
    bugSidebar();
    const modalHandler = new ModalHandler();
    const dataCollector = new DataCollector();
});
