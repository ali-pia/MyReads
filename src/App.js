import React from 'react'
import {
  Route
} from 'react-router-dom'

// APIs
import * as BooksAPI from './BooksAPI'

// Styling
import './App.css'

// UI
import BookList from './BookList'
import BookSearch from './BookSearch'


class BooksApp extends React.Component {

  state = {
    books: [],
    booksSearchResults: []
  }

  // Get books from API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }


  // Search API 
  // Each book returned needs to get the book shelf value
  // For each book shelf value add the object  to the searchQuery
  getSearchResults = (searchQuery) => {

    //When the search is cleared update the state of the searchResults
    if (searchQuery === '') {

      this.setState(() => {
        return {
          booksSearchResults: []
        }
      })

    }

    // Search not Empty
    else {

      // Search the API
      BooksAPI.search(searchQuery)

        // Books search results
        .then(booksSearchResults => {
          return booksSearchResults
        })

        // Process the Search Results
        .then(booksSearchResults => {

          let responsePositive = true

          // Check if the response is not empty
          let resultsExist = booksSearchResults != null ? true : false
          if (!resultsExist) {
            responsePositive = false
            console.log("Results were undefined")
          }

          // If response was not empty check if response is VALID
          if (responsePositive) {
            let isValid = Object.entries(booksSearchResults)[0][0] === 'error' ? false : true
            if (!isValid) {
              responsePositive = false
              console.log("Invalid Search Paramters")
            }
          }

          // If response was not undefined or invalid  the process can  continue 
          // Each book elaborated in the parameters        
          if (responsePositive) {

            // In Result SetGet Book IDs for each book 
            let resultSet = booksSearchResults.map(b => b.id)
            let bookRequests = []

            // Fetch each book as per the ID and then add to new BookRequests Object
            resultSet.forEach(function (b) {
              bookRequests.push(BooksAPI.get(b))
            })




            return Promise.all(bookRequests)
              .then(newResultSet => {
                ///Return the new ResultSet Object
                return newResultSet
              })
          }

          // console.log('books results empty')
          else {

            return booksSearchResults = []
          }

        })

        // Once completed we then set the state to update the UI
        .then(booksSearchResults => {

          this.setState(state => ({
            booksSearchResults
          }))
        })
    }

  } // End getSearchResults



  // Update a Book and Change its shelf (DB and UI)
  onBookShelfChange = (bookChanged, newShelf) => {

    // Update the Database via the API
    // Update the Books [] by fetching it again i.e. updates the state    
    BooksAPI.update(bookChanged, newShelf)

      .then(() => {
        BooksAPI.getAll().then((books) => {
          this.setState({
            books
          })
        })
      }) // End .then Arrow Function
  }



  render() {

    return (

      <div>

        <Route exact path='/' render={() => (
          <BookList books={this.state.books}
            onBookShelfChange={this.onBookShelfChange}
          />
        )
        }
        />

        <Route path='/search' render={(history) => (<
          BookSearch booksSearchResults={this.state.booksSearchResults}
          onBookShelfChange={this.onBookShelfChange}
          getSearchResults={this.getSearchResults}
        />)
        } />

      </div>
    )
  }
}


export default BooksApp