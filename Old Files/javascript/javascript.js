function selectPicture() {
    var pictureNumber = "";
    pictureNumber = Math.floor(Math.random() * 203)+1;
    pictureNumber = pictureNumber + ".JPG"
     return pictureNumber;
    }
//random image selector
function displayPicture(){
document.getElementById("img1").src = "https://raw.githubusercontent.com/Vaporjawn/Vaporjawn.github.io/master/instagram_pictures/" + selectPicture();
document.getElementById("img2").src = "https://raw.githubusercontent.com/Vaporjawn/Vaporjawn.github.io/master/instagram_pictures/" + selectPicture();
document.getElementById("img3").src = "https://raw.githubusercontent.com/Vaporjawn/Vaporjawn.github.io/master/instagram_pictures/" + selectPicture();
document.getElementById("img4").src = "https://raw.githubusercontent.com/Vaporjawn/Vaporjawn.github.io/master/instagram_pictures/" + selectPicture(); 
}setInterval(displayPicture,5000);
