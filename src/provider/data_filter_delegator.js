/**
 * @author chencheng
 * @date 2021-03-31 14:07
 * @description     各类数据筛选的委派器，用于处理不同条件的数据筛选
 */

export function filter_by_title(origin, condition){
    let collect = []
    origin.filter( item => {
        if (item.title.indexOf(condition) !== -1){
            collect.push(item)
        }
    } )
    return collect
}

export function filter_by_content(origin,condition){
    let collect = []
    origin.filter( item => {
        if (item.content.indexOf(condition) !== -1){
            collect.push(item)
        }
    } )
    return collect
}

export function filter_by_student_no(origin,condition){
    let collect = []
    origin.filter( item => {
        if (item.student_no.indexOf(condition) !== -1){
            collect.push(item)
        }
    } )
    return collect
}

export function filter_by_name(origin,condition){
    let collect = []
    origin.filter( item => {
        if (item.name.indexOf(condition) !== -1){
            collect.push(item)
        }
    } )
    return collect
}

export function filter_by_class(origin,condition){
    let collect = []
    origin.filter( item => {
        if (item.class_name.indexOf(condition) !== -1){
            collect.push(item)
        }
    } )
    return collect
}