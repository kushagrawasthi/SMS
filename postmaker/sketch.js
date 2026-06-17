// #region Variable Declarations
let pg, canvas;

// #region DOM Variables

let sketchContainer = document.querySelector("main");

// #region Format DOM Variables
let formatIcons = document.querySelectorAll(".format-icon");
// #endregion

// #region Background DOM Variables
let bgImgSection = document.querySelector("#background-image-controls");
let bgImageToggle = document.querySelector("#bg-image-checkbox"),
    bgOverlayToggle = document.querySelector("#bg-image-overlay-checkbox");
let bgImageInputParent = document.querySelector("#bg-file-input-target");
let bgZoomInput = document.querySelector("#bg-image-zoom");
let bgOffsetXInput = document.querySelector("#bg-image-offset-x"),
    bgOffsetYInput = document.querySelector("#bg-image-offset-y");
// #endregion

// #region Frame DOM Variables
let frameToggle = document.querySelector("#frame-checkbox");
let frameType = document.querySelector("#frame-type-input"),
    cornicesType = document.querySelector("#cornices-type-input");
// #endregion

// #region Color DOM Variables
let colorIcons = document.querySelectorAll(".color-icon");
// #endregion

// #region Save DOM Variables
let saveSection = document.querySelector("#save-controls");
let saveButton = document.querySelector("#save-button"),
    exportNameInput = document.querySelector("#export-name");
// #endregion

// #endregion

// #region Format Variables
let sizes = [
    { label: "Post-Default", width: 1080, height: 1440 },
    { label: "Post-Square", width: 1080, height: 1080 },
    { label: "Post-Landscape", width: 1920, height: 1440 },
    { label: "Reel/Story", width: 1080, height: 1920 },
];
let scaleFactor = 1;
let chosenSize;
let exportSize = sizes[0];
let aspect = exportSize.width / exportSize.height;
// #endregion

// #region Background and Frame Variables
let bgImageInput;
let bgImg;
let bgImgLightness;
let bgImgXOffset = 0,
    bgImgYOffset = 0;
let bgZoom = bgZoomInput.value;
let orientation;
let frameTypes = ["basic", "thick-flush", "dashed", "corner", "corner-tab"];
// #endregion

// #region Color Variables
let colorDropdown;
let syaahi, halda, suvarna;
let colorSchemes;
let selectedColorscheme;
// #endregion

//#endregion

function setup() {
    angleMode(DEGREES);

    // #region COLORS
    syaahi = color("#272011");
    halda = color("#d3cdc4");
    suvarna = color("#9f8d6a");
    colorSchemes = [
        {
            name: "Dark-1",
            backgroundColor: syaahi,
            foregroundColor: suvarna,
            textColor: suvarna,
            buttonColor: halda,
        },
        {
            name: "Dark-2",
            backgroundColor: syaahi,
            foregroundColor: suvarna,
            textColor: halda,
            buttonColor: halda,
        },
        {
            name: "light-1",
            backgroundColor: halda,
            foregroundColor: syaahi,
            textColor: syaahi,
            buttonColor: suvarna,
        },
        {
            name: "light-2",
            backgroundColor: halda,
            foregroundColor: syaahi,
            textColor: suvarna,
            buttonColor: suvarna,
        },
        {
            name: "light-3",
            backgroundColor: halda,
            foregroundColor: suvarna,
            textColor: syaahi,
            buttonColor: syaahi,
        },
        {
            name: "medium-1",
            backgroundColor: suvarna,
            foregroundColor: syaahi,
            textColor: syaahi,
            buttonColor: halda,
        },
        {
            name: "medium-2",
            backgroundColor: suvarna,
            foregroundColor: halda,
            textColor: halda,
            buttonColor: syaahi,
        },
    ];
    selectedColorscheme = colorSchemes[0];
    // #endregion

    // #region SIZES
    for (let i = 0; i < sizes.length; i++) {
        formatIcons[i].addEventListener("click", function () {
            for (let f = 0; f < formatIcons.length; f++) {
                formatIcons[f].classList.remove("icon-selected");
            }
            formatIcons[i].classList.add("icon-selected");
            exportSize = sizes[i];
            aspect = exportSize.width / exportSize.height;
            pg.resizeCanvas(exportSize.width, exportSize.height);
            resizeCanvas(
                setPreviewDimensions().previewWidth,
                setPreviewDimensions().previewHeight
            );
            setBackground();
            print(
                `Canvas Dimensions Changed to ${exportSize.width + " x " + exportSize.height
                }`
            );
            return exportSize;
        });
    }
    
    colorDropdown = createSelect();
    colorDropdown.hide();
    for (let i = 0; i < colorSchemes.length; i++) {
        colorDropdown.option(colorSchemes[i].name, i);
    }
    colorDropdown.input(function () {
        setColors();
        print("color scheme changed");
    });
    for (let i = 0; i < colorSchemes.length; i++) {
        colorIcons[i].addEventListener("click", function () {
            for (let c = 0; c < colorIcons.length; c++) {
                colorIcons[c].classList.remove("icon-selected");
            }
            colorIcons[i].classList.add("icon-selected");
            colorDropdown.selected(i);
            selectedColorscheme = colorSchemes[i];
            setBackground();
        });
    }

    // #endregion

    // #region BACKGROUND IMAGE
    bgImageInput = createFileInput(handleBgImage);
    bgImageInput.parent(bgImageInputParent);
    bgImageInput.attribute("disabled", true);
    bgImgSection.style.opacity = 0.4;
    function handleBgImage(file) {
        if (file.type === "image") {
            bgImg = loadImage(file.data, () => {
                print("Background Image Uploaded");
                if (bgImg.width < bgImg.height) {
                    orientation = "portrait";
                } else if (bgImg.width > bgImg.height) {
                    orientation = "landscape";
                } else if (bgImg.width === bgImg.height) {
                    orientation = "square";
                }
                print(orientation);
            });
        } else {
            window.alert("Not an Image");
        }
    }
    bgImageToggle.addEventListener("input", function () {
        if (bgImageToggle.checked) {
            bgImageInput.removeAttribute("disabled");
            bgImgSection.style.opacity = 1;
        } else {
            bgImageInput.attribute("disabled", true);
            bgImgSection.style.opacity = 0.4;
        }
    });
    bgZoomInput.addEventListener("input", function () {
        bgZoom = bgZoomInput.value;
    });
    // #endregion

    // #region SAVE

    saveButton.addEventListener("click", function () {
        let exportName = `${exportNameInput.value}_${exportSize.width}x${exportSize.width
            }_${String(day()).padStart(2, "0")}${String(month()).padStart(
                2,
                "0"
            )}${year()}`;
        pg.save(`${exportName}.png`);
    });

    // #endregion

    // #region CANVAS + BUFFERS
    pg = createGraphics(exportSize.width, exportSize.height);

    canvas = createCanvas(
        setPreviewDimensions().previewWidth,
        setPreviewDimensions().previewHeight
    );
    canvas.parent(sketchContainer);
    // #endregion

    // #region INITIAL
    setBackground();
    //#endregion
}

