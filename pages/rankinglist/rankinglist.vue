<script setup lang="ts">
import { ref } from 'vue'
import { toplistApi , officialListApi } from '../../api'
import type { RankingItem , Song } from '../../api/type'

const list = ref<RankingItem[]>([])
const officialList = ref<RankingItem[]>([])
const rankingList = ref<RankingItem[]>([])
const officialListSongs = ref<Song>([])

toplistApi().then(res => {
	console.log(res.data);
	list.value = res.data.list
	officialList.value = list.value.filter(item => {
		return item.ToplistType != null
	})
	rankingList.value = list.value.filter(item => {
		return item.ToplistType == null
	})
	// console.log(officialList.value);
	// console.log(rankingList.value);
	officialList.value.forEach(v => {
		officialListApi(v.id).then(res => {
			// console.log(res.data);
			v.songs = res.data.	songs
		})
	})
	console.log(officialList.value);
})


const goDetail = (id) => {
  uni.navigateTo({
    url: `/pages/songlist/songlist?id=${id}`
  })
}



</script>


<template>
	<view class="official">
		<uni-section class="mb-10" title="官方榜" type="line"></uni-section>
		<view class="official-item" v-for="item in officialList" :key="item.name" @click="goDetail(item.id)">
			<view class="top">
				<image :src="item.coverImgUrl" mode=""></image>
				<view class="top-title">
					<view class="name">{{item.name}}</view>
					<view class="playCount">{{item.playCount}}</view>
				</view>
				<view class="updateFrequency">{{item.updateFrequency}}</view>
			</view>
			
			<view class="songs" >
				<view class="song-item" v-for="(it,idx) in item.songs" :key="it.name">{{idx + 1}}.{{it.name}}-{{it.ar.map(v => v.name).join('/')}}</view>
			</view>
		</view>
	</view>
	
	<uni-section class="mb-10" title="其他榜单" type="line"></uni-section>
	<view class="elsslist">
		<view class="elsslist-item" v-for="item in rankingList" :key="item.coverImgUrl"  @click="goDetail(item.id)">
			<image :src="item.coverImgUrl" mode=""></image>
		</view>
	</view>
</template>


<style lang="scss" scoped>
.official{
	padding: 10rpx 30rpx;
}
.official-item{
	padding: 10rpx 20rpx;
	border: 1px solid #ccc;
	margin-bottom: 30rpx;
	border-radius: 10rpx;
	box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
	.top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
		border-bottom: 1px solid #ccc;
		image{
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}
		.top-title{
			flex: 1;
			height: 80rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.name{
				font-size: 15px;
				color: #3a3a3a;
			}
			.playCount{
				font-size: 12px;
				color: #ccc;
			}
		}
		.updateFrequency{
			height: 80rpx;
			line-height: 80rpx;
			font-size: 12px;
			color: #ccc;
		}
	}
	.songs{
		padding: 20rpx;
		.song-item{
			font-size: 24rpx;
			height: 48rpx;
			line-height: 48rpx;
			color: #3a3a3a;
		}
	}
}

.elsslist{
	padding: 30rpx;
	display: flex;
	flex-wrap: wrap;
	.elsslist-item{
		padding: 10rpx 0;
		margin-right: 30rpx;
		&:nth-child(3n){
			margin-right: 0;
		}
		image{
			width: 210rpx;
			height: 210rpx;
			border-radius: 10rpx;
		}
	}
}
</style>
