import React, { useState } from "react";
import fetchUserData from "../services/githubService";

function Search() {
  // ==========================================
  // 1. THE MEMORY (STATE)
  // ==========================================

  // Holds the text from the "Username" input box
  const [username, setUsername] = useState("");

  // Holds the text from the "Location" input box
  const [location, setLocation] = useState("");

  // Holds the number from the "Min Repos" input box
  const [minRepos, setMinRepos] = useState("");

  // Holds the LIST of users we get back from GitHub.
  // Initial value is [] (empty array) because we expect a list.
  const [userData, setUserData] = useState([]);

  // Controls the "Searching..." text visibility
  const [loading, setLoading] = useState(false);

  // Controls the Error Message visibility
  const [error, setError] = useState(false);

  // ==========================================
  // 2. THE BRAIN (LOGIC)
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing!

    setLoading(true); // Turn spinner ON
    setError(false); // Clear old errors
    setUserData([]); // Clear old results

    try {
      // Call the service with our 3 search criteria
      const response = await fetchUserData({ username, location, minRepos });

      // SUCCESS: The Search API puts the list of users inside .items
      setUserData(response.data.items);
    } catch (err) {
      // FAILURE: If internet fails or API breaks
      setError(true);
    } finally {
      // CLEANUP: Turn spinner OFF (runs whether success or fail)
      setLoading(false);
    }
  };

  // ==========================================
  // 3. THE BODY (UI / HTML)
  // ==========================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          GitHub Finder
        </h1>
        <p className="text-center text-slate-600 mb-10 text-lg">
          Discover developers around the world
        </p>

        {/* --- FORM SECTION --- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl space-y-6 border border-green-100 max-w-4xl mx-auto"
        >
          {/* Username Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              🔍 Github Username
            </label>
            <input
              type="text"
              placeholder="e.g. octocat"
              className="w-full p-4 bg-green-50/50 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Location & Repos Row (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                📍 Location
              </label>
              <input
                type="text"
                placeholder="e.g. Kenya"
                className="w-full p-4 bg-green-50/50 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                📦 Minimum Repos
              </label>
              <input
                type="number"
                placeholder="e.g. 10"
                className="w-full p-4 bg-green-50/50 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
              />
            </div>
          </div>

          {/* The big gradient button */}
          <button
            type="submit"
            className="w-full py-4 px-8 text-white text-lg font-bold rounded-xl shadow-xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:shadow-2xl hover:scale-[1.02] hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300"
          >
            🚀 Search Profiles
          </button>
        </form>

        {/* --- RESULTS SECTION --- */}

        {/* Show Loading Text if loading is true */}
        {loading && (
          <p className="text-center text-xl text-slate-600 animate-pulse mt-10">
            Searching GitHub...
          </p>
        )}

        {/* Show Error Box if error is true */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mt-10">
            <p>
              Something went wrong. Please check your internet or try again.
            </p>
          </div>
        )}

        {/* THE GRID OF CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* We map over the list of users to create a card for each one */}
          {userData &&
            userData.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              >
                <img
                  src={user.avatar_url}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-sm mb-4"
                />

                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  {user.login}
                </h2>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-medium hover:text-purple-600 hover:underline mt-2"
                >
                  View Profile &rarr;
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
