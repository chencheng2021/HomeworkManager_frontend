/**
 * @author chencheng
 * @date 2021-03-24 05:46
 * @description
 */

import XLSX from "xlsx";

export function import_file(file_obj){
    let reader = new FileReader()
    let sheet_data = []
    reader.onload = ev => {
        const data = ev.target.result
        const workbook = XLSX.read(data,{
            type: "binary"
        })
        // 取第一张表的name
        const name = workbook.SheetNames[0]
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[name])
        for (let i = 0; i < worksheet.length; i++) {
            let item = {
                studentNo: Number(worksheet[i]['学号']),
                name: worksheet[i]['姓名'],
                gender: worksheet[i]['性别'],
                contact: String(worksheet[i]['联系方式']),
                email: worksheet[i]['邮箱'],
                socialAccount: String(worksheet[i]['社交账号']),
                fatherName: worksheet[i]['父亲'],
                motherName: worksheet[i]['母亲'],
                fatherContact: worksheet[i]['父亲手机'],
                motherContact: worksheet[i]['母亲手机']
            }
            sheet_data.push(item)
        }
    }
    reader.readAsBinaryString(file_obj)
    return sheet_data
}