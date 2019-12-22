import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            book: null,
            printType: 'all',
            bookType: null,
        }
    }

    updateSearch = (event) => {
        event.preventDefault();
        /*console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)*/
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    searchBook = (event) => {
        event.preventDefault()
        const {apiSearch} = this.props;
        const {book, printType, bookType} = this.state;
        //console.log('search button clicked')
        apiSearch(book, printType, bookType)
        
    }


    
    render() {
        const {book, printType, bookType} = this.state
        return(
            <div className='Search'>
                <form>
                    <label htmlFor='searchbox'>Search: </label>
                    <input onChange={this.updateSearch} id='book' name='book' type='text' placeholder='search book' />
                    <button onClick={this.searchBook}className='incrementButton'>
                            Search
                        </button>
                    <label>Print Type: </label>
                    <select onChange={this.updateSearch} name='printType'>
                        <option value='all'>All</option>
                        <option value='books'>Books</option>
                        <option value='magazines'>Magazines</option>
                    </select>
                    <label>Book Type: </label>
                    <select onChange={this.updateSearch} name='bookType'>
                        <option value='none' unselectable='true'>No Filter</option>
                        <option value='partial'>Partial</option>
                        <option value='full'>full</option>
                        <option value='free-ebooks'>Free eBooks</option>
                        <option value='paid-ebooks'>Paid eBooks</option>
                        <option value='ebooks'>eBooks</option>
                    </select>
                </form>
            </div>
        )
    }
}

export default Search;