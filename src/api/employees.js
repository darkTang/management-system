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