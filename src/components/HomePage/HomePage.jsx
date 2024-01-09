import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Symbol from "../Symbol";
import "./HomePage.css";

function HomePage({ player, swapPlayer, gameStarts }) {
  const inviteLinkRef = useRef(null);
  const alert = () => {
    toast.success("Invite link copied", {
      position: "top-right",
      iconTheme: {
        primary: "#F2B237",
        secondary: "#192A32",
      },
      style: {
        borderRadius: "10px",
        backgroundColor: "#192A32",
        color: "#F2B237",
        fontFamily: "DM Sans , sans-serif",
        // fontWeight: "800",
      },
    });
  };
  const handleInviteClick = () => {
    inviteLinkRef.current.disabled = true;
    window.navigator.clipboard.writeText(window.location.href);
    alert();
    setTimeout(() => (inviteLinkRef.current.disabled = false), 2000);
  };
  return (
    <div className="home">
      <div className="select">
        <h3>PICK PLAYER</h3>
        <div className="player-choice">
          <div
            className={player === "X" ? "selected" : ""}
            onClick={() => swapPlayer("X")}
          >
            <Symbol color={player === "X" ? "#192A32" : "#D9D9D9"}>X</Symbol>
          </div>
          <div
            className={player === "O" ? "selected" : ""}
            onClick={() => swapPlayer("O")}
          >
            <Symbol color={player === "O" ? "#192A32" : "#D9D9D9"}>O</Symbol>
          </div>
        </div>
      </div>
      <div className="new-game">
        <button onClick={gameStarts}>NEW GAME ( VS CPU )</button>
        <button>NEW GAME ( VS HUMAN ) Coming soon</button>
      </div>
      <div className="invite">
        <button onClick={handleInviteClick} ref={inviteLinkRef}>
        Invite your friend
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default HomePage;
