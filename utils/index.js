/**
 * @file 工具方法
 * @author YHW 2020-07-22
 */

// 引入fs文件模块
const fs = require('fs');
// 引入child_process模块
const exec = require('child_process').exec;

/**
 * 
 * @param {String} fileName 文件名
 * @param {String} base64 base64字符串
 */
const base64ToFile = (fileName, base64) => {
    return new Promise((resolve, reject) => {
        const base64Str = base64.replace(/^data:image\/\w+;base64,/, "");
        const dataBuffer = Buffer.from(base64Str, 'base64');
        const saveFileName = `./data/${fileName}_${Date.parse(new Date())}.png`;
        fs.writeFile(saveFileName, dataBuffer, err => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(saveFileName);
            }
        });
    });
};

/**
 * 
 * @param {String}} backgroundFilePath 背景图路径
 * @param {String} sliderFilePath 滑块路径
 */
const runPythonFile = (backgroundFilePath, sliderFilePath) => {
    return new Promise((resolve, reject) => {
        // 获取python文件路径
        const pythonFilUrl = `python3 ${__dirname}/INeedNumpy.py `;
        const paramObj = `'${JSON.stringify({ backgroundFilePath, sliderFilePath })}'`;
        exec(pythonFilUrl + paramObj, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            else {
                resolve(stdout);
            }
        });
    });
}

// 设置延时
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 滑动验证码失效后



module.exports.base64ToFile = base64ToFile;
module.exports.runPythonFile = runPythonFile;
module.exports.delay = delay;