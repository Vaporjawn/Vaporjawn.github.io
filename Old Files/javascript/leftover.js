//Coming Soon Background Randomizer
const backgroundVideo = () => {
    const videoTime = Math.floor(Math.random() * 10714)+1;
    const timeString = videoTime.toString();
    const videoUrl  = 'https://youtu.be/0k23DVv_xsA?t=';
    const urlTime = videoUrl + timeString;
    document.getElementById('spaceVideo').src = urlTime;
}