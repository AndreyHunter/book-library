export interface BookInt {
	id: string;
	name: string;
	title: string;
	author: string;
	favorite: boolean;
}

export interface TypeError {
	message: string;
	code?: number;
}
