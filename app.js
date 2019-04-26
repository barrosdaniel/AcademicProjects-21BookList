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

// Delete book from list
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Show alert
UI.prototype.showAlert = function(msg, className) {
  // Construct element
  const alertDiv = document.createElement("div");
  // Add classes
  alertDiv.className = `alert ${className}`;
  // Add text
  alertDiv.textContent = `${msg}`;
  // Insert alert element
  container.insertBefore(alertDiv, form);
  // Hide after 3s
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
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
  bookList = document.getElementById("book-list"),
  container = document.querySelector(".container");

// Event Listeners
form.addEventListener("submit", addBook);
bookList.addEventListener("click", deleteBook);

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

  // Validate input
  if (titleValue === "" || authorValue === "" || isbnValue === "") {
    ui.showAlert("Please fill in all book details.", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show success alert
    ui.showAlert("Book successfully added to the list.", "success");
    // Clear input fields
    ui.clearFields();
  }
}

function deleteBook(e) {
  e.preventDefault();

  // Create UI instance
  const ui = new UI();
  // Run remove method
  ui.deleteBook(e.target);
  // Show alert
  ui.showAlert("Book successfully removed from the list.", "success");
}
