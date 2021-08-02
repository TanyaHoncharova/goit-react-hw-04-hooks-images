import React, { useState } from 'react';


const  Searchbar=({onSubmit})=> {

  const [searchQuery, setSerchQuery] = useState('')

  const handleNameChange = (e) => {
        setSerchQuery( e.currentTarget.value.toLowerCase());
    };

   const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() === '') {
            alert('Enter query!');
            return
        }

      onSubmit(searchQuery);
        setSerchQuery( '' );

    };

  
        return (
          <header className="Searchbar" onSubmit={handleSubmit}>
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
                value={searchQuery}
               onChange={handleNameChange}
              />
          </form>
            </header>
      );
    
};

export default Searchbar;