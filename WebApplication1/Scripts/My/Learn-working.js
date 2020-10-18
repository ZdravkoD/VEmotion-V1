var Learn_animationImgState = {};
var Learn_imgWidth;
var Learn_imgHeight   

var Learn_progress = document.querySelector('#video-progress-bar');
var Learn_progressStyle = window.getComputedStyle(Learn_progress, null);
var Learn_progressFilled = document.querySelector('#video-progress');
var Learn_video = document.querySelector('#mainVid');
var Learn_divCurrentVideoTime = document.querySelector('#currentVideoTime');

var ReEnter = false;
var isFromGallery = false;
var isWrong = false;
//var hasAnswered = false;
var clickCount = 0;
var returnGreenElement;
var currentAnimID;

var goodSound = new Audio("Videos/goodSound.mp3");
var badSound = new Audio("Videos/badSound.mp3");
var winSound = new Audio("Videos/winSound.mp3");
var pauseCount = 1;

var videoCounter;
var arrVideoList = [];
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
//     arrVideoList.push(newVid);
//     arrVideoList.push(newVid1);
//     arrVideoList.push(newVid2);
//     //arrVideoList.push(newVid3);
//     //arrVideoList.push(newVid4);
//     //arrVideoList.push(newVid5);
//     //arrVideoList.push(newVid6);

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

