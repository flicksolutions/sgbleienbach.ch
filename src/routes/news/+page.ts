import type { PageLoad } from './$types';

interface ArticleMeta {
	title: string;
	date: string;
	abstract: string;
	slug: string;
}

export const load: PageLoad = async () => {
	const modules = import.meta.glob('./*/+page.svx', { eager: true });

	const articles: ArticleMeta[] = Object.entries(modules).map(([path, mod]) => {
		const slug = path.split('/')[1];
		const { title, date, abstract } = (mod as { metadata: ArticleMeta }).metadata;
		return { title, date, abstract, slug };
	});

	articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { articles };
};
