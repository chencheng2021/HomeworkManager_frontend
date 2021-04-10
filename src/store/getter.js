/**
 * @author chencheng
 * @date 2021-03-12 20:38
 * @description vuex数据读取模块
 */

const getter = {
    teacher_name: state => state.user.teacher_name,
    teacher_no: state => state.user.teacher_no,
}

export default getter