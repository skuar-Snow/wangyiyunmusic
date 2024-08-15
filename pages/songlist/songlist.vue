
<script>
import {ref} from "vue"
import { playlistApi } from '../../api/index'

const playlist = ref([])


const id = location.hash.slice(location.hash.indexOf("?")+1).split("=")[1]

if (id) {
  playlistApi(id).then((res) => {
    console.log(res.data);
    playlist.value = res.data; // 将获取的数据赋值给 playlist 响应式变量
  }).catch((error) => {
    console.error('请求错误:', error);
  });
}

</script>

<template>
	<view>
		歌单列表页面
	</view>
</template>


<style>

</style>
