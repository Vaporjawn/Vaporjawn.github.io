function selectPicture() {
    var pictureNumber = "";
    pictureNumber = Math.floor(Math.random() * 210)+1;
    pictureNumber = pictureNumber + ".jpg"
     return pictureNumber;
    }
//random image selector
function displayPicture(){
document.getElementById("img1").src = "https://github.com/Vaporjawn/Vaporjawn.github.io/blob/master/instagram_pictures/raw=true" + selectPicture();
document.getElementById("img2").src = "https://github.com/Vaporjawn/Vaporjawn.github.io/blob/master/instagram_pictures/raw=true" + selectPicture();
document.getElementById("img3").src = "https://github.com/Vaporjawn/Vaporjawn.github.io/blob/master/instagram_pictures/raw=true" + selectPicture();
document.getElementById("img4").src = "https://github.com/Vaporjawn/Vaporjawn.github.io/blob/master/instagram_pictures/raw=true" + selectPicture();
}setInterval(displayPicture,5000);