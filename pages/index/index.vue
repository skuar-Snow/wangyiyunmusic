<script setup lang="ts">
import { ref } from 'vue'
import { ballApi,homepageApi } from '../../api/index'
import type{  BallItem ,BannerNewItem ,RecommendedPlay } from '../../api/type.ts'
const ballList = ref<BallItem[]>([])

const bannersList = ref<BannerNewItem[]>([]) // banners 轮播图
const recommendPlaylists = ref<RecommendedPlay[]>([]) // 推荐歌单
const recommendPlaylistsTitle = ref<string>('') //推荐歌单标题
const songSheetHost = ref<RecommendedPlay[]>([]) // 歌单排行榜
const songSheetHostTitle =  ref<string>('') // 歌单排行榜标题
    
const radarPlaylist = ref<RecommendedPlay[]>([]) // 雷达歌单
const radarPlaylistTitle =  ref<string>('') // 雷达歌单标题

const goSearch = () => {
  uni.navigateTo({
    url: "/pages/search/search"
  })
}

//轮播图
// 红色块
const goRankinglist = (item :any) => {
	if(item.name === "排行榜"){
		uni.navigateTo({
			url:"/pages/rankinglist/rankinglist"
		})
	}
}
homepageApi().then(res=>{
	bannersList.value = res.data.data.blocks[0].extInfo.banners   // banners 轮播图
	recommendPlaylists.value = res.data.data.blocks[2].creatives  // 推荐歌单
	recommendPlaylistsTitle.value = res.data.data.blocks[2].uiElement.subTitle.title //推荐歌单 标题
	    
	songSheetHost.value = res.data.data.blocks[3].creatives  // 歌单排行榜
	songSheetHostTitle.value = res.data.data.blocks[3].uiElement.subTitle.title // 歌单排行榜 标题
	console.log(songSheetHost.value)    
	radarPlaylist.value = res.data.data.blocks[4].creatives  // 雷达歌单
	radarPlaylistTitle.value = res.data.data.blocks[4].uiElement.subTitle.title // 歌单排行榜 标题
})

// //每日推荐，私人FM等的图标
ballApi().then(res =>{
  ballList.value = res.data.data
})

const goDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/songlist/songlist?id=${id}`
  })
}
</script>

<template>
	<view class="header">
	    <uni-icons type="list" size="30"></uni-icons>
	    <view class="goSearch" @click="goSearch">
			<uni-icons type="search" size="20" color="#aaa"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
	  <view class="swiper-wrap">
	    <swiper indicator-dots>
	      <swiper-item v-for="item in bannersList" :key="item.pic">
	        <image :src="item.pic" mode="widthFix"></image>
	      </swiper-item>
	    </swiper>
	  </view>
	  <scroll-view scroll-x enable-flex show-scrollbar="true" style="flex-direction: row;">
	    <view class="ball-wrap">
	      <view class="ball" v-for="item in ballList" :key="item.id" @click="goRankinglist(item)">
	        <image :src="item.iconUrl" mode="widthFix"></image>
	        <view class="">
	          {{item.name}}
	        </view>
	      </view>
	    </view>
	  </scroll-view>
	  <!-- 推荐歌单 -->
	  <uni-section :title="recommendPlaylistsTitle" type="line"></uni-section>
	
	  <scroll-view scroll-x enable-flex show-scrollbar="false" style="flex-direction: row;" >
	    <view class="list-wrap" >
	      <view class="song" v-for="item in recommendPlaylists" :key="item.creativeId" @click="goDetail(item.creativeId)">
	          <image :src="item.uiElement.image.imageUrl" mode="widthFix"></image>
	          {{item.uiElement.mainTitle.title}}
	      </view>
	    </view>
	  </scroll-view>
	  <!-- 猜你喜欢的华语好歌 -->
	<!--  <uni-section :title="songSheetHostTitle" type="line">
		</uni-section>
	  <scroll-view class="changeMusic" scroll-x show-scrollbar=false>
	  	<view class="outMusic" v-for="item in songSheetHost" >
	  	 <view class=""  v-for="v in item.resources"> 
			 <image :src="v.uiElement.image.imageUrl" alt="" />
	  	  	<text>{{v.resourceExtInfo.song.al.name}}</text>
					
	  	 </view>
	  	</view>
	  </scroll-view> -->
	  <uni-section :title="songSheetHostTitle" type="line">
	  	</uni-section>
	   <scroll-view class="scrollImg" scroll-x show-scrollbar=false>
	  	  	<view class="changeMusic">
	  	  		<view class="outMusic" v-for="item in songSheetHost" show-scrollbar=false>
	  	  		 <view v-for="v in item.resources"> 
	  	  		   <view class="leftall">
	  	  		   	  <image :src="v.uiElement.image.imageUrl" alt="" />
	  	  		   	  <view class="left">
	  	  		   		  <text>{{v.resourceExtInfo.song.al.name}}</text>
	  	  		   	  </view>
	  	  		   </view>
	  						<svg t="1723816880770" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
	  						p-id="4573" width="20" height="20">
	  						  <path d="M122.112664 953.98846l816.371172-407.954319c0.723477-0.342808 
	  						  1.411139-0.689708 2.099824-1.051959l1.107217-0.550539 0-0.077771c11.644201-6.757914 19.488867-19.377326 
	  						  19.488867-33.827433 0-14.452153-7.844665-27.070542-19.488867-33.828456l0-0.228197L120.241037 
	  						  65.955154c-1.14508-0.649799-2.310625-1.24127-3.51301-1.77646l-2.481518-1.240247-0.230244 
	  						  0.170892c-4.047176-1.431605-8.41874-2.196015-12.96222-2.196015-21.589714 0-39.096437 17.506722-39.096437 
	  						  39.096437 0 0.192382 0 0.382717 0 0.593518l0 821.276902 0.01842 0c0.438998 21.210068 17.754363 38.255279 
	  						  39.078017 38.255279C108.80559 960.13546 116.040365 957.887256 122.112664 953.98846z" fill="#333" p-id="4574">
	  						</path>
	  						</svg>
	  	  		 </view>
	  	  	</view>
	  			</view>
	  	  </scroll-view>
	  <uni-section :title="radarPlaylistTitle" type="line"></uni-section>
	  	
	  <scroll-view scroll-x enable-flex show-scrollbar="false" style="flex-direction: row;" >
	    <view class="list-wrap" >
	      <view class="song" v-for="item in radarPlaylist" :key="item.creativeId" @click="goDetail(item.creativeId)">
	          <image :src="item.uiElement.image.imageUrl" mode="widthFix"></image>
	          {{item.uiElement.mainTitle.title}}
	      </view>
	    </view>
	  </scroll-view>
</template>


<style lang="scss">
	.header {
	  display: flex;
	  // width: 100%;
	  .goSearch {
	    margin-left: 40rpx;
		width: 600rpx;
	    background-color: #eeeeee;
	    color: #aaa;
		display: flex;
		align-items: center;
		justify-content: center;
	  }
	}
	.swiper-wrap {
	  padding: 30rpx;
	  swiper {
	    width: 690rpx;
	    height: 256rpx;
	    overflow: hidden;
	    border-radius: 14rpx;
	  }
	  image {
	    width: 100%;
	  }
	}
	.ball-wrap {
	  width: 100%;
	  display: flex;
		overflow: auto;
		&::-webkit-scrollbar{
			display: none;
		}
	  .ball {
	    width: 20%;
	    flex-shrink: 0;
	    text-align: center;
	    font-size: 12px;
	    image {
	      width: 80rpx;
	      height: 80rpx;
	      border-radius: 50%;
	      background: #c84341;
	    }
	  }
	}
	.list-wrap {
	  width: 100%;
	  display: flex;
		overflow: auto;
		&::-webkit-scrollbar{
			display: none;
		}
	  .song {
	    width: 250rpx;
	    margin-left: 20rpx;
	    padding: 20rpx 0;
	    font-size: 12px;
	    image {
	      width: 250rpx;
	      height: 250rpx;
	    }
	  }
	}
.uni-section-header__decoration line{
	background-color: #c84341 !important;
}
.changeMusic{
	display: flex;  
	min-width: 90%;
	height: 450rpx;
	padding: 20rpx;
	overflow: auto!important;
	&::-webkit-scrollbar{
		display: none!important;
	}
	.outMusic{
		width: 600rpx;
		height:450rpx;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		>view{
			width: 600rpx;
			height:150rpx;
			display: flex;
			font-size: 30rpx;
			justify-content: space-between;
			align-items: center;
			.leftall{
				display: flex;
			}
			.icon{
				margin-right: 80rpx;
			}
			.left{
				display: flex;
				flex-direction: column;
				text:nth-child(2){
					font-size: 25rpx;
					color: #999;
				}
			}
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
			}
			text{
				text-indent: 20rpx;
			}
		}
	}
}
.random{
	display: flex;
	align-items: center;
	font-size: 25rpx;
}
.radarAll{
	display: flex;
	justify-content: space-between;
	padding-left: 20rpx;
		overflow: auto;
		&::-webkit-scrollbar{
			display: none;
		}
	.radarItem{
		width: 500rpx;
		height: 300rpx;
		// display: flex;
		flex-direction: column;
		font-size: 25rpx;
		&::-webkit-scrollbar{
				 display: none;
		}
	
		.textover{
			display: -webkit-box!important;
			text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			height: 70rpx;
		}
		image{
			width: 200rpx;
			height: 200rpx;
			border-radius: 20rpx;
			&:not(last-child){
				margin-right: 20rpx;
			}
		}
	}
}
</style>