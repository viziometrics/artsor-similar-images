console.log("hi");
let rootDomain = "https://s3-us-west-2.amazonaws.com/escience.washington.edu.viziometrics/artstor/deep_mapping/128d/";
let exampleFile = "drescher_2417f_post_as_8b_srgb.png";

function getDataByFileName(fileName) {
    var similarDiv = $("#similarImages");
    similarDiv.empty();

    $.getJSON('./data.json', function (json) {
        // console.log(json[fileName]);
        file = json[fileName];
        $("#selectedImg").attr('src', rootDomain + file["img_name"]);
        $("#title").text(file["Title"]);
        $("#creator").text(file["Creator"]);
        for(var i = 1 ; i <= 10; i++){
            var similarFile = file['r' + i];
            similarDiv.append(createImgByFileName(similarFile));
        }
    });
}

function createImgByFileName(fileName){
    var img = document.createElement('img');
    img.src = rootDomain + fileName;
    img.title = fileName;
    img.classList.add("p-2");
    img.addEventListener("click", function(){
        getDataByFileName(fileName);
    });
    return img;
}

getDataByFileName(exampleFile)