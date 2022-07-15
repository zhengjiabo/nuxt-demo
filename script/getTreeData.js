const fs = require('fs');
const path = require('path');
function getPromise(func) {
    return (...arg) => new Promise((resolve, reject) => {
        func(...arg, (err, data)=>{
            if(err) {
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}
function isDirect (url) {
    const func = getPromise(fs.stat)
    return func(url).then(data => data.isDirectory())
}

function readdir (...arg) {
    const func = getPromise(fs.readdir)
    return func(...arg)
}

export const getTreeData = async (url) => {
    const oriUrl = url
    const removePath = path.resolve()
    console.log('removePath', removePath)

    const traverse = async(url) => {
        url = path.resolve(url)
        const treeData = []
        const fileList = await readdir(url,'utf8')
        if(url.slice(-1) !== '/') {
            url += '/'
        }
        const { length } = fileList
        for (let i = 0; i < length; i++) {
            const fileName = fileList[i]
            const filePath = url + fileName
            const isDirectory = await isDirect(filePath)
            const obj = {
                label: fileName,
                value: filePath.replace(removePath, ''),
                isDirectory
            }
            
            if(isDirectory) {
                obj.children = await traverse(filePath)
            } else if (!(/\.htm(l)?$/).test(fileName)) { // 文件
                continue
            }
            treeData.push(obj)

        }
        return treeData
    }

    return await traverse(url)
} 

