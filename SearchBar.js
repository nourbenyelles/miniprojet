import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const avocats = [
  { id: 1, nom: "Malti" },
  { id: 2, nom: "Merabet" },
  { id: 3, nom: "Ferouani" },
  { id: 4, nom: "Benchouk" },
  { id: 5, nom: "Benzerdjeb" },
];

function SearchBar() {
  const [query, setQuery] = useState("");
  const [filteredAvocats, setFilteredAvocats] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm.length > 0) {
      const filtered = avocats.filter((avocat) =>
        avocat.nom.toLowerCase().startsWith(searchTerm)
      );
      setFilteredAvocats(filtered);
    } else {
      setFilteredAvocats([]);
    }
  };

  const handleSelect = (nom) => {
    setQuery(nom);
    setFilteredAvocats([]);
  };

  return (
    <div className="search-bar-container">
    <div className="searche-input-container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Rechercher un avocat..."
        className="searche-input"
      />
      <button className="search-button" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
    {filteredAvocats.length > 0 && (
      <div className="search-results">
        <ul>
          {filteredAvocats.map((avocat) => (
            <li key={avocat.id} onClick={() => handleSelect(avocat.nom)}>
              {avocat.nom}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

}

export default SearchBar;