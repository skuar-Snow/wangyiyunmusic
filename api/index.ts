import { request } from './request'
import type { RankingRes  } from './type'
export const homepageApi = () => {
  return request({
    url: 'https://zyxcl.xyz/music/api/homepage/block/page'
  })
}

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


export const personalizedApi = () => {
  return request({
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
	})
}