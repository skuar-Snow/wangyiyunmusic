


// 热门搜素接口
export interface hotSearchLisr {
	code:number,
	data:hotInnerList[],
	message:string
}

export interface hotInnerList {
	iconUrl:string,
	score:number,
	searchWord:string
}


//搜索建议接口
export interface SearchsuggestRes{
	code: number,
	result : innerAllMatch
}

export interface innerAllMatch{
	allMatch:searchsuggestIner[]
}

export interface searchsuggestIner{
	keyword: string
}


//搜索接口
export interface searchList{
	code: number,
	result:innersearch
}

export interface innersearch{
	hasMore: boolean,
	songCount: number,
	songs:searchListIner[]
}

export interface searchListIner{
	name: string,
	album:searchListInerAlbum
}

export interface searchListInerAlbum{
	id: number,
	name: string,
	artists: searchListInerartists[]
}

export interface searchListInerartists{
	id: number,
	img1v1Url: string,
	name: string
}