//Global Variables
var globalColor = "#00000";
var canvas = new fabric.Canvas('meme');
canvas.backgroundColor = "black";
$(document).ready(function () {

    //gets all pictures for database
    $.get("api/get_all.php", function (res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            //Adds them to the page
            $("#meme_selector_row").append("<td>" + res[i]["img_url"] + "</td>");
        }

    });
    //Inits the color pickers
    $(".basic").spectrum({
        color: "#000",
        change: function (color) {
            console.log("change called: " + color.toHexString());
            globalColor = color.toHexString();
        }
    });

    //sets the image to the canvas giving image ID
    function getImage(id) {

        var imgElement = document.getElementById(id);
        var img = $("#" + id);

        var dummy_img = $("<img>").attr("src", $(img).attr("src"));
        var width = dummy_img[0].width;
        var height = dummy_img[0].height;

        var imgInstance = new fabric.Image(imgElement);
        canvas.setWidth(width);
        canvas.setHeight(height);

        canvas.setBackgroundImage(imgInstance);
        canvas.centerObject(imgInstance)
        canvas.setBackgroundImage(imgInstance);
        canvas.renderAll();

    }

    //Checks if a pciture has been clicked and then sets it to the canvas
    $("#meme_selector").on("click", "td", function () {

        getImage($(this).children()[0].id);

    });

    //Opens a modal and handles the file upload
    $('#uploadBtn').on('click', function () {

        $.ajax({
            // Your server script to process the upload
            url: 'api/upload.php',
            type: 'POST',

            // Form data
            data: new FormData($('form')[0]),

            // Tell jQuery not to process data or worry about content-type
            // You *must* include these options!
            cache: false,
            contentType: false,
            processData: false,

            success: function (response) {
                $.ajax({

                    url: "api/get_image.php?id=" + response,
                    type: 'GET',
                    success: function (res) {
                        var img = new Image();
                        //gets the uploaded image and sets it to the canvas
                        img.onload = function () {
                            var f_img = new fabric.Image(img);
                            canvas.setHeight(f_img.height);
                            canvas.setWidth(f_img.width);
                            canvas.setBackgroundImage(f_img);
                            canvas.centerObject(f_img);
                            canvas.renderAll();
                        };
                        img.src = res;
                    }
                });
            },
            // Custom XMLHttpRequest
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            $('progress').attr({
                                value: e.loaded,
                                max: e.total,
                            });
                        }
                    }, false);
                }
                return myXhr;
            }
        });
    });


    //Opens modal and ask user for name and handles downloaded of file
    $("#download").click(function () {
        var name_file = $("#nameFile").val();
        if (name_file != "") {
            $("#meme").get(0).toBlob(function (blob) {
                var fd = new FormData();
                fd.append('fname', name_file + '.png');
                fd.append('data', blob);
                //Uploads the picutre to the gallery for other users to enjoy
                $.ajax({
                    type: 'POST',
                    url: 'api/image.php',
                    data: fd,
                    processData: false,
                    contentType: false
                }).done(function (data) {
                    console.log(data);
                });

                saveAs(blob, name_file + ".png");
            });
        }
    });



    //Adds a text to the canvas for user to edit
    $("#add").on("click", function () {
        addText(globalColor);
    });


    //Deletes the selected text
    $("#delete").on("click", function () {
        var activeObject = canvas.getActiveObject()
        canvas.remove(activeObject);
    });


    //Handles adding text with current global color
    function addText(color) {
        canvas.add(new fabric.IText('New Text', {
            fontFamily: 'Arial',
            top: canvas.getHeight() / 2,
            width: canvas.getWidth() / 2 - 50,
            fill: color
        }));

        canvas.renderAll();
    }

});