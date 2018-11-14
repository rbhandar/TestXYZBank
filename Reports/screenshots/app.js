var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Open the xyz bank url|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d500c5-00ae-0065-0066-00d9003e0085.png",
        "timestamp": 1539687006654,
        "duration": 35581
    },
    {
        "description": "click on bank manager button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003400fd-0040-009d-0031-00d700060046.png",
        "timestamp": 1539687047560,
        "duration": 1277
    },
    {
        "description": "Click on Add Customer button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f0016-0047-0066-0084-001d000500f6.png",
        "timestamp": 1539687049535,
        "duration": 172
    },
    {
        "description": "Enter the first name|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009e009c-00ed-0057-004e-0074004f0087.png",
        "timestamp": 1539687050525,
        "duration": 1205
    },
    {
        "description": "Enter the last name|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b10019-000b-00f9-0035-00860088007b.png",
        "timestamp": 1539687052225,
        "duration": 190
    },
    {
        "description": "Enter the post code|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a60014-0073-00b7-00cd-003d00a0005a.png",
        "timestamp": 1539687052827,
        "duration": 225
    },
    {
        "description": "Click on Add Customer Button to generte Customer ID|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008100d2-00a6-00ca-00dd-00c3004b00b0.png",
        "timestamp": 1539687053482,
        "duration": 623
    },
    {
        "description": "Go to homePage|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ce00f1-0082-00cf-0042-000c008000d9.png",
        "timestamp": 1539687054862,
        "duration": 153
    },
    {
        "description": "Click on Bank Manager Button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ce004c-0002-0027-00f0-00f7003c0085.png",
        "timestamp": 1539687055915,
        "duration": 170
    },
    {
        "description": "click on open account button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ca000d-0078-0095-00f6-0028007f00d5.png",
        "timestamp": 1539687056427,
        "duration": 183
    },
    {
        "description": "select customer name|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008a0010-000d-0092-00e0-00bf00d000ff.png",
        "timestamp": 1539687056975,
        "duration": 210
    },
    {
        "description": "select currency |BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009d0029-00e9-008f-0012-003a000d00be.png",
        "timestamp": 1539687057675,
        "duration": 290
    },
    {
        "description": "click on Process button to generate account no|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00130007-00c6-000d-00e0-00ee00ab00a6.png",
        "timestamp": 1539687058407,
        "duration": 210
    },
    {
        "description": "After generating account number go to homePage|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008300c7-00cc-00c6-0011-0089008100bd.png",
        "timestamp": 1539687059367,
        "duration": 158
    },
    {
        "description": "Click on Bank Manager Button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b600e6-0048-0018-0021-00ee00d60004.png",
        "timestamp": 1539687059990,
        "duration": 175
    },
    {
        "description": "Click on Customer Button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009f004c-00b7-0013-004e-002300d000a1.png",
        "timestamp": 1539687060582,
        "duration": 145
    },
    {
        "description": "Click on Customer Button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00750074-0003-00ae-0084-008f00060058.png",
        "timestamp": 1539687061077,
        "duration": 253
    },
    {
        "description": "Click on Customer Button|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b800ee-001a-00bd-0078-005800a300db.png",
        "timestamp": 1539687061800,
        "duration": 215
    },
    {
        "description": "Go to homePage|BANK MANAGER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007c00bd-00b7-00fa-000c-002b0078004f.png",
        "timestamp": 1539687062425,
        "duration": 157
    },
    {
        "description": "Launch XYZ|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2024,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008c0033-0049-009c-0089-005b00ab0037.png",
        "timestamp": 1539773809870,
        "duration": 4898
    },
    {
        "description": "Launch XYZ|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e5002f-00d8-007b-006d-00bf007e00bf.png",
        "timestamp": 1539774957883,
        "duration": 4569
    },
    {
        "description": "Open the browser|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00840048-00e9-00e4-00e5-00f800c9008d.png",
        "timestamp": 1539774966062,
        "duration": 2461
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12244,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Failed: name.split is not a function",
        "trace": "TypeError: name.split is not a function\n    at className (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\by.js:138:22)\n    at call (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1068:28)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:907:19\n    at ManagedPromise.invokeCallback_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)\nFrom: Task: WebDriver.call(function)\n    at Driver.call (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:901:23)\n    at Driver.findElementsInternal_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1068:17)\n    at Driver.findElements (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1043:19)\n    at ptor.waitForAngular.then (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\Desktop\\JbHunt\\Protractor_typeScriptProject (1)\\Protractor_typeScriptProject\\xyz_bank\\Specs\\test.js:14:21)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\Desktop\\JbHunt\\Protractor_typeScriptProject (1)\\Protractor_typeScriptProject\\xyz_bank\\Specs\\test.js:12:5)\n    at addSpecsToSuite (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\Desktop\\JbHunt\\Protractor_typeScriptProject (1)\\Protractor_typeScriptProject\\xyz_bank\\Specs\\test.js:4:1)\n    at Module._compile (module.js:653:30)\n    at Object.Module._extensions..js (module.js:664:10)\n    at Module.load (module.js:566:32)\n    at tryModuleLoad (module.js:506:12)",
        "browserLogs": [],
        "screenShotFile": "00e60031-00d3-00dc-00e6-00d7001600d9.png",
        "timestamp": 1539774970648,
        "duration": 60
    },
    {
        "description": "Launch XYZ|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9000,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00060038-00bc-00b3-00cf-00e300980049.png",
        "timestamp": 1539775562778,
        "duration": 3408
    },
    {
        "description": "Open the browser|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9000,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ca0009-009f-0097-00d5-001d00300089.png",
        "timestamp": 1539775567314,
        "duration": 3882
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9000,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Expected 'XYZ Bank' to be 'mainHeading'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\Desktop\\JbHunt\\Protractor_typeScriptProject (1)\\Protractor_typeScriptProject\\xyz_bank\\Specs\\test.js:14:32)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00b90047-004a-00ee-007e-0043008100e2.png",
        "timestamp": 1539775571806,
        "duration": 145
    },
    {
        "description": "Launch XYZ|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8272,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a0003d-004d-00bb-0043-0036004300ed.png",
        "timestamp": 1539775830589,
        "duration": 2967
    },
    {
        "description": "Open the browser|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8272,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004d002f-00b9-003a-000d-00c500d900cd.png",
        "timestamp": 1539775834049,
        "duration": 6341
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8272,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Expected 'XYZ Bank' to be 'mainHeading'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\Desktop\\JbHunt\\Protractor_typeScriptProject (1)\\Protractor_typeScriptProject\\xyz_bank\\Specs\\test.js:16:32)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "000400f5-0015-00c6-00ff-0000006c009e.png",
        "timestamp": 1539775840823,
        "duration": 2196
    },
    {
        "description": "Launch XYZ|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9608,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003100c5-00c5-002d-00aa-00f8009800bd.png",
        "timestamp": 1539776011457,
        "duration": 2310
    },
    {
        "description": "Open the browser|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9608,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003f0074-0004-0025-000c-002900240058.png",
        "timestamp": 1539776014544,
        "duration": 6699
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9608,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Expected 'XYZ Bank' to be 'mainHeading'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\Desktop\\JbHunt\\Protractor_typeScriptProject (1)\\Protractor_typeScriptProject\\xyz_bank\\Specs\\test.js:19:32)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00e300e2-00f0-00ac-0047-00f200ac002f.png",
        "timestamp": 1539776021680,
        "duration": 1219
    },
    {
        "description": "Launch XYZ|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8092,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006f0088-000d-000e-0019-00cf00e1006f.png",
        "timestamp": 1539776173880,
        "duration": 2880
    },
    {
        "description": "Open the browser|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8092,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00180068-002f-00c9-0069-009b00ca0097.png",
        "timestamp": 1539776177595,
        "duration": 6303
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8092,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009a00cc-007a-006b-0052-00c600f90051.png",
        "timestamp": 1539776184265,
        "duration": 1079
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 11664,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00db006f-001a-00eb-0059-004200a30019.png",
        "timestamp": 1539776349257,
        "duration": 1756
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 2524,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.54"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b500bd-00ab-00c9-0085-0047002800fa.png",
        "timestamp": 1539776544821,
        "duration": 1552
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6612,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.67"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008100bc-0041-00ec-000e-00c9005c002f.png",
        "timestamp": 1539787319382,
        "duration": 2749
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.67"
        },
        "message": "Expected 'XYZ Bank' to be 'XYZ1 Bank'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\E001105.CIGNITIGLOBAL\\Desktop\\JbHunt\\Protractor_typeScriptProject (1)\\Protractor_typeScriptProject\\xyz_bank\\Specs\\test.js:17:32)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\E001105.CIGNITIGLOBAL\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "006200eb-0003-0037-00c3-00d000480016.png",
        "timestamp": 1539788347685,
        "duration": 4663
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19832,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Expected 'XYZ Bank' to be 'XYZ1 Bank'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\jisasa4\\Desktop\\JBhunt\\Code\\xyz_bank\\xyz_bank\\Specs\\test.js:17:32)\n    at C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00620040-00dd-0071-003f-00fe007500bd.png",
        "timestamp": 1541050797453,
        "duration": 4194
    },
    {
        "description": "Verify Title|Launch URL",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 680,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Expected 'XYZ Bank' to be 'XYZ1 Bank'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\jisasa4\\Desktop\\JBhunt\\Code\\xyz_bank\\xyz_bank\\Specs\\test.js:17:32)\n    at C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisasa4\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00ff00a6-0045-00f2-0045-003900aa007e.png",
        "timestamp": 1541053299096,
        "duration": 3738
    },
    {
        "description": "Open the browser|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0064000f-00bf-00a0-007d-000c00550069.png",
        "timestamp": 1541053603758,
        "duration": 3725
    },
    {
        "description": "Verify Title|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001b007f-009f-00c0-0096-00b800690073.png",
        "timestamp": 1541053607849,
        "duration": 633
    },
    {
        "description": "Color of Customer Login before MouseOver|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009400d1-0059-0036-0098-00bb00bb001c.png",
        "timestamp": 1541053608832,
        "duration": 40
    },
    {
        "description": "click customer login button|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bc0095-001b-006b-0045-009f00580084.png",
        "timestamp": 1541053609191,
        "duration": 90
    },
    {
        "description": "Select Customer from Drop Down|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007b007e-000e-00a6-00e9-004900b1008c.png",
        "timestamp": 1541053609621,
        "duration": 657
    },
    {
        "description": "Click on Login button|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009d00b6-00aa-00a1-00fa-001a000200f2.png",
        "timestamp": 1541053610619,
        "duration": 100
    },
    {
        "description": "verify customer title|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008c00ed-004d-0047-0009-00e200ad00ba.png",
        "timestamp": 1541053611062,
        "duration": 176
    },
    {
        "description": "Click on Deposit Button|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0043008e-003f-009d-004d-009d001d00d1.png",
        "timestamp": 1541053611514,
        "duration": 2099
    },
    {
        "description": "Deposit amount|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00520023-00a7-0087-0033-004900790003.png",
        "timestamp": 1541053613891,
        "duration": 105
    },
    {
        "description": "Click deposit button after entering amount|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ef00c4-0011-00d5-001e-0016005b008d.png",
        "timestamp": 1541053614361,
        "duration": 96
    },
    {
        "description": "Verify Deposit Amount Message|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00690051-0088-0018-002a-008f00b300b1.png",
        "timestamp": 1541053614778,
        "duration": 102
    },
    {
        "description": "Amount deposited Value is: |CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004300ce-0085-009f-001b-00c5002b0037.png",
        "timestamp": 1541053615245,
        "duration": 68
    },
    {
        "description": "Click on WithDrawl Button|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004f0096-0041-00e2-0028-004f000500b8.png",
        "timestamp": 1541053615751,
        "duration": 226
    },
    {
        "description": "WithDraw Amount|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000d00f2-00ec-0015-00bc-003e00c000ba.png",
        "timestamp": 1541053616474,
        "duration": 151
    },
    {
        "description": "Click on WithDrawl Button after Entering Amount|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007f0072-00e2-0058-0090-0017006800d5.png",
        "timestamp": 1541053616944,
        "duration": 139
    },
    {
        "description": "Verify Withdraw Amount Message|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0083004a-0092-00ab-00bc-00a800f9009f.png",
        "timestamp": 1541053617515,
        "duration": 204
    },
    {
        "description": "Remaining Balance is |CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0023004b-000e-0043-000b-00b3009f00dd.png",
        "timestamp": 1541053618047,
        "duration": 1060
    },
    {
        "description": "Amount Debited in Transactions page|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001f0019-003c-0017-0056-00d900040008.png",
        "timestamp": 1541053619482,
        "duration": 4116
    },
    {
        "description": "Credited Amount is |CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001300ce-0090-0009-00d2-00f200d100b1.png",
        "timestamp": 1541053623950,
        "duration": 69
    },
    {
        "description": "Debited Amount is |CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00df0046-00fa-00a8-0037-009b00c400cc.png",
        "timestamp": 1541053624350,
        "duration": 50
    },
    {
        "description": "Click On Logout Button|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00eb005b-004c-004e-0000-007800570038.png",
        "timestamp": 1541053624743,
        "duration": 185
    },
    {
        "description": "Click on Home Button|CUSTOMER LOGIN",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8396,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00360064-001d-00d5-004b-00e200990061.png",
        "timestamp": 1541053625278,
        "duration": 1625
    },
    {
        "description": "Verify title|Launc xyz",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14140,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js 106:208 \"TypeError: Cannot read property 'fName' of undefined\\n    at accountCtrl (http://www.way2automation.com/angularjs-protractor/banking/accountViewController.js:9:39)\\n    at e (https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js:39:193)\\n    at Object.instantiate (https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js:39:310)\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js:80:313\\n    at https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js:7:23333\\n    at aa (https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js:73:90)\\n    at K (https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js:62:39)\\n    at g (https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js:54:410)\\n    at https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js:53:480\\n    at k (https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js:7:22678)\" \"\\u003Cdiv ui-view=\\\"\\\" class=\\\"ng-scope\\\">\"",
                "timestamp": 1541104144098,
                "type": ""
            }
        ],
        "screenShotFile": "00ca00fc-0099-005b-0083-0076002e0087.png",
        "timestamp": 1541104139738,
        "duration": 4406
    },
    {
        "description": "Verify title|Launc xyz",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8232,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004d0012-00e5-004a-00a7-008800320076.png",
        "timestamp": 1541104246800,
        "duration": 4666
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23412,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "ElementNotVisibleError: element not interactable\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)",
        "trace": "ElementNotVisibleError: element not interactable\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:20)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)",
        "browserLogs": [],
        "screenShotFile": "003100a5-0018-007d-0041-00f9007e004f.png",
        "timestamp": 1541533099492,
        "duration": 1640
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17788,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "ElementNotVisibleError: element not interactable\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)",
        "trace": "ElementNotVisibleError: element not interactable\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:49:36)\n    at step (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:32:23)\n    at Object.next (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:13:53)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)",
        "browserLogs": [],
        "screenShotFile": "00890083-006f-0099-00bb-001200da0080.png",
        "timestamp": 1541533169656,
        "duration": 1427
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10072,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "NoSuchElementError: No element found using locator: By(xpath, /html/body/div[3]/div/div[2]/div/div[1]/div[1]/button)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/div[3]/div/div[2]/div/div[1]/div[1]/button)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:49:36)\n    at step (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:32:23)\n    at Object.next (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:13:53)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)",
        "browserLogs": [],
        "screenShotFile": "009c0050-0088-00b6-000a-00710091004c.png",
        "timestamp": 1541533279303,
        "duration": 1615
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16204,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00190012-009f-007d-0044-00e9001900fc.png",
        "timestamp": 1541533438815,
        "duration": 2393
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f70017-008c-007c-0073-002a00f4005b.png",
        "timestamp": 1541533714070,
        "duration": 2220
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 20716,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d000a9-0007-00fc-0041-001600ad0007.png",
        "timestamp": 1541533798878,
        "duration": 4241
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21604,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007600a3-0030-00a8-009d-002f00c60043.png",
        "timestamp": 1541533856607,
        "duration": 2317
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00be0081-0037-00f5-003a-006f00fd00a0.png",
        "timestamp": 1541537827693,
        "duration": 1008
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dd005c-0086-005b-00c4-00da00b80017.png",
        "timestamp": 1541537829062,
        "duration": 309
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003500c3-0057-0076-0054-00c00005008b.png",
        "timestamp": 1541537829700,
        "duration": 66
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e800de-000d-00f3-008e-004900c5005b.png",
        "timestamp": 1541537830145,
        "duration": 156
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00960030-00ef-0018-003f-009300d60003.png",
        "timestamp": 1541537830779,
        "duration": 109
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15380,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b80030-00a3-00fe-0017-003300d000e4.png",
        "timestamp": 1541537831227,
        "duration": 88
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12100,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a400d0-0086-0089-00bf-004b0081001e.png",
        "timestamp": 1541538870434,
        "duration": 1025
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12100,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c00e9-0053-00d0-0003-00b9007500c2.png",
        "timestamp": 1541538871756,
        "duration": 95
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12100,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00410073-00a3-003c-0029-001a00a2002b.png",
        "timestamp": 1541538872294,
        "duration": 71
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12100,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008800f0-0040-00e1-006b-00ae005c0093.png",
        "timestamp": 1541538872725,
        "duration": 128
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12100,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b200fa-006c-0087-0066-00f600d90066.png",
        "timestamp": 1541538873299,
        "duration": 131
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12100,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a20051-00e2-00c3-00d2-009700460014.png",
        "timestamp": 1541538873898,
        "duration": 66
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16472,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009b001b-00a1-0002-00de-00210029006a.png",
        "timestamp": 1541541120155,
        "duration": 1540
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16472,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed00f4-003a-004f-0054-004000e900da.png",
        "timestamp": 1541541122013,
        "duration": 92
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16472,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000a001b-009d-00e7-0042-00fa009c0087.png",
        "timestamp": 1541541122403,
        "duration": 296
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16472,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00950066-0065-000a-00e2-00a700920042.png",
        "timestamp": 1541541123140,
        "duration": 222
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16472,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b50084-009d-007a-0042-00f0009100d7.png",
        "timestamp": 1541541123725,
        "duration": 96
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16472,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002e00f3-004b-008f-00c8-003100fa00a9.png",
        "timestamp": 1541541124210,
        "duration": 91
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b8009c-006b-001f-004c-00dc00780089.png",
        "timestamp": 1541606334074,
        "duration": 1731
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007700ad-00e3-0074-0036-00f700e90059.png",
        "timestamp": 1541606336234,
        "duration": 125
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004000d7-00e4-00c8-0086-00bb00a70067.png",
        "timestamp": 1541606337022,
        "duration": 115
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f30014-0067-0049-007e-007a00470074.png",
        "timestamp": 1541606337492,
        "duration": 151
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e10013-00f1-00d8-0005-00c200640080.png",
        "timestamp": 1541606338254,
        "duration": 139
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9928,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00250044-00de-00d9-00bb-008000f5007c.png",
        "timestamp": 1541606338915,
        "duration": 185
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a900a6-00ca-007a-00ac-005b00fb0088.png",
        "timestamp": 1541606877638,
        "duration": 1685
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, [#ng-click = 'manager()']))\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Click on Bank Manager Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:13:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "002d0062-001d-0047-00bc-00e000b3007e.png",
        "timestamp": 1541606879701,
        "duration": 42
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:29:35)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:50)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00640076-0091-00f4-009d-00f700d70083.png",
        "timestamp": 1541606880116,
        "duration": 53
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='fName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='fName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:35:28)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:36)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add first name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00660027-0074-00c6-008e-0072005300a2.png",
        "timestamp": 1541606880468,
        "duration": 38
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='lName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='lName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:40:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004f00c8-0029-00cc-00b7-00eb009c007e.png",
        "timestamp": 1541606880814,
        "duration": 34
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='postCd'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='postCd'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:45:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "003a0060-00c9-00d2-006a-004e00f20068.png",
        "timestamp": 1541606881265,
        "duration": 44
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@type='submit'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@type='submit'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:51:44)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:60)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button to submit\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004c009b-00fd-00a3-0096-004400a700b4.png",
        "timestamp": 1541606881628,
        "duration": 49
    },
    {
        "description": "Verify customer ID|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 5000ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 5000ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:56:21)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\nFrom: Task: Run it(\"Verify customer ID\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:54:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f8003c-00f9-006f-000d-003c007c00e7.png",
        "timestamp": 1541606881951,
        "duration": 5006
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bb004e-0067-0009-0079-003b005f005e.png",
        "timestamp": 1541606936654,
        "duration": 1513
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, #ng-click = 'manager()'))\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Click on Bank Manager Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:13:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "006f00dd-00bd-00ff-00fd-00e200350024.png",
        "timestamp": 1541606938520,
        "duration": 46
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:29:35)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:50)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b90007-0098-00f5-008e-00080060005a.png",
        "timestamp": 1541606938873,
        "duration": 43
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='fName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='fName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:35:28)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:36)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add first name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009d00e3-00ee-0096-007f-00bb002f00c2.png",
        "timestamp": 1541606939243,
        "duration": 26
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='lName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='lName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:40:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c70018-009c-00e5-006d-008c00170037.png",
        "timestamp": 1541606939581,
        "duration": 26
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='postCd'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='postCd'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:45:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009e00b1-00aa-00ca-0090-008b004900b0.png",
        "timestamp": 1541606939929,
        "duration": 53
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@type='submit'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@type='submit'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:51:44)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:60)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button to submit\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d70008-0081-00b0-00cf-00ce009a00d4.png",
        "timestamp": 1541606940276,
        "duration": 48
    },
    {
        "description": "Verify customer ID|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18968,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 5009ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 5009ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:56:21)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\nFrom: Task: Run it(\"Verify customer ID\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:54:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009b0095-0028-00c0-0002-00fe006300cb.png",
        "timestamp": 1541606940645,
        "duration": 5014
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00600002-00d9-00c2-00d9-004500e4001a.png",
        "timestamp": 1541607068203,
        "duration": 1698
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, #[ng-click = 'manager()']))\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Click on Bank Manager Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:13:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c60043-003f-0007-0099-007600c500b5.png",
        "timestamp": 1541607070330,
        "duration": 36
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:29:35)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:50)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "002c0013-0010-007f-0073-0086009b0041.png",
        "timestamp": 1541607070753,
        "duration": 47
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='fName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='fName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:35:28)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:36)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add first name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0006006f-00b6-00ff-00b5-009800030051.png",
        "timestamp": 1541607071193,
        "duration": 29
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='lName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='lName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:40:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c20023-0029-008b-00ec-0090005700db.png",
        "timestamp": 1541607071515,
        "duration": 28
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='postCd'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='postCd'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:45:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "006000a7-00f3-0079-00d8-00ed00a60095.png",
        "timestamp": 1541607071890,
        "duration": 201
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@type='submit'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@type='submit'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:51:44)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:60)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button to submit\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00480066-00e5-0054-0064-00a8005400e3.png",
        "timestamp": 1541607073232,
        "duration": 34
    },
    {
        "description": "Verify customer ID|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15692,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 5001ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 5001ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:56:21)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\nFrom: Task: Run it(\"Verify customer ID\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:54:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e900d8-006e-000b-008f-00b5001a00f9.png",
        "timestamp": 1541607073544,
        "duration": 5006
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00470042-00aa-00d0-0013-002800d700fe.png",
        "timestamp": 1541607289893,
        "duration": 1394
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, //button[@ng-click = 'manager()']))\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Click on Bank Manager Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:13:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007100e6-0008-007f-0052-0019000900e7.png",
        "timestamp": 1541607291787,
        "duration": 246
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:29:35)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:50)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005b0046-005b-007b-0077-0056002e0012.png",
        "timestamp": 1541607292344,
        "duration": 28
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='fName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='fName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:35:28)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:36)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add first name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0013009c-00ec-0042-0002-0014002e00c4.png",
        "timestamp": 1541607292688,
        "duration": 24
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='lName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='lName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:40:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f20030-00d0-0033-00cc-00e100920012.png",
        "timestamp": 1541607293003,
        "duration": 31
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='postCd'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='postCd'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:45:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bb005b-008c-006b-0057-00ea00a400f1.png",
        "timestamp": 1541607293360,
        "duration": 28
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@type='submit'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@type='submit'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:51:44)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:60)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button to submit\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008100bf-00ea-0014-00c5-002900ba0077.png",
        "timestamp": 1541607293906,
        "duration": 60
    },
    {
        "description": "Verify customer ID|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22704,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 5001ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 5001ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:56:21)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\nFrom: Task: Run it(\"Verify customer ID\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:54:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "001d000c-000e-00d2-008b-007a00bd00ba.png",
        "timestamp": 1541607294321,
        "duration": 5005
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b0007b-0093-00e9-00a8-002c004200e8.png",
        "timestamp": 1541607472879,
        "duration": 2690
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: An invalid or illegal selector was specified\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(css selector, //button[@ng-click = 'manager()']))\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Click on Bank Manager Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:13:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00270054-0009-0075-00ea-001600ff00cb.png",
        "timestamp": 1541607475939,
        "duration": 292
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@ng-click ='addCust()'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:29:35)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:50)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:27:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ee004b-00e1-00c7-00ba-00d20032003d.png",
        "timestamp": 1541607476532,
        "duration": 28
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='fName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='fName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:35:28)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:36)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add first name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:32:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0065000a-0046-0039-0037-005200e60081.png",
        "timestamp": 1541607476925,
        "duration": 77
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='lName'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='lName'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:40:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fe00ca-00c3-0073-005f-00a300bd0086.png",
        "timestamp": 1541607477311,
        "duration": 30
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //input[@ng-model='postCd'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //input[@ng-model='postCd'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:45:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:43:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0013004f-004a-003c-008b-003f00b300f0.png",
        "timestamp": 1541607477651,
        "duration": 87
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //button[@type='submit'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //button[@type='submit'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:51:44)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:60)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button to submit\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:49:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e1002d-0060-0033-0041-008c00ba0021.png",
        "timestamp": 1541607478050,
        "duration": 33
    },
    {
        "description": "Verify customer ID|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15156,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 5040ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 5040ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:56:21)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\nFrom: Task: Run it(\"Verify customer ID\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:54:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c000bb-00b3-006b-00c4-00d800210041.png",
        "timestamp": 1541607478392,
        "duration": 5046
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c6008b-002f-006b-00fd-00970016009a.png",
        "timestamp": 1541607651816,
        "duration": 1484
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00460000-00d4-00ed-005a-00e800e000c5.png",
        "timestamp": 1541607653704,
        "duration": 171
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c900b7-0056-0042-001c-006b000800eb.png",
        "timestamp": 1541607654682,
        "duration": 113
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003a001e-0095-005a-0046-005600b70027.png",
        "timestamp": 1541607655253,
        "duration": 323
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00320013-0071-00d7-006f-000c00440078.png",
        "timestamp": 1541607656062,
        "duration": 121
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0036006c-0049-0004-009b-00a0000600de.png",
        "timestamp": 1541607656579,
        "duration": 128
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16796,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a400b7-0092-009b-0081-00fc00f00085.png",
        "timestamp": 1541609165023,
        "duration": 1427
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16796,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00bf0081-00bb-007e-0041-0024003c00f5.png",
        "timestamp": 1541609166825,
        "duration": 425
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16796,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d30032-002a-0057-008f-006c002100b7.png",
        "timestamp": 1541609167710,
        "duration": 81
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16796,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009900d2-0096-00fd-005b-00cd00b0007f.png",
        "timestamp": 1541609168272,
        "duration": 304
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16796,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00490066-00ca-002e-00f0-00d200fc008a.png",
        "timestamp": 1541609169124,
        "duration": 158
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16796,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001d0012-000c-00ae-003f-00d600b1007d.png",
        "timestamp": 1541609169671,
        "duration": 284
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21780,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "003e00ea-0099-00eb-0087-00ca0075007a.png",
        "timestamp": 1541616473056,
        "duration": 2135
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21780,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007a00c9-00b6-00d9-00bf-00db00380035.png",
        "timestamp": 1541616475757,
        "duration": 269
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21780,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00eb00b3-0082-002f-0029-00ac00020070.png",
        "timestamp": 1541616476460,
        "duration": 83
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21780,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dc003e-0077-00a3-0080-0078008a0099.png",
        "timestamp": 1541616476904,
        "duration": 160
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21780,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0047002f-006f-0005-00e1-00f200930067.png",
        "timestamp": 1541616477554,
        "duration": 154
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21780,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b40051-007f-00a5-0053-009d006e00ca.png",
        "timestamp": 1541616478021,
        "duration": 143
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fb007e-0024-0070-00a0-002c007d0088.png",
        "timestamp": 1541617659897,
        "duration": 1421
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a800b8-0075-00b6-0016-0037001f0034.png",
        "timestamp": 1541617661662,
        "duration": 162
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00110068-00ae-00a3-0030-002d00220051.png",
        "timestamp": 1541617662261,
        "duration": 154
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003b00bb-008f-003a-00a3-008800cd00ba.png",
        "timestamp": 1541617662864,
        "duration": 143
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005d00b3-00e5-00f5-0065-006f002800af.png",
        "timestamp": 1541617664926,
        "duration": 115
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004f0049-0083-00d2-005f-002e00f800e0.png",
        "timestamp": 1541617665445,
        "duration": 94
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19260,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "001f003c-00ec-00a0-00e8-008400120088.png",
        "timestamp": 1541620007327,
        "duration": 1753
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19260,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00590045-006b-00ab-0098-001e00a200c5.png",
        "timestamp": 1541620009393,
        "duration": 463
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19260,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d200fe-0072-00e8-00d4-00b100fb002c.png",
        "timestamp": 1541620010306,
        "duration": 116
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19260,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00600065-004a-00fa-0023-00dc004c00b1.png",
        "timestamp": 1541620010849,
        "duration": 267
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19260,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a600d2-008d-000b-001b-002d0039006a.png",
        "timestamp": 1541620013060,
        "duration": 122
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19260,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fd0008-00bc-0009-0084-00a200f800eb.png",
        "timestamp": 1541620013581,
        "duration": 139
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22808,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: gettitle.toEqual is not a function"
        ],
        "trace": [
            "TypeError: gettitle.toEqual is not a function\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:10:21)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:4:58)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Open XYZ Bank and Verify Title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:7:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fe00af-0022-00bb-008b-0042006500d8.png",
        "timestamp": 1541620662332,
        "duration": 1536
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22808,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002e00c0-0038-00b4-0091-001a00100070.png",
        "timestamp": 1541620664494,
        "duration": 219
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22808,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009c0026-00e2-00f5-00d3-0038001100da.png",
        "timestamp": 1541620665068,
        "duration": 113
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22808,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed005a-0031-0035-009c-009500b800d2.png",
        "timestamp": 1541620665627,
        "duration": 177
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22808,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d60056-007d-003a-00b1-002b009f0095.png",
        "timestamp": 1541620666337,
        "duration": 161
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22808,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009700bf-007b-008b-0043-005d004b0056.png",
        "timestamp": 1541620667030,
        "duration": 255
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b000c4-0066-007e-0044-00e300520052.png",
        "timestamp": 1541703928498,
        "duration": 1596
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003c0003-0089-00e9-004c-001e00d80056.png",
        "timestamp": 1541703930606,
        "duration": 330
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00460043-0092-0025-0087-00fd004500c3.png",
        "timestamp": 1541703931339,
        "duration": 134
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a000d4-00d6-000c-00ee-00ee00d400bd.png",
        "timestamp": 1541703931962,
        "duration": 259
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b50037-00f3-0083-0027-005200370071.png",
        "timestamp": 1541703932610,
        "duration": 110
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f600f2-0028-009a-004d-009f009100fc.png",
        "timestamp": 1541703933155,
        "duration": 96
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009b00ba-0075-00c2-00d3-00d1003500ff.png",
        "timestamp": 1541704003912,
        "duration": 10164
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: Run it(\"Click on Bank Manager Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:20:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0036005d-001e-007c-0088-00850047007f.png",
        "timestamp": 1541704014607,
        "duration": 71
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:38:34)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:35:50)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:35:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "001c0089-009f-0009-00f8-001c0008008f.png",
        "timestamp": 1541704015045,
        "duration": 23
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:53:28)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:50:36)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add first name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:50:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fe003f-00df-0095-0012-00db001800d4.png",
        "timestamp": 1541704015531,
        "duration": 105
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:58:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:56:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:56:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "006200b7-0066-00c6-0047-004f007500b9.png",
        "timestamp": 1541704015976,
        "duration": 18
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:63:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:61:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:61:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d80081-000d-00ad-00cd-004800540039.png",
        "timestamp": 1541704016310,
        "duration": 87
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:69:44)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:67:60)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer button to submit\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:67:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005d0044-0043-008a-00d6-004000880051.png",
        "timestamp": 1541704016791,
        "duration": 12
    },
    {
        "description": "Read alert|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24800,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:74:47)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:72:32)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\nFrom: Task: Run it(\"Read alert\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:72:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hw.ts:5:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e80013-004a-00b8-007c-0004008a00c4.png",
        "timestamp": 1541704017240,
        "duration": 61
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c00d8-00d6-003c-00e7-005300f000f7.png",
        "timestamp": 1541704230921,
        "duration": 1508
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00af0043-0094-0005-00ef-006300cb0079.png",
        "timestamp": 1541704232844,
        "duration": 174
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ea00b5-00cb-00df-003b-00ac00320021.png",
        "timestamp": 1541704233630,
        "duration": 120
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000b0066-004a-000b-0031-005f00040004.png",
        "timestamp": 1541704234168,
        "duration": 344
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ad00f4-00ef-00bf-004c-007b009a007a.png",
        "timestamp": 1541704234994,
        "duration": 171
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 25344,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e900c8-0040-009d-00d2-008f00ae00ae.png",
        "timestamp": 1541704235652,
        "duration": 185
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c00056-0018-00a2-0096-0050007e000b.png",
        "timestamp": 1541704663414,
        "duration": 1943
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b70051-006c-001b-002a-001a006b0077.png",
        "timestamp": 1541704665940,
        "duration": 173
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007f008b-003d-00f6-00b0-00f4009000a0.png",
        "timestamp": 1541704666617,
        "duration": 240
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002600bd-004d-00f1-00b3-007b00dd0092.png",
        "timestamp": 1541704667496,
        "duration": 172
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00870025-001c-007c-009f-00ab003e0064.png",
        "timestamp": 1541704668131,
        "duration": 180
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000800fd-00c2-0030-00c4-00e3009c0003.png",
        "timestamp": 1541704668750,
        "duration": 157
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fc00f7-0090-00be-0004-00e5002b00e3.png",
        "timestamp": 1541709926441,
        "duration": 2490
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e50046-00d5-0029-0029-0054008100ac.png",
        "timestamp": 1541709929279,
        "duration": 154
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a90015-0034-0091-00ed-002400e000d3.png",
        "timestamp": 1541709929795,
        "duration": 80
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009000ef-00e6-00fd-00bc-008d00b900a6.png",
        "timestamp": 1541709930399,
        "duration": 140
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009e006d-00b3-0047-0085-00180014002c.png",
        "timestamp": 1541709931085,
        "duration": 218
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22268,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007e003d-003e-0097-003f-008600d00060.png",
        "timestamp": 1541709931666,
        "duration": 99
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00af004f-009d-00c2-0026-00b7008300bb.png",
        "timestamp": 1541715403182,
        "duration": 1529
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008700d0-00f8-00ee-00e0-00a500320052.png",
        "timestamp": 1541715405281,
        "duration": 146
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00680007-000c-0087-0060-0040000000fc.png",
        "timestamp": 1541715405776,
        "duration": 77
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00300028-00d2-00a0-0086-00c5006d00a5.png",
        "timestamp": 1541715406286,
        "duration": 141
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:63:29)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:61:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:61:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:10:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c1006c-0064-0051-0077-00ad00fd000b.png",
        "timestamp": 1541715406888,
        "duration": 27
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:68:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:66:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:66:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:10:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "000d0046-0096-0074-0034-006a00d200b8.png",
        "timestamp": 1541715407241,
        "duration": 29
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e000ef-002b-0085-0038-007a002d0060.png",
        "timestamp": 1541715407571,
        "duration": 167
    },
    {
        "description": "Read alert|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24048,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:77:47)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:76:32)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\nFrom: Task: Run it(\"Read alert\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:76:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:10:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009f0033-002e-003b-00d6-00b200850082.png",
        "timestamp": 1541715408402,
        "duration": 35
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000a009a-00e6-006f-00d4-002900ed00a9.png",
        "timestamp": 1541715527034,
        "duration": 1459
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00aa00c4-0056-00c4-0072-001800b60043.png",
        "timestamp": 1541715529051,
        "duration": 198
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ab00ef-0048-0001-0050-009300a400ab.png",
        "timestamp": 1541715529565,
        "duration": 97
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002d0075-0043-0012-009a-00bf00150028.png",
        "timestamp": 1541715530046,
        "duration": 183
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:63:29)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:61:35)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add last name\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:61:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:10:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "006a001e-0080-005b-00ee-008900be0098.png",
        "timestamp": 1541715530658,
        "duration": 40
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebElement.sendKeys()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:68:27)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:66:37)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Add postal code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:66:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:10:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "004c0096-008e-0024-00cb-00ea00330048.png",
        "timestamp": 1541715531012,
        "duration": 48
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f8004d-0034-0090-0039-00db009d0042.png",
        "timestamp": 1541715531399,
        "duration": 156
    },
    {
        "description": "Read alert|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 24108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:77:47)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:3:12)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:76:32)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\nFrom: Task: Run it(\"Read alert\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:76:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:10:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009b00db-005d-00c3-002e-00b600eb008b.png",
        "timestamp": 1541715532092,
        "duration": 41
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23748,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ae0061-00cc-0054-0049-00a0000200ba.png",
        "timestamp": 1541715587729,
        "duration": 1007
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23748,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003e00cd-0077-008a-00c1-0074001d00c5.png",
        "timestamp": 1541715589084,
        "duration": 176
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23748,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008900ed-0056-005b-00d1-002e00a0006e.png",
        "timestamp": 1541715589581,
        "duration": 120
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23748,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00eb0018-00a0-00f2-0078-007a005300a5.png",
        "timestamp": 1541715590134,
        "duration": 173
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23748,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000a003c-0023-0002-007f-001800c500d0.png",
        "timestamp": 1541715590851,
        "duration": 157
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23748,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fa0022-00c1-0047-000c-004700f60033.png",
        "timestamp": 1541715591424,
        "duration": 128
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3392,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00720007-005b-00cd-00a0-003200a3007c.png",
        "timestamp": 1541715722722,
        "duration": 1497
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3392,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00240093-0039-0039-008b-006d007e0067.png",
        "timestamp": 1541715724608,
        "duration": 147
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3392,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007b004c-0063-0008-0098-00d00011001e.png",
        "timestamp": 1541715725333,
        "duration": 126
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3392,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e20050-00a8-001d-0093-00e0005b0085.png",
        "timestamp": 1541715725837,
        "duration": 199
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3392,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00860074-00cf-0060-0015-002c005600d0.png",
        "timestamp": 1541715726471,
        "duration": 89
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3392,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000600da-0025-0033-0057-00d40029004c.png",
        "timestamp": 1541715726984,
        "duration": 80
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8724,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001e0004-00ff-00e0-00a1-0099006d00c4.png",
        "timestamp": 1541716040431,
        "duration": 1388
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8724,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005700f6-00d8-008f-003e-00ba004c00a7.png",
        "timestamp": 1541716042187,
        "duration": 386
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8724,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c50057-00e9-006c-00fe-006b0014005a.png",
        "timestamp": 1541716042990,
        "duration": 168
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8724,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002d00a0-00e9-00ae-00ed-00a700ad002f.png",
        "timestamp": 1541716043616,
        "duration": 141
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8724,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00080068-00d7-0076-00a6-001e002a00ac.png",
        "timestamp": 1541716044199,
        "duration": 104
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8724,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00490080-006d-0031-0014-0085009b00e9.png",
        "timestamp": 1541716044731,
        "duration": 110
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8724,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006f002f-004c-00cf-00fa-00bc007900bc.png",
        "timestamp": 1541716045180,
        "duration": 124
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0054001e-00c2-0067-00a9-00d80044001f.png",
        "timestamp": 1542138421964,
        "duration": 6747
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005600dc-002b-0023-0041-00ec00c100ac.png",
        "timestamp": 1542138429226,
        "duration": 190
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a60034-0068-0076-0070-00a300ec001d.png",
        "timestamp": 1542138429807,
        "duration": 164
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a800b9-0001-0032-007a-004400750047.png",
        "timestamp": 1542138430452,
        "duration": 340
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cd003a-0043-0061-00b1-00c20080003d.png",
        "timestamp": 1542138431325,
        "duration": 123
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f8009c-00b9-0025-007b-00fd0071007b.png",
        "timestamp": 1542138431905,
        "duration": 112
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00890011-00e6-00df-0015-005d007a00a1.png",
        "timestamp": 1542138432384,
        "duration": 230
    },
    {
        "description": "Click Open Account|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: invalid selector: Unable to locate an element with the xpath expression clickOpenAccountButton() {\r\n        // const btnOpenAccount = element(by.xpath(this.openAccountbtn));\r\n        // if (btnOpenAccount.isDisplayed())\r\n        //  {\r\n        //      btnOpenAccount.myClick();\r\n        //  }\r\n        //  else\r\n        //   {\r\n        //      console.log(\"element not displayed\")\r\n        // }\r\n        this.myClick(this.clickOpenAccountButton, \"click on Open Account button\");\r\n    } because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string 'clickOpenAccountButton() {\r\n        // const btnOpenAccount = element(by.xpath(this.openAccountbtn));\r\n        // if (btnOpenAccount.isDisplayed())\r\n        //  {\r\n        //      btnOpenAccount.myClick();\r\n        //  }\r\n        //  else\r\n        //   {\r\n        //      console.log(\"element not displayed\")\r\n        // }\r\n        this.myClick(this.clickOpenAccountButton, \"click on Open Account button\");\r\n    }' is not a valid XPath expression.\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "InvalidSelectorError: invalid selector: Unable to locate an element with the xpath expression clickOpenAccountButton() {\r\n        // const btnOpenAccount = element(by.xpath(this.openAccountbtn));\r\n        // if (btnOpenAccount.isDisplayed())\r\n        //  {\r\n        //      btnOpenAccount.myClick();\r\n        //  }\r\n        //  else\r\n        //   {\r\n        //      console.log(\"element not displayed\")\r\n        // }\r\n        this.myClick(this.clickOpenAccountButton, \"click on Open Account button\");\r\n    } because of the following error:\nSyntaxError: Failed to execute 'evaluate' on 'Document': The string 'clickOpenAccountButton() {\r\n        // const btnOpenAccount = element(by.xpath(this.openAccountbtn));\r\n        // if (btnOpenAccount.isDisplayed())\r\n        //  {\r\n        //      btnOpenAccount.myClick();\r\n        //  }\r\n        //  else\r\n        //   {\r\n        //      console.log(\"element not displayed\")\r\n        // }\r\n        this.myClick(this.clickOpenAccountButton, \"click on Open Account button\");\r\n    }' is not a valid XPath expression.\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.findElements(By(xpath, clickOpenAccountButton() {\r\n        // const btnOpenAccount = element(by.xpath(this.openAccountbtn));\r\n        // if (btnOpenAccount.isDisplayed())\r\n        //  {\r\n        //      btnOpenAccount.myClick();\r\n        //  }\r\n        //  else\r\n        //   {\r\n        //      console.log(\"element not displayed\")\r\n        // }\r\n        this.myClick(this.clickOpenAccountButton, \"click on Open Account button\");\r\n    }))\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at Driver.findElements (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1048:19)\n    at ptor.waitForAngular.then (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:159:44)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous>\n    at pollCondition (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2195:19)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2191:7\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2190:22\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at OpenAccount.myClick (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Action\\action1.ts:25:9)\n    at OpenAccount.clickOpenAccountButton (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Pages\\OpenAccount\\openaccount.ts:34:14)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:94:15)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\nFrom: Task: Run it(\"Click Open Account\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:93:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e1001e-00dc-00fd-0020-009a00320041.png",
        "timestamp": 1542138433182,
        "duration": 142
    },
    {
        "description": "Click and select customer dropdown|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 2033ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 2033ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at OpenAccount.dropdown (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Action\\action1.ts:9:17)\n    at OpenAccount.clickCustomerdropdown (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Pages\\OpenAccount\\openaccount.ts:39:14)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:98:15)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\nFrom: Task: Run it(\"Click and select customer dropdown\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:97:5)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00710041-0045-0087-0015-004800d70055.png",
        "timestamp": 1542138433700,
        "duration": 2039
    },
    {
        "description": "select currency|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 2010ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 2010ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at OpenAccount.dropdown (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Action\\action1.ts:9:17)\n    at OpenAccount.clickCurrencydropdown (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Pages\\OpenAccount\\openaccount.ts:44:14)\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:102:11)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.js:7:71\nFrom: Task: Run it(\"select currency\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:101:1)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005f0006-0098-00f9-001e-00870059007b.png",
        "timestamp": 1542138436195,
        "duration": 2019
    },
    {
        "description": "click on Process button to generate account no|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 27036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Wait timed out after 2022ms"
        ],
        "trace": [
            "TimeoutError: Wait timed out after 2022ms\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: <anonymous wait>\n    at scheduleWait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at Driver.wait (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:67:16)\n    at OpenAccount.dropdown (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Action\\action1.ts:9:17)\n    at OpenAccount.clickCurrencydropdown (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\Pages\\OpenAccount\\openaccount.ts:44:14)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:106:11)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\nFrom: Task: Run it(\"click on Process button to generate account no\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:105:1)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "000b00dd-00f1-0086-00f5-008700ac0078.png",
        "timestamp": 1542138438592,
        "duration": 2026
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e90055-0055-0052-00e3-0027007d0014.png",
        "timestamp": 1542138717392,
        "duration": 6419
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d000f2-00a4-001e-0001-008f00dc005e.png",
        "timestamp": 1542138724203,
        "duration": 148
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00110065-0017-00ab-002d-008100180072.png",
        "timestamp": 1542138724678,
        "duration": 116
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c700ad-00ef-00fd-00e9-00f700c600de.png",
        "timestamp": 1542138725121,
        "duration": 144
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ee008b-00ed-004e-00b2-002d002f009b.png",
        "timestamp": 1542138725698,
        "duration": 103
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003f0018-0067-0059-00a1-00ab003b002f.png",
        "timestamp": 1542138726279,
        "duration": 102
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0002009a-0036-0003-00cb-00ab00fa00a8.png",
        "timestamp": 1542138726719,
        "duration": 118
    },
    {
        "description": "Click Open Account|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00650007-0051-000f-008c-009d004100f6.png",
        "timestamp": 1542138727239,
        "duration": 366
    },
    {
        "description": "Click and select customer dropdown|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009d00b1-00f9-002b-0038-000000b600b6.png",
        "timestamp": 1542138728028,
        "duration": 158
    },
    {
        "description": "select currency|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0074003f-0054-002f-00d1-0031007f0005.png",
        "timestamp": 1542138728560,
        "duration": 128
    },
    {
        "description": "click on Process button to generate account no|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15980,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:107:44)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"click on Process button to generate account no\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:105:1)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008d003c-00a8-00d3-00b5-00eb00190095.png",
        "timestamp": 1542138728980,
        "duration": 140
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cb002d-0014-00a6-001d-0073003e0000.png",
        "timestamp": 1542222671819,
        "duration": 3327
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005f0035-0017-00d6-00f8-0069000a0095.png",
        "timestamp": 1542222675562,
        "duration": 162
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005700c0-0084-0044-001e-008d0073003e.png",
        "timestamp": 1542222676060,
        "duration": 112
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c80015-0011-00a2-0017-00cb00e80020.png",
        "timestamp": 1542222676532,
        "duration": 676
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00700018-0042-009f-002c-002200620078.png",
        "timestamp": 1542222677661,
        "duration": 148
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cf007a-009c-00c5-00a7-00bc009a0060.png",
        "timestamp": 1542222678197,
        "duration": 134
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a0008f-00e3-00d9-00ff-004e00d20039.png",
        "timestamp": 1542222678661,
        "duration": 139
    },
    {
        "description": "Click Open Account|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c40062-00cf-002b-00f0-00f500bb00f4.png",
        "timestamp": 1542222679185,
        "duration": 119
    },
    {
        "description": "Click and select customer dropdown|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c7005c-000f-0028-00e2-0050000400e5.png",
        "timestamp": 1542222679697,
        "duration": 173
    },
    {
        "description": "select currency|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00710063-004f-00e1-001e-00bb009c00ed.png",
        "timestamp": 1542222680179,
        "duration": 133
    },
    {
        "description": "click on Process button to generate account no|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19228,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:107:44)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"click on Process button to generate account no\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:105:1)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00020006-003b-0051-0069-008e001400df.png",
        "timestamp": 1542222680616,
        "duration": 131
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00aa0031-00a8-0075-005c-007b005f007e.png",
        "timestamp": 1542223467603,
        "duration": 4901
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00710001-00e8-0061-00e5-00a400c600be.png",
        "timestamp": 1542223472865,
        "duration": 191
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b200cd-000c-0024-0024-006f00c700c3.png",
        "timestamp": 1542223473384,
        "duration": 141
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00330032-0037-000b-005a-0098004600ea.png",
        "timestamp": 1542223474028,
        "duration": 255
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f5000d-00ea-0082-0041-00e900aa003a.png",
        "timestamp": 1542223474736,
        "duration": 134
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00af008d-000f-002f-0012-00b700c100be.png",
        "timestamp": 1542223475280,
        "duration": 91
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00270064-001d-009f-0092-0013000500d3.png",
        "timestamp": 1542223475699,
        "duration": 108
    },
    {
        "description": "Click Open Account|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00160028-008d-0087-006e-007000ee00fb.png",
        "timestamp": 1542223476188,
        "duration": 122
    },
    {
        "description": "Click and select customer dropdown|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00220085-00ef-0064-007e-00d400e0008f.png",
        "timestamp": 1542223477103,
        "duration": 201
    },
    {
        "description": "select currency|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00980076-0072-00cd-0027-00b2004500c5.png",
        "timestamp": 1542223477695,
        "duration": 99
    },
    {
        "description": "click on Process button to generate account no|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13224,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:107:44)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"click on Process button to generate account no\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:105:1)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "001a00ac-00d1-00ad-00ea-002000b500fc.png",
        "timestamp": 1542223478144,
        "duration": 129
    },
    {
        "description": "Open XYZ Bank and Verify Title|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002c005b-0012-0037-006a-00fe0092007a.png",
        "timestamp": 1542223918805,
        "duration": 3884
    },
    {
        "description": "Click on Bank Manager Button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00520066-0015-0067-0053-001900c70075.png",
        "timestamp": 1542223923062,
        "duration": 389
    },
    {
        "description": "Click on Add Customer button|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00010052-0047-005c-00cf-0081000a006e.png",
        "timestamp": 1542223923836,
        "duration": 151
    },
    {
        "description": "Add first name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003b00a4-00d3-00ae-00b0-002200d200ea.png",
        "timestamp": 1542223924421,
        "duration": 126
    },
    {
        "description": "Add last name|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004100fb-00e3-003d-00d1-00b400a00004.png",
        "timestamp": 1542223924960,
        "duration": 126
    },
    {
        "description": "Add postal code|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0028001b-00f6-0010-0008-007000e500f6.png",
        "timestamp": 1542223925514,
        "duration": 133
    },
    {
        "description": "Click on Add Customer button to submit|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003c002d-0054-004b-00dd-00bd003d0089.png",
        "timestamp": 1542223926040,
        "duration": 130
    },
    {
        "description": "Click Open Account|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d300ba-0023-00f0-0029-006d00190032.png",
        "timestamp": 1542223926607,
        "duration": 125
    },
    {
        "description": "Click and select customer dropdown|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00570085-0074-00b3-0025-00e9000c0060.png",
        "timestamp": 1542223927160,
        "duration": 189
    },
    {
        "description": "select currency|XYZ Bank Bank manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0017008a-0000-00ed-00f7-00d100990070.png",
        "timestamp": 1542223927703,
        "duration": 140
    },
    {
        "description": "click on Process button to generate account no|XYZ Bank Bank manager",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 23740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)"
        ],
        "trace": [
            "NoSuchAlertError: no such alert\n  (Session info: chrome=70.0.3538.77)\n  (Driver info: chromedriver=2.43.600210 (68dcf5eebde37173d4027fa8635e332711d2874a),platform=Windows NT 10.0.16299 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)\nFrom: Task: WebDriver.switchTo().alert()\n    at Driver.schedule (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.alert (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1862:29)\n    at UserContext.it (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:107:44)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\nFrom: Task: Run it(\"click on Process button to generate account no\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:105:1)\n    at addSpecsToSuite (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqrb9\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\jisqrb9\\Desktop\\new typescr\\xyz_bank\\xyz_bank\\specs\\hwforjson.ts:14:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b000f6-0009-0003-0042-008b00de00e5.png",
        "timestamp": 1542223928152,
        "duration": 165
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
