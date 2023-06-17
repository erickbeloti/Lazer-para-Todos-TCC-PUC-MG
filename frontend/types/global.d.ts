export {};

declare global {
	interface StateApiType {
		estado: string;
	}

	interface CityApiType {
		cidade: string;
	}

	interface DistrictApiType {
		enderecoId: number;
		bairro: string;
	}

	interface DisabilityApiType {
		id: number;
		tipoDeDeficiencia: string;
		urlIcone: string;
	}

	interface EnderecoApiType {
		id: number;
		estado: string;
		cidade: string;
		bairro: string;
	}

	interface DeficienciaApiType {
		id: number;
		tipoDeDeficiencia: string;
	}

	interface PcDUserApiType {
		id: number;
		nome: string;
		email: string;
		endereco: EnderecoApiType;
		deficiencias: DeficienciaApiType[];
	}
}
