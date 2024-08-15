


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