const TODAY = 'NULL'
const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export function parseDate(dateStr) {
    let parsedDate;

    if (dateStr !== TODAY) {
        // check if dateStr is in ISO format
        parsedDate = new Date(dateStr);
    }
    else {
        parsedDate = new Date(); // Today
    }

    // Every invalid date will return NaN
    if (!isNaN(parsedDate)) { 
        return parsedDate;
    }

    // Check if dateStr is in the custom format
    if (ddmmyyyy.test(dateStr)) {
        return parseCustomFormat(dateStr)
    }

    throw new Error(`Unsupported date format: ${dateStr}`);
}

// Custom format - DD/MM/YYYY
function parseCustomFormat(dateStr) {
    const [, day, month, year] = dateStr.match(ddmmyyyy);

    const parsedDateCustom = new Date(`${year}-${month}-${day}`);

    if (!isNaN(parsedDateCustom)) {
        return parsedDateCustom;
    }

    throw new Error(`Invalid date: ${dateStr}`);
}

// Calculates overlapping days between two date ranges
export function getOverlappingDays(start1, end1, start2, end2) {
    const laterStart = new Date(Math.max(start1, start2));
    const soonerEnd = new Date(Math.min(end1, end2));
    const diff = (soonerEnd - laterStart) / (1000 * 60 * 60 * 24);

    return diff >= 0 ? diff + 1 : 0;
}