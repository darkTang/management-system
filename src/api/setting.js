import request from '@/utils/request';

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  });
}

export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  });
}
// 根据id查询角色信息
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  });
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  });
}

export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  });
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  });
}
