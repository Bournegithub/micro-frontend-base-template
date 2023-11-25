interface MenuOptions {
	id: string,
	title?: string,
	code: string,
	icon?: string,
	children?: MenuOptions[] | [] | null,
	parentId: string,
	parentName?: string,
	path: string,
	hidden: boolean
}

interface MenuTransOptions {
	id?: string,
	title?: string,
	code?: string,
	icon?: string,
	children?: string,
	parentId?: string,
	parentName?: string,
	path?: string,
	hidden?: string
}



export type { MenuOptions, MenuTransOptions };

export const defaultMenuOptions = {
	id: 'id',
	title: 'name',
	code: 'code',
	icon: 'icon',
	children: 'children',
	parentId: 'parentId',
	parentName: 'parentName',
	path: 'path',
	hidden: false,
}