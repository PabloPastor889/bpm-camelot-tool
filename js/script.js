const tapButton = document.getElementById("tapButton");
const resetButton = document.getElementById("resetButton");
const bpmText = document.getElementById("bpm");

let taps = [];
const maxTaps = 8;
function tapTempo() {
        const currentTime = Date.now();
        if (taps.length > 0) {
        const lastTap = taps[taps.length - 1];
        if (currentTime - lastTap > 2000) {
            taps = [];
            bpmText.textContent = "0 BPM";
        }
    }
    taps.push(currentTime);
    if (taps.length > maxTaps) {
        taps.shift();
    }
    if (taps.length >= 2) {
        let totalTime = 0;
        for (let i = 1; i < taps.length; i++) {
            totalTime += taps[i] - taps[i - 1];
        }
        const averageTime = totalTime / (taps.length - 1);
        const bpm = Math.round(60000 / averageTime);
        bpmText.textContent = bpm + " BPM";
    }
}
        function resetTempo() {
taps = [];
bpmText.textContent = "0 BPM";
}
tapButton.addEventListener("click", tapTempo);
resetButton.addEventListener("click", resetTempo);
document.addEventListener("keydown", function(event) {

    if (event.code === "Space" && !event.repeat) {
        event.preventDefault();
        tapTempo();
    }
});

const selectScale = document.getElementById("selectScale");
const camelotButton = document.getElementById("camelotButton");
const compatibleScales = document.getElementById("compatibleScales");
const camelotMap = {

    "Abm": "1A",
    "Ebm": "2A",
    "Bbm": "3A",
    "Fm": "4A",
    "Cm": "5A",
    "Gm": "6A",
    "Dm": "7A",
    "Am": "8A",
    "Em": "9A",
    "Bm": "10A",
    "F#m": "11A",
    "C#m": "12A",

    "B": "1B",
    "F#": "2B",
    "Db": "3B",
    "Ab": "4B",
    "Eb": "5B",
    "Bb": "6B",
    "F": "7B",
    "C": "8B",
    "G": "9B",
    "D": "10B",
    "A": "11B",
    "E": "12B"
};

function findScale(camelotCode) {
    for (const scale in camelotMap) {
        if (camelotMap[scale] === camelotCode) {
            return scale;
        }
    }
}

function searchCompatibleScales() {
    const selectedScale = selectScale.value;
    if (selectedScale === "") {
        compatibleScales.textContent =
            "Selecciona una tonalidad";
        return;
    }
    const camelotCode = camelotMap[selectedScale];

    const number = parseInt(camelotCode);
    const letter = camelotCode.slice(-1);

    let previous = number - 1;
    if (previous === 0) {
        previous = 12;
    }

    let next = number + 1;
    if (next === 13) {
        next = 1;
    }
    let relativeLetter;
    if (letter === "A") {
        relativeLetter = "B";
    } else {
        relativeLetter = "A";
    }

    const previousCode = previous + letter;
    const nextCode = next + letter;
    const relativeCode = number + relativeLetter;

    const previousScale = findScale(previousCode);
    const nextScale = findScale(nextCode);
    const relativeScale = findScale(relativeCode);

    compatibleScales.textContent =
        selectedScale +
        " → " +
        previousScale +
        " · " +
        nextScale +
        " · " +
        relativeScale;
}

camelotButton.addEventListener(
    "click",
    searchCompatibleScales
);