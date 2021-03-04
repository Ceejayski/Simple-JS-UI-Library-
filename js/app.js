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
        books.forEach(book => {
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
                                <footer class="card-footer">
                                    <a href="#" class="card-footer-item">Read</a>
                                    <a href="#" class="card-footer-item">Delete</a>
                                </footer>
                            `;
            list.appendChild(card);
        });

    }
}

document.getElementById('book-form').addEventListener('submit', (e) => {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        genre = document.getElementById('genre').value,
        page = document.getElementById('pages').value,
        read = document.getElementById('read').value;


    const book = new Book(title, author, genre, page, read);
    library.push(book);
    console.log(library.length);
    const ui = new UI();
    ui.addBookToList(library);
    e.preventDefault();
});



