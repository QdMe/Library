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

// Add isRead() to Book's prototype

Book.prototype.readStatus = function (book) {
  if (book.read == "Not Read") {
    book.read = "Read";
  } else if (book.read == "Read") {
    book.read = "Not Read";
  } else {
    book.read = "Not Read";
  }
  return book.read;
};

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

showForm.addEventListener("click", () => {
  dialog.showModal();
});

submitForm.addEventListener("click", () => {
  if (author.value != "" && title.value != "" && numOfPages.value != "") {
    const book = new Book(
      author.value,
      title.value,
      numOfPages.value,
      crypto.randomUUID()
    );
    addBookToLibrary(book);
    displayBook(book);
    dialog.close();
    author.value = "";
    title.value = "";
    numOfPages.value = "";
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
  readBtn.textContent = bookobj.readStatus(bookobj);
  readBtn.addEventListener("click", () => {
    readBtn.textContent = bookobj.readStatus(bookobj);
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
