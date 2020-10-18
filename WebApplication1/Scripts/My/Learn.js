var Learn_animationImgState = {};
var Learn_imgWidth;
var Learn_imgHeight   

var Learn_progress = document.querySelector('#video-progress-bar');
var Learn_progressStyle = window.getComputedStyle(Learn_progress, null);
var Learn_progressFilled = document.querySelector('#video-progress');
var Learn_video = document.querySelector('#mainVid');
var Learn_divCurrentVideoTime = document.querySelector('#currentVideoTime');

var ReEnter = false;
var isWrong = false;
var isRight = false;
var answered = [];

var lastRepeatIndex = 0;

var goodSound = new Audio("Videos/goodSound.mp3");
var badSound = new Audio("Videos/badSound.mp3");
var winSound = new Audio("Videos/winSound.mp3");
var pauseCount = 1;

var arrVideoList = [];
//name used for video source later
function arrVideo(name, emotions, times) {
    this.name = name;
    this.emotions = emotions;
    this.times = times;
}
var Mode;

$(document).ready(function () {
    //alert("load");
    load_stuff();
});

function shuffleArr() {
    if(arrVideoList.length < 1) {
        return;
    }
    var currentIndex = arrVideoList.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
  
    // And swap it with the current element.
    temporaryValue = arrVideoList[currentIndex];
    arrVideoList[currentIndex] = arrVideoList[randomIndex];
    arrVideoList[randomIndex] = temporaryValue;
    }
}


function Learn_setGreenLights() {
    console.log('Learn_setGreenLights()');
    Learn_imgHeight = document.getElementById('emotion-anger').clientHeight;
    Learn_imgWidth = document.getElementById('emotion-anger').clientWidth;
    /* Set green rectangles size */
    var greenLights = document.getElementsByClassName('imgEmotionLight');
    Array.prototype.forEach.call(greenLights, function (el) {
        el.style.height = Learn_imgHeight + 'px';
        el.style.width = Learn_imgWidth + 'px';
    });

    const spaceWidth = (window.innerWidth - (7 * Learn_imgWidth)) / 8;

    var i;
    for (i = 1; i <= 7; i++) {
        var div = document.getElementById('div-emotion-' + i);
        div.style.left = (i * spaceWidth) + (i - 1) * Learn_imgWidth + 'px';
    }
}

//get the emotion indexes of the current vid
function getAllIndexes(indexesArr, arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == val) {
            indexesArr.push(i);
        }
    }
}

//called when clicking on an emotion
function CheckNew() {
    $('.imgEmotionLight').click(function () {
        if(Mode == "play") {
            var compare = this.id.split("-");
            if(isWrong) {
                return;
            }
            if(ReEnter) {
                ReEnter = false;
            }

            if(arrVideoList[0].emotions.includes(compare[1])) {

                var indexes = [];
                getAllIndexes(indexes, arrVideoList[0].emotions, compare[1]);

                //indexes for the ones that are only found once
                var ind = arrVideoList[0].emotions.indexOf(compare[1]);

                //get the index for emotions found multiple times
                if(indexes.length > 1 && lastRepeatIndex > 0) {
                    ind = lastRepeatIndex + 1;
                    console.log("already reapeated, new ind: " + ind);
                }

                var lastTime = arrVideoList[0].times[ind * 2];
                var nextTime = arrVideoList[0].times[ind * 2 + 1];

                ////for old time format
                // if(ind == arrVideoList[0].times.length - 1) {
                //     nextTime = Learn_video.duration;
                // }
                // if(ind > 0) {
                //     lastTime = arrVideoList[0].times[ind - 1];
                // }
                // else {
                //     lastTime = 0;
                // }

                if(Learn_video.currentTime >= lastTime && Learn_video.currentTime <= nextTime) {
                    if(compare[1] == arrVideoList[0].emotions[ind]) {
                        newAnim(compare[1], "Images/right.png", 600);
                        goodSound.play();

                        //this is needed for repeating emotions, so we can answer multiple times and things
                        var newString = ind.toString() + compare[1];
                        lastRepeatIndex = ind;

                        if(!answered.includes(newString)) {
                            console.log("emotion is: " + arrVideoList[0].emotions[ind] + " between: " + lastTime + " and " + nextTime);
                            answered.push(newString);
                            if(arrVideoList[0].emotions.length == answered.length) {
                                answered = [];
                                lastRepeatIndex = 0;
                                document.getElementById("nextVid").style.display = "block";
                                $("#nextVid").animate({opacity: 0}, 1);
                                $("#nextVid").animate({opacity: 1}, 1000);
                                Learn_video.pause();
                                isRight = true;
                            }
                            return;
                        }
                    }
                }
                //right emotion, wrong time
                else {
                    console.log("Wrong emotion (time)");
                    console.log(lastTime + " to " + nextTime);
                    badSound.play();
                    newAnim(compare[1], "Images/wrong.png", 600);
                    answered = [];
                    lastRepeatIndex = 0;
                    var btn = document.getElementById("nextVid");
                    btn.style.background = "#ff0000";
                    btn.style.display = "block";
                    $("#nextVid").animate({opacity: 0}, 1);
                    $("#nextVid").animate({opacity: 1}, 1000);
                    isWrong = true;
                    Learn_video.pause();
                    return;
                }
            }
            //wrong emotion
            else {
                if(!isRight) {
                    console.log("Wrong emotion");
                    badSound.play();
                    newAnim(compare[1], "Images/wrong.png", 600);
                    answered = [];
                    lastRepeatIndex = 0;
                    var btn = document.getElementById("nextVid");
                    btn.style.background = "#ff0000";
                    btn.style.display = "block";
                    $("#nextVid").animate({opacity: 0}, 1);
                    $("#nextVid").animate({opacity: 1}, 1000);
                    isWrong = true;
                    Learn_video.pause();
                    return;
                }
            }
        }
    });
}

