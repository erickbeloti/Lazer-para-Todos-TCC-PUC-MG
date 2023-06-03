export const states: readonly StateType[] = [
	{ code: 'SP', label: 'SP' },
	{
		code: 'MG',
		label: 'MG',
	},
	{ code: 'RJ', label: 'RJ' },
];

export const cities: readonly CityType[] = [
	{ code: 1, label: 'São Paulo' },
	{
		code: 2,
		label: 'Belo Horizonte',
	},
	{ code: 3, label: 'Rio de Janeiro' },
];

export const districts: readonly DistrictType[] = [
	{ code: 1, label: 'Jardim Primavera' },
	{
		code: 2,
		label: 'Zona Rural',
	},
	{ code: 3, label: 'Rio de Janeiro' },
];

export const disabilitiesTypes: readonly DisabilityType[] = [
	{ code: 1, label: 'Física', icon: '/disabilities/fisica.svg' },
	{
		code: 2,
		label: 'Auditiva',
		icon: '/disabilities/auditiva.svg',
	},
	{ code: 3, label: 'Visual', icon: '/disabilities/visual.svg' },
	{ code: 4, label: 'Intelectual', icon: '/disabilities/intelectual.svg' },
	{ code: 5, label: 'Autismo', icon: '/disabilities/autismo.svg' },
	{ code: 6, label: 'Idoso 80+', icon: '/disabilities/idoso80+.svg' },
];
