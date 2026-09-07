const canvas = document.getElementById("thumbnailCanvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;


/* Background image upload */

document.getElementById("imageUpload")
    .addEventListener("change", function(event) {

        const file = event.target.files[0];

        if (!file) {
            uploadedImage = null;
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {

            const image = new Image();

            image.onload = function() {

                uploadedImage = image;

                generateThumbnail();

            };

            image.src = e.target.result;

        };

        reader.readAsDataURL(file);

    });


/* Generate thumbnail */

function generateThumbnail() {

    const mainText =
        document.getElementById("mainText")
        .value
        .trim() || "BOOYAH!";


    const subText =
        document.getElementById("subText")
        .value
        .trim() || "EPIC GAMEPLAY";


    const style =
        document.getElementById("thumbnailStyle")
        .value;


    drawBackground(style);


    if (uploadedImage) {

        drawUploadedImage(uploadedImage);

        drawOverlay();

    }


    drawText(mainText, subText);

}


/* Draw background */

function drawBackground(style) {

    let gradient;


    if (style === "purple") {

        gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

        gradient.addColorStop(0, "#17102e");
        gradient.addColorStop(1, "#6c2cff");

    }


    else if (style === "blue") {

        gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

        gradient.addColorStop(0, "#06152d");
        gradient.addColorStop(1, "#0874d1");

    }


    else if (style === "red") {

        gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

        gradient.addColorStop(0, "#250606");
        gradient.addColorStop(1, "#c52222");

    }


    else if (style === "green") {

        gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

        gradient.addColorStop(0, "#071c12");
        gradient.addColorStop(1, "#14a85b");

    }


    else {

        gradient = ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            canvas.height
        );

        gradient.addColorStop(0, "#050505");
        gradient.addColorStop(1, "#252525");

    }


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


/* Draw uploaded image */

function drawUploadedImage(image) {

    const canvasRatio =
        canvas.width / canvas.height;

    const imageRatio =
        image.width / image.height;


    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;


    if (imageRatio > canvasRatio) {

        drawHeight = canvas.height;

        drawWidth =
            image.width *
            (canvas.height / image.height);

        offsetX =
            (canvas.width - drawWidth) / 2;

        offsetY = 0;

    }

    else {

        drawWidth = canvas.width;

        drawHeight =
            image.height *
            (canvas.width / image.width);

        offsetX = 0;

        offsetY =
            (canvas.height - drawHeight) / 2;

    }


    ctx.globalAlpha = 0.7;

    ctx.drawImage(
        image,
        offsetX,
        offsetY,
        drawWidth,
        drawHeight
    );

    ctx.globalAlpha = 1;

}


/* Dark overlay */

function drawOverlay() {

    ctx.fillStyle =
        "rgba(0, 0, 0, 0.38)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


/* Draw text */

function drawText(mainText, subText) {

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";


    /* Main text */

    let fontSize = 125;

    ctx.font =
        `900 ${fontSize}px Arial`;


    /* Reduce font size if text is long */

    while (
        ctx.measureText(mainText).width >
        canvas.width * 0.85 &&
        fontSize > 50
    ) {

        fontSize -= 5;

        ctx.font =
            `900 ${fontSize}px Arial`;

    }


    const mainY = 330;


    /* Text shadow */

    ctx.shadowColor =
        "rgba(0,0,0,0.8)";

    ctx.shadowBlur = 15;

    ctx.shadowOffsetX = 7;

    ctx.shadowOffsetY = 7;


    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        mainText,
        canvas.width / 2,
        mainY
    );


    /* Reset shadow */

    ctx.shadowColor = "transparent";

    ctx.shadowBlur = 0;

    ctx.shadowOffsetX = 0;

    ctx.shadowOffsetY = 0;


    /* Subtitle */

    ctx.font =
        "bold 48px Arial";

    ctx.fillStyle =
        "#eeeeee";


    ctx.fillText(
        subText,
        canvas.width / 2,
        455
    );


    /* Bottom branding */

    ctx.font =
        "bold 28px Arial";

    ctx.fillStyle =
        "rgba(255,255,255,0.75)";


    ctx.fillText(
        "GAMINGTOOLS HUB",
        canvas.width / 2,
        650
    );

}


/* Download */

function downloadThumbnail() {

    const link =
        document.createElement("a");


    link.download =
        "gaming-thumbnail.png";


    link.href =
        canvas.toDataURL("image/png");


    link.click();

}