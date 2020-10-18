//not used, only Learn.js that's executed depending on mode


var Play_animationImgState = {};
var Play_imgWidth;
var Play_imgHeight   

var Play_progress = document.querySelector('#video-progress-bar');
var Play_progressStyle = window.getComputedStyle(Play_progress, null);
var Play_progressFilled = document.querySelector('#video-progress');
var Play_video = document.querySelector('#mainVid1');
var Play_divCurrentVideoTime = document.querySelector('#currentVideoTime');

var ReEnter = false;
var isWrong = false;
//var hasAnswered = false;
var clickCountPlay = 0;

var goodSound = new Audio("Videos/goodSound.mp3");
var badSound = new Audio("Videos/badSound.mp3");
var winSound = new Audio("Videos/winSound.mp3");
var pauseCount = 1;

var videoCounter;
var arrVideoListPlay = [];
//name used for video source later
function arrVideo(name, emotions, times) {
    this.name = name;
    this.emotions = emotions;
    this.times = times;
}

// function pushLists() {
//     var newVid = new arrVideo("Videos/he-anger-asd.mp4", ['anger', 'disgust', 'fear'], [5, 12, 18]);
//     var newVid1 = new arrVideo("Videos/he-joy-asd.mp4", ['joy', 'surprise'], [7, 15]);
//     var newVid2 = new arrVideo("Videos/he-neutral-asd.mp4", ['neutral', 'sad', 'neutral'], [8, 15, 21]);
//     //var newVid3 = new arrVideo("Videos/he-sad-asd.mp4", ['sad', 'anger'], [10, 15]);
//     //var newVid4 = new arrVideo("Videos/he-surprise-asd.mp4", ['surprise', 'joy', 'neutral'], [6, 11, 17]);
//     //var newVid5 = new arrVideo("Videos/he-disgust-asd.mp4", ['disgust', 'neutral', 'sad'], [6, 11, 17]);
//     //var newVid6 = new arrVideo("Videos/he-fear-asd.mp4", ['fear', 'neutral', 'disgust'], [6, 11, 17]);
//     arrVideoListPlay.push(newVid);
//     arrVideoListPlay.push(newVid1);
//     arrVideoListPlay.push(newVid2);
//     //arrVideoListPlay.push(newVid3);
//     //arrVideoListPlay.push(newVid4);
//     //arrVideoListPlay.push(newVid5);
//     //arrVideoListPlay.push(newVid6);

//     //perList.push(newVid);
//     //perList.push(newVid1);
//     //perList.push(newVid2);
//     //perList.push(newVid3);
//     //perList.push(newVid4);
//     //perList.push(newVid5);
//     //perList.push(newVid6);
// }

//var perList = [];
// function getPerList() {
//     return perList;
// }


  function shuffleArrPlay() {
    if(arrVideoListPlay.length < 1) {
        return;
    }
    var currentIndex = arrVideoListPlay.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = arrVideoListPlay[currentIndex];
      arrVideoListPlay[currentIndex] = arrVideoListPlay[randomIndex];
      arrVideoListPlay[randomIndex] = temporaryValue;
    }
  }

// function Play_animateImg(imgLight) {
//     const ANIM_LIGHT_DURATION = 125;
//     const ANIM_LIGHT_LOOP_COUNT = 16;
//     const ANIM_SCALE_DURATION = ANIM_LIGHT_DURATION * ( ANIM_LIGHT_LOOP_COUNT / 2 );
//     const imgLightId = String(imgLight.id);
//     const imgId = imgLightId.substring(0, imgLightId.length - "-light".length);

//     var isVisible = parseFloat(imgLight.style.opacity) > 0.0;

//     Play_animationImgState[imgLightId]++;
//     if (Play_animationImgState[imgLightId] > ANIM_LIGHT_LOOP_COUNT) {
//         return;
//     }

//     if (isVisible) {
//         /*Light*/
//         $('#' + imgLightId).animate({
//             opacity: "0"
//         }, {
//             duration: ANIM_LIGHT_DURATION, queue: false, done: function () {
//                 Play_animateImg(imgLight);
//             }
//         });
//     }
//     else {
//         /*Light*/
//         $('#' + imgLightId).animate({
//             opacity: "0.75"
//         }, {
//             duration: ANIM_LIGHT_DURATION, queue: false, done: function () {
//                 Play_animateImg(imgLight);
//             }
//         });
//     }

//     const imgRect = imgLight.getBoundingClientRect();
//     const dY = ((Play_imgHeight * 1.5) - Play_imgHeight) / 2;
//     const dX = ((Play_imgWidth * 1.5) - Play_imgWidth) / 2;
//     if (Play_animationImgState[imgLightId] == 1) {
//         const targetWidth = (Play_imgWidth * 1.5) + "px";
//         const targetHeight = (Play_imgHeight * 1.5) + "px";

