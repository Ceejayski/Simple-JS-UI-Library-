const library = [];
class Book {
    constructor(title, author, genre, page, read) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.read = read;
        this.page = page;
    }
}

class UI {
    addBookToList(books) {
        books.forEach((book, index) => {
            const list = document.querySelector('#books-list'),
                card = document.createElement('div');

            card.className = 'card column is-4';
            card.innerHTML = `<header class="card-header">
                                <p class="card-header-title">
                                    ${book.title}
                                </p>
    
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <p>Author: <span>${book.author}</span></p>
                                        <p>Genre: <span>${book.genre}</span></p>
                                        <p>pages: <span>${book.page}</span></p>
                                    </div>
                                </div>
                                <footer class="card-footer" id="${index}">
                                    <a href="#" class="card-footer-item" id="read-link">${this.readBtn(book)}</a>
                                    <a href="#" class="card-footer-item remove">Delete</a>
                                </footer>
                            `;
            list.appendChild(card);
            console.log(book)
        });

    }

    readBtn(book) {
        const read = book.read;
        let text;
        if (read === true) {
            text = 'Already Read this book'
        }
        else {
            text = 'Book not yet Read'
        }
        return text
    }

    showAlert(className, message) {
        const form = document.querySelector('.container');
        const div = document.createElement('div');
        // Add classes
        div.className = `notification ${className}`;
        div.innerHTML = `<button class="delete"></button>`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.form-container');

        form.insertBefore(div, container);

    }

    deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.remove();
        }
        else if (target.classList.contains('remove')) {
            if (confirm('Are You Sure')) {
                target.parentElement.parentElement.remove();
                this.showAlert('is-danger', 'Book Removed')
            }
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('genre').value = '';
        document.getElementById('pages').value = '';
    }

    readBook(target) {
        const bid = target.parentElement.id,
            book = library[bid];
        if (target.id === "read-link") {
            if (book.read === true) {
                book.read = false
                target.innerText = `${this.readBtn(book)}`
                this.showAlert('is-success', 'Book Read')
            }
            else {
                book.read = true
                target.innerText = `${this.readBtn(book)}`
                this.showAlert('is-danger', 'Book not yet Read')
            }
        }



    }
}

document.getElementById('book-form').addEventListener('submit', (e) => {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        genre = document.getElementById('genre').value,
        page = document.getElementById('pages').value,
        read = document.getElementById('read').checked;


    const book = new Book(title, author, genre, page, read);
    library.push(book);
    console.log(library.length);
    const ui = new UI();
    if (title === '' || author === '' || genre === '' || page === '') {
        ui.showAlert('is-danger', 'Please fill in all fields');
    }
    else {
        // Add book to list
        ui.addBookToList(library);

        // Show success
        ui.showAlert('is-success', 'Book added');
        // Clear fields
        ui.clearFields();

    }
    e.preventDefault();
});

document.querySelector('.container').addEventListener('click', function (e) {
    const ui = new UI();
    console.log(e)
    ui.deleteBook(e.target);
    ui.readBook(e.target);
    console.log(e.target)
});