function windowResized() {
    resizeCanvas(
        setPreviewDimensions().previewWidth,
        setPreviewDimensions().previewHeight
    );
}

function draw() {
    image(
        pg,
        0,
        0,
        setPreviewDimensions().previewWidth,
        setPreviewDimensions().previewHeight
    );
    setBackground();
    drawFrame();
}

// #region OPERATIONAL FUNCTIONS

function checkBgImgLightness() {
    if (bgImg) {
        bgImgLightness = bgImg.loadPixels();
        print(bgImg.pixels);
    }
}

function setPreviewDimensions() {
    if (windowWidth > 700) {
        let cw = sketchContainer.clientWidth - 100;
        let ch = sketchContainer.clientHeight - 100;

        let containerAspect = cw / ch;

        if (containerAspect > aspect) {
            // Container is wider than target aspect → constrain by height
            return {
                previewWidth: ch * aspect,
                previewHeight: ch,
            };
        } else {
            // Container is narrower or equal → constrain by width
            return {
                previewWidth: cw,
                previewHeight: cw / aspect,
            };
        }
    } else {
        return {
            previewWidth: windowWidth - 50,
            previewHeight: (windowWidth - 50) / aspect,
        };
    }
}

function setBackground() {
    if (bgImageToggle.checked) {
        drawBgImage();
        bgOverlayToggle.disabled = false;
    } else {
        pg.background(selectedColorscheme.backgroundColor);
        bgOverlayToggle.disabled = true;
    }

    if (bgOverlayToggle.checked) {
        pg.push();
        pg.rectMode(CENTER);
        pg.blendMode(MULTIPLY);
        pg.fill(color(0, 0, 0, 75));
        pg.rect(pg.width / 2, pg.height / 2, pg.width, pg.height);
        pg.pop();
    } else {
        return;
    }
}

