import React from 'react';
import {
    Link
} from 'react-router-dom'

function Book(props) {
    return ( <
            div className = "book" >
            <
            div className = "book-top" >
            <
            Link key = {
                props.book.id
            }
            to = {
                '/book/' + props.book.id
            } >
            <
            div className = "book-cover"
            style = {
                {
                    width: 128,
                    height: 193,
                    backgroundImage: 'url(' + ((props.book.imageLinks && props.book.imageLinks.thumbnail) || '') + ')'
                }
            } > < /div> <
            /Link> <
            div className = "book-shelf-changer" >
            <
            select defaultValue = {
                props.book.shelf || 'none'
            }
            onChange = {
                (e) => props.onUpdate(props.book, e.target.value)
            } >
            <
            option value = "move"
            disabled > Move to... < /option> <
            option value = "currentlyReading" > Currently Reading < /option> <
            option value = "wantToRead" > Want to Read < /option> <
            option value = "read" > Read < /option> <
            option value = "none" > None < /option> <
            /select> <
            /div> <
            /div> <
            div className = "book-title" > {
                props.book.title
            } < /div> <
            div className = "book-authors" > {
                props.book.authors ? props.book.authors.map((author, index) => ( < span key = {
                            index
                        } > {
                            author
                        } < br / > < /span>) ) : null }</div >
                        <
                        /div>
                    )
                }

                export default Book