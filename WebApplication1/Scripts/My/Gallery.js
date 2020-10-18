var _gallery_prevDiv;

//var galPerList = perList;

function Gallery_setInteractionCallbacks() {
    $('#gallery-back').click(function () {
        _gallery_prevDiv.style.display = 'inline';
        divGallery.style.display = 'none';

        console.log("Button Back From Gallery To Prev Div!");
        ContinueVid();
    });
}

/* Gallery JS main function */
function showGalleryJS(gallery_prevDiv) {
    if (gallery_prevDiv == null) {
        gallery_prevDiv = divMainMenu;
        console.log('Gallery: Setting prevDiv to main menu!');
    }

    _gallery_prevDiv = gallery_prevDiv;
    console.log('showGalleryJS()');

    Gallery_setInteractionCallbacks();

    document.documentElement.style.backgroundColor = "#3F51B5";
}

function FromGallery(name, emotion) {
    console.log("Load video from gallery: " + name);
    LoadVideoFromGallery(name, emotion);
}

function matchClicked(nam) {
    for(var i = 0; i < arrVideoList.length; i++) {
        if(nam == arrVideoList[i].name) {
            console.log("matched with " + nam);
            //var pushVid = new arrVideo(nam, arrVideoList[i].emotions, arrVideoList[i].times);
            LoadVideoFromGallery(arrVideoList[i]);
            return;
        }
    }
}

$('.gallery-thumbnail-button').click(function () {
    //console.log('Playing ' + this.childNodes[1].id);
    //$('#gallery-back').click();
    //Learn_setVideo(this.childNodes[1].id);

    _gallery_prevDiv.style.display = 'inline';
    divGallery.style.display = 'none';

    //load video + emotion
    //add to list and remove after
    console.log("Chosen vid from gallery: " + this.childNodes[1].id);
    matchClicked(this.childNodes[1].id);
});