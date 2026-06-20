// #region Variable Declarations
let pg, pgGuide, canvas;

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
    cornicesType = document.querySelector("#cornices-type-input"),
    badgesCheckbox = document.querySelector("#badges-checkbox"),
    badgeTopInput    = document.querySelector("#badge-top-text"),
    badgeBottomInput = document.querySelector("#badge-bottom-text"),
    frameOptions     = document.querySelector("#frame-options"),
    badgeTextInputs  = document.querySelector("#badge-text-inputs"),
    bgImageOptions   = document.querySelector("#bg-image-options");
// #endregion

// #region Color DOM Variables
let colorIcons = document.querySelectorAll(".color-icon");
// #endregion

// #region Typography DOM Variables
let marginaliaToggle = document.querySelector('#marginalia-checkbox');
let guidesToggle    = document.querySelector('#guides-toggle');
let safeZonesToggle = document.querySelector('#safe-zones-toggle');

// content
let contentLayoutRadios    = document.querySelectorAll('input[name="content-layout"]');
let textOverlayHeadingToggle    = document.querySelector('#text-overlay-heading-toggle');
let textOverlayHeadingText      = document.querySelector('#text-overlay-heading-text');
let textOverlayHeadingSize      = document.querySelector('#text-overlay-heading-size');
let textOverlaySubheadingToggle = document.querySelector('#text-overlay-subheading-toggle');
let textOverlaySubheadingText   = document.querySelector('#text-overlay-subheading-text');
let textOverlaySubheadingGap    = document.querySelector('#text-overlay-subheading-gap');
let textOverlayLogoToggle       = document.querySelector('#text-overlay-logo-toggle');
let textOverlayLogoPositionRadios = document.querySelectorAll('input[name="text-overlay-logo-position"]');
let textOverlayAlignRadios      = document.querySelectorAll('input[name="text-overlay-align"]');
let marginaliaSection = document.querySelector('#marginalia-controls');
let modeOptions = document.querySelectorAll('.mode-option');
let marginaliaManualInputs = document.querySelector('#marginalia-manual-inputs');
let marginaliaTopInput    = document.querySelector('#marginalia-top');
let marginaliaBottomInput = document.querySelector('#marginalia-bottom');
let marginaliaLeftInput   = document.querySelector('#marginalia-left');
let marginaliaRightInput  = document.querySelector('#marginalia-right');
let marginaliaPathInputs  = document.querySelector('#marginalia-path-inputs');
let marginaliaPathInput   = document.querySelector('#marginalia-path-text');
// #endregion

// #region Save DOM Variables
let saveSection = document.querySelector("#save-controls");
let saveButton = document.querySelector("#save-button"),
    exportNameInput = document.querySelector("#export-name");
// #endregion

// #endregion

// #region Format Variables
let sizes = [
    { label: "Post-Default",   width: 1080, height: 1440, safeZone: null },
    { label: "Post-Square",    width: 1080, height: 1080, safeZone: { left: 135, right: 135, top: 0,   bottom: 0   } },
    { label: "Post-Landscape", width: 1920, height: 1440, safeZone: { left: 420, right: 420, top: 0,   bottom: 0   } },
    { label: "Reel/Story",     width: 1080, height: 1920, safeZone: { left: 0,   right: 0,   top: 420, bottom: 420 } },
];
let scaleFactor = 1;
let chosenSize;
let exportSize = sizes[0];
let aspect = exportSize.width / exportSize.height;
// #endregion

// #region Typography Variables
let marginaliaMode = 'manual';
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

// #region Logo Variants
const logoVariants = [
    { color: 'Syaahi',  layout: 'Stacked', path: 'assets/Logo_Syaahi_Stacked.png'  },
    { color: 'Syaahi',  layout: 'Long',    path: 'assets/Logo_Syaahi_Long.png'      },
    { color: 'Suvarna', layout: 'Stacked', path: 'assets/Logo_Suvarna_Stacked.png'  },
    { color: 'Suvarna', layout: 'Long',    path: 'assets/Logo_Suvarna_Long.png'     },
    { color: 'Halda',   layout: 'Stacked', path: 'assets/Logo_Halda_Stacked.png'    },
    { color: 'Halda',   layout: 'Long',    path: 'assets/Logo_Halda_Long.png'       },
];
let logoImages = {}; // keyed as 'Color_Layout', e.g. 'Suvarna_Long'
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
            foregroundColor: suvarna, foregroundName: 'Suvarna',
            textColor: suvarna,
            buttonColor: halda,
        },
        {
            name: "Dark-2",
            backgroundColor: syaahi,
            foregroundColor: suvarna, foregroundName: 'Suvarna',
            textColor: halda,
            buttonColor: halda,
        },
        {
            name: "light-1",
            backgroundColor: halda,
            foregroundColor: syaahi, foregroundName: 'Syaahi',
            textColor: syaahi,
            buttonColor: suvarna,
        },
        {
            name: "light-2",
            backgroundColor: halda,
            foregroundColor: syaahi, foregroundName: 'Syaahi',
            textColor: suvarna,
            buttonColor: suvarna,
        },
        {
            name: "light-3",
            backgroundColor: halda,
            foregroundColor: suvarna, foregroundName: 'Suvarna',
            textColor: syaahi,
            buttonColor: syaahi,
        },
        {
            name: "medium-1",
            backgroundColor: suvarna,
            foregroundColor: syaahi, foregroundName: 'Syaahi',
            textColor: syaahi,
            buttonColor: halda,
        },
        {
            name: "medium-2",
            backgroundColor: suvarna,
            foregroundColor: halda, foregroundName: 'Halda',
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
            pgGuide.resizeCanvas(exportSize.width, exportSize.height);
            resizeCanvas(
                setPreviewDimensions().previewWidth,
                setPreviewDimensions().previewHeight
            );
            setBackground();
            updateLogoSection();
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
    bgImageInput.style("opacity", "0.4");
    function handleBgImage(file) {
        if (file.type === "image") {
            bgImg = loadImage(file.data, () => {
                print("Background Image Uploaded");
                bgImageOptions.classList.add('expanded');
                if (bgImg.width < bgImg.height) {
                    orientation = "portrait";
                } else if (bgImg.width > bgImg.height) {
                    orientation = "landscape";
                } else if (bgImg.width === bgImg.height) {
                    orientation = "square";
                }
                print(orientation);
                autoSelectPaletteFromImage();
            });
        } else {
            window.alert("Not an Image");
        }
    }
    bgImageToggle.addEventListener("input", function () {
        if (bgImageToggle.checked) {
            bgImageInput.removeAttribute("disabled");
            bgImageInput.style("opacity", "1");
        } else {
            bgImageInput.attribute("disabled", true);
            bgImageInput.style("opacity", "0.4");
        }
    });
    bgZoomInput.addEventListener("input", function () {
        bgZoom = bgZoomInput.value;
    });
    const badgeCheckboxOption = badgesCheckbox.closest('.checkbox-option');
    badgeCheckboxOption.style.pointerEvents = 'none';
    frameToggle.addEventListener("input", function () {
        const active = frameToggle.checked;
        frameOptions.classList.toggle('expanded', active);
        badgeCheckboxOption.style.pointerEvents = active ? 'auto' : 'none';
        if (!active) badgeTextInputs.classList.remove('expanded');
        updateMarginaliaOptions();
    });
    frameType.addEventListener("change", function () {
        print("Frame type changed");
        updateCornicesOptions();
        updateBadgesAvailability();
    });
    badgesCheckbox.addEventListener('input', function () {
        badgeTextInputs.classList.toggle('expanded', badgesCheckbox.checked);
        updateMarginaliaOptions();
        updateLogoSection();
    });
    cornicesType.addEventListener("change", function () {
        print("Cornices type changed");
        updateMarginaliaOptions();
    });
    // #endregion

    // #region SAVE

    saveButton.addEventListener("click", function () {
        let exportName = `${exportNameInput.value}_${exportSize.width}x${exportSize.height
            }_${String(day()).padStart(2, "0")}${String(month()).padStart(
                2,
                "0"
            )}${year()}`;
        pg.save(`${exportName}.png`);
    });

    // #endregion

    // #region CANVAS + BUFFERS
    pg = createGraphics(exportSize.width, exportSize.height);
    pgGuide = createGraphics(exportSize.width, exportSize.height);

    logoVariants.forEach(v => {
        logoImages[`${v.color}_${v.layout}`] = loadImage(v.path);
    });

    canvas = createCanvas(
        setPreviewDimensions().previewWidth,
        setPreviewDimensions().previewHeight
    );
    canvas.parent(sketchContainer);
    // #endregion

    // #region INITIAL
    setBackground();
    updateCornicesOptions();
    updateBadgesAvailability();

    document.querySelectorAll('.control-section:not(#save-controls) h3').forEach(h3 => {
        h3.addEventListener('click', () => {
            h3.closest('.control-section').classList.toggle('open');
        });
    });

    const marginaliaOptions = document.querySelector('#marginalia-options');
    marginaliaToggle.addEventListener('input', function () {
        marginaliaOptions.classList.toggle('expanded', marginaliaToggle.checked);
        updateMarginaliaOptions();
    });

    const contentLayoutRadios = document.querySelectorAll('input[name="content-layout"]');
    contentLayoutRadios.forEach(radio => {
        radio.addEventListener('input', function () {
            document.querySelectorAll('.content-layout-options').forEach(panel => {
                panel.classList.remove('expanded');
            });
            const target = document.querySelector(`#content-${this.value.replace(/-/g, '-')}-options`);
            if (target) target.classList.add('expanded');
        });
    });

    const contentSubToggles = [
        'text-overlay-logo-toggle',
        'text-overlay-heading-toggle',
        'text-overlay-subheading-toggle',
        'text-overlay-body-toggle',
        'text-overlay-cta-toggle',
    ];
    const textOverlayDependents = document.getElementById('text-overlay-dependents');
    const headingToggle = document.getElementById('text-overlay-heading-toggle');

    function updateTextOverlayDependents() {
        const active = headingToggle.checked;
        textOverlayDependents.style.opacity       = active ? '1' : '0.4';
        textOverlayDependents.style.pointerEvents = active ? 'auto' : 'none';
        if (!active) {
            ['text-overlay-subheading-toggle', 'text-overlay-logo-toggle',
             'text-overlay-body-toggle', 'text-overlay-cta-toggle'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.checked = false;
                const panel = document.getElementById(id.replace('-toggle', '-options'));
                if (panel) panel.classList.remove('expanded');
            });
        }
    }

    headingToggle.addEventListener('input', () => {
        document.getElementById('text-overlay-heading-options')
            .classList.toggle('expanded', headingToggle.checked);
        updateTextOverlayDependents();
    });

    contentSubToggles.filter(id => id !== 'text-overlay-heading-toggle').forEach(id => {
        const el = document.getElementById(id);
        const panel = document.getElementById(id.replace('-toggle', '-options'));
        if (!el || !panel) return;
        el.addEventListener('input', () => panel.classList.toggle('expanded', el.checked));
    });

    updateTextOverlayDependents();

    const headingSizeLabel = document.getElementById('text-overlay-heading-size-label');
    textOverlayHeadingSize.addEventListener('input', function () {
        headingSizeLabel.textContent = this.value + 'pt';
    });

    const subheadingGapLabel = document.getElementById('text-overlay-subheading-gap-label');
    textOverlaySubheadingGap.addEventListener('input', function () {
        subheadingGapLabel.textContent = this.value + 'px';
    });

    textOverlayHeadingText.addEventListener('input', function () {
        const lines = this.value.split('\n');
        if (lines.length > 3) this.value = lines.slice(0, 3).join('\n');
    });

    modeOptions.forEach(option => {
        option.addEventListener('click', function () {
            modeOptions.forEach(o => o.classList.remove('icon-selected'));
            this.classList.add('icon-selected');
            marginaliaMode = this.querySelector('input[type="radio"]').value;
            marginaliaManualInputs.style.display = marginaliaMode === 'manual' ? 'grid' : 'none';
            marginaliaPathInputs.style.display   = marginaliaMode === 'path'   ? 'grid' : 'none';
            print(`Marginalia mode: ${marginaliaMode}`);
        });
    });
    //#endregion
}

function windowResized() {
    resizeCanvas(
        setPreviewDimensions().previewWidth,
        setPreviewDimensions().previewHeight
    );
}

function draw() {
    const preview = setPreviewDimensions();
    image(pg, 0, 0, preview.previewWidth, preview.previewHeight);
    if (guidesToggle.checked) image(pgGuide, 0, 0, preview.previewWidth, preview.previewHeight);
    setBackground();
    drawGuides();
    drawContent();
    drawFrame();
    drawBadges();
    drawMarginalia();
}

function drawGuides() {
    pgGuide.clear();
    drawContentGrid();
    if (safeZonesToggle.checked) drawSafeZones();
}

function drawSafeZones() {
    const sz = exportSize.safeZone;
    if (!sz) return;

    pgGuide.push();
    pgGuide.noStroke();
    pgGuide.fill(255, 0, 0, 51); // 20% opacity

    if (sz.left   > 0) pgGuide.rect(0,                          0, sz.left,             pgGuide.height);
    if (sz.right  > 0) pgGuide.rect(pgGuide.width - sz.right,   0, sz.right,            pgGuide.height);
    if (sz.top    > 0) pgGuide.rect(0,                          0, pgGuide.width,        sz.top);
    if (sz.bottom > 0) pgGuide.rect(0, pgGuide.height - sz.bottom, pgGuide.width,        sz.bottom);

    pgGuide.pop();
}

function drawContentGrid() {
    const area = getContentArea();
    const cols = 3, rows = 6;
    const colW = area.w / cols;
    const rowH = area.h / rows;

    const cx = pgGuide.width  / 2;
    const cy = pgGuide.height / 2;
    const originX = cx - area.w / 2;
    const originY = cy - area.h / 2;

    pgGuide.push();
    pgGuide.rectMode(CENTER);
    pgGuide.noFill();
    pgGuide.stroke(255, 0, 0);
    pgGuide.strokeWeight(1);
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            pgGuide.rect(
                originX + (c + 0.5) * colW,
                originY + (r + 0.5) * rowH,
                colW,
                rowH
            );
        }
    }
    pgGuide.pop();
}

function updateCornicesOptions() {
    const triangleOption = Array.from(cornicesType.options).find(o => o.value === "Triangle");
    const squareOption   = Array.from(cornicesType.options).find(o => o.value === "Square");
    const cornerOption   = Array.from(cornicesType.options).find(o => o.value === "Corner");

    const disableTriangle = ["1", "3", "4"].includes(frameType.value);
    const disableSquare   = ["3", "4"].includes(frameType.value);
    const disableCorner   = !["0", "2"].includes(frameType.value);

    triangleOption.disabled = disableTriangle;
    squareOption.disabled   = disableSquare;
    cornerOption.disabled   = disableCorner;

    if (disableTriangle && cornicesType.value === "Triangle") cornicesType.value = "None";
    if (disableSquare   && cornicesType.value === "Square")   cornicesType.value = "None";
    if (disableCorner   && cornicesType.value === "Corner")   cornicesType.value = "None";
}

function updateBadgesAvailability() {
    const available = ["0", "2"].includes(frameType.value);
    const badgeRow = badgesCheckbox.closest('.checkbox-option');
    badgeRow.style.opacity = available ? 1 : 0.4;
    badgeRow.style.pointerEvents = available ? 'auto' : 'none';
    if (!available) {
        badgesCheckbox.checked = false;
        badgeTextInputs.classList.remove('expanded');
    }

    const callout     = document.querySelector('#badges-callout');
    const calloutText = document.querySelector('#badges-callout-text');
    if (!available) {
        calloutText.textContent = "Badges are only available with Simple and Dashed frames.";
        callout.style.display = 'block';
    } else {
        callout.style.display = 'none';
    }

    updateMarginaliaOptions();
}

function getMarginaliaColor() {
    return frameType.value === "1"
        ? selectedColorscheme.backgroundColor
        : selectedColorscheme.foregroundColor;
}

function updateLogoSection() {
    const logoSection = document.getElementById('text-overlay-logo-section');
    const logoCallout = document.getElementById('text-overlay-logo-callout');
    if (!logoSection) return;
    const disabled = exportSize.label === 'Reel/Story' || badgesCheckbox.checked;
    logoSection.style.opacity       = disabled ? '0.4' : '1';
    logoSection.style.pointerEvents = disabled ? 'none' : 'auto';
    if (logoCallout) logoCallout.style.display = disabled ? 'block' : 'none';
    if (disabled) {
        textOverlayLogoToggle.checked = false;
        document.getElementById('text-overlay-logo-options').classList.remove('expanded');
    }
}

function updateMarginaliaOptions() {
    const frame   = frameType.value;
    const cornice = cornicesType.value;

    // frame values: "0"=Simple, "1"=Thick, "2"=Dashed, "3"=Corner, "4"=Tabs
    const manualDisabled = ["3", "4"].includes(frame);
    const pathDisabled   = frame === "2" || (!["None", "Triangle"].includes(cornice) && !(frame === "1" && cornice === "Square"));

    const manualOption = modeOptions[0];
    const pathOption   = modeOptions[1];

    manualOption.classList.toggle('mode-option--disabled', manualDisabled);
    pathOption.classList.toggle('mode-option--disabled', pathDisabled);

    // auto-switch mode if the current one becomes unavailable
    if (manualDisabled && marginaliaMode === 'manual' && !pathDisabled) {
        pathOption.click();
    } else if (pathDisabled && marginaliaMode === 'path' && !manualDisabled) {
        manualOption.click();
    }

    // build callout messages
    const messages = [];
    if (frameToggle.checked && badgesCheckbox.checked) {
        messages.push("Marginalia unavailable when badges are active.");
    }
    if (frame === "2") {
        messages.push("Dashed frame: text on path unavailable.");
    }
    if (["3", "4"].includes(frame)) {
        messages.push("Corner / tab frame: manual placement unavailable.");
    }
    if (!["None", "Triangle"].includes(cornice) && !(frame === "1" && cornice === "Square")) {
        messages.push("Text on path requires no cornice or Triangle cornice (except Square with thick frame).");
    }

    const callout     = document.querySelector('#marginalia-callout');
    const calloutText = document.querySelector('#marginalia-callout-text');
    if (messages.length > 0 && marginaliaToggle.checked) {
        calloutText.textContent = messages.join(" ");
        callout.style.display = 'block';
    } else {
        callout.style.display = 'none';
    }
}

// #region OPERATIONAL FUNCTIONS

function getContentArea() {
    const pad = frameToggle.checked ? 100 : 50;
    const w = pg.width  - pad * 2;
    const h = pg.height - pad * 2;
    return {
        x: pg.width  / 2 - w / 2,
        y: pg.height / 2 - h / 2,
        w,
        h,
    };
}

function drawContent() {
    const activeLayout = [...contentLayoutRadios].find(r => r.checked)?.value;
    if (activeLayout === 'text-overlay') drawTextOverlay();
}


function drawTextOverlay() {
    const area      = getContentArea();
    const alignment = [...textOverlayAlignRadios].find(r => r.checked)?.value ?? 'center';

    const logoAllowed = exportSize.label !== 'Reel/Story' && !badgesCheckbox.checked;
    if (textOverlayLogoToggle.checked && logoAllowed) drawLogo(area, alignment);

    if (!textOverlayHeadingToggle.checked) return;

    const lines          = textOverlayHeadingText.value.split('\n').slice(0, 3).map(l => l.toUpperCase());
    const headingSize    = int(textOverlayHeadingSize.value);
    const leading        = headingSize * 1.15;
    const showSubheading = textOverlaySubheadingToggle.checked && textOverlaySubheadingText.value.trim() !== '';
    const subSize        = 40;
    const subGap         = int(textOverlaySubheadingGap.value);

    const headingBlockH = leading * lines.length;
    const totalH        = showSubheading ? headingBlockH + subGap + subSize : headingBlockH;

    const alignMap = { left: LEFT, center: CENTER, right: RIGHT };
    const xMap     = {
        left:   pg.width / 2 - area.w / 2,
        center: pg.width / 2,
        right:  pg.width / 2 + area.w / 2,
    };

    pg.push();
    pg.fill(selectedColorscheme.foregroundColor);
    pg.noStroke();
    pg.textFont('begum');
    pg.textAlign(alignMap[alignment], BASELINE);

    const headingStartY = pg.height / 2 - totalH / 2 + headingSize;

    pg.textSize(headingSize);
    lines.forEach((line, i) => {
        pg.text(line, xMap[alignment], headingStartY + i * leading);
    });

    if (showSubheading) {
        const subY = headingStartY + (lines.length - 1) * leading + subGap + subSize;
        pg.textSize(subSize);
        pg.text(textOverlaySubheadingText.value, xMap[alignment], subY);
    }

    pg.pop();
}

function drawLogo(area, alignment) {
    const layout   = alignment === 'center' ? 'Long' : 'Stacked';
    const colorKey = selectedColorscheme.foregroundName;
    const img      = logoImages[`${colorKey}_${layout}`];
    if (!img) return;

    const targetW = layout === 'Long' ? 200 : 100;
    const targetH = (img.height / img.width) * targetW;

    const position = [...textOverlayLogoPositionRadios].find(r => r.checked)?.value ?? 'top';

    const xMap = {
        left:   area.x + targetW / 2,
        center: pg.width / 2,
        right:  area.x + area.w - targetW / 2,
    };
    const x = xMap[alignment];
    const y = position === 'top'
        ? area.y + targetH / 2
        : area.y + area.h - targetH / 2;

    pg.push();
    pg.imageMode(CENTER);
    pg.image(img, x, y, targetW, targetH);
    pg.pop();
}

function drawMarginalia() {
    if (!marginaliaToggle.checked) return;
    if (frameToggle.checked && badgesCheckbox.checked) return;
    if (marginaliaMode === 'manual') drawMarginaliaManual();
    else if (marginaliaMode === 'path') drawMarginaliaPath();
}

function drawMarginaliaManual() {
    const topText    = marginaliaTopInput.value.trim();
    const bottomText = marginaliaBottomInput.value.trim();
    const leftText   = marginaliaLeftInput.value.trim();
    const rightText  = marginaliaRightInput.value.trim();

    if (!topText && !bottomText && !leftText && !rightText) return;

    pg.push();
    pg.textFont('begum');
    pg.textSize(20);
    pg.fill(getMarginaliaColor());
    pg.noStroke();
    pg.textAlign(CENTER, CENTER);
    // letterSpacing lives outside p5's push/pop — must be reset manually
    pg.drawingContext.letterSpacing = '0.3em';

    if (topText)    pg.text(topText.toUpperCase(),    pg.width / 2,       25);
    if (bottomText) pg.text(bottomText.toUpperCase(), pg.width / 2,       pg.height - 25);

    // pg uses radians regardless of the main sketch's angleMode(DEGREES)
    if (leftText) {
        pg.push();
        pg.translate(25, pg.height / 2);
        pg.rotate(-Math.PI / 2);
        pg.text(leftText.toUpperCase(), 0, 0);
        pg.pop();
    }
    if (rightText) {
        pg.push();
        pg.translate(pg.width - 25, pg.height / 2);
        pg.rotate(Math.PI / 2);
        pg.text(rightText.toUpperCase(), 0, 0);
        pg.pop();
    }

    pg.drawingContext.letterSpacing = '0px';
    pg.pop();
}

function drawMarginaliaPath() {
    const text = marginaliaPathInput.value.trim();
    if (!text) return;

    // Rectangle path: 8px outward from the 50px frame margin = 42px from canvas edge
    const offset = 25;
    const x0 = offset;
    const y0 = offset;
    const rectW = pg.width  - 2 * offset;
    const rectH = pg.height - 2 * offset;
    const perimeter = 2 * (rectW + rectH);

    pg.push();
    pg.textFont('begum');
    pg.textSize(20);
    pg.fill(getMarginaliaColor());
    pg.noStroke();
    pg.textAlign(CENTER, CENTER);

    // Manual letter spacing (0.3em at 20px = 6px) — we position char by char so
    // drawingContext.letterSpacing would double-count; add it explicitly instead
    const lsPx = 20 * 0.3;
    const unit = text.toUpperCase() + ' '; // single space as repetition separator

    let dist = 0;
    let idx  = 0;

    while (dist < perimeter) {
        const char  = unit[idx % unit.length];
        const adv   = pg.textWidth(char) + lsPx;
        const pos   = posOnRect(dist + adv / 2, x0, y0, rectW, rectH, perimeter);

        pg.push();
        pg.translate(pos.x, pos.y);
        pg.rotate(pos.angle); // radians — pg ignores main sketch's angleMode
        pg.text(char, 0, 0);
        pg.pop();

        dist += adv;
        idx++;
    }

    pg.pop();
}

// Returns {x, y, angle} for a distance d along a clockwise rectangle path.
// Path starts at the top-left corner and proceeds: top → right → bottom → left.
function posOnRect(d, x0, y0, w, h, perim) {
    d = ((d % perim) + perim) % perim;
    if (d < w)  return { x: x0 + d,         y: y0,             angle: 0 };
    d -= w;
    if (d < h)  return { x: x0 + w,         y: y0 + d,         angle: Math.PI / 2 };
    d -= h;
    if (d < w)  return { x: x0 + w - d,     y: y0 + h,         angle: Math.PI };
    d -= w;
    return             { x: x0,             y: y0 + h - d,     angle: -Math.PI / 2 };
}