function newAnim(emot, img, duration) { 
    document.getElementById(emot + "-overlay").src = img;
    //console.log(document.getElementById(emot + "-overlay"));
    $("#" + emot + "-overlay").animate({opacity: 0.75}, duration/2);
    $("#" + emot + "-overlay").animate({opacity: 0}, duration*2);
}

function animOn(emot, img) {
    document.getElementById(emot + "-overlay").src = img;
    $("#" + emot + "-overlay").animate({opacity: 0.75}, 100);
}

function stopAnim(emot) {
    $("#" + emot + "-overlay").stop();
    $("#" + emot + "-overlay").animate({opacity: 0}, 100);
}

function CancelAll() {
    document.getElementById("anger-overlay").style.opacity = 0;
    document.getElementById("disgust-overlay").style.opacity = 0;
    document.getElementById("fear-overlay").style.opacity = 0;
    document.getElementById("joy-overlay").style.opacity = 0;
    document.getElementById("neutral-overlay").style.opacity = 0;
    document.getElementById("sad-overlay").style.opacity = 0;
    document.getElementById("surprise-overlay").style.opacity = 0;
}

function NextButtonClick() {
    $('#nextVid').click(function (e) {

        var returnVid = arrVideoList.shift();
        //seperate function, maybe add to wrong -> back -> play again so its not the same vid
        if(isWrong && Mode == "play") {
            arrVideoList.push(returnVid);
            shuffleArr();
            isWrong = false;
        }

        if(arrVideoList.length > 0) {
            document.getElementById("nextVid").style.background = "#045123";
            document.getElementById("nextVid").style.display = "none";
            Learn_setVideo(arrVideoList[0]);
            Learn_video.play();
            //console.log(arrVideoList[0].emotions);
            isRight = false;
            trainEnded = false;
            CancelAll();
        }
        else {
            //alert("FINAL You won!!!!!!!");
            var elements = document.getElementsByClassName('imgOverlay');
            for(var z = 0; z < elements.length; z++) {
                elements[z].src = "Images/won.png";
                $(elements[z]).animate({opacity: 0.75}, 600);
                $(elements[z]).animate({opacity: 0}, 1200);
            }
            winSound.play();
        }
    });
}

function ContinueVid() {
    Learn_video.play();
}

function Learn_PlayFromBack() {
    document.getElementById("nextVid").style.display = "none";
    trainEnded = false;
    Learn_video.currentTime = 0;
    Learn_video.play();
    console.log("learn play vid");
}

function ReloadOnLearn() {
    document.getElementById("nextVid").style.display = "none";
    arrVideoList = [];
}

