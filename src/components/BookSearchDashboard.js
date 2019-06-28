import React, { Component } from 'react'
import BookGrid from './BookGrid'
import NoSearchResults from './NoSearchResults'
import SearchBar from './SearchBar'
import * as BooksAPI from '../BooksAPI'

class BookSearchDashboard extends Component {
    state = {
        books: []
    }

   
    handleSearch = (terms) => {
       
        if (! terms) {
            this.clearBooks()
            return
        }

        BooksAPI.search(terms, 25).then((books) => {
            if (books.error) {
                this.clearBooks()
            } else {
                this.insertBooks(books)
            }
        })
    }

   
    handleShelfSelection = (book, shelf) => {
        BooksAPI.update(book, shelf)
    }

    
    clearBooks() {
        this.insertBooks([])
    }

    /**
     * Inserts a collection of books into the display of books.  Each book entry
     * will show the shelf that it resides on when the options button is pressed.
     *
     * @param {Array} books 
     */
    insertBooks(books) {
        BooksAPI.getAll().then(booksOnShelves => {
           
            const shelfIds = booksOnShelves.map(book => {
                return book.id
            })

            books.forEach(book => {
                const idOfBookOnShelf = shelfIds.indexOf(book.id)
                if (idOfBookOnShelf >= 0) {
                    book.shelf = booksOnShelves[idOfBookOnShelf].shelf
                }
            });
            
            this.setState(prev => ({
                books: books
            }))
        })
    }

    render () {
        const mainContent = this.state.books.length > 0
                ? <BookGrid books={this.state.books} onShelfSelection={this.handleShelfSelection} />
                : <NoSearchResults />

        return (
            <div className="search-dashboard">
                <SearchBar onSearch={this.handleSearch} />
                <div className="search-books-results">
                    {mainContent}
                </div>
            </div>
        )
    }
}

export default BookSearchDashboard
