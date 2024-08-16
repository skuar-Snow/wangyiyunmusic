<script setup lang="ts">
import { ref } from 'vue'
import { bannerApi, personalizedApi, ballApi, goodMusicApi } from '../../api/index'
import type{ BannerItem, BallItem, PersonalizedItem, GoodMusicRes  } from '../../api/type.ts'
const banners = ref<BannerItem[]>([])
const playlist = ref<PersonalizedItem[]>([])
const ballList = ref<BallItem[]>([])
const goodMusic = ref<GoodMusicRes[]>([])
const radarMusic = ref([])
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
  radarMusic.value = res.data.data.blocks[4]
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
	           
	 <scroll-view class="scrollImg" scroll-x show-scrollbar=false>
	  	<view class="changeMusic">
	  		<view class="outMusic" v-for="item in goodMusic.creatives" show-scrollbar=false>
	  		 <view v-for="v in item.resources"> 
	  		   <view class="leftall">
	  		   	  <image :src="v.uiElement.image.imageUrl" alt="" />
	  		   	  <view class="left">
	  		   		  <text>{{v.resourceExtInfo.song.name}}</text>
	  		   		  <text>{{v.resourceExtInfo.artists[0].name}}</text>
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
	  </scroll-view>
		<!-- 雷达歌单 -->
		<view class="radar">
			<uni-section type="line" title="雷达歌单"></uni-section>
			</view>
			<scroll-view scroll-x="true" >
				<view scroll-x class="radarAll" show-scrollbar=false>
					 <view v-for="item in radarMusic.creatives" class="radarItem">
						 <image :src="item.uiElement.image.imageUrl" mode="" class="imgs"></image>
				     <view class="textover">{{item.uiElement.mainTitle.title}}</view>
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
