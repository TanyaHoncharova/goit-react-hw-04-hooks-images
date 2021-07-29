import React, { Component } from 'react';
// import { TiZoom } from "react-icons/ti";
// import { toast  } from 'react-toastify';

class Searchbar extends Component {

    state = {
        searchQuery: '',
        
    };

    handleNameChange = (e) => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase()});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.searchQuery.trim() === '') {
            alert('Enter query!');
            return
        }

        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });

    };

    render() {
        return (
          <header className="Searchbar" onSubmit={this.handleSubmit}>
          <form className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Searc</span>
            </button>

              <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.searchQuery}
               onChange={this.handleNameChange}
              />
          </form>
            </header>
      );
    }
};

export default Searchbar;