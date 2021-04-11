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
            id  : i,
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
            student_no : "1625111037"+i,
            name: '张大炮',
            gender: i%2===0?'男':'女',
            contact: '18150115813',
            email: 'contact@qq.com',
            social_account: '903272721',
            class_name: '网络工程'+(i+1)+'班'
        }
        if (i === 0){
            item.contact = '15108596601'
        }else {
            item.contact = '18716956363'
        }
        mock_data.push(item)
    }
    return mock_data
}

export function mock_parent_contact_data(student_data){
    let mock_data = []
    let counter = 1
    student_data.forEach(student => {
        let s_name = student.name;
        if (student.gender === '男'){
            let father = {
                id: counter++,
                student_name: s_name,
                name: '张益达',
                relation: '父亲',
                contact: '18909240199'
            }
            mock_data.push(father)
        }
        let mother = {
            id: counter++,
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

export function mock_course_election_data(students_info){
    let mock_data = []
    students_info.forEach( student => {
        let item = {
            student_no: student.student_no,
            student_name: student.name,
            class_name: '网络工程1班',
            gender: student.gender,
            contact: student.contact
        }
        mock_data.push(item)
    })
    return mock_data
}

export function mock_attachment_data(){
    return [
        {id: 1,name: '附件1',url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F1%2F1680x1050%2F1349289433496.jpg&refer=http%3A%2F%2Fb.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619132551&t=ad1556c16cb2e720779cf0474f1482fe'},
        {id: 2,name: '附件1',url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F1%2F1680x1050%2F1349289433496.jpg&refer=http%3A%2F%2Fb.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619132551&t=ad1556c16cb2e720779cf0474f1482fe'},
        {id: 3,name: '附件1',url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F1%2F1680x1050%2F1349289433496.jpg&refer=http%3A%2F%2Fb.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619132551&t=ad1556c16cb2e720779cf0474f1482fe'},
        {id: 4,name: '附件1',url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb.zol-img.com.cn%2Fdesk%2Fbizhi%2Fimage%2F1%2F1680x1050%2F1349289433496.jpg&refer=http%3A%2F%2Fb.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619132551&t=ad1556c16cb2e720779cf0474f1482fe'}
    ]
}

export function mock_notification_data(){
    let mock_data = []
    for (let i = 0; i < 10; i++) {
        let date = new Date();
        let date_str = date.toLocaleString()
        let type = (i % 2) === 0 ? 0 : 1
        let confirm = (i % 2) === 0
        let item = {
            id: i,
            title: '测试通知-'+(i+1),
            content:'这是一大长串的测试通知内容啊啊啊阿',
            type: type,
            confirmable: confirm,
            total_confirm: confirm ? (i+'/56') : '———',
            create_date: date_str,
            attachment: type === 1 ? mock_attachment_data() : [],
            contact: []
        }
        if (i === 3 || i === 5 || i === 7){
            item.type = 2
            item.confirmable = false
            item.contact = [
                {name: '李大嘴', phone: '1884838288'},
                {name: '王大锤', phone: '1898919793'}
            ]
        }
        mock_data.push(item)
    }
    return mock_data
}

export function mock_nt_members_info(){
    let mock_data = []
    for (let i = 0; i < 20; i++) {
        let item = {
            id: i,
            student_no: 1725111089,
            member_name: '张大炮',
            member_gender: i % 2 === 0 ? '男' : '女',
            member_type: '学生',
            member_class: '网络工程1班',
            member_contact: '1884838258'
        }
        if (i >= 15){
            item.student_no = '———'
            item.member_class = '———'
            item.member_type = '家长'
        }
        mock_data.push(item)
    }
    return mock_data
}

export function mock_file_data(size){
    let mock_data = []
    if (typeof size === 'undefined'){
        size = 20
    }
    for (let i = 0; i < size; i++) {
        let item = {
            id: i,
            name: '测试文件-' + i,
            publish_state: (i % 2 === 0) ? 0 : 1,
            type: (i % 2 === 0) ? 'jpg' : 'docx',
            url: 'http://47.96.232.239/homeworkmanager/uploads/file_test111111-a0cc92de-c97f-40a6-b5c1-3aa5363f5e23.jpg',
            upload_date: '2021-04-01 12:23',
        }
        mock_data.push(item)
    }
    return mock_data
}