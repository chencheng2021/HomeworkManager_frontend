/**
 * @author chencheng
 * @date 2021-03-27 01:42
 * @description
 */

export function link_jumping(link,jump_with_new_window){
    if (jump_with_new_window === undefined || jump_with_new_window){
        window.open(link)
    }else {
        window.location.href = link
    }
}