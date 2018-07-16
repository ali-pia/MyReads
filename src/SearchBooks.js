 import React, {
     Component
 } from 'react';
 import {
     Link
 } from 'react-router-dom'
 import Book from './Book'

 class SearchBooks extends Component {

     state = {
         searching: false,
         message: ''
     }

     componentWillUnmount() {
         this.props.onReset();
     }

     componentDidUpdate(prevProps) {
         if (prevProps.results !== this.props.results) this.setState({
             searching: false,
             message: 'Your search returned no results'
         })
     }

     render() {
         return ( <
             div className = "search-books" >
             <
             div className = "search-books-bar" >
             <
             Link to = "/"
             className = "close-search" >
             Close <
             /Link> <
             div className = "search-books-input-wrapper" > {
                 /*
                                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                You can find these search terms here:
                                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                you don't find a specific author or title. Every search is limited by search terms.
                              */
             }

             <
             input type = "text"
             placeholder = "Search by title or author"
             autoFocus = "true"
             onChange = {
                 (e) => {
                     this.setState({
                         searching: true
                     });
                     this.props.onSearch(e.target.value)
                 }
             }
             /> <
             /div> <
             /div> <
             div className = "search-books-results" >
             <
             ol className = "books-grid" > { /* search in progress show loading spinner */ } {
                 this.state.searching ?
                     <
                     div className = "spinner" >
                     <
                     div className = "bounce1" > < /div> <
                     div className = "bounce2" > < /div> <
                     div className = "bounce3" > < /div> <
                     /div> : null
             }

             { /* search results and no search in progress */ } {

                 !this.state.searching && this.props.results.length === 0 ?
                     <
                     div className = "search-empty" > {
                         this.state.message
                     } <
                     /div> :
                 this.props.results.map(book => ( <
                     li key = {
                         book.id
                     } >
                     <
                     Book book = {
                         book
                     }
                     onUpdate = {
                         this.props.onUpdate
                     }
                     /> <
                     /li>
                 ))
             } <
             /ol> <
             /div> <
             /div>
         )
     }
 }

 export default SearchBooks