<script setup lang="ts">
import {ref,watch } from "vue"
import { SearchListApi,SearchsuggestApi,SearchtApi } from '../../api/index'
import type { hotInnerList,searchsuggestIner,searchListIner } from '../../api/type'
// 热搜歌曲
const HotList =ref<hotInnerList[]>([])
//搜索建议
const suggestList =ref<searchsuggestIner[]>([])
//搜索歌曲list
const searchTable = ref<searchListIner[]>([])
//热门搜索歌曲列表
const hotSearchList = ref<string[]>([])

let show = ref<boolean>(false)
let showclose = ref<boolean>(false)
let showCon = ref<boolean>(true)
let showSuggest = ref<boolean>(false)
const keyWord = ref('')
SearchListApi().then(res=>{
	// console.log(res.data.data)
    HotList.value=res.data.data
})
const FocusEvent = () =>{
	show.value=true
}
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
}
const clear1 = () =>{
	keyWord.value=''
}

const search = () =>{
	showCon.value=false
	showSuggest.value=true
	SearchsuggestApi(keyWord.value,"mobile").then(res=>{
		suggestList.value=res.data.result.allMatch
	})
}

const gotable = (keyword: string)=>{
	console.log(1)
	show.value=true
	showCon.value=false
	showSuggest.value=false
	keyWord.value=keyword
	hotSearchList.value.push(keyword)
	//存到本地
	SearchtApi(keyWord.value).then(res=>{
		console.log(res.data.result.songs)
		searchTable.value=res.data.result.songs
	})
}

</script>

<template>
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
		 <view class="history">
		 	
		 </view>
		 
		<uni-section title="热门搜素" type="line"></uni-section>
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
	
	<view class="songTable">
		<view class="list" >
		   <view 
		   v-for="(item) in searchTable"
		   >
		   <view class="item">
				<view>{{item.name}}</view>
				<view>{{item.album.name}}</view>
				<view>{{item.album.artists}}</view>
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
</style>