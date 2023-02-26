import request from '@/utils/request';


export function getDepartments() {
  return request({
    url: '/company/department'
  });
}

export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  });
}

export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  });
}


export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  });
}

export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  });
}