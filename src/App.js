import React from 'react'
import {
    Route,
    Link
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks'
import BookInfo from './BookInfo'
import debounce from 'lodash.debounce'

class BooksApp extends React.Component {

    state = {
        books: [], // library

        results: [], // search results
        book: {}
    }

    componentDidMount() {
        // get all the books in the library 
        BooksAPI.getAll().then(books => {
            this.setState({
                books
            });
        })
    }

    updateBook = (book, shelf) => {
        // Check if the book  is already in my library
        let found = this.state.books.find(el => el.id === book.id);

        // if it isn't add it to the library and update the shelf 
        if (!found) {
            this.setState((prevState) => {
                book.shelf = shelf;
                return {
                    books: prevState.books.concat(book)
                }
            })
        } else {
            // change his shelf if it's alredy in the library  
            this.setState((state) => ({
                books: state.books.map((b) => {
                    if (b.id === book.id) b.shelf = shelf;
                    return b;
                })
            }))
        }

        // Update the book shelf 
        BooksAPI.update(book, shelf);
    }

    // debounce the search function to avoid fetch requests on every keystroke
    handleSearch = debounce(query => this.searchBooks(query), 500);

    searchBooks = (query) => {
        query = query.trim();

        // clear the results and return if query is empty 
        if (query === '') {
            this.resetResults();
            return;
        }

        // search
        BooksAPI.search(query)
            .then(results => {
                let searchResults;
                if (!results.error) {
                    // compare the search results and update the shelves 
                    searchResults = results.map((b) => {
                        let found = this.state.books.find(el => el.id === b.id);
                        if (found) b.shelf = found.shelf;
                        return b;
                    })
                }

                results.error ? this.resetResults() : this.setState({
                    results: searchResults
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    resetResults = () => {

        this.setState({
            book: {},
            results: []
        });
    }

    getBook = (id) => {
        BooksAPI.get(id).then(book => this.setState({
            book
        }))
    }

    render() {
        return ( <
            div className = "app" >
            <
            Route exact path = '/search'
            render = {
                () => ( <
                    SearchBooks onSearch = {
                        this.handleSearch
                    }
                    onUpdate = {
                        this.updateBook
                    }
                    onReset = {
                        this.resetResults
                    }
                    results = {
                        this.state.results
                    }
                    />
                )
            }
            />

            <
            Route exact path = '/'
            render = {
                () => (

                    <
                    Header >
                    <
                    div className = "list-books-content" >
                    <
                    div >
                    <
                    BookShelf books = {
                        this.state.books
                    }
                    title = "Currently Reading"
                    shelf = "currentlyReading"
                    onUpdate = {
                        this.updateBook
                    }
                    /> <
                    BookShelf books = {
                        this.state.books
                    }
                    title = "Want to Read"
                    shelf = "wantToRead"
                    onUpdate = {
                        this.updateBook
                    }
                    /> <
                    BookShelf books = {
                        this.state.books
                    }
                    title = "Read"
                    shelf = "read"
                    onUpdate = {
                        this.updateBook
                    }
                    /> < /
                    div > <
                    /div> <
                    div className = "open-search" >
                    <
                    Link to = "/search" >
                    Add a book <
                    /Link> < /
                    div >

                    <
                    /Header>
                )
            }
            />

            <
            Route path = '/book/:id'
            render = {
                (props) => ( <
                    Header back = "true" >
                    <
                    BookInfo { ...props
                    }
                    onLoad = {
                        this.getBook
                    }
                    book = {
                        this.state.book
                    }
                    onUpdate = {
                        this.updateBook
                    }
                    onReset = {
                        this.resetResults
                    }
                    /> < /
                    Header >
                )
            }
            /> < /
            div >
        )
    }
}

function Header(props) {
    return ( <
            div className = "list-books" >
            <
            div className = "list-books-title" >
            <
            h1 > MyReads < /h1> {
            props.back ?
            <
            Link to = "/"
            className = "close-book" >
            Close <
            /Link>: null
        } <
        /div> {
    props.children
} <
/div>
)
}

export default BooksApp