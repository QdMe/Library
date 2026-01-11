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
  } else {
    book.read = "Not Read";
  }
  return book.read;
};
// Create new book function
function createBook(author, title, numOfPages, id, read) {
  let newBook = new Book(author, title, numOfPages, id, read);
  return newBook;
}
// Create Sample Books
addBookToLibrary(
  createBook(
    "F. Scott Fitzgerald",
    "The Great Gatsby",
    180,
    crypto.randomUUID(),
    "Not Read"
  )
);
addBookToLibrary(
  createBook(
    "Harper Lee",
    "To Kill a Mockingbird",
    324,
    crypto.randomUUID(),
    "Read"
  )
);
addBookToLibrary(
  createBook(
    "Bonnie Garmus",
    "Lessons in Chemistry",
    400,
    crypto.randomUUID(),
    "Read"
  )
);
addBookToLibrary(
  createBook("Donna Tartt", "The Goldfinch", 771, crypto.randomUUID(), "Read")
);
addBookToLibrary(
  createBook(
    "Leo Tolstoy",
    "War and Peace",
    1225,
    crypto.randomUUID(),
    "Not Read"
  )
);

// Adding the book to the library
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

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
    readBtn.textContent = bookobj.getReadStatus(bookobj);
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

function getReadStatus() {
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
showForm.addEventListener("click", () => {
  dialog.showModal();
});

submitForm.addEventListener("click", () => {
  if (author.value != "" && title.value != "" && numOfPages.value != "") {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const numOfPages = document.querySelector("#numOfPages").value;
    let newBook = createBook(
      author,
      title,
      numOfPages,
      crypto.randomUUID(),
      getReadStatus()
    );
    addBookToLibrary(newBook);
    displayBook(newBook);
    dialog.close();
    // checkbox.checked = false;
    form.reset();
  }
});
