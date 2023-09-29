import { toggleComment } from "./modules/toggleComment";
import { sidebar } from "./modules/sidebar";
import { bugSidebar } from "./modules/bugSidebar";
import { commentFunc } from "./modules/comment-func";


document.addEventListener('DOMContentLoaded', () => {
    toggleComment();
    sidebar();
    bugSidebar();
    commentFunc();
});