"use strict";
const common_vendor = require("../common/vendor.js");
const request = ({
  url,
  method = "GET",
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      method,
      data,
      success: (res) => {
        resolve(res);
      },
      fail: (e) => {
        reject(e);
      }
    });
  });
};
const bannerApi = () => {
  return request({
    url: "https://zyxcl.xyz/music/api/banner"
  });
};
const ballApi = () => {
  return request({
    url: "https://zyxcl.xyz/music/api/homepage/dragon/ball"
  });
};
const personalizedApi = () => {
  return request({
    url: "https://zyxcl.xyz/music/api/personalized"
  });
};
const playlistApi = (id) => {
  return request({
    url: `https://zyxcl.xyz/music/api/playlist/track/all?id=${id}`,
    data: {
      id
    }
  });
};
exports.ballApi = ballApi;
exports.bannerApi = bannerApi;
exports.personalizedApi = personalizedApi;
exports.playlistApi = playlistApi;
