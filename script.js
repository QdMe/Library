// Library array
const myLibrary = [];

// Book class
class Book {
  constructor(author, title, numOfPages, id, read) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.id = id;
    this.read = read;
  }
  addBookToLibrary() {
    myLibrary.push(this);
  }
  getReadStatus() {
    if (this.read == "Not Read") {
      this.read = "Read";
    } else {
      this.read = "Not Read";
    }
    return this.read;
  }
}

// Sample Book objects
const Fitzgerald = new Book(
  "F. Scott Fitzgerald",
  "The Great Gatsby",
  180,
  crypto.randomUUID(),
  "Not Read",
);
Fitzgerald.addBookToLibrary();

const Mockingbird = new Book(
  "Harper Lee",
  "To Kill a Mockingbird",
  324,
  crypto.randomUUID(),
  "Read",
);
Mockingbird.addBookToLibrary();

const Chemistry = new Book(
  "Bonnie Garmus",
  "Lessons in Chemistry",
  400,
  crypto.randomUUID(),
  "Read",
);
Chemistry.addBookToLibrary();

const Peace = new Book(
  "Leo Tolstoy",
  "War and Peace",
  1225,
  crypto.randomUUID(),
  "Not Read",
);
Peace.addBookToLibrary();

// Displaying the books in the library
myLibrary.forEach((book) => {
  displayBook(book);
});

// The display function
function displayBook(bookobj) {
  const container = document.querySelector(".container");

  const bookCard = document.createElement("div");
  bookCard.classList.add("book");
  bookCard.setAttribute("data-book-id", bookobj.id);
  bookCard.innerHTML = `
  <div class="title">${bookobj.title}</div>
  <div class="author">${bookobj.author}</div>
  <div class="numOfPages"><div>${bookobj.numOfPages}</div><div>Pages</div></div>
  <div class="status"><button>${bookobj.read}</button></div>
  <div class="remove"><button>Remove</button></div>
  `;
  container.appendChild(bookCard);

  // Change-read-status button
  const readBtn = bookCard.querySelector(".status button");
  readBtn.dataset.attribute = bookobj.id;
  console.dir(readBtn);
  // Add eventListener
  readBtn.textContent = bookobj.read;
  readBtn.addEventListener("click", () => {
    readBtn.textContent = bookobj.getReadStatus();
  });

  // Remove book button
  const rmvBtn = bookCard.querySelector(".remove button");
  // Add eventListener to the remove button
  rmvBtn.addEventListener("click", function () {
    container.removeChild(bookCard);
    let bookIndex = myLibrary.findIndex((book) => book.id == bookobj.id);
    myLibrary.splice(bookIndex, 1);
  });
}

function setReadStatus() {
  let read;
  if (checkbox.checked) {
    read = "Read";
  } else {
    read = "Not Read";
  }
  return read;
}

// Show dialog for user to fill in the book form
const showForm = document.querySelector("#addBookbtn");
const dialog = document.querySelector("dialog");
const submitForm = document.querySelector("#submit");
const checkbox = document.querySelector("#checkbox");
const form = document.querySelector("form");

// For showing custom error validation
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const booknumOfPages = document.querySelector("#numOfPages");
function checkInputValidity() {
  bookTitle.setCustomValidity("");
  bookAuthor.setCustomValidity("");
  booknumOfPages.setCustomValidity("");
  if (bookTitle.value == "") {
    bookTitle.setCustomValidity("The book's title must be filled!");
  }

  if (bookAuthor.value == "") {
    bookAuthor.setCustomValidity("The author name must be filled!");
  }

  if (booknumOfPages.value < 1) {
    booknumOfPages.setCustomValidity("The number of pages must be at least 1!");
  }
}
// We call the checkInputValidity eveytime the user inputs data
bookTitle.addEventListener("input", checkInputValidity);
bookAuthor.addEventListener("input", checkInputValidity);
booknumOfPages.addEventListener("input", checkInputValidity);

showForm.addEventListener("click", () => {
  dialog.showModal();
});

submitForm.addEventListener("click", () => {
  // As well as when the form submits
  checkInputValidity();
  if (author.value != "" && title.value != "" && numOfPages.value != "") {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numOfPages = document.querySelector("#numOfPages").value;
    let newBook = new Book(
      author,
      title,
      numOfPages,
      crypto.randomUUID(),
      setReadStatus(),
    );
    newBook.addBookToLibrary();
    displayBook(newBook);
    dialog.close();
    form.reset();
  }
});
