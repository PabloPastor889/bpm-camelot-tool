// Tap BPM

const MAX_TAPS = 8;
const TAP_TIMEOUT_MS = 2000;
const MILLISECONDS_PER_MINUTE = 60000;

const tapButton = document.getElementById('tapButton');
const resetButton = document.getElementById('resetButton');
const bpmText = document.getElementById('bpm');

let taps = [];

function resetTempo() {
  taps = [];
  bpmText.textContent = '0 BPM';
}

function calculateBpm(tapTimes) {
  if (tapTimes.length < 2) {
    return 0;
  }

  const totalTime = tapTimes[tapTimes.length - 1] - tapTimes[0];

  if (totalTime <= 0) {
    return 0;
  }

  const averageTime = totalTime / (tapTimes.length - 1);

  return Math.round(MILLISECONDS_PER_MINUTE / averageTime);
}

function tapTempo() {
  const currentTime = Date.now();
  const lastTap = taps[taps.length - 1];

  // Start a new measurement after a pause.
  if (lastTap !== undefined && currentTime - lastTap > TAP_TIMEOUT_MS) {
    resetTempo();
  }

  taps.push(currentTime);

  if (taps.length > MAX_TAPS) {
    taps.shift();
  }

  bpmText.textContent = `${calculateBpm(taps)} BPM`;
}

function handleTempoKeydown(event) {
  if (event.code !== 'Space' || event.repeat) {
    return;
  }

  // Preserve native keyboard behavior for interactive elements.
  if (
    event.target instanceof Element &&
    event.target.closest(
      'button, input, select, textarea, a[href], [contenteditable]'
    )
  ) {
    return;
  }

  event.preventDefault();
  tapTempo();
}

tapButton.addEventListener('click', tapTempo);
resetButton.addEventListener('click', resetTempo);
document.addEventListener('keydown', handleTempoKeydown);

// Camelot scales

const CAMELOT_MAP = {
  Abm: '1A',
  Ebm: '2A',
  Bbm: '3A',
  Fm: '4A',
  Cm: '5A',
  Gm: '6A',
  Dm: '7A',
  Am: '8A',
  Em: '9A',
  Bm: '10A',
  'F#m': '11A',
  'C#m': '12A',
  B: '1B',
  'F#': '2B',
  Db: '3B',
  Ab: '4B',
  Eb: '5B',
  Bb: '6B',
  F: '7B',
  C: '8B',
  G: '9B',
  D: '10B',
  A: '11B',
  E: '12B',
};

const selectScale = document.getElementById('selectScale');
const camelotButton = document.getElementById('camelotButton');
const compatibleScales = document.getElementById('compatibleScales');

function findScale(camelotCode) {
  for (const scale in CAMELOT_MAP) {
    if (CAMELOT_MAP[scale] === camelotCode) {
      return scale;
    }
  }

  return undefined;
}

function getCompatibleScales(camelotCode) {
  const number = Number.parseInt(camelotCode, 10);
  const letter = camelotCode.slice(-1);

  const previousNumber = number === 1 ? 12 : number - 1;
  const nextNumber = number === 12 ? 1 : number + 1;
  const relativeLetter = letter === 'A' ? 'B' : 'A';

  return [
    findScale(`${previousNumber}${letter}`),
    findScale(`${nextNumber}${letter}`),
    findScale(`${number}${relativeLetter}`),
  ];
}

function searchCompatibleScales() {
  const selectedScale = selectScale.value;
  const camelotCode = CAMELOT_MAP[selectedScale];

  if (!camelotCode) {
    compatibleScales.textContent = 'Selecciona una tonalidad';
    return;
  }

  const scales = getCompatibleScales(camelotCode);

  compatibleScales.textContent =
    `${selectedScale} → ${scales.join(' · ')}`;
}

camelotButton.addEventListener('click', searchCompatibleScales);