const puppeteer = require("puppeteer");
//let { email, password } = require('./secrets');
 let email = "coding_krack";
 let password = "coding@09";
//let { answer } = require("./codes");
let curTab;
let browserOpenPromise = puppeteer.launch({
  headless: false, 
  defaultViewport: null,
  args: ["--start-maximized"]
  //chrome://version/
  // executablePath:
  //   "//Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
// console.log(browserOpenPromise);
browserOpenPromise //fulfill
  .then(function (browser) {
    console.log("browser is open");
    //console.log(browserOpenPromise);
    // console.log(browser);
    //An array of all open pages inside the Browser.
    //returns an array with all the pages in all browser contexts
    let allTabsPromise = browser.pages(); // browser.newPage() -> new tab open hta h 
    return allTabsPromise;
  })
  .then(function (allTabsArr) {
    curTab = allTabsArr[0];
    console.log("new tab");
    //URL to navigate page to
    let visitingLoginPagePromise = curTab.goto(
      "https://leetcode.com/accounts/login/?next=/problemset/all/"
    );
    return visitingLoginPagePromise;
  })
  .then(function (data) {
    // console.log(data);
    console.log("leetcode login page opened");
    //selector(where to type), data(what to type)
    let emailWillBeTypedPromise = curTab.type("input[name='login']", email,{delay:100});
    return emailWillBeTypedPromise;
  })
  .then(function () {
    console.log("email is typed");
    let passwordWillBeTypedPromise = curTab.type(
      "input[name='password']",
      password,{delay:100}
    );
    return passwordWillBeTypedPromise;
  })
  .then(function(){
    console.log("password written");
    let loginWindow = clickAndWait(".btn-content-container__2HVS>.btn-content__2V4r");
    return loginWindow;
  })
  .then(function(){
    console.log("Login Done");
    
  })
 
  .then(function(){
    console.log("problem tab openend");
    let allQuesPromise = curTab.waitForSelector(
      "a[class='h-5 hover:text-primary-s dark:hover:text-dark-primary-s']"
    );
    return allQuesPromise;
  })
  .then(function () {
    function getAllQuesLinks() {
      let allElemArr = document.querySelectorAll(
        "a[class='h-5 hover:text-primary-s dark:hover:text-dark-primary-s']"
      );
      let linksArr = [];
      for (let i = 0; i < allElemArr.length; i++) {
        linksArr.push(allElemArr[i].getAttribute("href"));
        //console.log(linksArr[i]);
      }
      
      return linksArr;
    }
    let linksArrPromise = curTab.evaluate(getAllQuesLinks);
    return linksArrPromise;
  })
  .then(function (linksArr) {
    console.log("links to all ques received");
     console.log(linksArr);
    
  })
  .catch(function(err)
  {
    console.log(err);
  });
  function clickAndWait(selector)
  {
    let mypromise = new Promise(function(resolve,reject)
    {
        let waitForSelectorPromise = curTab.waitForSelector(selector);
        waitForSelectorPromise
        .then(function(){
          let clickPromise = curTab.click(selector);
          return clickPromise;
        })
        .then(function(){
          resolve();
        })
        .catch(function(err){
          console.log(err);
        })
    }
    );
    return mypromise;
  }