function selectPicture() {
    var pictureNumber = "";
    pictureNumber = Math.floor(Math.random() * 210)+1;
    pictureNumber = pictureNumber + ".jpg"
     return pictureNumber;
    }
//random image selector
function displayPicture(){
document.getElementById("img1").src = "./instagram_pictures/" + selectPicture();
document.getElementById("img2").src = "./instagram_pictures/" + selectPicture();
document.getElementById("img3").src = "./instagram_pictures/" + selectPicture();
document.getElementById("img4").src = "./instagram_pictures/" + selectPicture();
}setInterval(displayPicture,5000);