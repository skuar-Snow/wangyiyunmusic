// 轮播图
export interface BannerItem {
	imageUrl:string;
	targetId:number
}

export interface BannerRes  {
	banners:BannerItem[]
	code:number
}

//每日推荐图标
export interface BallItem {
	name:string,
	iconUrl:string,
	id:number
}

export interface BallRes {
	data:BallItem[],
	code:number
}

//推荐歌单
export interface PersonalizedItem {
	id:number;
	name:string;
	picUrl:string
}

export interface PersonalizedRes {
	result:PersonalizedItem[]
	code: number
}

//随机歌单
export interface GoodMusicItem {
	blocks:{};
}

export interface GoodMusicRes {
	code:number;
	data:GoodMusicItem[]
}

// 歌单详情接口
 export interface Song {
  name: string;
  id: number;
  ar: { id: number; name: string; }[];
  al: {
    id: number;
    name: string;
    picUrl: string;
  }
}

// 排行榜接口
export interface RankingItem {
	ToplistType?: string;
	id: number;
	coverImgUrl: string;
	name: string;
	playCount: number;
	updateFrequency: string;
	songs: {
		name: string;
		id: number;
		ar: { id: number; name: string; }[];
		al: {
		id: number;
		name: string;
		picUrl: string;
		}
	}[];
}

export interface RankingRes {
	code: number;
	list: RankingItem[];
}

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
	artists: searchListInerartists[]
}

export interface searchListInerAlbum{
	id: number,
	name: string,
	
}

export interface searchListInerartists{
	id: number,
	img1v1Url: string,
	name: string
}



// /personalized
// 推荐歌单接口
export interface  PersonalizedItem{
	id:number;
	name:string;
	picUrl:string;
	playCount:number;
	trackCount:number;
	trackNumberUpdateTime: number;
} 

export interface PersonalizedRes{
	code:number;
	result:PersonalizedItem[]
}

// 歌单详情接口
export interface Song{
	name:string;
	id:number;
	ar:{id:number;name:string}[];
	al:{
		id:number;
		name:string;
		picUrl:string;
	}
}

export interface PlaylistDetail{
	description:string;
	coverImgUrl:string;
	name:string;
	tage:string[];
	playCount:number;
	id:number;
	commentCount:number;
    shareCount:number;
	subscribedCount:number;
	creator:{
		avatarUrl:string;
		nickname:string;
	}
	tracks:Song[]
}

export interface PlaylistDetailRes{
	code:number;
	playlist:PlaylistDetail;
}

// 歌单评论
export interface CommentItem {
  commentId: number;
  content: string;
  richContent: string;
  ipLocation: {
    location: string;
  }
  timeStr: string;
  time: number;
  user: {
    nickname: string;
    userId: number;
    avatarUrl: string;
  }
}

export interface CommentPlaylistRes{
	comments: CommentItem[];
	  hotComments: CommentItem[];
	  total: number;

}

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



// 歌曲详情
export interface SongDetailRes {
  code: number;
  songs: Song[];
}
// 歌词
export interface LyricRes {
  lrc: {
    lyric: string;
  }
}
// 音乐url
export interface SongUrl {
  url: string;
  time: number;
  id: number;
}
export interface SongUrlRes {
  code: number;
  data: SongUrl[];
}