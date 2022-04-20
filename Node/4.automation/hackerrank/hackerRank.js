const { resolve } = require("path");
const puppeteer = require("puppeteer");
//let { email, password } = require('./secrets');
 let email = "ks13bro@gmail.com";
 let password = "jai@ganesha";
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
      "https://www.hackerrank.com/auth/login"
    );
    return visitingLoginPagePromise;
  })
  .then(function (data) {
    // console.log(data);
    console.log("Hackerrank login page opened");
    //selector(where to type), data(what to type)
    let emailWillBeTypedPromise = curTab.type("#input-1", email,{delay:10});
    return emailWillBeTypedPromise;
  })
  .then(function () {
    console.log("email is typed");
    let passwordWillBeTypedPromise = curTab.type(
      "#input-2",
      password,{delay:10}
    );
    return passwordWillBeTypedPromise;
  })
  .then(function(){
    console.log("password written");
    let loginWindow = curTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginWindow;
  })
  .then(function(){
    console.log("Login Done");
    let algorithmTab = clickAndWait(
      "div[data-automation='algorithms']"
    );
    return algorithmTab;
  })
  .then(function(){
    console.log("algorithm tab openend");
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