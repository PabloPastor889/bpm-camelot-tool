// Tap BPM controls

const MAX_TAPS = 8;
const TAP_TIMEOUT_MS = 2000;
const MILLISECONDS_PER_MINUTE = 60000;

const tapButton = document.getElementById('tapButton');
const resetButton = document.getElementById('resetButton');
const bpmText = document.getElementById('bpm');

if (
  !(tapButton instanceof HTMLButtonElement) ||
  !(resetButton instanceof HTMLButtonElement) ||
  !(bpmText instanceof HTMLParagraphElement)
) {
  throw new Error('Required Tap BPM elements were not found.');
}

const tapControl: HTMLButtonElement = tapButton;
const resetControl: HTMLButtonElement = resetButton;
const bpmDisplay: HTMLParagraphElement = bpmText;

let taps: number[] = [];

function resetTempo(): void {
  taps = [];
  bpmDisplay.textContent = '0 BPM';
}

function calculateBpm(tapTimes: number[]): number {
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

function tapTempo(): void {
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

  bpmDisplay.textContent = `${calculateBpm(taps)} BPM`;
}

function handleTempoKeydown(event: KeyboardEvent): void {
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

tapControl.addEventListener('click', tapTempo);
resetControl.addEventListener('click', resetTempo);
document.addEventListener('keydown', handleTempoKeydown);

// Camelot scales

type Scale =
  | 'Cm'
  | 'C#m'
  | 'Dm'
  | 'D#m'
  | 'Em'
  | 'Fm'
  | 'F#m'
  | 'Gm'
  | 'G#m'
  | 'Am'
  | 'A#m'
  | 'Bm'
  | 'C'
  | 'C#'
  | 'D'
  | 'D#'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#'
  | 'A'
  | 'A#'
  | 'B';

type CamelotLetter = 'A' | 'B';

type CamelotNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type CamelotCode = `${CamelotNumber}${CamelotLetter}`;

const CAMELOT_MAP: Record<Scale, CamelotCode> = {
  'G#m': '1A',
  'D#m': '2A',
  'A#m': '3A',
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
  'C#': '3B',
  'G#': '4B',
  'D#': '5B',
  'A#': '6B',
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

if (
  !(selectScale instanceof HTMLSelectElement) ||
  !(camelotButton instanceof HTMLButtonElement) ||
  !(compatibleScales instanceof HTMLParagraphElement)
) {
  throw new Error('Required Camelot elements were not found.');
}

const scaleSelect: HTMLSelectElement = selectScale;
const camelotControl: HTMLButtonElement = camelotButton;
const scalesDisplay: HTMLParagraphElement = compatibleScales;

function isScale(value: string): value is Scale {
  return Object.prototype.hasOwnProperty.call(CAMELOT_MAP, value);
}

function findScale(camelotCode: string): Scale {
  for (const [scale, code] of Object.entries(CAMELOT_MAP)) {
    if (code === camelotCode && isScale(scale)) {
      return scale;
    }
  }

  throw new Error(`Unknown Camelot code: ${camelotCode}`);
}

function getCompatibleScales(camelotCode: CamelotCode): Scale[] {
  const number = Number.parseInt(camelotCode, 10);
  const letter = camelotCode.slice(-1);

  const previousNumber = number === 1 ? 12 : number - 1;
  const nextNumber = number === 12 ? 1 : number + 1;
  const relativeLetter: CamelotLetter = letter === 'A' ? 'B' : 'A';

  return [
    findScale(`${previousNumber}${letter}`),
    findScale(`${nextNumber}${letter}`),
    findScale(`${number}${relativeLetter}`),
  ];
}

function searchCompatibleScales(): void {
  const selectedScale = scaleSelect.value;

  if (!isScale(selectedScale)) {
    scalesDisplay.textContent = 'Selecciona una tonalidad';
    return;
  }

  const camelotCode = CAMELOT_MAP[selectedScale];
  const scales = getCompatibleScales(camelotCode);

  scalesDisplay.textContent =
    `${selectedScale} → ${scales.join(' · ')}`;
}

camelotControl.addEventListener('click', searchCompatibleScales);

export {};