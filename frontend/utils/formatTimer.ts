export const formatSecToMin = (timeInSec: string): string => {
    const minutes = Math.floor(parseInt(timeInSec) / 60);
    const seconds = parseInt(timeInSec) % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}