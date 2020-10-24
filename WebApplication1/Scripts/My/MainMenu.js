$(document).ready(function () {
    $('#main-menu-button-learn').click(function () {
        divMainMenu.style.display = 'none';
        divLearn.style.display = 'inline';
        LoadMode("learn");
    });

    $('#main-menu-button-play').click(function () {
        divMainMenu.style.display = 'none';
        divLearn.style.display = 'inline';
        LoadMode("play");
    });

    //load stuff is moved to Learn.js document ready cause it was crashing
    //1 out of 20 30 times
    //load_stuff();
});

function LoadMode(mode) {
    //load_stuff();
    //shuffleArr();
    //Learn_show(mode);

    //first entry, else came from a back button
    if(!ReEnter) {
        shuffleArr();
        Learn_show(mode);
    }
    else {
        WeBack(mode);
    }
}

function load_stuff() {
    $.getJSON('Videos/videos-metadata.json?123', function (actual_JSON) {
        const videos = actual_JSON['videos'];
        arrVideoList = [];
        Object.keys(videos).forEach(function (videoKey) {      
            var emots = videos[videoKey]['emotions'];
            var tims = videos[videoKey]['times'];
            var newVid = new arrVideo(encodeURI(videos[videoKey]['video']).replace(/\+/g, "%2B"), emots, tims);
            arrVideoList.push(newVid);
        });
        console.log("LOAD STUFF");
    });
}