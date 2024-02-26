
import React, { useState, useEffect } from "react";
import './App.css';
import SearchBox from "./SearchBox";
import Loader from "./Loader"; 


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchUsers();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchQuery}&sort=followers`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {searchQuery.trim() !== "" && searchResults.length > 0 && (
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Sr. No. </th>
                <th>User</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.login}</td>
                  <td>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}

export default App;
