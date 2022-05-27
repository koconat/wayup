const tabs = document.getElementById('tabs');
const content = document.querySelectorAll('.content');

const changeClass = el => {
    for (let i = 0; i < tabs.children.length; i++){
        tabs.children[i].classList.remove('active');
    }
    el.classList.add('active');        
}

tabs.addEventListener('click', e => {
    const currTab = e.target.dataset.btn;
    changeClass(e.target);
    for (let i = 0; i < content.length; i++){
        content[i].classList.remove('active');
        if (content[i].dataset.content === currTab) {
            content[i].classList.add('active');
        }
    }

    //Білий фон, якщо вибрана вкладка 1 або 2
    if (currTab != 3) {
        document.body.style.backgroundColor = 'white';
    }
})

//Nested tabs 3
const nestedTabs = document.getElementById('nested-tabs');
const nestedContent = document.querySelectorAll('.nested-content');

//Змінюємо вкладку третього блоку
const changeNestedClass = el => {
    for (let i = 0; i < nestedTabs.children.length; i++){
        nestedTabs.children[i].classList.remove('active');
    }
    el.classList.add('active');        
}

nestedTabs.addEventListener('click', e => {
    const currNtab = e.target.dataset.ns_btn; //поточна вкладена кнопка
    changeNestedClass(e.target);
    for (let i = 0; i < nestedContent.length; i++){
        nestedContent[i].classList.remove('active');
        if (nestedContent[i].dataset.ns_content === currNtab) {
            nestedContent[i].classList.add('active');
        }
        //Встановлюємо колір фону відповідно обранаої кнопки
        if (currNtab == 31) {
            document.body.style.backgroundColor = 'red';
        }
        else if (currNtab == 32) {
            document.body.style.backgroundColor = 'green';
        }
    }
})