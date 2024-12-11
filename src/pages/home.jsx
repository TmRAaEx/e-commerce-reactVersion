import React, {useEffect, useState} from 'react';

export default function Home() {
    const [results, setResults] = useState([]);

    // Function to fetch data from OMDb
    async function searchOMDb(searchValue) {
        const apiKey = "7db2dcc4"
        const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();

            if (data.Response === 'True') {
                return data.Search.slice(0, 5);
            } else {
                throw new Error(data.Error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    // useEffect to fetch and display data on component mount
    useEffect(() => {
        const fetchResults = async () => {
            const searchValue = 'spider-man'; // Example search term
            const searchResults = await searchOMDb(searchValue);
            setResults(searchResults); // Update state with results
        };

        fetchResults();
    }, []);

    return (
        <>
            <main id="start-main">
                {/* Expanding section where the search results appear */}
                <section id="result-container">
                    <ul id="result-list"></ul>
                </section>

                {/* Section which shows hot products */}
                <section id="promoted-container">
                    <ul id="promoted-products">
                        {results && results.length > 0 ? (
                            results.map((movie, index) => (
                                <li key={index} className="productBlock product">
                                    <img
                                        className="productImg"
                                        src={movie.Poster}
                                        alt={`${movie.Title} Poster`}
                                    />
                                    <span className="productText">
                                        {movie.Title} ({movie.Year})
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li>No results found.</li>
                        )}
                    </ul>
                </section>
            </main>
        </>
    );
}
