import { request } from './request'
import {
	PersonalizedRes,
	PlaylistDetailRes,
	CommentPlaylistRes
} from './type'
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
