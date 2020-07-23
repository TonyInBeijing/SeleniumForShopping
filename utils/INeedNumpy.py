import cv2
import numpy as np
import sys
import json
from string import Template


def getCoordinates(pathJson):
    # print(result)
    pathDict = json.loads(pathJson)
    backgroundFilePath = pathDict['backgroundFilePath']
    sliderFilePath = pathDict['sliderFilePath']
    # backgroundFileName = './data/backgroundFile_1595437553000.png'
    # swiperFileName = './data/swiperFile_1595437553000.png'

    backgroundFile = cv2.imread(backgroundFilePath, 0)
    sliderFile = cv2.imread(sliderFilePath, 0)

    # backgroundFileName1 = './data/1backgroundFile_1595437553000.png'
    # swiperFileName1 = './data/1swiperFile_1595437553000.png'

    cvBackgroundFilePath = backgroundFilePath.replace('data', 'cv_out')
    cvSliderFilePath = sliderFilePath.replace('data', 'cv_out')

    cv2.imwrite(cvBackgroundFilePath, backgroundFile)
    cv2.imwrite(cvSliderFilePath, sliderFile)

    sliderFile = cv2.imread(cvSliderFilePath)
    sliderFile = cv2.cvtColor(sliderFile, cv2.COLOR_RGB2GRAY)
    sliderFile = abs(255 - sliderFile)
    cv2.imwrite(cvSliderFilePath, sliderFile)

    sliderFile = cv2.imread(cvSliderFilePath)
    backgroundFile = cv2.imread(cvBackgroundFilePath)

    resMat = cv2.matchTemplate(
        sliderFile, backgroundFile, cv2.TM_CCOEFF_NORMED)

    x, y = np.unravel_index(resMat.argmax(), resMat.shape)
    resData = {'offsetY': str(x), 'offsetX': str(y)}
    print(json.dumps(resData))


getCoordinates(sys.argv[1])
