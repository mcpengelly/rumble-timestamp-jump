// these are duplicated functions for the sake of testing. 

export function parseTimestamp(text) {
    const parts = text.split(':').map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else {
        return null;
    }
}