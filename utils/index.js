/**
 * @file 工具方法
 * @author YHW 2020-07-22
 */
// 设置延时
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports.delay = delay;