import { request } from './request'
import type {hotSearchLisr,SearchsuggestRes,searchList} from "./type"

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
	})
}