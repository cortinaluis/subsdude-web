function convertDecimalTimestampToFormatted(decimal: number): string {
  const [totalBigTime, milliseconds] = `${decimal}`.split('.');

  let total = Number(totalBigTime);
  const seconds = total % 60;
  let minutes = 0;

  while (total > seconds) {
    minutes++;
    total -= 60;
  }

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');
  const paddedMilliseconds = milliseconds.padEnd(3, '0');
  return `00:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
}

function mapCueToVttSegment({ startTime, id, endTime, text }: VTTCue) {
  const startTimeFormatted = convertDecimalTimestampToFormatted(startTime);
  const endTimeFormatted = convertDecimalTimestampToFormatted(endTime);
  return `${id}\n${startTimeFormatted} --> ${endTimeFormatted}\n${text}\n`;
}

export function mapCuesToWebVTT(cues: VTTCue[]): string {
  if (!cues.length) {
    throw new Error('Cannot map cues as they are `null`.');
  }
  return (
    `WEBVTT\n\n${Object.values(cues).map(mapCueToVttSegment).join('\n')}`
  );
}