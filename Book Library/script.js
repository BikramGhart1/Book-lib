// localStorage.clear();

let myLibrary = loadBooksFromLocalStorage();

function loadBooksFromLocalStorage() {

    //book array

    let loadedBooks = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        try {
            let bookObject = JSON.parse(localStorage.getItem(key));
            loadedBooks.push(bookObject);
        }
        catch (error) {
            console.error(`Error parsing JSON for key ${key}: ${error.message}`);
        }

    }
    return loadedBooks;
}

function saveBooksToStorage(booksArray) {
    localStorage.clear();
    booksArray.forEach((element, index) => {
        let stringElement = JSON.stringify(element);
        localStorage.setItem(index.toString(), stringElement);
    })
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    saveBooksToStorage(myLibrary);
    displayBooks(myLibrary);
}

displayBooks(myLibrary);
//function Object creater
//factory function ig
function book(title, author, pages, hasRead) {
    // this.title = title;
    // this.author = author;
    // this.pages = pages;
    // this.hasRead = hasRead;
    this.info = () => {
        return `${title} by ${author}, ${pages} page, ${hasReadhasRead ? "Has read" : "not read yet"}`;
    }
    return { title, author, pages, hasRead };
}
document.getElementById('myForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let titleName = document.getElementById('title-name').value;
    let authorName = document.getElementById('author-name').value;
    let numPage = document.getElementById('page-number').value;
    let hasRead1 = document.getElementById('status-read').checked;

    //check if no of pages is valid
    if (isNaN(numPage)) {
        alert("Please enter a valid number for the page count");
    }
    //factory function in  use to create new object
    let tempBook = book(titleName, authorName, numPage, hasRead1);
    addBookToLibrary(tempBook);
    document.getElementById('myForm').reset();
})

//display book info in pagge
function displayBooks(bookss) {
    let container = document.getElementById('bookContainer');
    container.innerHTML = " ";
    bookss.forEach((bookss, index) => {
        let bookElement = document.createElement("div");

        //saving the book array
        bookElement.classList.add('book-container');

        //rendering contents book elements
        bookElement.innerHTML = `
        <p>Title: ${bookss.title}</p>
        
        <p>Author: ${bookss.author}</P>
        
        <p>Page: ${bookss.pages}</P>

        <p id="status-id">Status: ${bookss.hasRead ? "Has read" : "not read yet"}</P> 
        <button id="remove-button" onclick="removeButton(${index})" style="
            background-color:black;
            color:white;
            border:none;
            padding:4%;
            border-radius:8px;
            margin:4%;
            width:60%;
            cursor: pointer;
        ">Remove</button>
       
        <button id="toggle-status" onclick="toggleStatus(${index})" style="
        background-color:black;
        width:60%;
        color:white;
        border:none;
        padding:5%;
        border-radius:8px;
        margin:4%;
        cursor: pointer;
    ">${bookss.hasRead ? "Has read" : "not read yet"}</button>
        `;
        //render another book at last
        container.appendChild(bookElement);
    })
}
function toggleStatus(index, status) {
    // console.log("toggle clicked");

    myLibrary[index].hasRead = !myLibrary[index].hasRead;
    displayBooks(myLibrary);
}
function removeButton(index) {
    // console.log("clicked");
    myLibrary.splice(index, 1);
    saveBooksToStorage(myLibrary);
    displayBooks(myLibrary);
}


//render form 
document.getElementById('showFromBtn').addEventListener('click', () => {
    const showForm = document.getElementById('myForm');
    showForm.style.display = 'flex';
    showForm.style.flexDirection = 'column';
    showForm.style.justifyContent = 'space-between';
    showForm.style.alignItems = 'center';
    console.log('clicked new book');
    //hide new book button
    const btnElement = document.getElementById('showFromBtn');

    btnElement.style.display = 'none';

});

//close the form 
document.getElementById('close-form').addEventListener('click', () => {
    const showForm = document.getElementById('myForm');
    showForm.style.display = 'none';

    const btnElement = document.getElementById('showFromBtn');

    btnElement.style.display = 'block';

})

