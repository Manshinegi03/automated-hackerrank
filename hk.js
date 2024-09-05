const { func } = require('prop-types');
const puppeteer=require('puppeteer')
const loginLink='https://www.hackerrank.com/auth/login'
const email='ENTER YOUR HACKERANK EMAIL';
const password='ENTER YOUR PASSWORD'
const codeObj=require('./codes')
let browserOpen=puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',

})
let page
browserOpen.then(function(browserObj){
    let browserOpenPromise=browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page=newTab
    let hackerRankOpenPromise=newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered=page.type("input[type='text']",email,{delay:50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered=page.type("input[type='password']",password,{delay:50})
    return passwordIsEntered
}).then(function(){
    let loginButtonClicked=page.click('button[type="button"]',{delay:50})
    return loginButtonClicked
}).then(function(){
    let clickOnAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp=waitAndClick('input[value="warmup"]',page)
    return getToWarmUp
}).then(function(){
    return delay(3000);
}).then(function(){
    let allChallengesPromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
    return allChallengesPromise
}).then(function(questionArr){
    console.log('number of question',questionArr.length)
    let questionWillBeSolved=questionSolver(page,questionArr[0],codeObj.answers[0])
    return questionWillBeSolved
})



function waitAndClick(selector,currentpage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=currentpage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal=currentpage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })

    })
}
function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked=question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs',page)
            return EditorInFocusPromise
        }).then(function(){
           return waitAndClick('.checkbox-input',page) 
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10})
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed=page.keyboard.press('A',{delay:100})
            return AisPressed
        }).then(function(){
            let XisPressed=page.keyboard.press('X',{delay:100})
            return XisPressed
        }).then(function(){
            let ctrlisunpressed=page.keyboard.up('Control')
            return ctrlisunpressed
        }).then(function(){
            let maineditorinfocus=waitAndClick('.monaco-editor.no-user-select.showUnused.showDeprecated.vs',page)
            return maineditorinfocus
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed=page.keyboard.press('A',{delay:100})
            return AisPressed
        }).then(function(){
            let VisPressed=page.keyboard.press('V',{delay:100})
            return VisPressed
        }).then(function(){
            let ctrlisunpressed=page.keyboard.up('Control')
            return ctrlisunpressed
        }).then(function(){
            return page.click('.hr-monaco-submit',{delay:50})
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}
