import { jahresprogrammEvents2026 } from '$lib/data/jahresprogramm';
import { buildIcs } from '$lib/utils/ics';

export const prerender = true;

const icsContent = buildIcs(jahresprogrammEvents2026, {
	calName: 'SG Bleienbach Jahresprogramm 2026'
});

export function GET() {
	return new Response(icsContent, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'attachment; filename="Jahresprogramm-2026.ics"',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
