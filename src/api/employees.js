import request from '@/utils/request';


// 获取部门负责人数据
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  });
}

export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  });
}

// 根据id删除员工
export function delEmployeeById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  });
}

// 新增员工接口
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  });
}

// 导入员工数据
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  });
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  });
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  });
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  });
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  });
}

// 给用户分配角色
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}