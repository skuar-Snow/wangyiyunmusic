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
	  <uni-section :title="songSheetHostTitle" type="line">
		</uni-section>
	  <scroll-view class="changeMusic" scroll-x show-scrollbar=false>
	  	<view class="outMusic" v-for="item in songSheetHost" >
	  	 <view class=""  v-for="v in item.resources"> 
			 <img :src="v.uiElement.image.imageUrl" alt="" />
	  	  	<text>{{v.resourceExtInfo.song.al.name}}</text>
					
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
	  .ball {
	    width: 20%;
	    flex-shrink: 0;
	    text-align: center;
	    font-size: 12px;
	    image {
	      width: 50%;
	      height: 40px;
	      border-radius: 50%;
	      background: #c84341;
	    }
	  }
	}
	.list-wrap {
	  width: 100%;
	  display: flex;
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
	height: 300rpx;
	padding: 20rpx;
	.outMusic{
		width: 2000rpx;
		height:100rpx;
		overflow-x: scroll;
		display: flex;
		// padding: 20rpx;
		box-sizing: border-box;
		>view{
			width: 80%;
			height:100rpx;
			display: flex;
			justify-content: flex-start;
			img{
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
			}
			text{
				text-indent: 20rpx;
			}
		}
	}

}
</style>
