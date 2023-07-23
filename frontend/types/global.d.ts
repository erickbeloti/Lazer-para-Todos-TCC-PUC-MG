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

	interface DeficienciaConfirmadaApiType {
		deficiencia: DeficienciaApiType;
		confirmada: boolean;
	}

	interface ImagemProprietarioUserApiType {
		id: number;
		url: string;
	}

	interface ComentarioApiType {
		id: number;
		nome: string;
		comentario: string;
		avaliacao: number;
		deficiencias: DeficienciaApiType[];
	}

	interface PcDUserApiType {
		id: number;
		nome: string;
		email: string;
		endereco: EnderecoApiType;
		deficiencias: DeficienciaApiType[];
	}

	interface ProprietarioUserApiType {
		id: number;
		nomeEstabelecimento: string;
		email: string;
		logradouro: string;
		endereco: EnderecoApiType;
		telefone: string;
		deficiencias: DeficienciaConfirmadaApiType[];
		descricao: string;
		urlIcone: string;
		imagens: ImagemProprietarioUserApiType[];
		avaliacaoMedia: number;
		comentarios: ComentarioApiType[];
	}

	interface ProprietarioSummaryApiType {
		id: number;
		nomeEstabelecimento: string;
		urlIcone: string;
	}
}
