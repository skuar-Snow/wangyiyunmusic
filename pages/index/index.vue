<script setup lang="ts">
import { ref } from 'vue'
import { bannerApi, personalizedApi, ballApi, goodMusicApi } from '../../api/index'
import type{ BannerItem, BallItem, PersonalizedItem, GoodMusicItem  } from '../../api/type.ts'
const banners = ref<BannerItem[]>([])
const playlist = ref<PersonalizedItem[]>([])
const ballList = ref<BallItem[]>([])
const goodMusic = ref<GoodMusicItem[]>([])
const goSearch = () => {
  uni.navigateTo({
    url: "/pages/search/search"
  })
}

//轮播图
// 红色块
const goRankinglist = (item) => {
	if(item.name === "排行榜"){
		uni.navigateTo({
			url:"/pages/rankinglist/rankinglist"
		})
	}
}




bannerApi().then(res => {
  banners.value = res.data.banners
})
//每日推荐，私人FM等的图标
ballApi().then(res =>{
  ballList.value = res.data.data
})
//推荐歌单
personalizedApi().then(res => {
  playlist.value = res.data.result
})

const goDetail = (id:number) => {
  uni.navigateTo({
    url: `/pages/songlist/songlist?id=${id}`
  })
}
//随机歌单
goodMusicApi()
.then(res => {
	goodMusic.value = res.data.data.blocks[3]
  console.log(res.data.data.blocks[3].creatives)
})
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
	      <swiper-item v-for="item in banners" :key="item.imageUrl">
	        <image :src="item.imageUrl" mode="widthFix"></image>
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
	  <uni-section title="推荐歌单" type="line"></uni-section>
	
	  <scroll-view scroll-x enable-flex show-scrollbar="false" style="flex-direction: row;" >
	    <view class="list-wrap" >
	      <view class="song" v-for="item in playlist" :key="item.id" @click="goDetail(item.id)">
	          <image :src="item.picUrl" mode="widthFix"></image>
	          {{item.name}}
	      </view>
	    </view>
	  </scroll-view>
	  <!-- 随机歌曲 -->
	  <view class="random">
	  	  <uni-section type="line"></uni-section>
	  		<text>{{ goodMusic.uiElement.subTitle.title }}</text>
	  </view>
	           
	  <scroll-view class="changeMusic" scroll-x show-scrollbar=false>
	  	<view class="outMusic" v-for="item in goodMusic.creatives" >
	  	 <view class=""  v-for="v in item.resources"> 
			    	<img :src="v.uiElement.image.imageUrl" alt="" />
			    <view class="left">
			    	<text>{{v.resourceExtInfo.song.name}}</text>
			    	<text>{{v.resourceExtInfo.artists[0].name}}</text>
			    </view>
	  	 </view>
	  	</view>
	  </scroll-view>
</template>


<style lang="scss">
	.header {
	  display: flex;
	  width: 100%;
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
			font-size: 30rpx;
			.left{
				display: flex;
				flex-direction: column;
				text:nth-child(2){
					font-size: 25rpx;
					color: #999;
				}
			}
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
.random{
	display: flex;
	align-items: center;
	font-size: 25rpx;
}
</style>
