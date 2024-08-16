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