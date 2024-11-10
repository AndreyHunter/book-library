export interface BookInt {
	id: string;
	name: string;
	author: string;
	favorite: boolean;
}

export interface TypeError {
	message: string;
	code?: number;
}