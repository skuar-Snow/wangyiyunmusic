import { request } from './request'
import type{ BannerRes, BallRes, PersonalizedRes, GoodMusicRes }from './type.ts'
export const homepageApi = () => {
  return request({
    url: 'https://zyxcl.xyz/music/api/homepage/block/page'
  })
}

export const bannerApi = () => {
  return request<BannerRes>({
    url: 'https://zyxcl.xyz/music/api/banner'
  })
}

// https://zyxcl.xyz/music/api/homepage/dragon/ball
export const ballApi = () => {
  return request<BallRes>({
    url: 'https://zyxcl.xyz/music/api/homepage/dragon/ball'
  })
}


export const personalizedApi = () => {
  return request<PersonalizedRes>({
    url: 'https://zyxcl.xyz/music/api/personalized'
  })
}


// playlist/track/all?id=24381616
export const playlistApi = (id: number)=>{
	return request({
		url: `https://zyxcl.xyz/music/api/playlist/track/all`,
		data:{
			id
		}
	})
}

// 随机歌单
export const goodMusicApi = () => {
	return request<GoodMusicRes>({
		url: `http://121.89.213.194:5001/homepage/block/page`,
	})
}