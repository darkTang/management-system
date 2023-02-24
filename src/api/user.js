import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  });
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  });
}

// 获取员工的基本信息
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`
  });
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  });
}
