/**
 * @file 小米官网自动下单
 * @author YHW 2020-07-25
 */
// 引入 chromeDriver
require('chromedriver');
// 引入 selenium库
const { Builder, By } = require('selenium-webdriver');
const { delay } = require('../utils');
// 小米账号密码
const USERPHONE = '';
const USERPASSWORD = '';

const xiaomiShop = async (account = USERPHONE, password = USERPASSWORD) => {
    // 创建一个chrome浏览器的实例
    const driver = new Builder()
        .forBrowser('chrome')
        .build();
    // 打开小米首页
    await driver.get('https://www.mi.com');
    // 点击登录
    await driver.findElement(By.xpath('//*[@id="J_siteUserInfo"]/a[1]')).click();
    await delay(2000);
    // 判断是否弹出用户协议
    const hasAgreement = await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div/div/div[3]/button[1]'));
    if (hasAgreement) {
        await delay(2000);
        hasAgreement.click();
    }
    await delay(1000);
    // 点击账号登录
    await driver.findElement(By.xpath('//*[@id="nav-tabs"]/a[1]')).click();
    // 输入账号
    for (let i in USERPHONE) {
        await driver.findElement(By.id('username')).sendKeys(USERPHONE[i]);
    }
    await delay(500);
    // 输入密码
    for (let i in USERPASSWORD) {
        await driver.findElement(By.id('pwd')).sendKeys(USERPASSWORD[i]);
    }
    await delay(1000);
    // 点击登录按钮
    await driver.findElement(By.id('login-button')).click();
    await delay(2000);
    // 点击购物车按钮
    // 需要把想要买的东西提前加入购物车
    await driver.findElement(By.xpath('//*[@id="J_miniCartBtn"]')).click();
    // 判断购物车是否是空的
    await delay(3000);
    const emptyCart = await driver.findElement(By.css('.empty-cart-wrap'));
    if (emptyCart) {
        return { code: 5010, msg: "下单失败，购物车为空" };
    }
    // 点击 去结算
    // 这个地方 可能存在 用户行为检测
    // 需要进行模拟人工行为
    const submitBtn = await driver.findElement(By.xpath('//*[@id="app"]/div[2]/div/div/div[2]/div[1]/div[4]/span/a'));
    // 创建一个动作对象
    const submitAction = driver.actions();
    submitAction.move({ origin: submitBtn, duration: 2000 }).press().perform();
    await delay(500);
    submitAction.release().perform();
    // 默认点击第一个收货地址
    await delay(2000);
    const defaultAddress = await driver.findElement(By.css('.address-item:first-child'));
    await delay(1000);
    defaultAddress.click();
    await delay(2000);
    // 系统自动会填充优惠券等其他信息，暂时这里先不处理
    // 点击 立即下单
    // 也 可能存在 用户行为检测
    // 继续模拟一个行为
    const createOrderBtn = await driver.findElement(By.xpath('//*[@id="app"]/div[2]/div/div/div[2]/div/div[6]/div[2]/div/a[1]'));
    const createOrderAction = driver.actions();
    createOrderAction.move({ origin: createOrderBtn, duration: 2000 }).press().perform();
    await delay(500);
    createOrderAction.release().perform();
}

module.exports.xiaomiShop = xiaomiShop;