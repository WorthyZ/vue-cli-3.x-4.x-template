/**
 * 登录页面接口列表
 */
import axios from '../../http'; // 导入http中创建的axios实例

const Login = {
  // 登录
  toLogin(data){
    return axios.post(`${process.env.API_ROOT}/login/toLogin`,data)
  },
  // 获取任务详情
  getTaskInfo(id, params) {
    return axios.get(`${process.env.VUE_APP_API_ROOT}/v1/tasks/${id}`, {params})
  },
  // 更新指定job信息
  patchJob(id, data) {
    return axios.patch(`${process.env.VUE_APP_API_ROOT}/v1/jobs/${id}`, data)
  },
  // ...
}

export default Login;
