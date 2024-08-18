<script setup lang="ts">
import {ref,watch } from "vue"
import { SearchListApi,SearchsuggestApi,SearchtApi } from '../../api/index'
import type { hotInnerList,searchsuggestIner,searchListIner } from '../../api/type'
import { usePlayerStore } from '../../stores/player'
  
const playerStore = usePlayerStore()
// 热搜歌曲
const HotList =ref<hotInnerList[]>([])
//搜索建议
const suggestList =ref<searchsuggestIner[]>([])
//搜索歌曲list
const searchTable = ref<searchListIner[]>([])
//热门搜索歌曲列表
const hotSearchList = ref<string[]>([])
// 直接声明为 string[] 类型
const searchHistory = ref<string[]>(uni.getStorageSync('searchHistory') || []);
// console.log(searchHistory.value)
let show = ref<boolean>(false)
let showclose = ref<boolean>(false)
let showCon = ref<boolean>(true)
let showSuggest = ref<boolean>(false)
let showTable = ref<boolean>(false)
let showHistory =ref<boolean>(false)
const componentKey = ref(0)
const keyWord = ref('')
SearchListApi().then(res=>{
	// console.log(res.data.data)
    HotList.value=res.data.data
})
const FocusEvent = () =>{
	show.value=true
}
watch(searchHistory,()=>{
	if(searchHistory.value.length>0){
		showHistory.value=true
	}else{
		showHistory.value=false
	}
})
watch(keyWord, () => {
  if(keyWord.value.length>0){
	  showclose.value=true
  }else{
	  showclose.value=false
  }
});
const clear = () =>{
	keyWord.value=''
	show.value=false
	showCon.value=true
	showTable.value=false
}
const clear1 = () =>{
	keyWord.value=''
	showTable.value=false
}

const search = () =>{
	showCon.value=false
	showSuggest.value=true
	showTable.value=false
	SearchsuggestApi(keyWord.value,"mobile").then(res=>{
		suggestList.value=res.data.result.allMatch
	})
}

const gotable = (keyword: string) => {
  show.value = true;
  showCon.value = false;
  showSuggest.value = false;
  showTable.value = true;
  
  // 检查关键词是否已存在
  if (!hotSearchList.value.includes(keyword)) {
    keyWord.value = keyword;
    hotSearchList.value.push(keyword); // 添加关键词到搜索历史
	searchHistory.value = hotSearchList.value;
	uni.setStorageSync('searchHistory', searchHistory.value);
  } else {
    console.log('This keyword already exists in the search history.');
  }

  // 其他逻辑...
  SearchtApi(keyWord.value).then(res => {
    console.log(res.data.result.songs);
    searchTable.value = res.data.result.songs;
  });
}
watch(searchHistory, (newVal) => {
  if (newVal.length > 0) {
    // 当 hotSearchList 更新时，更新 searchHistory
    searchHistory.value = newVal;
    uni.setStorageSync('searchHistory', newVal);
  }
});
watch(searchHistory, (newVal) => {
  if (newVal.length === 0) {
    componentKey.value += 1; // 如果searchHistory为空，则增加key的值
  }
});

const remove= () =>{
	// 删除指定的存储数据
	uni.removeStorageSync('searchHistory');
	componentKey.value += 1;
}

const goPlayer = (item: any) => {
  // 把当前歌曲添加到store中
  playerStore.pushSong(item)
  uni.navigateTo({
    url: `/pages/player/player?id=${item.id}`
  })
}

</script>

<template>
	<view class="" :key="componentKey">
		<view class="search_box">
			<input 
			v-model="keyWord"
			class="uni-input" 
			@focus="FocusEvent"  
			placeholder="请输入要搜索的歌曲/歌手" 
			@input="search"
			/>
			<test 	@click="clear1" v-if="showclose" class="close">x</test>
			<span 
			v-if="show"
			@click="clear"
			>取消</span>
		</view>
		
		 <view v-if="showCon">
			 <view class="history" v-show="showHistory">
			 	<view class="topTi">
			 		<uni-section title="搜索历史" type="line"></uni-section>
			 		<uni-icons @click="remove" type="trash" class="trash" size="30"></uni-icons>
			 	</view>
				<view class="historyList">
				  <view class="item" v-for="item in hotSearchList">
				    {{ item }}
				  </view>
				</view>
			 </view>
			<uni-section title="热门搜索" type="line"></uni-section>
			<view class="list" >
			   <uni-list :border="false">
					<uni-list-item
					   v-for="(item, index) in HotList"
					   :title="item.searchWord"
					   clickable
					  @click="gotable(item.searchWord)"
					 >
					<template v-slot:header>
						<view class="no">{{index + 1}}</view>
					</template>
					</uni-list-item>
			   </uni-list>
			 </view>
		</view>
		
		<view v-if="showSuggest">
			<view class="suggest">
				<view class="list" >
				   <uni-list :border="false">
				   	<uni-list-item
				       v-for="(item) in suggestList"
				       :title="item.keyword"
						clickable
					    @click="gotable(item.keyword)"
				     >
				     </uni-list-item>
				   </uni-list>
				 </view>
			</view>
		</view>
		
		<view class="songTable" v-if="showTable">
			<view class="list" >
			   <view 
			   v-for="(item) in searchTable"
			   >
			   <view class="item" @click="goPlayer(item)">
					<view>{{item.name}}</view>
					<view>专辑:{{item.album.name}}</view>
					<view class="">
						歌手{{item.artists.map(v=>{return v.name}).join("| ")}}&nbsp;
					</view>
			   </view>
			   </view>
			 </view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.search_box{
	padding: 20rpx;
	display: flex;
	position: relative;
	span{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
	}
}
.uni-input{
	display: flex;
	flex-direction: row;
	padding: 0 16rpx;
	justify-content: center;
	align-items: center;
	color: #b3b3b3;
	background-color: #f8f8f8;
	height: 80rpx;
	flex: 1;
}
.no {
  width: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.uni-list-item{
	border: none !important;
}
.close{
	position: absolute;
	top: 40rpx;
	right: 140rpx;
	font-size: 16px;
}
.item{
	height: 230rpx;
	border-bottom: 1px solid #ccc;
}
.historyList{
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
	.item{
		padding:0 20rpx;
		height: 40rpx;
		border-color: #ddd;
		background-color: #ddd;
		margin-right: .625rem;
		color: #333;
		font-size: 12px;
		border-radius: 15px !important;
		line-height: 40rpx;
		margin-bottom: 10rpx;
	}
}

.topTi{
	display: flex;
	justify-content: space-between;
	.trash{
		font-size: 28rpx;
		margin-right: 10rpx;
	}
}
</style>