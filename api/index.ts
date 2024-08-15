import { request } from './request'
<<<<<<< HEAD
<<<<<<< HEAD
import type { RankingRes  } from './type'
=======
import type {hotSearchLisr,SearchsuggestRes,searchList} from "./type"

>>>>>>> 31fd4f847494ab77cb2b84d2ab996de7ebed7aa0
=======
import {
	PersonalizedRes,
	PlaylistDetailRes,
	CommentPlaylistRes
} from './type'
>>>>>>> jkb
export const homepageApi = () => {
  return request({
    url: 'https://zyxcl.xyz/music/api/homepage/block/page'
  })
}
// 轮播图
export const bannerApi = () => {
  return request({
    url: 'https://zyxcl.xyz/music/api/banner'
  })
}

// https://zyxcl.xyz/music/api/homepage/dragon/ball
export const ballApi = () => {
  return request({
    url: 'https://zyxcl.xyz/music/api/homepage/dragon/ball'
  })
}



// 
// playlist/track/all?id=24381616
export const playlistApi = (id: number)=>{
	return request({
		url: `https://zyxcl.xyz/music/api/playlist/track/all`,
		data:{
			id
		}
	})
}
<<<<<<< HEAD

<<<<<<< HEAD
// /toplist
export const toplistApi = () => {
  return request<RankingRes>({
    url: 'https://zyxcl.xyz/music/api/toplist'
  })
}
// 请求歌曲
// /playlist/track/all?id=24381616&limit=10&offset=1
export const officialListApi = (id: string) => {
	return request({
		url: `https://zyxcl.xyz/music/api//playlist/track/all?id=${id}&limit=3&offset=1`,
=======

//热门搜索列表
// https://zyxcl.xyz/music/api//search/hot
export const SearchListApi = ()=>{
	return request<hotSearchLisr>({
		url:"https://zyxcl.xyz/music/api/search/hot/detail"
	})
}




//搜索建议接口
// /search/suggest?keywords=海阔天空&type=mobile
export const SearchsuggestApi = (keywords :string,type: string)=>{
	return request<SearchsuggestRes>({
		url:"https://zyxcl.xyz/music/api//search/suggest",
		data:{
			keywords,
			type
		}
	})
}



//搜索接口
// https://zyxcl.xyz/music/api/search
export const SearchtApi = (keywords :string)=>{
	return request<searchList>({
		url:"https://zyxcl.xyz/music/api/search",
		data:{
			keywords,
		}
>>>>>>> 31fd4f847494ab77cb2b84d2ab996de7ebed7aa0
	})
}
=======
// 歌单评论
export const commentPlaylistApi=(id:string)=>{
	return request<CommentPlaylistRes>({
		url:'https://zyxcl.xyz/music/api/comment/playlist',
		data:{
			id
		}
	})
}
// 推荐歌单
export const personalizedApi = () => {
  return request<PersonalizedRes>({
    url: 'https://zyxcl.xyz/music/api/personalized'
  })
}

// 歌单详情
export const playlistDetailApi = (id: string) => {
  return request<PlaylistDetailRes>({
    url: 'https://zyxcl.xyz/music/api/playlist/detail',
    data: {
      id
    }
  })
}
>>>>>>> jkb
