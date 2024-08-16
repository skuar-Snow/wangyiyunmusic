"use strict";
const api_request = require("./request.js");
const bannerApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/banner"
  });
};
const ballApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/homepage/dragon/ball"
  });
};
const commentPlaylistApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/comment/playlist",
    data: {
      id
    }
  });
};
const personalizedApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/personalized"
  });
};
const playlistDetailApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/playlist/detail",
    data: {
      id
    }
  });
};
const goodMusicApi = () => {
  return api_request.request({
    url: `http://121.89.213.194:5001/homepage/block/page`
  });
};
const toplistApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/toplist"
  });
};
const officialListApi = (id) => {
  return api_request.request({
    url: `https://zyxcl.xyz/music/api//playlist/track/all?id=${id}&limit=3&offset=1`
  });
};
const SearchListApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/search/hot/detail"
  });
};
const SearchtApi = (keywords) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/search",
    data: {
      keywords
    }
  });
};
const SearchsuggestApi = (keywords, type) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api//search/suggest",
    data: {
      keywords,
      type
    }
  });
};
exports.SearchListApi = SearchListApi;
exports.SearchsuggestApi = SearchsuggestApi;
exports.SearchtApi = SearchtApi;
exports.ballApi = ballApi;
exports.bannerApi = bannerApi;
exports.commentPlaylistApi = commentPlaylistApi;
exports.goodMusicApi = goodMusicApi;
exports.officialListApi = officialListApi;
exports.personalizedApi = personalizedApi;
exports.playlistDetailApi = playlistDetailApi;
exports.toplistApi = toplistApi;
