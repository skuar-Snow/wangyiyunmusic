import { request } from './request'
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