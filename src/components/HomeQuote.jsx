import { useState, useEffect, useRef } from "react";
import "./HomeQuote.css";

function HomeQuote() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const hasFetched = useRef(false);


    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetch("https://dummyjson.com/quotes/random")
            .then((res) => res.json())
            .then((data) => {
                setQuote(data.quote);
                console.log(data);
                setAuthor(data.author);
            })
            .catch((error) => {
                console.error("Error fetching quote:", error);
            });
    }, []);

    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        if (!quote) return;
 
        setDisplayText("");

        const interval = setInterval(() => {
            setDisplayText((currentDisplay) => {
                if (currentDisplay.length < quote.length) {
                    return quote.substring(0, currentDisplay.length + 1);
                }else {
                    clearInterval(interval);
                    return currentDisplay;
                }
            });
        }, 100);
        return () => clearInterval(interval);
    }, [quote]);

    return (
        <div className="quote-container">
            <h3 className="quote-text">
                "{displayText}"
            </h3>
            <p className="quote-author">- {author}</p>
        </div>
    )
}

export default HomeQuote;