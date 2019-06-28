import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBar extends Component {
    static propTypes() {
        return {
            onSearch: PropTypes.func.isRequired
        }
    }

    state = {
        searchTerms: ''
    }

    
    handleTyping = (event) => {
        event.preventDefault()

       
        const terms = event.target.value.replace(/^\s+/g, '')
        this.setState(prev => ({
            searchTerms: terms
        }))

       
        this.props.onSearch(terms)
    }

    render() {
        return (
            <form className="search-books" action="#" method="get">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={this.handleTyping} value={this.state.searchTerms} />
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchBar
