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
let textOverlayBodyToggle       = document.querySelector('#text-overlay-body-toggle');
let textOverlayBodyText         = document.querySelector('#text-overlay-body-text');
let textOverlayBodyPositionRadios = document.querySelectorAll('input[name="text-overlay-body-position"]');
let textOverlayCtaToggle        = document.querySelector('#text-overlay-cta-toggle');
let textOverlayCtaText          = document.querySelector('#text-overlay-cta-text');
let textOverlayCtaStyleRadios   = document.querySelectorAll('input[name="text-overlay-cta-style"]');
let textOverlayCtaDiscountField = document.querySelector('#text-overlay-cta-discount-field');
let textOverlayCtaDiscountText  = document.querySelector('#text-overlay-cta-discount-text');
let textOverlayAlignRadios      = document.querySelectorAll('input[name="text-overlay-align"]');
let collageSeedInput = document.querySelector('#collage-seed');
let collageSizeRadios = document.querySelectorAll('input[name="collage-size"]');
let collageLabelsToggle = document.querySelector('#collage-labels-toggle');
let collageLabelInputs = document.querySelectorAll('.collage-label-input');
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

// #region Collage Variables
let collageImages = [null, null, null, null, null];
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
    updateThickFrameAvailability();
    updateBackgroundImageAvailability();

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

    textOverlayAlignRadios.forEach(radio => {
        radio.addEventListener('input', updateMarginaliaOptions);
    });

    const contentLayoutRadios = document.querySelectorAll('input[name="content-layout"]');
    contentLayoutRadios.forEach(radio => {
        radio.addEventListener('input', function () {
            document.querySelectorAll('.content-layout-options').forEach(panel => {
                panel.classList.remove('expanded');
            });
            const target = document.querySelector(`#content-${this.value.replace(/-/g, '-')}-options`);
            if (target) target.classList.add('expanded');
            updateThickFrameAvailability();
            updateBackgroundImageAvailability();
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

    function updateCtaDiscountVisibility() {
        const style = [...textOverlayCtaStyleRadios].find(r => r.checked)?.value ?? 'solid';
        textOverlayCtaDiscountField.style.display = style === 'coupon' ? 'block' : 'none';
    }
    textOverlayCtaStyleRadios.forEach(radio => {
        radio.addEventListener('input', updateCtaDiscountVisibility);
    });
    updateCtaDiscountVisibility();

    // #region COLLAGE
    document.querySelectorAll('.collage-image-input').forEach((input, index) => {
        const slot = input.closest('.collage-upload-slot');
        const thumb = slot.querySelector('.collage-thumbnail');
        const removeBtn = slot.querySelector('.collage-remove-btn');

        input.addEventListener('change', function () {
            const file = this.files && this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = e => {
                thumb.src = e.target.result;
                thumb.style.display = 'block';
                removeBtn.style.display = 'flex';
                loadImage(e.target.result, img => { collageImages[index] = img; });
            };
            reader.readAsDataURL(file);
        });

        removeBtn.addEventListener('click', function () {
            input.value = '';
            thumb.style.display = 'none';
            thumb.src = '';
            removeBtn.style.display = 'none';
            collageImages[index] = null;
        });
    });

    const collageExtraSlots = [...document.querySelectorAll('.collage-slot-extra')];
    const collageAddImageBtn = document.getElementById('collage-add-image-btn');
    let collageExtraRevealed = 0;
    collageAddImageBtn.addEventListener('click', function () {
        if (collageExtraRevealed >= collageExtraSlots.length) return;
        collageExtraSlots[collageExtraRevealed].style.display = 'flex';
        collageExtraRevealed++;
        if (collageExtraRevealed >= collageExtraSlots.length) {
            collageAddImageBtn.style.display = 'none';
        }
    });

    const collageLabelsToggle  = document.getElementById('collage-labels-toggle');
    const collageLabelsOptions = document.getElementById('collage-labels-options');
    collageLabelsToggle.addEventListener('input', () => {
        collageLabelsOptions.classList.toggle('expanded', collageLabelsToggle.checked);
    });
    // #endregion

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

function updateThickFrameAvailability() {
    const thickOption = frameType.querySelector('option[value="1"]');
    if (!thickOption) return;
    const activeLayout = [...contentLayoutRadios].find(r => r.checked)?.value;
    const disabled = activeLayout === 'collage';
    thickOption.disabled = disabled;
    if (disabled && frameType.value === "1") {
        frameType.value = "0";
        frameType.dispatchEvent(new Event('change'));
    }
}

function updateBackgroundImageAvailability() {
    const activeLayout = [...contentLayoutRadios].find(r => r.checked)?.value;
    const disabled = activeLayout === 'collage';
    bgImgSection.style.opacity = disabled ? '0.4' : '1';
    bgImgSection.style.pointerEvents = disabled ? 'none' : 'auto';
    if (disabled && bgImageToggle.checked) {
        bgImageToggle.checked = false;
        bgImageToggle.dispatchEvent(new Event('input'));
    }
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
    const frame     = frameType.value;
    const cornice   = cornicesType.value;
    const alignment = [...textOverlayAlignRadios].find(r => r.checked)?.value ?? 'center';

    // frame values: "0"=Simple, "1"=Thick, "2"=Dashed, "3"=Corner, "4"=Tabs
    const manualDisabled = ["3", "4"].includes(frame) || alignment !== 'center';
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
    if (alignment !== 'center') {
        messages.push("Manual placement requires centered text overlay alignment.");
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
    else if (activeLayout === 'collage') drawCollage(getContentArea());
}

// Seeded Fisher-Yates shuffle — relies on p5's random(), which randomSeed() controls.
function shuffleSeeded(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random(i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Collage images may cross the 50px frame line, but never get closer than 25px
// to the raw canvas edge, and never sit ambiguously close to the line without
// committing to cross it — anything nearer than 25px to either side of the line
// snaps to exactly 25px past it.
const FRAME_INSET     = 50;
const FRAME_EXCURSION = 25;
const COLLAGE_SIZE_MULTIPLIERS = { small: 1, medium: 1.2, large: 1.4 };

const COLLAGE_MAX_ANGLE = 20; // degrees, matches the random(-20, 20) range below

const COLLAGE_LABEL_SIZE = 25;
const COLLAGE_LABEL_GAP  = 14; // px between the image's bounding box and the label
// Approximate footprint used for label/label and label/image collision checks —
// the image's own edge length ("corner to corner") by the text size plus a little padding.
const COLLAGE_LABEL_BOX_HEIGHT = COLLAGE_LABEL_SIZE + 10;

function aabbOverlap(ax, ay, ahw, ahh, bx, by, bhw, bhh) {
    return Math.abs(ax - bx) < (ahw + bhw) && Math.abs(ay - by) < (ahh + bhh);
}

// Named rotation buckets, each a fraction of COLLAGE_MAX_ANGLE so they scale
// together if the max angle ever changes.
const COLLAGE_ROTATION_BUCKETS = {
    positive:         () => random(COLLAGE_MAX_ANGLE * 0.5, COLLAGE_MAX_ANGLE),
    negative:         () => random(-COLLAGE_MAX_ANGLE, -COLLAGE_MAX_ANGLE * 0.5),
    positiveNeutral:  () => random(COLLAGE_MAX_ANGLE * 0.1, COLLAGE_MAX_ANGLE * 0.5),
    negativeNeutral:  () => random(-COLLAGE_MAX_ANGLE * 0.5, -COLLAGE_MAX_ANGLE * 0.1),
    neutral:          () => random(-COLLAGE_MAX_ANGLE * 0.3, COLLAGE_MAX_ANGLE * 0.3),
    random:           () => random(-COLLAGE_MAX_ANGLE, COLLAGE_MAX_ANGLE),
};

// Per-count rotation plans — each entry is a bucket name, one per image, chosen
// so positive/negative tilt stays balanced across the layout instead of
// drifting all one way by chance.
const COLLAGE_ROTATION_PLANS = {
    1: () => [random() < 0.5 ? 'positive' : 'negative'],
    2: () => ['positive', 'negative'],
    3: () => ['positive', 'negative', 'neutral'],
    4: () => ['positive', 'negative', 'negativeNeutral', 'positiveNeutral'],
    5: () => ['positive', 'negative', 'negativeNeutral', 'positiveNeutral', 'random'],
};

function buildCollageRotationPlan(count) {
    const plan = COLLAGE_ROTATION_PLANS[count] ? COLLAGE_ROTATION_PLANS[count]() : null;
    if (plan) return plan;
    // Fallback for any count outside 1-5: cycle through the full plan's buckets.
    const base = COLLAGE_ROTATION_PLANS[5]();
    return Array.from({ length: count }, (_, i) => base[i % base.length]);
}
function clampNearFrame(pos, halfExtent, canvasExtent) {
    const snapZone = FRAME_INSET + FRAME_EXCURSION;
    const snapPos  = FRAME_INSET - FRAME_EXCURSION;

    if (pos - halfExtent < snapZone) pos = snapPos + halfExtent;
    if (canvasExtent - (pos + halfExtent) < snapZone) pos = canvasExtent - snapPos - halfExtent;

    return pos;
}

// Procedural placement, run once per distinct (seed, size, set-of-filled-slots)
// combination. Returns one layout entry per filled slot; positions are then
// cached so drag overrides can mutate them without being overwritten by the
// random sequence on the next frame.
function generateCollageLayout(area, filledSlots, sizeMultiplier) {
    // Partition the content area into a grid with at least one cell per image,
    // sized to roughly match the area's aspect ratio, then hand out cells via a
    // seeded shuffle so each image lands in a different region — balanced overall,
    // but not in a predictable left-to-right/top-to-bottom order.
    const count = filledSlots.length;
    const cols  = Math.max(1, Math.round(Math.sqrt(count * (area.w / area.h))));
    const rows  = Math.max(1, Math.ceil(count / cols));

    const cells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) cells.push({ c, r });
    }
    shuffleSeeded(cells);

    const cellW = area.w / cols;
    const cellH = area.h / rows;

    // One rotation bucket per image, balanced positive/negative by count, then
    // shuffled so the assignment isn't tied to upload order.
    const rotationPlan = buildCollageRotationPlan(count);
    shuffleSeeded(rotationPlan);

    const items = filledSlots.map((slotIndex, i) => {
        const img   = collageImages[slotIndex];
        const cell  = cells[i];
        const cellX = area.x + cell.c * cellW;
        const cellY = area.y + cell.r * cellH;

        // Jitter within an inset region of the cell — keeps images loosely
        // grid-anchored (balanced) while still landing at organic offsets.
        const insetX = cellW * 0.2;
        const insetY = cellH * 0.2;
        let x = cellX + insetX + random(cellW - insetX * 2);
        let y = cellY + insetY + random(cellH - insetY * 2);

        const longSide = random(400, 500) * sizeMultiplier;
        const imgAspect = img.width / img.height;
        const w = imgAspect >= 1 ? longSide : longSide * imgAspect;
        const h = imgAspect >= 1 ? longSide / imgAspect : longSide;

        const angle = COLLAGE_ROTATION_BUCKETS[rotationPlan[i]](); // degrees

        // Axis-aligned bounding box of the rotated image, used to keep it clear
        // of the canvas edge regardless of how much the rotation widens its extent.
        const rad   = radians(angle);
        const halfW = Math.abs(w / 2 * Math.cos(rad)) + Math.abs(h / 2 * Math.sin(rad));
        const halfH = Math.abs(w / 2 * Math.sin(rad)) + Math.abs(h / 2 * Math.cos(rad));
        x = clampNearFrame(x, halfW, pg.width);
        y = clampNearFrame(y, halfH, pg.height);

        return { slotIndex, x, y, w, h, angle, halfW, halfH };
    });

    // Label placement — a caption can sit on any of the 4 sides of the image's
    // bounding box, not just above/below, which gives collision avoidance far
    // more room to find a clean spot once several images are involved.
    const placedLabelBoxes = [];
    items.forEach(item => {
        const side = pickCollageLabelSide(item, area, items, placedLabelBoxes);
        item.labelSide = side; // a preference only — collageLabelPlacement() re-validates it live every frame
        item.labelAngleJitter = random(-5, 5); // independent wobble relative to the image's own rotation

        const geom = collageLabelPlacement(item, area, side, items, placedLabelBoxes);
        placedLabelBoxes.push({ x: geom.x, y: geom.y, halfW: geom.halfW, halfH: geom.halfH });
    });

    return items;
}

// The 4 candidate sides a label can sit on, in image-bounding-box-relative
// world space (not rotated into the image's local space — the box position
// stays axis-aligned even though the image and its caption are tilted).
// The caption itself always stays in standard horizontal orientation (plus
// the image-angle + jitter applied at render time) regardless of which side
// it sits on — only the anchor position and text alignment change per side.
// `align`/`anchorX` let a left/right label hug the edge nearest the image
// (growing away from it as the text gets longer) instead of floating at the
// midpoint of its footprint with an inconsistent gap. `anchorX` sits right
// at the gap edge (just outside the image); `x` is the footprint's own
// center, offset further out by half its width so the box doesn't double
// back over the image.
function collageLabelGeometry(item, side) {
    switch (side) {
        case 'top':
            return { x: item.x, y: item.y - item.halfH - COLLAGE_LABEL_GAP,
                      halfW: item.w / 2, halfH: COLLAGE_LABEL_BOX_HEIGHT / 2,
                      align: CENTER, anchorX: item.x };
        case 'bottom':
            return { x: item.x, y: item.y + item.halfH + COLLAGE_LABEL_GAP,
                      halfW: item.w / 2, halfH: COLLAGE_LABEL_BOX_HEIGHT / 2,
                      align: CENTER, anchorX: item.x };
        case 'left': {
            const edgeX = item.x - item.halfW - COLLAGE_LABEL_GAP;
            const halfW = item.w / 2;
            return { x: edgeX - halfW, y: item.y, halfW, halfH: COLLAGE_LABEL_BOX_HEIGHT / 2,
                      align: RIGHT, anchorX: edgeX };
        }
        case 'right': {
            const edgeX = item.x + item.halfW + COLLAGE_LABEL_GAP;
            const halfW = item.w / 2;
            return { x: edgeX + halfW, y: item.y, halfW, halfH: COLLAGE_LABEL_BOX_HEIGHT / 2,
                      align: LEFT, anchorX: edgeX };
        }
    }
}

const COLLAGE_LABEL_SIDES = ['top', 'bottom', 'left', 'right'];

function collageLabelInArea(geom, area) {
    return geom.x - geom.halfW >= area.x && geom.x + geom.halfW <= area.x + area.w &&
           geom.y - geom.halfH >= area.y && geom.y + geom.halfH <= area.y + area.h;
}

function collageLabelCollides(geom, item, items, placedBoxes) {
    return items.some(other => other !== item &&
            aabbOverlap(geom.x, geom.y, geom.halfW, geom.halfH, other.x, other.y, other.halfW, other.halfH)) ||
        placedBoxes.some(box =>
            aabbOverlap(geom.x, geom.y, geom.halfW, geom.halfH, box.x, box.y, box.halfW, box.halfH));
}

// Scores all 4 sides — collision-free and inside the drawing area is best (0),
// inside the area but overlapping something is next-best (1), off the area
// entirely is worst (2) — then picks randomly among whichever sides tie for
// best, so collisions are resolved by trying every side before falling back
// to accepting an overlap.
function pickCollageLabelSide(item, area, items, placedBoxes) {
    const scored = COLLAGE_LABEL_SIDES.map(side => {
        const geom = collageLabelGeometry(item, side);
        const inArea = collageLabelInArea(geom, area);
        const collisionFree = inArea && !collageLabelCollides(geom, item, items, placedBoxes);
        const score = collisionFree ? 0 : inArea ? 1 : 2;
        return { side, score };
    });

    const bestScore = Math.min(...scored.map(s => s.score));
    const best = scored.filter(s => s.score === bestScore);
    shuffleSeeded(best);
    return best[0].side;
}

// Recomputes a label's geometry from the image's *current* position (live, not
// cached) so it tracks the image when dragged. Tries the preferred side first,
// then every other side, preferring whichever is both in-area and collision-free
// against the current image positions and already-placed labels; if none are
// fully clean, falls back to the first in-area side even if it collides; if none
// are in-area at all, clamps the preferred side as a last resort — so the
// label's footprint always stays wholly inside the drawing area, never closer
// than 50px to the frame, regardless of where the image has been dragged to.
function collageLabelPlacement(item, area, preferSide, items, placedBoxes) {
    const order = [preferSide, ...COLLAGE_LABEL_SIDES.filter(s => s !== preferSide)];

    for (const side of order) {
        const geom = collageLabelGeometry(item, side);
        if (collageLabelInArea(geom, area) && !collageLabelCollides(geom, item, items, placedBoxes)) return geom;
    }
    for (const side of order) {
        const geom = collageLabelGeometry(item, side);
        if (collageLabelInArea(geom, area)) return geom;
    }

    const geom = collageLabelGeometry(item, preferSide);
    const anchorOffsetX = geom.anchorX - geom.x; // preserve the edge-hugging offset through the clamp
    geom.x = constrain(geom.x, area.x + geom.halfW, area.x + area.w - geom.halfW);
    geom.y = constrain(geom.y, area.y + geom.halfH, area.y + area.h - geom.halfH);
    geom.anchorX = geom.x + anchorOffsetX;
    return geom;
}

let collageLayoutCache = { signature: null, layout: [] };

function drawCollage(area) {
    const filledSlots = collageImages.map((img, i) => img ? i : null).filter(i => i !== null);
    if (filledSlots.length === 0) {
        collageLayoutCache = { signature: null, layout: [] };
        return;
    }

    const seed    = int(collageSeedInput.value) || 0;
    const sizeKey = [...collageSizeRadios].find(r => r.checked)?.value ?? 'medium';
    const signature = `${filledSlots.join(',')}|${seed}|${sizeKey}`;

    if (collageLayoutCache.signature !== signature) {
        randomSeed(seed);
        const layout = generateCollageLayout(area, filledSlots, COLLAGE_SIZE_MULTIPLIERS[sizeKey]);
        collageLayoutCache = { signature, layout };
    }

    pg.push();
    pg.imageMode(CENTER);

    // Drop shadow — drawingContext property, not managed by push()/pop(), so it
    // must be reset manually once the batch of images is drawn.
    const ctx = pg.drawingContext;
    ctx.shadowColor   = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur    = 20;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 8;

    collageLayoutCache.layout.forEach(item => {
        const img = collageImages[item.slotIndex];
        if (!img) return;
        pg.push();
        pg.translate(item.x, item.y);
        pg.rotate(radians(item.angle)); // pg uses radians regardless of the main sketch's angleMode
        pg.image(img, 0, 0, item.w, item.h);
        pg.pop();
    });

    ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    pg.pop();

    if (!collageLabelsToggle.checked) return;

    pg.push();
    pg.noStroke();
    pg.fill(selectedColorscheme.foregroundColor);
    pg.textFont('begum');
    pg.textSize(COLLAGE_LABEL_SIZE);

    // Recomputed fresh every frame from the images' current (possibly dragged)
    // positions, so a label that now collides with an image or another label
    // falls back to a different side live rather than staying stuck where it
    // was originally generated.
    const placedLabelBoxes = [];
    collageLayoutCache.layout.forEach(item => {
        const labelInput = collageLabelInputs[item.slotIndex];
        const text = labelInput && labelInput.value.trim();
        if (!text) return;

        const geom = collageLabelPlacement(item, area, item.labelSide, collageLayoutCache.layout, placedLabelBoxes);
        placedLabelBoxes.push({ x: geom.x, y: geom.y, halfW: geom.halfW, halfH: geom.halfH });

        pg.push();
        pg.translate(geom.anchorX, geom.y);
        pg.rotate(radians(item.angle + item.labelAngleJitter)); // pg uses radians regardless of the main sketch's angleMode
        pg.textAlign(geom.align, CENTER);
        pg.text(toSentenceCase(text), 0, 0);
        pg.pop();
    });

    pg.pop();
}

// #region COLLAGE DRAG
// Converts preview-canvas mouse coordinates to full-resolution pg coordinates;
// returns null if the mouse is outside the canvas.
function previewToPg(mx, my) {
    const preview = setPreviewDimensions();
    if (mx < 0 || my < 0 || mx > preview.previewWidth || my > preview.previewHeight) return null;
    return {
        x: mx / preview.previewWidth  * pg.width,
        y: my / preview.previewHeight * pg.height,
    };
}

function isCollageActive() {
    return [...contentLayoutRadios].find(r => r.checked)?.value === 'collage';
}

function hitTestCollageItem(px, py, item) {
    const dx = px - item.x;
    const dy = py - item.y;
    const rad = radians(-item.angle);
    const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
    const localY = dx * Math.sin(rad) + dy * Math.cos(rad);
    return Math.abs(localX) <= item.w / 2 && Math.abs(localY) <= item.h / 2;
}

let collageDragState = null;

function mousePressed() {
    if (!isCollageActive()) return;
    const pgPoint = previewToPg(mouseX, mouseY);
    if (!pgPoint) return;

    for (let i = collageLayoutCache.layout.length - 1; i >= 0; i--) {
        const item = collageLayoutCache.layout[i];
        if (hitTestCollageItem(pgPoint.x, pgPoint.y, item)) {
            collageDragState = {
                slotIndex: item.slotIndex,
                startMouseX: pgPoint.x,
                startMouseY: pgPoint.y,
                startItemX: item.x,
                startItemY: item.y,
            };
            return;
        }
    }
}

function mouseDragged() {
    if (!collageDragState) return;
    const item = collageLayoutCache.layout.find(it => it.slotIndex === collageDragState.slotIndex);
    if (!item) { collageDragState = null; return; }

    const pgPoint = previewToPg(mouseX, mouseY);
    if (!pgPoint) return;

    const dx = pgPoint.x - collageDragState.startMouseX;
    const dy = pgPoint.y - collageDragState.startMouseY;
    item.x = clampNearFrame(collageDragState.startItemX + dx, item.halfW, pg.width);
    item.y = clampNearFrame(collageDragState.startItemY + dy, item.halfH, pg.height);
}

function mouseReleased() {
    collageDragState = null;
}
// #endregion


function drawTextOverlay() {
    const area      = getContentArea();
    const alignment = [...textOverlayAlignRadios].find(r => r.checked)?.value ?? 'center';

    // When body copy is present and placed below, the whole text block (heading,
    // sub-heading, body) shifts up one grid row to make room beneath it.
    // Placing body copy above the header is a fixed position, so that shift doesn't apply.
    const bodyActive   = textOverlayBodyToggle.checked && textOverlayBodyText.value.trim() !== '';
    const bodyPosition = [...textOverlayBodyPositionRadios].find(r => r.checked)?.value ?? 'below';
    const rowH         = area.h / 6;
    const shiftY        = (bodyActive && bodyPosition === 'below') ? -rowH : 0;

    const logoAllowed = exportSize.label !== 'Reel/Story' && !badgesCheckbox.checked;
    if (textOverlayLogoToggle.checked && logoAllowed) drawLogo(area, alignment);

    if (bodyActive) drawBodyText(area, alignment, bodyPosition);

    if (textOverlayCtaToggle.checked) drawCTA(area, alignment);

    if (!textOverlayHeadingToggle.checked) return;

    const headingRaw     = textOverlayHeadingText.value.trim() === '' ? 'Heading' : textOverlayHeadingText.value;
    const lines          = headingRaw.split('\n').slice(0, 3).map(l => l.toUpperCase());
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

    const headingStartY = pg.height / 2 - totalH / 2 + headingSize + shiftY;

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

function toSentenceCase(str) {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

// Greedily wraps a single paragraph into lines no wider than maxWidth.
// Measures via the native 2D context directly (ctx.font set by the caller) rather than
// pg.textWidth() — p5's cached text metrics don't always reflect a same-call textSize/textFont change.
function wrapLine(line, maxWidth, ctx) {
    const words = line.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [''];

    const wrapped = [];

    // character-level fallback for a single token wider than maxWidth on its own
    const breakLongWord = (word) => {
        let chunk = '';
        for (const ch of word) {
            const candidate = chunk + ch;
            if (chunk && ctx.measureText(candidate).width > maxWidth) {
                wrapped.push(chunk);
                chunk = ch;
            } else {
                chunk = candidate;
            }
        }
        return chunk;
    };

    let current = '';
    words.forEach(word => {
        const candidate = current ? `${current} ${word}` : word;
        if (current && ctx.measureText(candidate).width > maxWidth) {
            wrapped.push(current);
            current = ctx.measureText(word).width > maxWidth ? breakLongWord(word) : word;
        } else if (!current && ctx.measureText(word).width > maxWidth) {
            current = breakLongWord(word);
        } else {
            current = candidate;
        }
    });

    if (current) wrapped.push(current);
    return wrapped;
}

function drawBodyText(area, alignment, position = 'below') {
    const text = textOverlayBodyText.value.trim();
    if (!text) return;

    const bodySize = 30;
    const leading  = bodySize * 1.3;
    const maxWidth = area.w * 0.5; // body block never exceeds half the content area's width

    const ctaActive = textOverlayCtaToggle.checked && textOverlayCtaText.value.trim() !== '';
    const rowH       = area.h / 6;
    const rowCenterY = position === 'above-header'
        ? area.y + 1.5 * rowH                       // second grid row, fixed — unaffected by CTA
        : area.y + (ctaActive ? 3.5 : 4.5) * rowH;   // third-last row when CTA active, else second-last

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
    pg.textSize(bodySize);
    pg.textAlign(alignMap[alignment], BASELINE);

    const ctx = pg.drawingContext;
    ctx.font = `${bodySize}px begum`;
    const lines = text.split('\n').flatMap(p => wrapLine(toSentenceCase(p), maxWidth, ctx));
    const totalH = leading * lines.length;
    const startY = rowCenterY - totalH / 2 + bodySize;

    lines.forEach((line, i) => {
        pg.text(line, xMap[alignment], startY + i * leading);
    });
    pg.pop();
}

function drawCTA(area, alignment) {
    const text = textOverlayCtaText.value.trim();
    if (!text) return;

    const style = [...textOverlayCtaStyleRadios].find(r => r.checked)?.value ?? 'solid';
    const label = text.toUpperCase();

    const ctaHeight = 75;
    const ctaSize   = 25;
    const lsPx      = ctaSize * 0.3; // 0.3em letter spacing, our standard
    const padding   = 80;
    const minWidth  = area.w * 0.30;
    const maxWidth  = area.w * 0.35;

    const rowH = area.h / 6;
    const y    = area.y + 4.5 * rowH; // centered in the second-last grid row

    pg.push();
    pg.textFont('begum');
    pg.textSize(ctaSize);
    pg.textAlign(CENTER, CENTER);
    pg.rectMode(CENTER);

    const ctx = pg.drawingContext;
    ctx.font = `${ctaSize}px begum`;
    const labelWidth = ctx.measureText(label).width + label.length * lsPx;
    const ctaWidth = constrain(labelWidth + padding, minWidth, maxWidth);

    const xMap = {
        left:   area.x + ctaWidth / 2,
        center: pg.width / 2,
        right:  area.x + area.w - ctaWidth / 2,
    };
    const x = xMap[alignment];
    ctx.letterSpacing = '0.3em';

    if (style === 'solid') {
        pg.noStroke();
        pg.fill(selectedColorscheme.buttonColor);
        pg.rect(x, y, ctaWidth, ctaHeight);
        pg.fill(selectedColorscheme.backgroundColor);
        pg.text(label, x, y);
    } else if (style === 'line') {
        pg.noFill();
        pg.stroke(selectedColorscheme.buttonColor);
        pg.strokeWeight(1);
        pg.rect(x, y, ctaWidth, ctaHeight);
        pg.noStroke();
        pg.fill(selectedColorscheme.buttonColor);
        pg.text(label, x, y);
    } else if (style === 'coupon') {
        const offset = 5; // outline sits offset px outside the solid rect on every side
        pg.noFill();
        pg.stroke(selectedColorscheme.buttonColor);
        pg.strokeWeight(1);
        ctx.setLineDash([6, 6]);
        pg.rect(x, y, ctaWidth + offset * 2, ctaHeight + offset * 2, 5);
        ctx.setLineDash([]);

        pg.noStroke();
        pg.fill(selectedColorscheme.buttonColor);
        pg.rect(x, y, ctaWidth, ctaHeight, 5);
        pg.fill(selectedColorscheme.backgroundColor);
        pg.text(label, x, y);

        const discountText = textOverlayCtaDiscountText.value.trim();
        if (discountText) {
            const discountSize   = 20;
            const discountGap    = 15;
            const outlineTopY    = y - ctaHeight / 2 - offset;
            const outlineHalfW   = ctaWidth / 2 + offset;
            const discountAlignMap = { left: LEFT, center: CENTER, right: RIGHT };
            const discountX = alignment === 'left'  ? x - outlineHalfW
                             : alignment === 'right' ? x + outlineHalfW
                             : x;

            ctx.letterSpacing = '0px';
            pg.textSize(discountSize);
            ctx.font = `${discountSize}px begum`;
            pg.textAlign(discountAlignMap[alignment], BOTTOM);
            pg.fill(selectedColorscheme.foregroundColor);
            pg.text(toSentenceCase(discountText), discountX, outlineTopY - discountGap);

            ctx.letterSpacing = '0.3em';
            pg.textSize(ctaSize);
            ctx.font = `${ctaSize}px begum`;
            pg.textAlign(CENTER, CENTER);
        }
    }

    ctx.letterSpacing = '0px';
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
