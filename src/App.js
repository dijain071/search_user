import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchBox from "./SearchBox";
import Loader from "./Loader";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchQuery}&sort=followers`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setSearchResults(data.items);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(() => {
        fetchUsers();
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, fetchUsers]);

  const handleClearError = () => {
    setError(null);
  };
  return (
    <>
      <div className="app-container">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {isLoading && <Loader />}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={handleClearError}>Dismiss</button>
          </div>
        )}
      </div>
      {!isLoading &&
        !error &&
        searchQuery.trim() !== "" &&
        searchResults.length > 0 && (
          <>
            {searchResults.length === 1 && (
              <div className="single-user-info">
                <img src={searchResults[0].avatar_url} alt="User Avatar" />
                <p>User: {searchResults[0].login}</p>
              </div>
            )}
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
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.login}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
    </>
  );
}

export default App;
