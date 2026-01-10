// Library array
const myLibrary = [];

// Book constructor
function Book(author, title, numOfPages, id, read) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.id = id;
  this.read = read;
}
// Add getReadStatus() to Book's prototype
Book.prototype.getReadStatus = function (book) {
  if (book.read == "Not Read") {
    book.read = "Read";
  } else if (book.read == "Read") {
    book.read = "Not Read";
  } else {
    book.read = "Not Read";
  }
  return book.read;
};
const great = new Book(
  "F. Scott Fitzgerald",
  "The Great Gatsby",
  180,
  "e97f43dd-8f5a-4b78-a5db-5f90342f5d96",
  "Not Read"
);
addBookToLibrary(great);
const Mockingbird = new Book(
  "Harper Lee",
  "To Kill a Mockingbird",
  324,
  "cc95c92f-255d-4e4f-8eea-661ebe1db043",
  "Read"
);
addBookToLibrary(Mockingbird);
const Chemistry = new Book(
  "Bonnie Garmus",
  "Lessons in Chemistry",
  400,
  "8ed43dcd-e568-4e9f-8e97-f68a2ba3e710",
  "Read"
);
addBookToLibrary(Chemistry);
const Goldfinch = new Book(
  "Donna Tartt",
  "The Goldfinch",
  771,
  "51115831-dce3-486f-9776-53cc0c05b822",
  "Read"
);
addBookToLibrary(Goldfinch);
const War = new Book(
  "Leo Tolstoy",
  "War and Peace",
  1225,
  "a15e8755-abd1-41f3-8399-05c574939e4e",
  "Not Read"
);
addBookToLibrary(War);

myLibrary.forEach((item) => {
  displayBook(item);
});

// Adding the book obj to the array library
function addBookToLibrary(book) {
  myLibrary.push(book);
}
// Form logic
const showForm = document.querySelector("#addBookbtn");
const dialog = document.querySelector("dialog");
const submitForm = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numOfPages = document.querySelector("#numOfPages");
const checkbox = document.querySelector("#checkbox");
showForm.addEventListener("click", () => {
  dialog.showModal();
});

submitForm.addEventListener("click", () => {
  if (author.value != "" && title.value != "" && numOfPages.value != "") {
    let read;
    if (checkbox.checked) {
      read = "Read";
    } else {
      read = "Not Read";
    }
    const book = new Book(
      author.value,
      title.value,
      numOfPages.value,
      crypto.randomUUID(),
      read
    );

    addBookToLibrary(book);
    displayBook(book);
    dialog.close();
    author.value = "";
    title.value = "";
    numOfPages.value = "";
    checkbox.checked = false;
  }
});

////////////////// Displaying the book ///////////////////

function displayBook(bookobj) {
  // 1- Reference the container
  const container = document.querySelector(".container");

  // 2- Create the book card and it's children
  const book = document.createElement("div");
  book.classList.add("book");
  // Give unique ID to the book
  book.setAttribute("data-attribute", bookobj.id);

  // title
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = bookobj.title;

  // author
  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent = bookobj.author;

  // numOfPages
  const numOfPagesCls = document.createElement("div");
  numOfPagesCls.classList.add("numOfPages");
  const numOfPages = document.createElement("div");
  numOfPages.textContent = bookobj.numOfPages;

  const pages = document.createElement("div");
  pages.textContent = "Pages";

  // status
  const readStatus = document.createElement("div");
  readStatus.classList.add("status");

  // button
  const readBtn = document.createElement("button");
  readBtn.textContent = bookobj.getReadStatus(bookobj);
  readBtn.addEventListener("click", () => {
    readBtn.textContent = bookobj.getReadStatus(bookobj);
  });

  // remove btn
  const remove = document.createElement("div");
  remove.classList.add("remove");

  const rmvBtn = document.createElement("button");
  rmvBtn.textContent = "Remove";
  // Add eventListener
  rmvBtn.addEventListener("click", function () {
    container.removeChild(book);
    let bookIndex = myLibrary.findIndex((book) => book.id == bookobj.id);
    myLibrary.splice(bookIndex, 1);
  });

  // Append c1, radio1, label1 to readStatus
  readStatus.appendChild(readBtn);

  // Append rmvBtn to remove
  remove.appendChild(rmvBtn);

  // Append title to book
  book.appendChild(title);
  // Append author to book
  book.appendChild(author);
  // Append "numOfPages" to numbOfPagesCls
  numOfPagesCls.appendChild(numOfPages);
  // Append "Pages" to numbOfPagesCls
  numOfPagesCls.appendChild(pages);
  // Append numOfPages to book
  book.appendChild(numOfPagesCls);
  // Append readStatus to book
  book.appendChild(readStatus);
  // Append remove to book
  book.appendChild(remove);
  // Append book to .container
  container.appendChild(book);
}
