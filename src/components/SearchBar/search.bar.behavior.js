import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSearchResults } from "../../adapters/http-client/http.client.adapter.js";

const SearchBarBehavior = (searchResultDOMelement) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [debounceTerm, setDebounceTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSearchResults(searchTerm);
      setSearchResponse(response);
    };

    if (searchTerm) {
      fetchData();
      setIsOpen(true);
    }

    if (!searchTerm) setIsOpen(false);

    const onBodyClick = (e) => {
      if (!searchResultDOMelement.current.contains(e.target)) setIsOpen(false);
    };
    document.body.addEventListener("click", onBodyClick);
  }, [searchTerm, searchResultDOMelement]);

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchResultsList = searchResponse.map((result) => {
    return (
      <Link to={"/game/" + result.id} key={result.id}>
        <div
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <img src={result.imageUrl} alt="Not found"></img>
          <strong>{result.name}</strong>
        </div>
      </Link>
    );
  });

  return [searchTerm, isOpen, searchResultsList, onInputChange];
};

export default SearchBarBehavior;
