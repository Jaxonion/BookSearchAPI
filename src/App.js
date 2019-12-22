import React from 'react';
import './App.css';

import Search from './search';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      titles: []
    }
  }

  searchBookApi = (book, printType, bookType) => {
    let bookTypes = null;
    this.setState({
      results: []
    })
    if(bookType === 'none') {
      let bookTypes = ''
    }
    else {
      let bookTypes = '&filter='+bookType
    }
    console.log('print type is: ', printType)
    const searchedBook = book.split(' ').join('+')
    const url = 'https://www.googleapis.com/books/v1/' + 'volumes?q='+searchedBook+bookTypes+'&printType='+printType+'&key=AIzaSyDhgLumZvAUIkdVmjHzyk1-VfuId2RveZ4'
    //console.log(url)
    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error("couldn't find books")
        }
        return res
      })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        //console.log(response.items)
        for(let i = 0; i< response.items.length; i++) {
          console.log(response.items[i].volumeInfo.title)
          this.setState({
            titles: [...this.state.results, response.items[i].volumeInfo.title]
          })
        }
        this.setState({
          books: response.items
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }

  render() {
    /*const {titles} = this.state; {saleability
              ? <p>{book.saleInfo.retailPrice.amount}</p>
              : <p>{book.saleInfo.saleability}</p>}*/
              
    //const saleability = 
    return(
      <div className='App'>
        <header>Google Book Search</header>
        <Search state={this.state} apiSearch={this.searchBookApi} />
        <ul>
        {this.state.books.map((book, i) => (
            <li className='book'>
              <img src={book.volumeInfo.imageLinks.thumbnail} />
            <div className='bookInfo'>
            <h2 key={book.volumeInfo.id}>{book.volumeInfo.title}</h2>
            <p>Author: {book.volumeInfo.authors[0]}</p>
            {(book.saleInfo.saleability === 'FOR_SALE' ?
              (<p>Price: {book.saleInfo.retailPrice.amount}</p>) :
              ((book.saleInfo.saleability === 'FREE' ?
                (<p>Price: Free</p>) :
                (<p>Price: Not For Sale</p>)))
              )}
            </div>
          </li>
          )
        )}
        </ul>
      </div>
    )
  }
}

export default App;