function autoSelectPaletteFromImage() {
    if (!bgImg) return;
    // Sample via a throwaway native canvas — avoids touching bgImg's p5 pixel state
    const size = 50;
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = size;
    tmpCanvas.height = size;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.drawImage(bgImg.canvas, 0, 0, size, size);
    const data = tmpCtx.getImageData(0, 0, size, size).data;
    let total = 0;
    for (let i = 0; i < data.length; i += 4) {
        total += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    const avg = total / (data.length / 4); // 0–255

    let idx;
    if (avg < 85) {
        idx = Math.random() < 0.5 ? 0 : 1;          // dark  → palette 1 or 2
    } else if (avg < 170) {
        idx = Math.random() < 0.5 ? 5 : 6;          // medium → palette 6 or 7
    } else {
        idx = Math.floor(Math.random() * 3) + 2;    // bright → palette 3, 4, or 5
    }

    colorIcons.forEach(icon => icon.classList.remove("icon-selected"));
    colorIcons[idx].classList.add("icon-selected");
    colorDropdown.selected(idx);
    selectedColorscheme = colorSchemes[idx];
    print(`Auto-selected palette ${idx + 1} (avg brightness: ${avg.toFixed(0)})`);
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
            pg.stroke(selectedColorscheme.foregroundColor);
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

        // Draw cornices after frame
        drawCornices();

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

function drawCornices() {
    const frameMargin = 50;
    const frameCorners = [
        { x: frameMargin,           y: frameMargin },
        { x: pg.width - frameMargin, y: frameMargin },
        { x: pg.width - frameMargin, y: pg.height - frameMargin },
        { x: frameMargin,           y: pg.height - frameMargin }
    ];
    const canvasCorners = [
        { x: 0,         y: 0 },
        { x: pg.width,  y: 0 },
        { x: pg.width,  y: pg.height },
        { x: 0,         y: pg.height }
    ];

    const corniceStyle = cornicesType.value;

    pg.push();
    pg.strokeWeight(3);
    pg.stroke(selectedColorscheme.foregroundColor);
    pg.noFill();

    if (corniceStyle === "None") {
        pg.pop();
        return;
    }

    if (corniceStyle === "Line") {
        pg.strokeWeight(5);
        if (frameType.value === "1") {
            pg.stroke(selectedColorscheme.backgroundColor);
        }
        if (frameType.value === "2") {
            pg.drawingContext.setLineDash([12, 12]);
        }
        frameCorners.forEach((corner, index) => {
            pg.line(corner.x, corner.y, canvasCorners[index].x, canvasCorners[index].y);
        });
        pg.drawingContext.setLineDash([]);
        pg.pop();
        return;
    }

    if (corniceStyle === "Triangle") {
        pg.strokeWeight(0);
        pg.fill(selectedColorscheme.foregroundColor);
        const t = frameMargin;
        const off = frameType.value === "2" ? 3 : 0;
        const triCorners = [
            { dx: -off, dy: -off, verts: [[t, t+t], [t, t], [t+t, t]] },
            { dx:  off, dy: -off, verts: [[pg.width-t, t+t], [pg.width-t, t], [pg.width-t-t, t]] },
            { dx:  off, dy:  off, verts: [[pg.width-t, pg.height-t-t], [pg.width-t, pg.height-t], [pg.width-t-t, pg.height-t]] },
            { dx: -off, dy:  off, verts: [[t, pg.height-t-t], [t, pg.height-t], [t+t, pg.height-t]] }
        ];
        triCorners.forEach(({ dx, dy, verts }) => {
            pg.beginShape();
            verts.forEach(([x, y]) => pg.vertex(x + dx, y + dy));
            pg.endShape(CLOSE);
        });
        pg.pop();
        return;
    }

    if (corniceStyle === "Square") {
        pg.noStroke();
        pg.fill(selectedColorscheme.foregroundColor);
        pg.rectMode(CENTER);
        const thickShift = frameType.value === "1" ? 10 : 0;
        const squareOffsets = [
            { dx:  thickShift, dy:  thickShift },
            { dx: -thickShift, dy:  thickShift },
            { dx: -thickShift, dy: -thickShift },
            { dx:  thickShift, dy: -thickShift }
        ];
        frameCorners.forEach((corner, index) => {
            const { dx, dy } = squareOffsets[index];
            pg.square(corner.x + dx, corner.y + dy, 20);
        });
        pg.pop();
        return;
    }

    if (corniceStyle === "Corner") {
        pg.strokeWeight(18);
        pg.noFill();
        pg.drawingContext.lineCap = "butt";
        const t = frameMargin;
        pg.beginShape(); pg.vertex(t,            t + t); pg.vertex(t,            t); pg.vertex(t + t,            t); pg.endShape();
        pg.beginShape(); pg.vertex(pg.width - t, t + t); pg.vertex(pg.width - t, t); pg.vertex(pg.width - t - t, t); pg.endShape();
        pg.beginShape(); pg.vertex(pg.width - t, pg.height - t - t); pg.vertex(pg.width - t, pg.height - t); pg.vertex(pg.width - t - t, pg.height - t); pg.endShape();
        pg.beginShape(); pg.vertex(t,            pg.height - t - t); pg.vertex(t,            pg.height - t); pg.vertex(t + t,            pg.height - t); pg.endShape();
        pg.drawingContext.lineCap = "round";

        // Diamond caps at each open endpoint
        // Pythagorean: d² = s² + s²  →  s = d / √2  (d = stroke weight = 18)
        const d = 18;
        const capSide = d / Math.sqrt(2);
        const halfDiag = d / 2; // half-diagonal of the rotated square

        pg.noStroke();
        pg.fill(selectedColorscheme.foregroundColor);
        pg.rectMode(CENTER);
        const endpoints = [
            [t,                t + t            ],
            [t + t,            t                ],
            [pg.width - t,     t + t            ],
            [pg.width - t - t, t                ],
            [pg.width - t,     pg.height - t - t],
            [pg.width - t - t, pg.height - t    ],
            [t,                pg.height - t - t],
            [t + t,            pg.height - t    ]
        ];
        endpoints.forEach(([x, y]) => {
            pg.push();
            pg.translate(x, y);
            pg.rotate(Math.PI / 4); // 45° in radians — pg uses radians, not the main sketch's angleMode
            pg.square(0, 0, capSide);
            pg.pop();
        });

        pg.pop();
        return;
    }

    pg.pop();
}

function drawBadges() {
    if (!frameToggle.checked || !badgesCheckbox.checked) return;

    const margin     = 50;
    const badgeThick = 50;
    const minLen     = 200;
    const maxLen     = 400;
    // Diamond cap: rotated square whose diagonal equals badge thickness
    // d² = s² + s²  →  s = d / √2
    const diamondSide = badgeThick / Math.sqrt(2);
    // Padding: 25px diamond overlap + 10px gap on each side = 70px total
    const padding    = 60;
    const lsPx       = 20 * 0.3; // 0.3em letter spacing at 20px

    const topText    = badgeTopInput.value.trim().toUpperCase();
    const bottomText = badgeBottomInput.value.trim().toUpperCase();

    pg.push();
    pg.textFont('begum');
    pg.textSize(20);

    const measureWidth = (text) =>
        text.length === 0 ? 0 : pg.textWidth(text) + text.length * lsPx;

    const badgeLen = constrain(
        Math.max(measureWidth(topText) + padding, measureWidth(bottomText) + padding, minLen),
        minLen,
        maxLen
    );
    const halfLen = badgeLen / 2;

    pg.noStroke();
    pg.rectMode(CENTER);

    const badges = [
        { x: pg.width / 2, y: margin,             text: topText    },
        { x: pg.width / 2, y: pg.height - margin, text: bottomText }
    ];

    badges.forEach(({ x, y, text }) => {
        pg.push();
        pg.translate(x, y);

        // Body + diamond caps
        pg.fill(selectedColorscheme.foregroundColor);
        pg.rect(0, 0, badgeLen, badgeThick);
        [-halfLen, halfLen].forEach(capX => {
            pg.push();
            pg.translate(capX, 0);
            pg.rotate(Math.PI / 4);
            pg.square(0, 0, diamondSide);
            pg.pop();
        });

        // Text centered in badge body, in background colour for contrast
        if (text) {
            pg.fill(selectedColorscheme.backgroundColor);
            pg.textAlign(CENTER, CENTER);
            pg.drawingContext.letterSpacing = '0.3em';
            pg.text(text, 0, 0);
            pg.drawingContext.letterSpacing = '0px';
        }

        pg.pop();
    });

    pg.pop();
}

// #endregion
