/**
 * @author chencheng
 * @date 2021-03-23 17:37
 * @description
 */


export function mock_class_info_data(size){
    let mock_data = []
    if (size === undefined){
        size = 20
    }
    for (let i = 0; i < size; i++) {
        let item = {
            id: i,
            name: '计算机科学与技术' + (i+1) + '班',
            class_code:'CS-103' + i,
            total_student_num: (size - i) * i + (4*i),
            create_date:'2021-03-01'
        }
        mock_data.push(item)
    }
    return mock_data
}

export function mock_student_contact_data(size){
    let mock_data = []
    if (size === undefined){
        size = 20;
    }
    for (let i = 0; i < size; i++) {
        let item = {
            student_no : "1625111037",
            name: '张大炮',
            gender: i%2===0?'男':'女',
            contact: '183029401132',
            email: 'contact@qq.com',
            social_account: '903272721',
        }
        mock_data.push(item)
    }
    return mock_data
}

export function mock_parent_contact_data(student_data){
    let mock_data = []
    student_data.forEach(student => {
        let s_name = student.name;
        if (student.gender === '男'){
            let father = {
                student_name: s_name,
                name: '张益达',
                relation: '父亲',
                contact: '18909240199'
            }
            mock_data.push(father)
        }
        let mother = {
            student_name: s_name,
            name: '张益达',
            relation: '母亲',
            contact: '18909240199'
        }
        mock_data.push(mother)
    })
    return mock_data
}

export function mock_course_data(){
    let mock_data = []
    for (let i = 0; i < 20; i++) {
        let item = {
            id: i,
            name: '小学数学'+i,
            credit: (i + 1) * 0.5,
            class_time: '周二上午3-4节 | 周四下午1-2节',
            course_period: 13,
            create_date: '2021-03-24'
        }
        mock_data.push(item)
    }
    return mock_data
}