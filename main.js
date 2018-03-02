let rootDomain = "https://s3-us-west-2.amazonaws.com/escience.washington.edu.viziometrics/artstor/deep_mapping/128d/";
let exampleFile = "drescher_2417f_post_as_8b_srgb.png";
var global_json;

function getDataByFileName(fileName) {
    var similarDiv = $("#similarImages");
    similarDiv.empty();

    file = global_json[fileName];
    $("#selectedImg").attr('src', rootDomain + file["img_name"]);
    $("#title").text(file["Title"]);
    $("#creator").text(file["Creator"]);
    for (var i = 1; i <= 10; i++) {
        var similarFile = file['r' + i];
        similarDiv.append(createImgByFileName(similarFile, false));
    }
}

function loadJson() {
    $("#search").hide();
    $.getJSON('./data.json', function (json) {
        global_json = json;
        getRandomByFileName();
    });
}

function getRandomByFileName(){
    var randomDiv = $("#randomImg");
    var keys = Object.keys(global_json);
    for (var i = 1; i <= 30; i++) {
        var randomImg = keys[Math.floor(keys.length * Math.random())];
        randomDiv.append(createImgByFileName(randomImg, true));
    }
}

function createImgByFileName(fileName, hide) {
    var img = document.createElement('img');
    img.src = rootDomain + fileName;
    img.title = fileName;
    img.classList.add("p-2");
    img.addEventListener("click", function () {
        getDataByFileName(fileName);
    });
    if (hide) {
        img.addEventListener("click", function () {
            $("#entry").hide();
            $("#search").show();
        });
    }
    return img;
}

document.getElementById("homeBtn").addEventListener("click", function () {
    $("#entry").show();
    $("#search").hide();
});


loadJson();
