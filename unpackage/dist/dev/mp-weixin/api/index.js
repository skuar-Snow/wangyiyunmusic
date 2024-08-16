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
exports.ballApi = ballApi;
exports.bannerApi = bannerApi;
exports.personalizedApi = personalizedApi;
exports.playlistDetailApi = playlistDetailApi;
