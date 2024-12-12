import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import log from "eslint-plugin-react/lib/util/log.js";

export default function Home() {
    const [results, setResults] = useState([]);
    const location = useLocation();


    // Function to fetch data from OMDb
    async function searchOMDb(searchValue) {
        const apiKey = "7db2dcc4"
        const url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error('Error fetching data');

            }
            const data = await response.json();

            if (data.Response === 'True') {
                return data.Search.slice(0, 5);
            } else {
                console.error(data.Error);
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
            return await searchOMDb(searchValue);
        };

        fetchResults().then(searchResults => {
            setResults(searchResults); // Update state with results
        });
    }, []);
    useEffect(() => {
        console.log("location changed")
        console.log(location);
    }, [location]);


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
