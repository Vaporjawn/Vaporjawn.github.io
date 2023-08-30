import React from "react";
import "./vaporjawnHeader.css";

function VaporjawnHeader() {
  return (
    <div>
      <div className="App-header">
        <header>
          <h2 className="VaporjawnGlow">𝓽𝓱𝓮 𝓿𝓪𝓹𝓸𝓻𝔀𝓪𝓿𝓮 𝓵𝓲𝓯𝓮𝓼𝓽𝔂𝓵𝓮</h2>
        </header>
        <p className="VaporjawnBlerb">
          Vaporjawn is a multi-medium collective inspired by the spectrum of art
          that exists in the vaporwave community.{" "}
          <a
            className="VaporjawnLink"
            href="https://instagram.com/vaporjawn"
            target="_blank"
          >
            Vaporjawn{" "}
          </a>
          is my former "
          <a
            className="VaporjawnLink"
            href="https://www.dictionary.com/e/slang/finsta/#:~:text=A%20finsta%20is%20a%20secondary,have%20more%20heavily%20curated%20content."
            target="_blank"
          >
            Finsta
          </a>
          " that I turned business.
        </p>
      </div>
    </div>
  );
}

export default VaporjawnHeader;
