import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BookList extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    }


    // It takes the current Bookshelf and checks a book to see what library it belongs to
    getBookShelfTitle(bookShelf) {

        let bookShelfTitle = 'Read'
        bookShelf.forEach(book => {

            // console.log(book)
            if (book.shelf === "currentlyReading") {
                return bookShelfTitle = "Currently Reading"
            }
            else if (book.shelf === "wantToRead") {
                return bookShelfTitle = "Want to Read"
            }
        })
        return bookShelfTitle
    }



    render() {

        const { books, onBookShelfChange } = this.props;

        // filter all books - SHELF i.e. category -
        let booksCurrentlyReading = books.filter(book => book.shelf === "currentlyReading");
        let booksWantToRead = books.filter(book => book.shelf === "wantToRead");
        let booksRead = books.filter(book => book.shelf === "read");

        // Sort the Books - Title -
        booksCurrentlyReading.sort(sortBy('title'))
        booksWantToRead.sort(sortBy('title'))
        booksRead.sort(sortBy('title'))


        let bookShelves = [booksCurrentlyReading, booksWantToRead, booksRead]


        return (

            <div className="list-books">

                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div>

                        {bookShelves.map((bookObject) => (

                            <div key={bookObject.length + Math.random()} className="bookshelf" >
                                <h2 className="bookshelf-title">{this.getBookShelfTitle(bookObject)}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">

                                        {bookObject.map((book) => (
                                            <li key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">

                                                        <div className="book-cover" style={{
                                                            width: 128, height: 193, backgroundImage: `url(${book.hasOwnProperty('imageLinks') ? book.imageLinks.smallThumbnail : ''})`
                                                        }}></div>

                                                        <div className="book-shelf-changer">
                                                            <select id="custom-select-book" value={book.shelf ? book.shelf : "none"} onChange={(event) => onBookShelfChange(book, event.target.value)}>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading</option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    <div className="book-authors">{book.authors}</div>
                                                </div>
                                            </li>
                                        ))}

                                    </ol>
                                </div>
                            </div>

                        ))
                        }

                    </div>
                </div>


                <div className="open-search">
                    <Link to='/search' className='add-contact'> Add a Book</Link>
                </div>


            </div > // END: of List of Books


        ) // END Return

    } // END Render

} // END Component


export default BookList
