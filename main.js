
wristrx = 0;
wristry = 0;
wristlx = 0;
wristly = 0;
PeterPan = 0;
Beatz = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) 
{
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("leftWristX " + leftWristX, "leftWristY " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX " + rightWristX, "rightWristY " + rightWristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill("deepskyblue");
    stroke("deepskyblue");

    if(scoreLeftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElembentById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

    if(coreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}