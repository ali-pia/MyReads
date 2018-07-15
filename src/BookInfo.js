import React, {
    Component
} from 'react';
import Book from './Book'
import gBooksLogo from './icons/gbs_preview_button1.png'

class BookInfo extends Component {

    componentDidMount() {
        this.props.onLoad(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.onReset();
    }

    render() {
        //  loading spinner
        if (!this.props.book.id) return ( <
            div className = "spinner" >
            <
            div className = "bounce1" > < /div> <
            div className = "bounce2" > < /div> <
            div className = "bounce3" > < /div> <
            /div>
        );

        let book = this.props.book;
        return ( <
            div >
            <
            div className = "book-container" >
            <
            h2 > {
                book.title
            } < /h2> <
            p > {
                book.subtitle
            } < /p> <
            Book key = {
                book.id
            }
            book = {
                book
            }
            onUpdate = {
                this.props.onUpdate
            }
            /> <
            /div> <
            div className = "book-content" >
            <
            p > Pages: {
                book.pageCount
            } < /p> <
            p > {
                book.description
            } < /p> <
            p > < a href = {
                book.previewLink
            }
            target = "_blank" > < img src = {
                gBooksLogo
            }
            alt = "Google Books Preview" / > < /a></p >
            <
            /div> <
            /div>
        )
    }
}

export default BookInfo