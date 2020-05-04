let myLibrary = [];
const SELECTORS = {
    books: document.querySelector(".books"),
    inputTitle: document.querySelector(".input-title"),
    inputAuthor: document.querySelector(".input-author"),
    inputPages: document.querySelector(".input-pages"),
    inputRead: document.querySelector(".input-read"),
    btnAdd: document.querySelector(".btn-add")
}
if(localStorage.getItem('library') != null){
    myLibrary = JSON.parse(localStorage.getItem('library'));
}
render();
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function addBookToLibrary(book) {
    myLibrary.push(book);
    return myLibrary;
}
function render() {
    const myNode = document.querySelector(".books");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    let values;
    for(let i = 0; i < myLibrary.length; i++) {
        values = Object.values(myLibrary[i]);
        for(let j = 0; j < values.length; j++) {
            let node = document.createElement("DIV");
            node.className = "book-" + i;
            node.innerText = values[j];
            SELECTORS.books.appendChild(node);
        }
        let fifthNode = document.createElement("BUTTON");
        fifthNode.className = "remove-button-" + i;
        fifthNode.innerHTML = "<b>Remove</b>"
        fifthNode.addEventListener('click', removeBook)
        SELECTORS.books.appendChild(fifthNode);
    }
}
function removeBook() {
    let clicked;
    if(event.target.className.includes("remove-button")) {
        clicked = event.target;
    } else {
        clicked = event.target.parentElement;
    }
    let id = clicked.className.split("-")[2]; //könyv ID-ja
    myLibrary.splice(id, 1)
    render();
    localStorage.setItem("library", JSON.stringify(myLibrary));
}
function clearInputFields() {
    SELECTORS.inputTitle.value = "";
    SELECTORS.inputAuthor.value = "";
    SELECTORS.inputPages.value = "";
    SELECTORS.inputRead.checked = false;

}
SELECTORS.btnAdd.addEventListener('click', function() {
    let newBook = new Book();
    newBook.title = SELECTORS.inputTitle.value;
    newBook.author = SELECTORS.inputAuthor.value;
    newBook.pages = SELECTORS.inputPages.value;
    if(newBook.title != "" && newBook.author != "" && newBook.pages != "")  {
        if(SELECTORS.inputRead.checked) {
            newBook.read = "Read";
        } else {
            newBook.read = "Not read yet";
        }
        clearInputFields();
        addBookToLibrary(newBook)
        render();
        localStorage.setItem("library", JSON.stringify(myLibrary));
    }
});