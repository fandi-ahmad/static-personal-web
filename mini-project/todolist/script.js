let todos = {}
const STORAGE_TODO = "STORAGE_TODO"
const todoBox = document.getElementById('todo')

// ===========================================
// ========= LOCAL STORAGE ===================
// ===========================================

// == check if localStorage API is avaiable ==
if (typeof(Storage) !== "undefined")
    console.log("local host avaiable");
else
    console.log("opps");

// == read localstorage on first load =======
if(todoFromLocal = localStorage.getItem(STORAGE_TODO)){
    todos = JSON.parse(todoFromLocal)
    
    for(let key in todos)
        createList(key, todos[key])
}


function syncLocalStorage(activity, item, status = false) {
    switch(activity) {
        case 'ADD':
        case 'UPDATE':
        todos[item] = status
            break;
        case 'DELETE':
            delete todos[item]
            break;
        default:
            break;
    }

    localStorage.setItem(STORAGE_TODO, JSON.stringify(todos))
    return
}

// == read the dark mode theme after reload ======
localStorage.getItem('theme') === 'dark' ? setDarkMode(true) : null


// ==============================================
// ======== TODO FUNCTION =======================
// ==============================================


// == fungsi tombol add(tambah)==================
function add(){
    // == ambil input text dari id
    let newText = document.getElementById('new_text');

    // == tambahkan text ke dalam ul
    createList(newText.value);

    // == simpan ke local storage
    syncLocalStorage('ADD', newText.value);

    // == kosongkan filed
    newText.value = "";
}

const testing = () => {
    console.log('cek')
}

// li yang ditambah dari input text
function createList(text, status = false){
    let isDone = (status) ? 'done' : ''
 

    let newTodo =   /*html*/`<div >
                                <li >
                                    <span id='coret' class='list ${isDone}' onclick='toggle(this)'>
                                        ${text}
                                    </span>
                                    <span onclick='removeItem(this)' class='delete'>
                                        <i class='fas fa-trash'></i> 
                                    </span>
                                </li>
                            </div>`
                    
    todoBox.insertAdjacentHTML('afterbegin', newTodo)
}

// === tombol untuk check di bagian text =========
function toggle(el){
    // el.classList.toggle('done')
    let status = el.classList.toggle('done')

    // == simpan ke local storage
    syncLocalStorage('UPDATE', el.innerText, status)
}

// === tombol remove =============================
function removeItem(el){
    el.parentElement.remove()
    
    // == save to local storage
    syncLocalStorage('DELETE', el.previousElementSibling.innerText.trim())
}

// ======== DARK MODE ==============
function setDarkMode(isDark){
    if(isDark){
        document.body.setAttribute('id', 'darkmode')
        localStorage.setItem('theme', 'dark')
    }else{
        document.body.setAttribute('id', '')
        localStorage.removeItem('theme', '')
    }
}