//         $('#' + imgLightId).animate({
//             width: targetWidth,
//             height: targetHeight,
//             top: "-=" + dY,
//             left: "-=" + dX
//         }, {
//             duration: ANIM_SCALE_DURATION, queue: false
//         });

//         $('#' + imgId).animate({
//             width: targetWidth,
//             height: targetHeight,
//             top: "-=" + dY,
//             left: "-=" + dX
//         }, {
//             duration: ANIM_SCALE_DURATION, queue: false
//         });

//     } else if (Play_animationImgState[imgLightId] == ANIM_LIGHT_LOOP_COUNT / 2 + 1) {
//         const targetWidth = (Play_imgWidth) + "px";
//         const targetHeight = (Play_imgHeight) + "px";

//         $('#' + imgLightId).animate({
//             width: targetWidth,
//             height: targetHeight,
//             top: "+=" + dY,
//             left: "+=" + dX
//         }, {
//             duration: ANIM_SCALE_DURATION, queue: false
//         });

//         $('#' + imgId).animate({
//             width: targetWidth,
//             height: targetHeight,
//             top: "+=" + dY,
//             left: "+=" + dX
//         }, {
//             duration: ANIM_SCALE_DURATION, queue: false
//         });
//     }

// }

// function Play_setGreenLights() {
//     console.log('Play_setGreenLights()');
//     Play_imgHeight = document.getElementById('emotion-anger').clientHeight;
//     Play_imgWidth = document.getElementById('emotion-anger').clientWidth;
//     /* Set green rectangles size */
//     var greenLights = document.getElementsByClassName('imgEmotionLight');
//     Array.prototype.forEach.call(greenLights, function (el) {
//         el.style.height = Play_imgHeight + 'px';
//         el.style.width = Play_imgWidth + 'px';
//     });

//     const spaceWidth = (window.innerWidth - (7 * Play_imgWidth)) / 8;

//     var i;
//     for (i = 1; i <= 7; i++) {
//         var div = document.getElementById('div-emotion-' + i);
//         div.style.left = (i * spaceWidth) + (i - 1) * Play_imgWidth + 'px';
//     }
// }

//so bad
function CheckClickPlay(clickCountPlay) {
    $('.imgEmotionLight').click(function () {
        var compare = this.id.split("-");
        console.log(this.id);
        if(isWrong) {
            return;
        }

        if(ReEnter) {
            clickCount = 0;
            ReEnter = false;
        }

        for(var i = clickCount; i < arrVideoListPlay[0].emotions.length; i++) {
            console.log(arrVideoListPlay[0].emotions[i]);
            var lastTime;
            var nextTime = arrVideoListPlay[0].times[i];
            if(i == arrVideoListPlay[0].emotions.length - 1) {
                nextTime = Play_video.duration;
            }
            //for first range between 0 and X
            if(i > 0) {
                lastTime = arrVideoListPlay[0].times[i-1];
            }
            else {
                lastTime = 0;
            }

            if(compare[1] == arrVideoListPlay[0].emotions[i] && (Play_video.currentTime <= nextTime && Play_video.currentTime >= lastTime)) {
                newAnimPlay(compare[1], "Images/right.png", 600);

                clickCount = i + 1;
                goodSound.play();
                if(clickCount >= arrVideoListPlay[0].emotions.length) {
                    alert("won");
                    clickCount = 0;
                    document.getElementById("nextVid").style.display = "block";
                    Play_video.pause();
                }
                return;
            }
            else {
                console.log(clickCount);
                console.log("Wrong, emotion is: " + arrVideoListPlay[0].emotions[i] + " at time: " + arrVideoListPlay[0].times[i]);
                clickCount = 0;
                badSound.play();
                newAnimPlay(compare[1], "Images/wrong.png", 600);

                var btn = document.getElementById("nextVid");
                btn.style.background = "#ff0000";
                btn.style.display = "block";
                isWrong = true;
                Play_video.pause();
                return;
            }
        }
    });
}

function newAnimPlay(emot, img, duration) { //600, 1200
    document.getElementById(emot + "-overlay").src = img;
    $("#" + emot + "-overlay").animate({opacity: 0.75}, duration);
    $("#" + emot + "-overlay").animate({opacity: 0}, duration*2);
}

