import type { JahresprogrammEvent } from '$lib/data/jahresprogramm';

interface BuildIcsOptions {
	prodId: string;
	calName: string;
}

const DEFAULT_OPTIONS: BuildIcsOptions = {
	prodId: '-//sgbleienbach.ch//Jahresprogramm 2026//DE',
	calName: 'SG Bleienbach Jahresprogramm 2026'
};

function formatDate(date: string): string {
	return date.replaceAll('-', '');
}

function formatDateTime(date: string, time: string): string {
	const [hours, minutes] = time.split(':');
	return `${formatDate(date)}T${hours}${minutes}00`;
}

function toUtcDateTimeStamp(value: Date): string {
	const iso = value.toISOString();
	return iso
		.replaceAll('-', '')
		.replaceAll(':', '')
		.replace(/\.\d{3}Z$/, 'Z');
}

function addDays(date: string, days: number): string {
	const [year, month, day] = date.split('-').map(Number);
	const value = new Date(Date.UTC(year, month - 1, day + days, 12));
	const y = value.getUTCFullYear();
	const m = String(value.getUTCMonth() + 1).padStart(2, '0');
	const d = String(value.getUTCDate()).padStart(2, '0');
	return `${y}${m}${d}`;
}

function escapeText(value: string): string {
	return value
		.replaceAll('\\', '\\\\')
		.replaceAll('\r\n', '\n')
		.replaceAll('\n', '\\n')
		.replaceAll(';', '\\;')
		.replaceAll(',', '\\,');
}

function foldLine(line: string): string[] {
	const encoder = new TextEncoder();
	const chunks: string[] = [];
	let current = '';

	for (const character of line) {
		const candidate = `${current}${character}`;
		if (encoder.encode(candidate).length > 75) {
			chunks.push(current);
			current = ` ${character}`;
		} else {
			current = candidate;
		}
	}

	chunks.push(current);
	return chunks;
}

function eventLines(event: JahresprogrammEvent, dtStamp: string): string[] {
	const lines: string[] = ['BEGIN:VEVENT'];

	lines.push(`UID:${event.id}@sgbleienbach.ch`);
	lines.push(`DTSTAMP:${dtStamp}`);

	if (event.start) {
		lines.push(`DTSTART;TZID=Europe/Zurich:${formatDateTime(event.date, event.start)}`);
		if (event.end) {
			lines.push(`DTEND;TZID=Europe/Zurich:${formatDateTime(event.date, event.end)}`);
		}
	} else {
		lines.push(`DTSTART;VALUE=DATE:${formatDate(event.date)}`);
		lines.push(`DTEND;VALUE=DATE:${addDays(event.date, 1)}`);
	}

	lines.push(`SUMMARY:${escapeText(event.title)}`);
	lines.push(`LOCATION:${escapeText(event.location)}`);
	lines.push(`CATEGORIES:${escapeText(event.category)}`);

	if (event.note) {
		lines.push(`DESCRIPTION:${escapeText(event.note)}`);
	}

	lines.push('END:VEVENT');
	return lines;
}

export function buildIcs(
	events: JahresprogrammEvent[],
	options: Partial<BuildIcsOptions> = {}
): string {
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
	const dtStamp = toUtcDateTimeStamp(new Date());
	const lines: string[] = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		`PRODID:${mergedOptions.prodId}`,
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		`X-WR-CALNAME:${escapeText(mergedOptions.calName)}`,
		'X-WR-TIMEZONE:Europe/Zurich',
		'BEGIN:VTIMEZONE',
		'TZID:Europe/Zurich',
		'X-LIC-LOCATION:Europe/Zurich',
		'BEGIN:DAYLIGHT',
		'TZOFFSETFROM:+0100',
		'TZOFFSETTO:+0200',
		'TZNAME:CEST',
		'DTSTART:19700329T020000',
		'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
		'END:DAYLIGHT',
		'BEGIN:STANDARD',
		'TZOFFSETFROM:+0200',
		'TZOFFSETTO:+0100',
		'TZNAME:CET',
		'DTSTART:19701025T030000',
		'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
		'END:STANDARD',
		'END:VTIMEZONE'
	];

	for (const event of events) {
		lines.push(...eventLines(event, dtStamp));
	}

	lines.push('END:VCALENDAR');

	return lines
		.flatMap((line) => foldLine(line))
		.join('\r\n')
		.concat('\r\n');
}