function Learn_setInteractionCallbacksLearn() {
    console.log('Learn_setInteractionCallbacksLearn() begin');

    $('#video-progress-bar').click(function (e) {
        var marginLeft = parseFloat(window.getComputedStyle(Learn_progress).marginLeft.match(/\d+/)[0]);
        var percent = (e.pageX - marginLeft - Learn_progressFilled.clientWidth/2) / Learn_progress.clientWidth;

        Learn_video.currentTime = Learn_video.duration * percent;

        document.getElementById("nextVid").style.display = "none";
        trainEnded = false;
        
        if(pauseCount > 0) {
            Learn_video.play();
        }

        //so that they animate again when you rewind in learn mode
        areAnimated = [false, false, false, false];
        CancelAll();
    });

    $('#button-fullscreen').click(function () {
        Learn_toggleFullScreen();
        });

    $('#learn-back-to-main-menu').click(function () {
        divMainMenu.style.display = 'inline';
        divLearn.style.display = 'none';
        ReEnter = true;
        document.getElementById("nextVid").style.background = "#045123";
        document.getElementById("nextVid").style.display = "none";
        isWrong = false;
        load_stuff();
        Mode = "";
        Learn_video.pause();
        CancelAll();
        console.log("Button Back From Learn To Main Menu clicked!");

    });

    $('#button-gallery').click(function () {
        divGallery.style.display = 'inline';
        divLearn.style.display = 'none';
        load_stuff();
        Learn_video.pause();
        showGalleryJS(divLearn);
        Mode = "gallery";
        CancelAll();
        document.getElementById("nextVid").style.display = "none";
        console.log("Button Gallery clicked!");
    });

    $('#button-skipVid').click(function () {

        if(Mode != "play" && arrVideoList.length > 0) {
            var returnVid = arrVideoList.shift();
            document.getElementById("nextVid").style.background = "#045123";
            document.getElementById("nextVid").style.display = "none";
            Learn_setVideo(arrVideoList[0]);
            Learn_video.play();
            isRight = false;
            trainEnded = false;
            CancelAll();
            return;
        }

        if(arrVideoList.length > 0 && !isWrong && !isRight) {
            var returnVid = arrVideoList.shift();
            arrVideoList.push(returnVid);
            shuffleArr();
            document.getElementById("nextVid").style.display = "none";

            Learn_setVideo(arrVideoList[0]);
            Learn_video.play();
            answered = [];
            lastRepeatIndex = 0;
            isRight = false;
            trainEnded = false;
            CancelAll();
        }
    });
    
    $('#button_rewind').click(function () {
        if(!isWrong && !isRight) {
            console.log("rewind");
            CancelAll();
            Learn_video.currentTime = 0;
            Learn_video.play();
            document.getElementById("nextVid").style.display = "none";
        }
    });

    $('#button-pause').click(function () {
        if(Learn_video.currentTime < Learn_video.duration) {
            if(!isWrong && !isRight) {
                if(pauseCount > 0) {
                    Learn_video.pause();
                    pauseCount *= -1;
                }
                else {
                    Learn_video.play();
                    pauseCount *= -1;
                }
            }
        }
    });
    
    console.log("Learn_setInteractionCallbacksLearn() end");
}

var lastOrientation = '';
function Learn_onVideoUpdate() {
    const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;
    if (orientation.indexOf('portrait') != -1) {
        Learn_video.pause();
    } else {
        if (Learn_video.paused && lastOrientation.indexOf('portrait') != -1) {
            Learn_video.play();
        }
    }
    lastOrientation = orientation;

    const percent = (Learn_video.currentTime / Learn_video.duration) * 100;
    progressWidth = Learn_progressStyle.getPropertyValue("width");
    progressWidth = progressWidth.substring(0, progressWidth.length - 2);
    progressWidth = parseFloat(progressWidth) * percent / 100;

    var marginLeft = parseFloat(Learn_progressStyle.marginLeft.match(/\d+/)[0]);
    Learn_progressFilled.style.left = (marginLeft + progressWidth) + "px";

    var cur = Learn_video.currentTime.toString();
    var dur = Learn_video.duration.toString();

    if(dur.indexOf(".") > 0) {
        dur = dur.substring(0, dur.indexOf('.') + 2)
    }

    Learn_divCurrentVideoTime.textContent = cur.substring(0, cur.indexOf('.') + 2) + '/' + dur;
    
    if(Mode == "learn" && pauseCount > 0 && !trainEnded) {
        Train();
    }
}

function Learn_setVideoControls() {
    console.log('Learn_setVideoControls()');
    //Learn_imagePlay.src = "Images/ic_media_pause.png";
}

function Learn_onResize() {
    if (divLearn.style.display == 'inline') {
        console.log('Learn_onResize');
    }
}

function Learn_setFullscreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
}

function Learn_toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

