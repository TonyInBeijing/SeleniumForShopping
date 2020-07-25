/**
 * @file 使用 selenium-webdriver + chromedriver + opencv4nodejs 实现小米自动登录下单功能
 * @author YHW 2020-07-22
 */

/**
 * @description 小米官网自动下单
 */
const { xiaomiShop } = require('./web/mi');

// 脚本主方法
const mainVoid = () => {
    xiaomiShop();
};
mainVoid();