function NextButtonClickPlay() {
    $('#nextVid').click(function (e) {

        var returnVid = arrVideoListPlay.shift();

        //seperate function, maybe add to wrong -> back -> play again so its not the same vid
        if(isWrong) {
            arrVideoListPlay.push(returnVid);
            shuffleArrPlay();
            isWrong = false;
        }

        if(arrVideoListPlay.length > 0) {
            document.getElementById("nextVid").style.background = "#045123";
            document.getElementById("nextVid").style.display = "none";
            Play_setVideo(arrVideoListPlay[0]);
            Play_video.play();
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
    Play_video.play();
}


function Play_PlayFromBack() {
    //clickCount = 0;
    document.getElementById("nextVid").style.display = "none";
    Play_video.currentTime = 0;
    Play_video.play();
    console.log("Play play vid");
}

// function ReloadOnPlay() {
//     document.getElementById("nextVid").style.display = "none";
//     arrVideoListPlay = [];
//     //videoList = [];
// }

function Play_setInteractionCallbacksPlay() {
    console.log('Play_setInteractionCallbacksPlay() begin');

    $('#video-progress-bar').click(function (e) {
        var marginLeft = parseFloat(window.getComputedStyle(Play_progress).marginLeft.match(/\d+/)[0]);
        var percent = (e.pageX - marginLeft - Play_progressFilled.clientWidth/2) / Play_progress.clientWidth;

        Play_video.currentTime = Play_video.duration * percent;
    });

    // var greenLights = document.getElementsByClassName('hover_button');
    // Array.prototype.forEach.call(greenLights, function (el) {
    //     if (isMobile()) {
    //         el.onmousedown = function () {
    //             this.style.backgroundColor = '#D3D3D37A';
    //         };
    //         el.onmouseup = function () {
    //             this.style.backgroundColor = '#ff000000';
    //         };
    //     } else {
    //         el.onmouseover = function () {
    //             this.style.backgroundColor = '#D3D3D37A';
    //         };
    //         el.onmouseout = function () {
    //             this.style.backgroundColor = '#ff000000';
    //         };
    //     }
    // });

    $('#button-fullscreen').click(function () {
        Play_toggleFullScreen();
        });


    $('#Play-back-to-main-menu').click(function () {
        divMainMenu.style.display = 'inline';
        divPlay.style.display = 'none';
        ReEnter = true;
        Play_video.pause();
        console.log("Button Back From Play To Main Menu clicked!");
    });

    $('#button-pause').click(function () {
        if(Play_video.currentTime < Play_video.duration) {
            if(pauseCount > 0) {
                Play_video.pause();
                pauseCount *= -1;
            }
            else {
                Play_video.play();
                pauseCount *= -1;
            }
        }
    });
    
    console.log("Play_setInteractionCallbacksPlay() end");
}

var lastOrientation = '';
function Play_onVideoUpdate() {
    const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;
    if (orientation.indexOf('portrait') != -1) {
        Play_video.pause();
    } else {
        if (Play_video.paused && lastOrientation.indexOf('portrait') != -1) {
            Play_video.play();
        }
    }
    lastOrientation = orientation;

    const percent = (Play_video.currentTime / Play_video.duration) * 100;
    progressWidth = Play_progressStyle.getPropertyValue("width");
    progressWidth = progressWidth.substring(0, progressWidth.length - 2);
    progressWidth = parseFloat(progressWidth) * percent / 100;

    var marginLeft = parseFloat(Play_progressStyle.marginLeft.match(/\d+/)[0]);
    Play_progressFilled.style.left = (marginLeft + progressWidth) + "px";

    var cur = Play_video.currentTime.toString();
    var dur = Play_video.duration.toString();
    Play_divCurrentVideoTime.textContent = cur.substring(0, cur.indexOf('.') + 2) + ' / ' + dur.substring(0, dur.indexOf('.') + 2);

    Train();
}

function Play_setVideoControls() {
    console.log('Play_setVideoControls()');
    //Play_imagePlay.src = "Images/ic_media_pause.png";
}

// function Play_onResize() {
//     if (divPlay.style.display == 'inline') {
//         console.log('Play_onResize');

//         Play_setGreenLights();
//     }
// }

function Play_setFullscreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
}

function Play_toggleFullScreen() {
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


function Play_setVideo(video, emotion) {
    if(arrVideoListPlay.length > 0) {
        //console.log("Set video to: " + arrVideoListPlay[0].name);
        Play_video.src = arrVideoListPlay[0].name;
        console.log(arrVideoListPlay[0].emotions);
    }
    else {
        console.log("video list empty");
    }
}

/* Play JS main function */
function Play_show() {
    console.log('Play_show()');

    setInterval(Play_onVideoUpdate, 50);

    //Play_setGreenLights();
    Play_setVideoControls();

    Play_setInteractionCallbacksPlay();

    CheckClickPlay(clickCountPlay);
    NextButtonClickPlay();

    console.log(arrVideoListPlay[0].emotions);

    videoCounterPlay = arrVideoListPlay.length;

    //window.onresize = Play_onResize;

    //Play_setFullscreen();
    Play_video.src = arrVideoListPlay[0].name;
    Play_video.play();
}

function update(fftObject) {
    console.log("upd");
}
