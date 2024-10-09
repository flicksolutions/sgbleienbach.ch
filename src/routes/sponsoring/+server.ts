import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	redirect(
		307,
		'https://docs.google.com/forms/d/e/1FAIpQLSdtkBJg4aUqKvaNubY8euA5s97TvgsTUOZF3T9o9NnH_opMXA/viewform?usp=sf_link'
	);
};

export const prerender = true;