//hardcoded at the moment, should equal to the most emotions of any vid
var areAnimated = [false, false, false, false];
var trainEnded = false;
function Train() {
    for(var i = 0; i < arrVideoList[0].emotions.length; i++) {
        var lastTime = arrVideoList[0].times[i * 2];
        var nextTime = arrVideoList[0].times[i * 2 + 1]; //arrVideoList[0].times[i * 2 + 1];
        console.log("train");

        // //for first range between 0 and X, old time format
        // if(i > 0) {
        //     lastTime = arrVideoList[0].times[i-1];
        // }
        // else {
        //     lastTime = 0;
        // }

        if(!areAnimated[i] && Learn_video.currentTime <= nextTime && Learn_video.currentTime >= lastTime) {
            console.log("anim: " + arrVideoList[0].emotions[i] + " to: " + nextTime);
            areAnimated[i] = true;
            animOn(arrVideoList[0].emotions[i], "Images/right.png");
            //var animTime = (nextTime - lastTime) / 2 * 1000;
            //newAnim(arrVideoList[0].emotions[i], "Images/right.png", animTime); //was 1500ms
            //document.getElementById(arrVideoList[0].emotions[i] + "-overlay").style.opacity = 0.6;
        }
        if(areAnimated[i] && Learn_video.currentTime > nextTime) {
            console.log("stop: " + arrVideoList[0].emotions[i] + " , passed " + nextTime);
            stopAnim(arrVideoList[0].emotions[i]);
            areAnimated[i] = false;

            //$("#" + arrVideoList[0].emotions[i]+ "-overlay").stop();
            //$("#" + arrVideoList[0].emotions[i] + "-overlay").animate({opacity: 0.0}, 100);
            //document.getElementById(arrVideoList[0].emotions[i] + "-overlay").style.opacity = 0;
        }
    }

    if(Learn_video.currentTime == Learn_video.duration) {
        document.getElementById("nextVid").style.background = "#045123";
        document.getElementById("nextVid").style.display = "block";
        $("#nextVid").animate({opacity: 0}, 1);
        $("#nextVid").animate({opacity: 1}, 1000);
        trainEnded = true;
        CancelAll();
    }
}

//key functions (pause)
document.body.onkeypress = function(e) {
    if(e.keyCode == 32) {
        console.log("pause");
        if(Learn_video.currentTime < Learn_video.duration) {
            if(pauseCount > 0) {
                Learn_video.pause();
                pauseCount *= -1;
            }
            else {
                Learn_video.play();
                pauseCount *= -1;
            }
        }
    }
}

//rewind buttons + volume, arrows
document.body.onkeydown = function(e) {
    if(e.keyCode == 37) {
        //console.log("rewind back");
        Learn_video.pause();
        Learn_video.currentTime -= 0.1;
        document.getElementById("nextVid").style.display = "none";
        // areAnimated = [false, false, false, false];
        // CancelAll();
        trainEnded = false;
    }
    if(e.keyCode == 39) {
        //console.log("go forward");
        Learn_video.pause();
        Learn_video.currentTime += 0.1;
    }
    if(e.keyCode == 38) {
        //console.log("volume up");
        if(Learn_video.volume < 1) {
            Learn_video.volume += 0.1;
        }
    }
    if(e.keyCode == 40) {
        //console.log("volume down");
        if(Learn_video.volume > 0.1) {
            Learn_video.volume -= 0.1;
        }
    }
}

//resume playback after rewind
document.body.onkeyup = function(e) {
    if(e.keyCode == 37 || e.keyCode == 39) {
        console.log("restart from back");
        Learn_video.play();
        areAnimated = [false, false, false, false];
        CancelAll();
    }
}

function LoadVideoFromGallery(video) {
    CancelAll();

    arrVideoList.unshift(video);
    Mode = "learn";
    trainEnded = false;
    Learn_video.src = video.name;
    console.log("learn again");
    console.log(arrVideoList[0].emotions);

    areAnimated = [false, false, false, false];
    Learn_video.play();
}

function Learn_setVideo(video, emotion) {
    if(arrVideoList.length > 0) {
        //console.log("Set video to: " + arrVideoList[0].name);
        Learn_video.src = arrVideoList[0].name;
        console.log(arrVideoList[0].emotions);
        areAnimated = [false, false, false, false];
    }
    else {
        console.log("video list empty");
    }
}

/* Learn JS main function */
function Learn_show(theMode) {
    //console.log('Learn_show()');

    Mode = theMode;
    console.log("STARTED IN MODE: " + Mode);

    setInterval(Learn_onVideoUpdate, 50);

    Learn_setGreenLights();
    Learn_setVideoControls();
    Learn_setInteractionCallbacksLearn();

    if(Mode == "play") {
        CheckNew();
        //NextButtonClick();
        document.getElementById("button-gallery").style.display = "none";
    }
    else {
        document.getElementById("button-gallery").style.display = "block";
    }
    NextButtonClick();
    console.log(arrVideoList[0].emotions);

    window.onresize = Learn_onResize;
    //Learn_setFullscreen();

    Learn_video.src = arrVideoList[0].name;
    Learn_video.play();
}

//prep things after back button
function WeBack(theMode) {
    Mode = theMode;
    ModeCheck(Mode);

    areAnimated = [false, false, false, false];
    document.getElementById("nextVid").style.display = "none";
    Learn_video.currentTime = 0;
    Learn_video.src = arrVideoList[0].name;
    Learn_video.play();
    console.log(arrVideoList[0].emotions);
}

function ModeCheck(theMode) {
    if(theMode == "play") {
        Mode = theMode;
        CheckNew();
        CancelAll();
        document.getElementById("button-gallery").style.display = "none";
    }
    else {
        Mode = theMode;
        document.getElementById("button-gallery").style.display = "block";
    }
}

function update(fftObject) {
    console.log("upd");
}
