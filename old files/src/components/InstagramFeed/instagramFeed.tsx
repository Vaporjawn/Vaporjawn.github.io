import React, { useEffect, useState } from "react";
import "./instagramFeed.css";
import { Link } from "react-router-dom";

let image1: string;
let image2: string;
let image3: string;
let image4: string;

const displayPicture = (selectedImages: string[]) => {
  const doubleShuffle = selectedImages;
  image1 = doubleShuffle[0];
  image2 = doubleShuffle[1];
  image3 = doubleShuffle[2];
  image4 = doubleShuffle[3];
};

const numberGenerator = () => {
  return Math.floor(Math.random() * 203) + 1;
};

const pictureNumber = () => {
  let pictureNumber: string;
  const displayArray: string[] = [];

  for (let i = 0; i < 4; i++) {
    const rng = numberGenerator();
    pictureNumber = rng.toString();
    pictureNumber =
      "https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/" +
      pictureNumber +
      ".JPG";
    if (displayArray.find((c) => c == pictureNumber)) {
      numberGenerator();
    }
    displayArray.push(pictureNumber);
  }
  displayPicture(displayArray);
};

const InstagramFeed = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  {
    pictureNumber();
    return (
      <div className="instagramPictureContainer">
        <div className="instagramContainerHeader">
          <h2>
            NEXT LOOK AT THIS <strong>DIGITAL ART</strong>
          </h2>
        </div>
        <div className="rowContainer">
          <div className="sectionContainer">
            <a href="https://instagram.com/vaporjawn" target="_blank">
              <img src={image1} className="instagramPicture" />
            </a>
            <div className="instagramPictureTitle">
              <h3>SOME ART</h3>
            </div>
            <p className="instagramPictureText">
              Vaporjawn's origins come from my instagram page with the same
              name. It's peaked at over 15,000 followers and that was never my
              intention. Just a pleasant surprise.
            </p>
          </div>
          <div className="sectionContainer">
            <a href="https://instagram.com/vaporjawn" target="_blank">
              <img src={image2} className="instagramPicture" />
            </a>
            <div className="instagramPictureTitle">
              <h3>SOME ART</h3>
            </div>
            <p className="instagramPictureText">
              The instagram account started as a finsta. I created the finsta to
              take random pictures. Lucky for me, my iPhone 6S camera broke. I
              was forced to download an app called R4VE and started creating
              vaporwave edits.
            </p>
          </div>
        </div>
        <div className="rowContainer">
          <div className="sectionContainer">
            <a href="https://instagram.com/vaporjawn" target="_blank">
              <img src={image3} className="instagramPicture" />
            </a>
            <div className="instagramPictureTitle">
              <h3>MORE ART</h3>
            </div>
            <p className="instagramPictureText">
              While the page is inactive from a timeline standpoint, I
              'consistently' update the story with beautiful edits that I find
              on the internet. And I also make art from time to time. It might
              have even popped up while you were reading this.
            </p>
          </div>
          <div className="sectionContainer">
            <a href="https://instagram.com/vaporjawn" target="_blank">
              <img src={image4} className="instagramPicture" />
            </a>
            <div className="instagramPictureTitle">
              <h3>MORE ART</h3>
            </div>
            <p className="instagramPictureText">
              Vaporjawn has now grown into a fully fledged brand that is
              somewhat commonly known in the vaporwave community. It has music
              as well. Take a look at the page{" "}
              <a
                className="redLink"
                target="_blank"
                href="https://instagram.com/vaporjawn"
              >
                here
              </a>{" "}
            </p>
          </div>
        </div>
        <Link
          to="https:instagram.com/vaporjawn"
          className="instagramFeedAboutLink"
        >
          <div className="instagramFeedAboutButton">About Vaporjawn</div>
        </Link>
      </div>
    );
  }
};
export default InstagramFeed;
