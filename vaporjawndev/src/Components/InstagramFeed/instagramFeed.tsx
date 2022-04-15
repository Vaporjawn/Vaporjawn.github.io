import React, { useEffect, useState } from 'react';
import { setConstantValue } from 'typescript';
// import '../../assets/instagram_pictures/'

let image1: string;
let image2: string;
let image3: string;
let image4: string;

  const shuffleArray = (array: string[]) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  const displayPicture = (selectedImages: string[]) => {
    // const doubleShuffle = shuffleArray(selectedImages);
    const doubleShuffle = selectedImages;
    image1 = doubleShuffle[0];
    image2 = doubleShuffle[1];
    image3 = doubleShuffle[2];
    image4 = doubleShuffle[3];
  }

  const pictureNumber = () => {
    let pictureNumber: string;
    let displayArray: string[] = []; 
    const rng = Math.floor(Math.random() * 203)+1;
    pictureNumber = rng.toString();
    pictureNumber = '../../assets/instagram_pictures/' + pictureNumber + ".JPG";
      for (let i=0; i<4; i++){
        displayArray.push(pictureNumber)
      }
      let check = displayArray;
      displayPicture(displayArray);
      // checkTimer();
    }

    const itsneither = () => {
      
    const [imageTimer, setImageTimer] = useState(false);
    const checkTimer = () => setImageTimer(true);
      
      useEffect(() => {

        const interval = setInterval(() => {
          pictureNumber();
          // console.log('This will run every second!');
        }, 6000);
        
        return clearInterval(interval);
      
      }, [imageTimer]);

    }

class InstagramFeed extends React.Component {

  render() {
    pictureNumber();
    return (
      <div>
        <img src={image1} />
        <img src={image2} />
        <img src={image3} />
        <img src={image4} />
      </div>
    );
  }
}

export default InstagramFeed;
