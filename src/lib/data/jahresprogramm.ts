export const JAHRESPROGRAMM_CATEGORIES = [
	'Hauptversammlung',
	'Obligatorische Übung',
	'Freie Übung',
	'Einzelwettschiessen',
	'Feldschiessen',
	'Eidgenössisches Schützenfest',
	'Verbandsschiessen',
	'Ausschiessen',
	'Altjahresschiessen'
] as const;

export type JahresprogrammCategory = (typeof JAHRESPROGRAMM_CATEGORIES)[number];

export interface JahresprogrammEvent {
	id: string;
	category: JahresprogrammCategory;
	title: string;
	date: string; // YYYY-MM-DD
	start?: string; // HH:mm
	end?: string; // HH:mm
	location: string;
	note?: string;
}

export const jahresprogrammEvents2026: JahresprogrammEvent[] = [
	{
		id: '2026-03-02-hauptversammlung',
		category: 'Hauptversammlung',
		title: 'Hauptversammlung',
		date: '2026-03-02',
		start: '20:00',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-05-02-obligatorische-uebung-1',
		category: 'Obligatorische Übung',
		title: 'Obligatorische Übung',
		date: '2026-05-02',
		start: '13:30',
		end: '15:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-06-24-obligatorische-uebung-2',
		category: 'Obligatorische Übung',
		title: 'Obligatorische Übung',
		date: '2026-06-24',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-08-31-obligatorische-uebung-3',
		category: 'Obligatorische Übung',
		title: 'Obligatorische Übung',
		date: '2026-08-31',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-03-21-freie-uebung-1',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-03-21',
		start: '13:30',
		end: '15:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-04-08-freie-uebung-2',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-04-08',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-04-20-freie-uebung-3',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-04-20',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-05-11-freie-uebung-4',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-05-11',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-05-26-freie-uebung-5',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-05-26',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-06-01-freie-uebung-6',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-06-01',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-06-11-freie-uebung-7',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-06-11',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-06-15-freie-uebung-8',
		category: 'Freie Übung',
		title: 'Freie Übung',
		date: '2026-06-15',
		start: '18:30',
		end: '20:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-04-15-einzelwettschiessen-vorschiessen',
		category: 'Einzelwettschiessen',
		title: 'Einzelwettschiessen',
		date: '2026-04-15',
		start: '18:00',
		end: '20:00',
		location: 'Bettenhausen',
		note: 'Vorschiessen'
	},
	{
		id: '2026-04-24-einzelwettschiessen',
		category: 'Einzelwettschiessen',
		title: 'Einzelwettschiessen',
		date: '2026-04-24',
		start: '18:00',
		end: '20:00',
		location: 'Bettenhausen'
	},
	{
		id: '2026-04-25-einzelwettschiessen',
		category: 'Einzelwettschiessen',
		title: 'Einzelwettschiessen',
		date: '2026-04-25',
		start: '16:00',
		end: '18:00',
		location: 'Bettenhausen'
	},
	{
		id: '2026-05-13-feldschiessen-training',
		category: 'Feldschiessen',
		title: 'Feldschiessen',
		date: '2026-05-13',
		start: '18:00',
		end: '20:00',
		location: 'Oberönz',
		note: 'Training'
	},
	{
		id: '2026-05-20-feldschiessen-vorschiessen',
		category: 'Feldschiessen',
		title: 'Feldschiessen',
		date: '2026-05-20',
		start: '18:00',
		end: '20:00',
		location: 'Oberönz',
		note: 'Vorschiessen'
	},
	{
		id: '2026-05-29-feldschiessen',
		category: 'Feldschiessen',
		title: 'Feldschiessen',
		date: '2026-05-29',
		start: '17:30',
		end: '20:00',
		location: 'Oberönz'
	},
	{
		id: '2026-05-30-feldschiessen-vormittag',
		category: 'Feldschiessen',
		title: 'Feldschiessen',
		date: '2026-05-30',
		start: '09:30',
		end: '12:00',
		location: 'Oberönz'
	},
	{
		id: '2026-05-30-feldschiessen-nachmittag',
		category: 'Feldschiessen',
		title: 'Feldschiessen',
		date: '2026-05-30',
		start: '13:30',
		end: '17:30',
		location: 'Oberönz',
		note: 'Danach Königsstich'
	},
	{
		id: '2026-06-18-eidgenoessisches-schuetzenfest',
		category: 'Eidgenössisches Schützenfest',
		title: 'Eidgenössisches Schützenfest Graubünden',
		date: '2026-06-18',
		location: 'Graubünden'
	},
	{
		id: '2026-08-19-verbandsschiessen-vorschiessen',
		category: 'Verbandsschiessen',
		title: 'Verbandsschiessen',
		date: '2026-08-19',
		start: '18:00',
		end: '20:00',
		location: 'Herzogenbuchsee',
		note: 'Vorschiessen'
	},
	{
		id: '2026-09-04-verbandsschiessen',
		category: 'Verbandsschiessen',
		title: 'Verbandsschiessen',
		date: '2026-09-04',
		start: '18:00',
		end: '20:00',
		location: 'Herzogenbuchsee'
	},
	{
		id: '2026-09-05-verbandsschiessen',
		category: 'Verbandsschiessen',
		title: 'Verbandsschiessen',
		date: '2026-09-05',
		start: '14:00',
		end: '16:00',
		location: 'Herzogenbuchsee'
	},
	{
		id: '2026-10-10-ausschiessen-1',
		category: 'Ausschiessen',
		title: 'Ausschiessen',
		date: '2026-10-10',
		start: '14:00',
		end: '16:00',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-10-18-ausschiessen-2-vormittag',
		category: 'Ausschiessen',
		title: 'Ausschiessen',
		date: '2026-10-18',
		start: '10:00',
		end: '12:00',
		location: 'Schützenhaus Bleienbach',
		note: 'Mittagessen auf Voranmeldung'
	},
	{
		id: '2026-10-18-ausschiessen-2-nachmittag',
		category: 'Ausschiessen',
		title: 'Ausschiessen',
		date: '2026-10-18',
		start: '13:30',
		end: '15:30',
		location: 'Schützenhaus Bleienbach',
		note: 'Mittagessen auf Voranmeldung'
	},
	{
		id: '2026-10-30-ausschiessen-preisverteilung',
		category: 'Ausschiessen',
		title: 'Ausschiessen Preisverteilung',
		date: '2026-10-30',
		start: '19:30',
		location: 'Schützenhaus Bleienbach'
	},
	{
		id: '2026-12-26-altjahresschiessen',
		category: 'Altjahresschiessen',
		title: 'Altjahresschiessen',
		date: '2026-12-26',
		start: '13:30',
		end: '15:00',
		location: 'Schützenhaus Bleienbach'
	}
];

export interface JahreskonkurrenzCategory {
	id: string;
	label: string;
	hint?: string;
	lastDate?: string;
}

export const jahreskonkurrenzCategories2026: JahreskonkurrenzCategory[] = [
	{ id: 'obligatorische-uebung', label: 'Obligatorische Übung' },
	{ id: 'verbandsschiessen', label: 'Verbandsschiessen' },
	{ id: 'feldschiessen', label: 'Feldschiessen' },
	{ id: 'bernerstich', label: 'Bernerstich', hint: 'Bis Ende August', lastDate: '2026-08-31' },
	{ id: 'feldstich', label: 'Feldstich', hint: 'Bis Ende Mai', lastDate: '2026-05-26' },
	{
		id: 'eidgenoessisches-sektionsresultat',
		label: 'Sektionsresultat am Eidgenössischen Schützenfest Graubünden'
	}
];
