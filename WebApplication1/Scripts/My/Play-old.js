var Play_video = document.querySelector('#mainVid');;


function Play_setInteractionCallbacks() {
    $('#play-back-to-main-menu').click(function () {
        divMainMenu.style.display = 'inline';
        divLearn.style.display = 'none';

        Play_video.pause();

        console.log("Button Back From Play To Main Menu clicked!");
    });
}

/* Learn JS main function */
function showPlayJS() {
    console.log('showPlayJS()');

    Play_setInteractionCallbacks();

    //Play_video.play();
}
