import request from '@/utils/request'

// 登录接口
export const userLoginService = (data) =>
  request.post('/auth/manage/passwordLogin', {
    data: data
  })

// 退出登录接口
export const userLogoffService = () => request.post('/auth/manage/logout')

// 罗列帖子
export const showPost = (data) =>
  request.post('/post/manage/list', {
    data: data
  })

// 删除帖子
export const deletePost = (data) =>
  request.post('/post/manage/deletePost', {
    data: data
  })

// 删除评论
export const deleteComment = (data) =>
  request.post('/comment/manage/deleteComment', {
    data: data
  })

// 罗列对于帖子评论
export const postComment = (data) =>
  request.post('/comment/list', {
    data: data
  })

// 罗列目前用户
export const postUser = (data) =>
  request.post('/user/manage/userList', {
    data: data
  })

// 重置用户密码
export const resetPasserword = (data) =>
  request.post('/user/manage/resetPassword', {
    data: data
  })

// 用户封禁
export const banUser = (data) =>
  request.post('/user/manage/block', {
    data: data
  })

// 用户解禁
export const releaseUser = (data) =>
  request.post('/user/manage/release', {
    data: data
  })

// 添加管理员
export const addAdmin = (data) =>
  request.post('/user/manage/addAdmin', {
    data: data
  })

// 获取标签
export const getTags = () => request.post('/tag/list')

// 新增标签
export const addTag = () => request.post('/tag/manage/add')

// 删除标签
export const deleteTag = (data) =>
  request.post('/tag/manage/delete', {
    data: data
  })

// 获取轮播图列表
export const getSwipers = () => request.post('/static/rotatingPic')

// 新增轮播图
export const addSwiper = (data) =>
  request.post('/static/manage/rotatingPic/add', {
    data: data
  })

// 删除轮播图
export const deleteSwiper = (data) =>
  request.post('/static/manage/rotatingPic/delete', {
    data: data
  })