function Learn_animateImg(imgLight) {
    const ANIM_LIGHT_DURATION = 125;
    const ANIM_LIGHT_LOOP_COUNT = 16;
    const ANIM_SCALE_DURATION = ANIM_LIGHT_DURATION * ( ANIM_LIGHT_LOOP_COUNT / 2 );
    const imgLightId = String(imgLight.id);
    const imgId = imgLightId.substring(0, imgLightId.length - "-light".length);

    var isVisible = parseFloat(imgLight.style.opacity) > 0.0;

    Play_animationImgState[imgLightId]++;
    if (Play_animationImgState[imgLightId] > ANIM_LIGHT_LOOP_COUNT) {
        return;
    }

    if (isVisible) {
        /*Light*/
        $('#' + imgLightId).animate({
            opacity: "0"
        }, {
            duration: ANIM_LIGHT_DURATION, queue: false, done: function () {
                Learn_animateImg(imgLight);
            }
        });
    }
    else {
        /*Light*/
        $('#' + imgLightId).animate({
            opacity: "0.75"
        }, {
            duration: ANIM_LIGHT_DURATION, queue: false, done: function () {
                Learn_animateImg(imgLight);
            }
        });
    }

    const imgRect = imgLight.getBoundingClientRect();
    const dY = ((Learn_imgHeight * 1.5) - Learn_imgHeight) / 2;
    const dX = ((Learn_imgWidth * 1.5) - Learn_imgWidth) / 2;
    if (Play_animationImgState[imgLightId] == 1) {
        const targetWidth = (Learn_imgWidth * 1.5) + "px";
        const targetHeight = (Learn_imgHeight * 1.5) + "px";

        $('#' + imgLightId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "-=" + dY,
            left: "-=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });

        $('#' + imgId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "-=" + dY,
            left: "-=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });

    } else if (Play_animationImgState[imgLightId] == ANIM_LIGHT_LOOP_COUNT / 2 + 1) {
        const targetWidth = (Learn_imgWidth) + "px";
        const targetHeight = (Learn_imgHeight) + "px";

        $('#' + imgLightId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "+=" + dY,
            left: "+=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });

        $('#' + imgId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "+=" + dY,
            left: "+=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });
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


//so bad
function CheckClick(clickCount) {
    $('.imgEmotionLight').click(function () {
        var compare = this.id.split("-");
        console.log(this.id);
        if(isWrong) {
            return;
        }
        if(isFromGallery) {
            for(var k = clickCount; k < arrVideoList[arrVideoList.length - 1].emotions.length; k++) {
                var lastTime;
                var nextTime = arrVideoList[arrVideoList.length - 1].times[k];
                if(k == arrVideoList[arrVideoList.length - 1].emotions.length - 1) {
                    nextTime = Learn_video.duration;
                }
                //for first range between 0 and X
                if(k > 0) {
                    lastTime = arrVideoList[arrVideoList.length - 1].times[k-1];
                }
                else {
                    lastTime = 0;
                }
    
                if(compare[1] == arrVideoList[arrVideoList.length - 1].emotions[k] && (Learn_video.currentTime <= nextTime && Learn_video.currentTime >= lastTime)) {
                    Play_animationImgState[this.id] = 0;
                    Learn_animateImg(document.getElementById(this.id));
                    alert("Correct, emotion is: " + compare[1] + " at time between " + lastTime + " and " + arrVideoList[arrVideoList.length - 1].times[k]);
                    clickCount = k + 1;
                    console.log(clickCount);
                    if(clickCount >= arrVideoList[arrVideoList.length - 1].emotions.length) {
                        alert("won");
                        clickCount = 0;
                        document.getElementById("nextVid").style.display = "block";
                        Learn_video.pause();
                        arrVideoList.pop();
                        isFromGallery = false;
                    }
                    return;
                }
                else {
                    console.log("Wrong, emotion is: " + arrVideoList[arrVideoList.length - 1].emotions[k] + " at time: " + arrVideoList[arrVideoList.length - 1].times[k]);
                    clickCount = 0;
                    Learn_video.pause();
                    arrVideoList.pop();
                    isFromGallery = false;
                    return;
                }
            }
            return;
        }

        if(ReEnter) {
            clickCount = 0;
            ReEnter = false;
        }

        for(var i = clickCount; i < arrVideoList[0].emotions.length; i++) {
            console.log(arrVideoList[0].emotions[i]);
            var lastTime;
            var nextTime = arrVideoList[0].times[i];
            if(i == arrVideoList[0].emotions.length - 1) {
                nextTime = Learn_video.duration;
            }
            //for first range between 0 and X
            if(i > 0) {
                lastTime = arrVideoList[0].times[i-1];
            }
            else {
                lastTime = 0;
            }

            if(compare[1] == arrVideoList[0].emotions[i] && (Learn_video.currentTime <= nextTime && Learn_video.currentTime >= lastTime)) {
                currentAnimID = this.id;
                //Learn_animationImgState[this.id] = 0;
                //Learn_animateImg(document.getElementById(this.id));
                //alert("Correct, emotion is: " + compare[1] + " at time between " + lastTime + " and " + arrVideoList[0].times[i]);
                //console.log(document.getElementById(this.id));

                newAnim(compare[1], "Images/right.png", 600);

                clickCount = i + 1;
                goodSound.play();
                if(clickCount >= arrVideoList[0].emotions.length) {
                    alert("won");
                    clickCount = 0;
                    document.getElementById("nextVid").style.display = "block";
                    Learn_video.pause();
                }
                return;
            }
            else {
                console.log(clickCount);
                console.log("Wrong, emotion is: " + arrVideoList[0].emotions[i] + " at time: " + arrVideoList[0].times[i]);
                clickCount = 0;
                currentAnimID = this.id;

                badSound.play();
                // document.getElementById(this.id).style.background = "#ff0000";
                // Learn_animationImgState[this.id] = 0;
                // Learn_animateImg(document.getElementById(this.id));

                returnGreenElement = document.getElementById(this.id);
                //returnGreenElement.style.background = "#ff0000";
                //Learn_animationImgState[this.id] = 0;
                //Learn_animateImg(returnGreenElement);

                //$("#emotion-" + compare[1]).animate({opacity: 0});

                //myAnim(compare[1], 0);
                //setTimeout(myAnim(compare[1], 1), 8000);

                //$("#emotion-" + compare[1]).animate({height: "150px", width: "120px"}, 3000);

                //$("#" + compare[1] + "-wrong").animate({opacity: 0.75}, 1200);

                newAnim(compare[1], "Images/wrong.png", 600);

                var btn = document.getElementById("nextVid");
                btn.style.background = "#ff0000";
                btn.style.display = "block";
                isWrong = true;
                Learn_video.pause();
                //elementGreen(document.getElementById(this.id));
                return;
            }
        }
    });
}

function newAnim(emot, img, duration) { //600, 1200
    document.getElementById(emot + "-overlay").src = img;
    console.log(document.getElementById(emot + "-overlay"));
    $("#" + emot + "-overlay").animate({opacity: 0.75}, duration);
    $("#" + emot + "-overlay").animate({opacity: 0}, duration*2);
}

function myAnim(emot, numb) {
    $("#emotion-" + emot).animate({opacity: numb}, 3000);
    $("#emotion-" + emot).animate({opacity: 0}, "slow");
}

function returnGreen() {
    returnGreenElement.style.background = "#4cff00";
}

function NextButtonClick() {
    $('#nextVid').click(function (e) {
        //Learn_video.pause();
        if(!isFromGallery) {
            var returnVid = arrVideoList.shift();

            //seperate function, maybe add to wrong -> back -> play again so its not the same vid
            if(isWrong) {
                arrVideoList.push(returnVid);
                shuffleArr();
                Play_animationImgState[currentAnimID] = 0;
                returnGreen();
                isWrong = false;
            }
        }
        else {
            arrVideoList.pop();
            isFromGallery = false;
        }

        if(arrVideoList.length > 0) {
            document.getElementById("nextVid").style.background = "#045123";
            document.getElementById("nextVid").style.display = "none";
            Learn_setVideo(arrVideoList[0]);
            Learn_video.play();
            //console.log(arrVideoList[0].emotions);
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

            //newAnim(compare[1], "Images/won.png", 600);
        }
    });
}

function ContinueVid() {
    Learn_video.play();
}


function Learn_PlayFromBack() {
    //clickCount = 0;
    document.getElementById("nextVid").style.display = "none";
    Learn_video.currentTime = 0;
    Learn_video.play();
    console.log("learn play vid");
}

function ReloadOnLearn() {
    document.getElementById("nextVid").style.display = "none";
    arrVideoList = [];
    //videoList = [];
}

function Learn_setInteractionCallbacksLearn() {
    console.log('Learn_setInteractionCallbacksLearn() begin');
    // $('.imgEmotionLight').click(function () {
    //     var testing = this.id.split("-");
    //     //console.log("click on: " + testing[1]);
    //     if(testing[1] == videoList[0].emotion) {

    //         if ($('#' + this.id).is(':animated') == false) {
    //             Learn_animationImgState[this.id] = 0;
    //             Learn_animateImg(document.getElementById(this.id));

    //             //Learn_setVideo("Videos/he-joy-laughing.mp4", "joy");
    //             // videoList.shift();
    //             // for(var i = 0; i < videoList.length; i++) {
    //             //     console.log("Left in list: " + videoList[i].name);
    //             // }
    //             //setTimeout(alert("correct " + testing[1]), 3000);
    //             alert("correct " + testing[1]);
    //             document.getElementById("nextVid").style.display = "block";
    //             Learn_video.pause();

    //             // if(videoList.length > 0) {
    //             //     Learn_setVideo(videoList[0]);
    //             //     Learn_show();
    //             // }
    //         }
    //     }
    //     else {
    //         console.log("wrong, emotion is: " + videoList[0].emotion + ", you clicked: " + testing[1]);
    //     }
    // });


    $('#video-progress-bar').click(function (e) {
        var marginLeft = parseFloat(window.getComputedStyle(Learn_progress).marginLeft.match(/\d+/)[0]);
        var percent = (e.pageX - marginLeft - Learn_progressFilled.clientWidth/2) / Learn_progress.clientWidth;

        Learn_video.currentTime = Learn_video.duration * percent;
    });


    var greenLights = document.getElementsByClassName('hover_button');
    Array.prototype.forEach.call(greenLights, function (el) {
        if (isMobile()) {
            el.onmousedown = function () {
                this.style.backgroundColor = '#D3D3D37A';
            };
            el.onmouseup = function () {
                this.style.backgroundColor = '#ff000000';
            };
        } else {
            el.onmouseover = function () {
                this.style.backgroundColor = '#D3D3D37A';
            };
            el.onmouseout = function () {
                this.style.backgroundColor = '#ff000000';
            };
        }
    });

    $('#button-fullscreen').click(function () {
        Learn_toggleFullScreen();
        });


    $('#learn-back-to-main-menu').click(function () {
        divMainMenu.style.display = 'inline';
        divLearn.style.display = 'none';
        ReEnter = true;
        Learn_video.pause();
        console.log("Button Back From Learn To Main Menu clicked!");
    });


    $('#button-gallery').click(function () {
        divGallery.style.display = 'inline';
        divLearn.style.display = 'none';
        Learn_video.pause();
        showGalleryJS(divLearn);
        console.log("Button Gallery clicked!");
    });

    $('#button-pause').click(function () {
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
    Learn_divCurrentVideoTime.textContent = cur.substring(0, cur.indexOf('.') + 2) + ' / ' + dur.substring(0, dur.indexOf('.') + 2);

    Train();
}

function Learn_setVideoControls() {
    console.log('Learn_setVideoControls()');
    //Learn_imagePlay.src = "Images/ic_media_pause.png";
}

function Learn_onResize() {
    if (divLearn.style.display == 'inline') {
        console.log('Learn_onResize');

        Learn_setGreenLights();
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

var counter = 0;
var areAnimated = [false, false, false];
function Train() {
    if(isFromGallery) {
        for(var i = 0; i < arrVideoList[arrVideoList.length - 1].emotions.length; i++) {
            var lastTime;
            var nextTime = arrVideoList[arrVideoList.length - 1].times[i];

            //for first range between 0 and X
            if(i > 0) {
                lastTime = arrVideoList[arrVideoList.length - 1].times[i-1];
            }
            else {
                lastTime = 0;
            }

                if(!areAnimated[i] && Learn_video.currentTime <= nextTime && Learn_video.currentTime >= lastTime) {
                    //Learn_animationImgState[("emotion-" + arrVideoList[arrVideoList.length - 1].emotions[i] + "-light")] = 0;
                    //Learn_animateImg(document.getElementById("emotion-" + arrVideoList[arrVideoList.length - 1].emotions[i] + "-light"));
                    //myAnim(arrVideoList[arrVideoList.length - 1].emotions[i], 0);
                    console.log("anim: " + arrVideoList[arrVideoList.length - 1].emotions[i]);
                    areAnimated[i] = true;
                    newAnim(arrVideoList[arrVideoList.length - 1].emotions[i], "Images/right.png", 1500);

                    //setTimeout(StartAnim(i), 0); 
                }
                else {
                    console.log("stop: " + arrVideoList[arrVideoList.length - 1].emotions[i]);
                    //myAnim(arrVideoList[arrVideoList.length - 1].emotions[i], 1);
                    
                    //Learn_animationImgState[("emotion-" + arrVideoList[arrVideoList.length - 1].emotions[i] + "-light")] = 0;
                }
            }
        }
    }

function Train1(video) {
    if(isFromGallery) {
        var len = video.emotions.length;
        //StartAnim(0);
        for(var i = 0; i < len; i++) {
            var lastTime;
            var nextTime = video.times[i];
            //for first range between 0 and X
            if(i > 0) {
                lastTime = video.times[i-1];
            }
            else {
                lastTime = 0;
            }
            var tim = nextTime - lastTime;
            
            $("#" + arrVideoList[arrVideoList.length - 1].emotions[i] + "-overlay").animate({opacity: 0.75}, lastTime * 1000);
            $("#" + arrVideoList[arrVideoList.length - 1].emotions[i] + "-overlay").animate({opacity: 0}, tim * 1000);


            // console.log(arrVideoList[arrVideoList.length - 1].times[i] * 1000);
            // //setTimeout(StartAnim(i), arrVideoList[arrVideoList.length - 1].times[i] * 1000);
            // setTimeout(myAnim(arrVideoList[arrVideoList.length - 1].emotions[i], 0), arrVideoList[arrVideoList.length - 1].times[i] * 1000);
            // setTimeout(myAnim(arrVideoList[arrVideoList.length - 1].emotions[i], 1), arrVideoList[arrVideoList.length - 1].times[i] * 1000);
        }

    }
}


function StartAnim(number) {
    Play_animationImgState[("emotion-" + arrVideoList[arrVideoList.length - 1].emotions[number] + "-light")] = 0;
    Learn_animateImg(document.getElementById("emotion-" + arrVideoList[arrVideoList.length - 1].emotions[number] + "-light"));
    console.log("executed at: - " +  arrVideoList[arrVideoList.length - 1].emotions[number] + " -- " + Learn_video.currentTime);
}


function LoadVideoFromGallery(video) {
    //videoList.push(new myVideo(video, emotion));
    //arrVideoList.push(new arrVideo("Videos/he-sad-asd.mp4", ['sad', 'anger'], [10, 15]));

    arrVideoList.push(video);
    isFromGallery = true;
    Learn_video.src = video.name;
    console.log(video);
    Learn_video.play();
    //Train1(video);
}

function Learn_setVideo(video, emotion) {
    if(arrVideoList.length > 0) {
        //console.log("Set video to: " + arrVideoList[0].name);
        Learn_video.src = arrVideoList[0].name;
        console.log(arrVideoList[0].emotions);
    }
    else {
        console.log("video list empty");
    }
}

/* Learn JS main function */
function Learn_show() {
    console.log('Learn_show()');

    setInterval(Learn_onVideoUpdate, 50);

    Learn_setGreenLights();
    Learn_setVideoControls();

    Learn_setInteractionCallbacksLearn();
    CheckClick(clickCount);
    NextButtonClick();

    console.log(arrVideoList[0].emotions);

    videoCounter = arrVideoList.length;

    window.onresize = Learn_onResize;

    //Learn_setFullscreen();

    Learn_video.play();
}

function update(fftObject) {
    console.log("upd");
}
