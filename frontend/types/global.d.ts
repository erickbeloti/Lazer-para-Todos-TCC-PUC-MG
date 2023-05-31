export {};

declare global {
	interface StateType {
		code: string;
		label: string;
	}

	interface CityType {
		code: number;
		label: string;
	}

	interface DistrictType {
		code: number;
		label: string;
	}

	interface DisabilityType {
		code: number;
		label: string;
		icon: string;
	}
}
