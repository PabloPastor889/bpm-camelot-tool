const MILLISECONDS_PER_MINUTE = 60000;

function calculateBpm(intervalMs: number): number {
  if (intervalMs <= 0) {
    throw new Error('The interval must be greater than zero.');
  }

  return Math.round(MILLISECONDS_PER_MINUTE / intervalMs);
}

const intervalMs: number = 500;
const bpm: number = calculateBpm(intervalMs);

console.info(`Tempo: ${bpm} BPM`);