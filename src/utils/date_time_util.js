/**
 * @author chencheng
 * @date 2021-04-12 00:11
 * @description
 */


export function format_date_time(timeMillions){
    let date = new Date(timeMillions)
    let hh =date.getHours() < 10? "0" + date.getHours(): date.getHours();
    let mm =date.getMinutes() < 10? "0" + date.getMinutes(): date.getMinutes();
    let ss =date.getSeconds() < 10? "0" + date.getSeconds(): date.getSeconds();
    this.now_hour = hh
    this.now_min = mm
    this.now_sec =ss
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + '-' + month + '-' + day + ' ' + hh + ':' + mm
}