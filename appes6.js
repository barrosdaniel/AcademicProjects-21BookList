// Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
class UI {
  // Add book to list
  addBookToList(book) {
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
  }

  // Delete book from list
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  showAlert(msg, className) {
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
  }

  clearFields() {
    // Clear form fields
    titleField.value = "";
    authorField.value = "";
    isbnField.value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

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
// DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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
    // Add book to local storage
    Store.addBook(book);
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
  // Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show alert
  ui.showAlert("Book successfully removed from the list.", "success");
}
