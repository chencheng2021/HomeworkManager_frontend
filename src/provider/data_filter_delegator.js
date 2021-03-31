/**
 * @author chencheng
 * @date 2021-03-31 14:07
 * @description     各类数据筛选的委派器，用于处理不同条件的数据筛选
 */

export function filter_by(origin,filter_key,condition){
    let collect = [];
    origin.filter( item => {
        if (item.title.indexOf(condition) !== -1){
            collect.push(item)
        }
    } )
    console.log(collect)
    return collect
}