function drawBgImage() {
    let bgImgW, bgImgH;

    if (bgImg) {
        let bgImgAspect = bgImg.width / bgImg.height;

        if (orientation === "portrait") {
            if (aspect >= 1) {
                bgImgW = pg.width;
                bgImgH = pg.width / bgImgAspect;
            } else if (aspect <= 1) {
                bgImgH = pg.height;
                bgImgW = pg.height * bgImgAspect;
                if (bgImgW < pg.width) {
                    bgImgW = pg.width;
                    bgImgH = pg.width / bgImgAspect;
                } else {
                    bgImgH = pg.height;
                    bgImgW = pg.height * bgImgAspect;
                }
            }
        } else if (orientation === "landscape") {
            if (aspect >= 1) {
                bgImgH = pg.height;
                bgImgW = pg.height * bgImgAspect;
            } else if (aspect <= 1) {
                bgImgH = pg.height;
                bgImgW = pg.height * bgImgAspect;
            }
        } else if (orientation === "square") {
            if (aspect >= 1) {
                bgImgH = pg.width;
                bgImgW = pg.width;
            } else if (aspect <= 1) {
                bgImgH = pg.height;
                bgImgW = pg.height;
            }
        }

        let renderedImgW = bgImgW * bgZoom,
            renderedImgH = bgImgH * bgZoom;

        let offsettableX = renderedImgW - pg.width,
            offsettableY = renderedImgH - pg.height;
        bgOffsetXInput.min = int(-(offsettableX / 2));
        bgOffsetXInput.max = int(offsettableX / 2);
        bgOffsetYInput.min = int(-(offsettableY / 2));
        bgOffsetYInput.max = int(offsettableY / 2);
        bgImgXOffset = int(bgOffsetXInput.value);
        bgImgYOffset = int(bgOffsetYInput.value);
        pg.imageMode(CENTER);
        pg.image(bgImg, pg.width / 2 + bgImgXOffset, pg.height / 2 + bgImgYOffset, renderedImgW, renderedImgH);
    }
}

function drawFrame() {
    pg.push();
    pg.rectMode(CENTER);
    pg.noFill();

    if (frameToggle.checked) {
        //setBackground();
        if (frameType.value === "0") {
            pg.push();
            if (bgImageToggle.checked && bgImg) {
                pg.stroke(halda);
            } else {
                pg.stroke(selectedColorscheme.foregroundColor);

            }
            pg.strokeWeight(5);
            pg.rect(pg.width / 2, pg.height / 2, pg.width - 100, pg.height - 100);
            pg.pop();
        } else if (frameType.value === "1") {
            pg.push();
            pg.stroke(selectedColorscheme.foregroundColor);
            pg.strokeWeight(50);
            pg.rect(pg.width / 2, pg.height / 2, pg.width - 50, pg.height - 50);
            pg.pop();
        }
        else if (frameType.value === "2") {
            pg.push()
            pg.strokeWeight(5);
            pg.stroke(selectedColorscheme.foregroundColor);
            pg.drawingContext.setLineDash([12, 12]);
            pg.rect(pg.width / 2, pg.height / 2, pg.width - 100, pg.height - 100);
            pg.pop();
        }
        else if (frameType.value === "3") {
            pg.push();
            pg.strokeWeight(5);

            pg.stroke(selectedColorscheme.foregroundColor);
            pg.beginShape();
            pg.vertex(pg.width - 50, pg.height - 100);
            pg.vertex(pg.width - 50, pg.height - 50);
            pg.vertex(pg.width - 100, pg.height - 50);
            pg.endShape();
            pg.beginShape();
            pg.vertex(50, pg.height - 100);
            pg.vertex(50, pg.height - 50);
            pg.vertex(100, pg.height - 50);
            pg.endShape();
            pg.beginShape();
            pg.vertex(pg.width - 50, 100);
            pg.vertex(pg.width - 50, 50);
            pg.vertex(pg.width - 100, 50);
            pg.endShape();
            pg.beginShape();
            pg.vertex(50, 100);
            pg.vertex(50, 50);
            pg.vertex(100, 50);
            pg.endShape();



            pg.pop();
        }
        else if (frameType.value === "4") {
            pg.push();
            pg.strokeWeight(0);
            pg.fill(selectedColorscheme.foregroundColor)
            pg.beginShape();
            pg.vertex(pg.width - 50, pg.height - 100);
            pg.vertex(pg.width - 50, pg.height - 50);
            pg.vertex(pg.width - 100, pg.height - 50);
            pg.endShape(CLOSE);
            pg.beginShape();
            pg.vertex(50, pg.height - 100);
            pg.vertex(50, pg.height - 50);
            pg.vertex(100, pg.height - 50);
            pg.endShape(CLOSE);
            pg.beginShape();
            pg.vertex(pg.width - 50, 100);
            pg.vertex(pg.width - 50, 50);
            pg.vertex(pg.width - 100, 50);
            pg.endShape(CLOSE);
            pg.beginShape();
            pg.vertex(50, 100);
            pg.vertex(50, 50);
            pg.vertex(100, 50);
            pg.endShape(CLOSE);
            pg.pop();
        }
        pg.pop();
    }
}

function normalisedX() {
    let canvasDimensions = setPreviewDimensions();
    let normalisedX = mouseX / canvasDimensions.previewWidth;
    return normalisedX;
}

function normalisedY() {
    let canvasDimensions = setPreviewDimensions();
    let normalisedY = mouseY / canvasDimensions.previewHeight;
    return normalisedY;
}

// #endregion
