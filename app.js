// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  bookList.appendChild(row);
};

// Clear fields
UI.prototype.clearFields = function() {
  // Clear form fields
  titleField.value = "";
  authorField.value = "";
  isbnField.value = "";
};

// Selectors
const form = document.getElementById("book-form"),
  titleField = document.getElementById("title"),
  authorField = document.getElementById("author"),
  isbnField = document.getElementById("isbn"),
  bookList = document.getElementById("book-list");

// Event Listeners
form.addEventListener("submit", addBook);

// Functionality
function addBook(e) {
  e.preventDefault();

  // Get form values
  const titleValue = titleField.value,
    authorValue = authorField.value,
    isbnValue = isbnField.value;

  // Create book object instance
  const book = new Book(titleValue, authorValue, isbnValue);

  // Create UI instance
  const ui = new UI();

  // Add book to list
  ui.addBookToList(book);
  ui.clearFields();
}
