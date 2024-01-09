import React, { useEffect, useState } from "react";
import axios from "axios";
import BgCircle from "../../assets/bgCircle.svg";
import Icon from "../../assets/icon.svg";
import "./Quotes.css";
const Quotes = () => {
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      (function fetchQuotes() {
        axios
          .get("https://api.adviceslip.com/advice")
          .then((response) => {
            if (!response.data || !response.data.slip.advice) throw "";
            setQuotes(response.data.slip);
          })
          .catch(() => {
            if (!quotes) {
              setQuotes({
                advice: "Loading ...",
                id: 409,
              });
            }
          });
        return fetchQuotes;
      })(),
      60000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {quotes && (
        <div className="quote-area">
          <h3>Quote #{quotes.id}</h3>
          <p>{`"${quotes.advice}"`}</p>
          <div className="images">
            <img src={BgCircle} alt="bgCircle" />
            <img src={Icon} alt="icon" className="icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotes;
