interface MenuOptions {
	id: string,
	title?: string,
	code: string,
	icon?: string,
	children?: MenuOptions[] | [] | null,
	parentId: string,
	parentTitle?: string,
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
	parentTitle?: string,
	path?: string,
	hidden?: string
}



export type { MenuOptions, MenuTransOptions };

export const defaultMenuOptions = {
	id: 'id',
	title: 'title',
	code: 'code',
	icon: 'icon',
	children: 'children',
	parentId: 'parentId',
	parentTitle: 'parentTitle',
	path: 'path',
	hidden: false,
}