// Gold sponsor logos
import flueckigerLogo from '$lib/assets/sponsoren/gold/Flueckiger.png';
import fuxsarbachLogo from '$lib/assets/sponsoren/gold/fuxsarbach.svg';
import daetwylerLogo from '$lib/assets/sponsoren/gold/Zeichenfläche 1.svg';
import schaerLogo from '$lib/assets/sponsoren/gold/Zeichenfläche 1.webp';

// Silver sponsor logos
import kaesespycherLogo from '$lib/assets/sponsoren/silber/Briefkopf_Kaesespycher.png';
import elektroGygaxLogo from '$lib/assets/sponsoren/silber/Elektro_Gygax_rgb.svg';
import emchLogo from '$lib/assets/sponsoren/silber/emch_bildmarke_cmyk.svg';
import reinmannLogo from '$lib/assets/sponsoren/silber/Reinmann.svg';
import sumiswalderLogo from '$lib/assets/sponsoren/silber/sumiswalder_solo_web.png';
import oschwaldLogo from '$lib/assets/sponsoren/silber/Zeichenfläche 1.svg';

export interface Sponsor {
	name: string;
	tier: 'gold' | 'silver' | 'bronze';
	logo?: string;
	url?: string;
}

export const goldSponsors: Sponsor[] = [
	{
		name: 'flückiger OPTIK + hörcenter GmbH',
		tier: 'gold',
		logo: flueckigerLogo,
		url: 'https://www.flueckiger-optik.ch'
	},
	{
		name: 'fux & sarbach ENGINEERING AG',
		tier: 'gold',
		logo: fuxsarbachLogo,
		url: 'https://www.fse-ag.ch'
	},
	{
		name: 'Daetwyler Management AG',
		tier: 'gold',
		logo: daetwylerLogo,
		url: 'https://www.daetwyler.com'
	},
	{
		name: 'Schär Landtechnik AG',
		tier: 'gold',
		logo: schaerLogo,
		url: 'https://www.schaer-landtechnik.ch'
	}
];

export const silverSponsors: Sponsor[] = [
	{
		name: 'kaesespycher GmbH',
		tier: 'silver',
		logo: kaesespycherLogo,
		url: 'https://www.kaesespycher.ch'
	},
	{
		name: 'Elektro Gygax AG',
		tier: 'silver',
		logo: elektroGygaxLogo,
		url: 'https://www.elektro-gygax.ch'
	},
	{ name: 'Emch Aufzüge AG', tier: 'silver', logo: emchLogo, url: 'https://www.emch.com' },
	{
		name: 'Reinmann Drucklösungen AG',
		tier: 'silver',
		logo: reinmannLogo,
		url: 'https://www.reinmann-dl.ch'
	},
	{
		name: 'Sumiswalder Krankenkasse',
		tier: 'silver',
		logo: sumiswalderLogo,
		url: 'https://www.sumiswalder.ch'
	},
	{ name: 'Oschwald AG', tier: 'silver', logo: oschwaldLogo, url: 'https://www.oschwald.ch' }
];

export const bronzeSponsors: Sponsor[] = [
	{ name: 'AIRLA AIRCRAFT SERVICE GMBH', tier: 'bronze', url: 'https://www.airla.ch' },
	{ name: 'Alfred Spycher', tier: 'bronze' },
	{ name: 'Allianz Suisse', tier: 'bronze', url: 'https://www.allianz.ch' },
	{ name: 'Amplifon AG', tier: 'bronze', url: 'https://www.amplifon.ch' },
	{ name: 'beklebt.ch GmbH', tier: 'bronze', url: 'https://www.beklebt.ch' },
	{
		name: 'Clientis Bank Oberaargau',
		tier: 'bronze',
		url: 'https://www.bankoberaargau.ch'
	},
	{ name: 'Daniel Rickli', tier: 'bronze' },
	{ name: 'Die Mobiliar', tier: 'bronze', url: 'https://www.mobiliar.ch' },
	{ name: 'Familie A. Morf', tier: 'bronze' },
	{ name: 'Fankhauser AG Landmaschinen & Service', tier: 'bronze' },
	{ name: 'Gemeinde Bleienbach', tier: 'bronze', url: 'https://www.bleienbach.ch' },
	{ name: 'Gemeinde Rütschelen', tier: 'bronze', url: 'https://www.ruetschelen.ch' },
	{ name: 'Hansjürg und Anneliese Flückiger', tier: 'bronze' },
	{ name: 'Haudenschild AG', tier: 'bronze', url: 'https://www.haudenschild.ch' },
	{ name: 'Kaminfeger Lanz AG', tier: 'bronze', url: 'https://www.kaminfeger-lanz.ch' },
	{ name: 'Kuert Druck AG', tier: 'bronze', url: 'https://www.kuert.ch' },
	{ name: 'Land-Metzg Rickli AG', tier: 'bronze' },
	{ name: 'LANDI Buchsi Genossenschaft', tier: 'bronze', url: 'https://www.landibuchsi.ch' },
	{
		name: 'Ledermann der mobile Zimmermann',
		tier: 'bronze',
		url: 'https://www.ledermann-zimmermann.ch'
	},
	{ name: 'M. Gerber AG', tier: 'bronze', url: 'https://gerbertiefbau.ch/' },
	{ name: 'Partl Beck GmbH', tier: 'bronze', url: 'https://www.partl-beck.ch' },
	{ name: 'René Weber', tier: 'bronze' },
	{ name: 'Ricardo Caceda-Suter und Familie', tier: 'bronze' },
	{
		name: 'Schreiner Gerber beraten planen vollenden GmbH',
		tier: 'bronze',
		url: 'https://www.schreinergerber.ch/'
	},
	{ name: 'Sutter Bauunternehmung AG', tier: 'bronze', url: 'https://www.sutterbau.ch' },
	{ name: 'Ulrich Geissbühler', tier: 'bronze' },
	{
		name: 'Ulrich Staub Buchhaltungs- und Treuhandbüro AG',
		tier: 'bronze',
		url: 'https://www.treuhandstaub.ch'
	}
];

export const allSponsors: Sponsor[] = [...goldSponsors, ...silverSponsors, ...bronzeSponsors];
