let rootDomain = "https://s3-us-west-2.amazonaws.com/escience.washington.edu.viziometrics/artstor/deep_mapping/128d/";
let exampleFile = "drescher_2417f_post_as_8b_srgb.png";
var global_json;

function getDataByFileName(fileName) {
    var similarDiv = $("#similarImages");
    similarDiv.empty();

    let file = global_json[fileName];

    $("#selectedImg").attr('src', rootDomain + file["img_name"]);
    $("#title").text(file["Title"]);
    $("#collection").text(file["Collection"]);
    $("#creator").text(file["Creator"]);
    console.log(file);
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

function getRandomByFileName() {
    var randomDiv = $("#randomImg");
    randomDiv.empty();
    var keys = Object.keys(global_json);
    for (var i = 1; i <= 30; i++) {
        var randomImg = keys[Math.floor(keys.length * Math.random())];
        randomDiv.append(createImgByFileName(randomImg, true));
    }
}

function createImgByFileName(fileName, hide) {
    console.log(fileName);
    let file1 = global_json[fileName];
    console.log(file1);
    var div = document.createElement('div');
    var img = document.createElement('img');
    var title = document.createElement('h5');
    var collection = document.createElement('p');
    img.src = rootDomain + fileName;
    img.title = fileName;
    img.classList.add("card-img-top");
    img.addEventListener("click", function () {
        getDataByFileName(fileName);
        $(window).scrollTop(0);
    });
    if (hide) {
        img.addEventListener("click", function () {
            $("#entry").hide();
            $("#search").show();
        });
    }
    div.appendChild(img);
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("card-body");
    title.classList.add("card-title");
    title.innerHTML = file1["Title"];
    collection.classList.add("card-text");
    collection.innerHTML = file1["Collection"];

    innerDiv.appendChild(title);
    innerDiv.appendChild(collection);
    div.appendChild(innerDiv);
    div.classList.add('card');
    return div;
}

document.getElementById("homeBtn").addEventListener("click", function () {
    $("#entry").show();
    $("#search").hide();
});


loadJson();
