/**
 * @file 使用 selenium-webdriver + chromedriver + opencv4nodejs 实现小米自动登录下单功能
 * @author YHW 2020-07-22
 */
// 引入 chromeDriver
require('chromedriver');
// 引入 selenium库
const { Builder, By, until, Key } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
const { base64ToFile, runPythonFile, delay } = require('./utils');
// 小米账号密码
const USERPHONE = '18500031126';
const USERPASSWORD = 'yuehaowei1126';
// 登录滑动图文件名称
const BACKGROUNDFILE = 'backgroundFile';
const SWIPERFILE = 'sliderFile';

const mainVoid = async () => {
    // 设置chromeOption
    // const chromeOption = new chrome.Options();
    // chromeOption.addArguments("--user-data-dir=/Users/admin/Library/Application Support/Google/Chrome/Default");
    // 创建一个chrome浏览器的实例
    const driver = new Builder()
        .forBrowser('chrome')
        // .setChromeOptions(chromeOption)
        .build();
    // 打开小米首页
    await driver.get('https://www.mi.com');
    // 点击登录
    await driver.findElement(By.xpath('//*[@id="J_siteUserInfo"]/a[1]')).click();
    // 判断是否弹出用户协议
    const hasAgreement = await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div/div/div[3]/button[1]'));
    if (hasAgreement) {
        delay(2000);
        hasAgreement.click();
    }
    delay(1000);
    // 点击账号登录
    await driver.wait(until.elementLocated(By.xpath('//*[@id="nav-tabs"]/a[1]')), 10000).click();
    // 输入账号
    for (let i in USERPHONE) {
        await driver.findElement(By.id('username')).sendKeys(USERPHONE[i]);
        await delay(300);
    }
    await delay(500);
    // 输入密码
    for (let i in USERPASSWORD) {
        await driver.findElement(By.id('pwd')).sendKeys(USERPASSWORD[i]);
        await delay(300);
    }
    delay(1000);
    // 点击登录按钮
    await driver.findElement(By.id('login-button')).click();
    // // 找到滑动验证背景图
    // const backgroundUrl = await driver.wait(until.elementLocated(By.xpath('//div[@class="JDJRV-bigimg"]/img')), 10000).getAttribute('src');
    // // 找到滑动验证滑动图
    // const sliderUrl = await driver.wait(until.elementLocated(By.xpath('//div[@class="JDJRV-smallimg"]/img')), 10000).getAttribute('src');
    // // 保存到本地
    // const backgroundFilePath = await base64ToFile(BACKGROUNDFILE, backgroundUrl);
    // const sliderFilePath = await base64ToFile(SWIPERFILE, sliderUrl);
    // // 调用opencv-python处理图片
    // const pythonRes = await runPythonFile(backgroundFilePath, sliderFilePath);
    // // 获取x轴偏移量
    // const offsetX = parseInt(Number(JSON.parse(pythonRes).offsetX) * 0.782);
    // // 获取滑块元素
    // const sliderBar = await driver.findElement(By.className('JDJRV-slide-inner JDJRV-slide-btn'));
    // // 创建行为
    // let dragActions = driver.actions();
    // // 模拟真人滑动
    // let moveStepArr = [5, 5];
    // let durationArr = [6, 10];
    // while (moveStepArr.reduce((sum, num) => { return sum + num; }) <= offsetX) {
    //     const randomStep = parseInt(Math.random() * 10);
    //     const randomDuration = parseInt(Math.random() * 100);
    //     moveStepArr.push(randomStep);
    //     durationArr.push(randomDuration);
    // }
    // durationArr = durationArr.sort((a, b) => { return a - b; });
    // const moveStepSum = moveStepArr.reduce((sum, num) => { return sum + num; });
    // // 计算需要校正的值,加到数组中最后一位
    // const reviseNum = offsetX - moveStepSum;
    // moveStepArr[moveStepArr.length - 1] += reviseNum;
    // // 开始移动
    // await delay(1000);
    // await dragActions.move({ origin: sliderBar }).press().perform();
    // // 开始循环移动
    // for (let i in moveStepArr) {
    //     await dragActions.move({ x: moveStepArr[i], y: 0, duration: durationArr[i], origin: 'pointer' }).perform();
    //     dragActions = driver.actions();
    // }
    // await delay(1000);
    // // 释放鼠标左键
    // await dragActions.release().perform();
};
mainVoid();