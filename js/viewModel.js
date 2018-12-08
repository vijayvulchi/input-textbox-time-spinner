function timeSpinner (parent, ele, systemTime, bindEle) {
    // variables
    self.incBtn = $(ele).next().find('.spinner-input-time-inc-btn');
    self.decBtn = $(ele).next().find('.spinner-input-time-dec-btn');
    self.notification = '';
    self.hoursCaret = false;
    self.amPmCaret = false;
    self.ampmText = 'AM';
    self.getUserInputTimeValue;
    self.date = new Date();
    self.timeout = null;

    if (systemTime) {
        twelveHours();
    }
    
    // leading zeros
    function leadingZeros(time) {
        if (time < 10 && time != 0 && time.length != 2) {
            time = '0' + time;
        }
        return time;
    }

    // twelve hours default setup
    function twelveHours () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':').pop();
        if (getHours == '00' ) {
            bindEle(leadingZeros(Number(getHours)) + ':' + getMinutes + ' AM');
        } else if (getHours < 13) {
            bindEle(leadingZeros(Number(getHours)) + ':' + getMinutes + ' AM');
        } else {
            bindEle(leadingZeros(Number(getHours) - 12) + ':' + getMinutes + ' PM');
        }
    }

    // increase hours and minutes
    self.incBtn.unbind().click(function () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        updateIncrementTime(getHours, getMinutes);
    });

    // decrease hours and minutes
    self.decBtn.unbind().click(function () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        updateDecrementTime(getHours, getMinutes);
    });

    // focus
    $(ele).on('focus click', function () {
        if (this.selectionStart < 3) {
            hoursCaret = true;
            amPmCaret = false;
        } else if (this.selectionStart > 3 && this.selectionStart < 6) {
            hoursCaret = false;
            amPmCaret = false;
        } else {
            amPmCaret = true;
        }
    });

    // updating AM/PM when user clicks increment or decrement buttons
    function ampmCarets (getHours, getMinutes, tt) {
        if (tt === 'AM') {
            bindEle(getHours + ':' + getMinutes + ' ' + 'PM');
        } else {
            bindEle(getHours + ':' + getMinutes + ' ' + 'AM');
        }
    }

    // increase hours/minutes
    function updateIncrementTime(getHours, getMinutes) {
        if (amPmCaret) {
            var splitMinutes = getMinutes.split(' ')[0];
            var splitAmPm = getMinutes.split(' ').pop();
            ampmCarets(getHours, splitMinutes, splitAmPm);
        }
        else if (hoursCaret) {
            // hours increment
            var splitAmPm = getMinutes.split(' ').pop(); // to get AM/PM
            getMinutes = systemTime ? getMinutes.split(' ')[0] : getMinutes;
            if (getHours < 24) {
                if (systemTime) {
                    if (getHours < 12) {
                        getHours = leadingZeros(Number(getHours) + 1);
                        if (getHours == 12) {
                            if (splitAmPm == 'AM') {
                                bindEle(getHours + ':' + getMinutes + ' PM');
                            } else {
                                bindEle(getHours + ':' + getMinutes + ' AM');
                            }
                        } else {
                            bindEle(getHours + ':' + getMinutes + ' ' + splitAmPm);
                        }
                    } else {
                        bindEle('01' + ':' + getMinutes + ' ' + splitAmPm);
                    }
                } else {
                    getHours = leadingZeros(Number(getHours) + 1);
                    if (getHours == 24) {
                        bindEle('00' + ':' + getMinutes);
                    } else {
                        bindEle(getHours + ':' + getMinutes);
                    }
                }
            }
        } else {
            // minutes increment
            var splitAmPm = getMinutes.split(' ').pop(); // to get AM/PM
            getMinutes = systemTime ? getMinutes.split(' ')[0] : getMinutes;
            if (getMinutes < 59) {
                if (systemTime) {
                    bindEle(getHours + ':' + leadingZeros(Number(getMinutes) + 1) + ' ' + splitAmPm);
                } else {
                    bindEle(getHours + ':' + leadingZeros(Number(getMinutes) + 1));
                }
            } else {
                if (getHours < 24) {
                    if (systemTime) {
                        if (getHours < 12) {
                            getHours = leadingZeros(Number(getHours) + 1);
                            if (getHours == 12) {
                                if (splitAmPm == 'AM') {
                                    bindEle(getHours + ':' + '00' + ' PM');
                                } else {
                                    bindEle(getHours + ':' + '00' + ' AM');
                                }
                            } else {
                                bindEle(getHours + ':' + '00' + ' ' + splitAmPm);
                            }
                        } else {
                            bindEle('01' + ':' + '00' + ' ' + splitAmPm);
                        }
                    } else {
                        getHours = leadingZeros(Number(getHours) + 1);
                        if (getHours == 24) {
                            bindEle('00' + ':' + '00');
                        } else {
                            bindEle(getHours + ':' + '00');
                        } 
                    }
                }
            }
        }
    }

    // decrement hours/minutes
    function updateDecrementTime(getHours, getMinutes) {
        if (amPmCaret) {
            var splitMinutes = getMinutes.split(' ')[0];
            var splitAmPm = getMinutes.split(' ').pop();
            ampmCarets(getHours, splitMinutes, splitAmPm);
        }
        else if (hoursCaret) {
            // hours decrement
            var splitAmPm = getMinutes.split(' ').pop(); // to get AM/PM
            getMinutes = systemTime ? getMinutes.split(' ')[0] : getMinutes;
            if (getHours < 24 && getHours != '00') {
                if (systemTime) {
                    if (getHours < 12) {
                        getHours = leadingZeros(Number(getHours) - 1);
                        if (getHours == '00') {
                            if (splitAmPm == 'AM') {
                                bindEle('12' + ':' + getMinutes + ' PM');
                            } else {
                                bindEle('12' + ':' + getMinutes + ' AM');
                            }
                        } else {
                            bindEle(getHours + ':' + getMinutes + ' ' + splitAmPm);
                        }
                    } else {
                        bindEle('11' + ':' + getMinutes + ' ' + splitAmPm);
                    }
                } else {
                    bindEle(leadingZeros(Number(getHours) - 1) + ':' + getMinutes);
                }
            } else {
                bindEle('23' + ':' + getMinutes);
            }
        } else {
            // minutes decrement
            var splitAmPm = getMinutes.split(' ').pop(); // to get AM/PM
            getMinutes = systemTime ? getMinutes.split(' ')[0] : getMinutes;
            if (getMinutes <= 59 && getMinutes != '00') {
                if (systemTime) {
                    bindEle(getHours + ':' + leadingZeros(Number(getMinutes) - 1) + ' ' + splitAmPm);
                } else {
                    bindEle(getHours + ':' + leadingZeros(Number(getMinutes) - 1));
                }
            } else {
                if (getHours < 24 && getHours != '00') {
                    if (systemTime) {
                        if (getHours < 12) {
                            getHours = leadingZeros(Number(getHours) - 1);
                            if (getHours == '00') {
                                if (splitAmPm == 'AM') {
                                    bindEle('12' + ':' + '59' + ' PM');
                                } else {
                                    bindEle('12' + ':' + '59' + ' AM');
                                }
                            } else {
                                bindEle(getHours + ':' + '59' + ' ' + splitAmPm);
                            }
                        } else {
                            bindEle('01' + ':' + '59' + ' ' + splitAmPm);
                        }
                    } else {
                        bindEle(leadingZeros(Number(getHours) - 1) + ':' + '59');
                    }
                } else {
                    bindEle('23' + ':' + '59');
                }
            }
        }
    }

    // warning
    function warningWithCurrentTime () {
        if (systemTime) {
            if (self.date.getHours() > 12) {
                self.twelveTime = self.date.getHours() - 12;
                self.ampmText = 'PM';
            } else {
                self.twelveTime = self.date.getHours();
            }
            self.notification.html(leadingZeros(self.twelveTime) + ':' + leadingZeros(self.date.getMinutes()) + ' ' + self.ampmText + "<span class='warning-icon'></span>");
        } else {
                self.notification.html(leadingZeros(self.date.getHours()) + ':' + leadingZeros(self.date.getMinutes()) + "<span class='warning-icon'></span>");
        }
        $(ele).next().find('.spinner-input-time-inc-btn').prop('disabled', true);
        $(ele).next().find('.spinner-input-time-dec-btn').prop('disabled', true);
    }

    // time suggest pop-up
    function suggestTimePopup (suggestedTime) {
        self.notification.html('');
        self.notification.text(suggestedTime);
    }

    // remove suggest pop-up and enable increment and decrement buttons
    function removeSuggestPopEnableBtns (ele) {
        self.notification.html('');
        $(ele).next().find('.spinner-input-time-inc-btn').prop('disabled', false);
        $(ele).next().find('.spinner-input-time-dec-btn').prop('disabled', false);
    }

    // increase/decrease hours and minutes
    // when you key-up & key-down
    $(ele).keyup(function (event) {
        if (event.which == 38) {
            var getHours = $(ele).val().split(':')[0];
            var getMinutes = $(ele).val().split(':')[1];
            updateIncrementTime(getHours, getMinutes);
        }
        if (event.which == 40) {
            var getHours = $(ele).val().split(':')[0];
            var getMinutes = $(ele).val().split(':')[1];
            updateDecrementTime(getHours, getMinutes);
        }
        if (event.which == 37 || event.which == 39) {
            if (this.selectionEnd < 3) {
                hoursCaret = true;
                amPmCaret = false;
            } else if (this.selectionStart > 3 && this.selectionStart < 6) {
                hoursCaret = false;
                amPmCaret = false;
            } else {
                amPmCaret = true;
            }
        }
    });

    // validations starts here by calling the function.
    $(ele).on("input", function () {
        self.getUserInputTimeValue = $(ele).val();
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeout);
        // Make a new timeout set to go off in 800ms
        timeout = setTimeout(function () {
         self.notification = $(ele).parent().find('.spinner-input-time-notifier');
         if (self.getUserInputTimeValue.length == 0) {
             warningWithCurrentTime();
         } else {
            if (systemTime) {
                generateUserInputTime(ele, self.getUserInputTimeValue, self.notification);
            } else {
                generateUserInputTime(ele, self.getUserInputTimeValue, self.notification);
            }
         }
        }, 100);
    }).blur(function () {
        if (self.notification != "" && self.notification.text().length > 1) {
            bindEle(self.notification.text());
            removeSuggestPopEnableBtns($(this));
        }
    });

    // generate user input time validation
    /*
    * Valid time formats else show error message
    * character length 5
    * 00:00,
    * character length 4 to 1 (24 hours)
    * 0000, 000, 00, 0.
    */
    function generateUserInputTime (ele, val, notify) {
        var getHours;
        var getMinutes;
        var getTT;
        if (val.length > 8) {
            warningWithCurrentTime();
        }
        /*
        * character length 8
        * available valid times: 00:00_AA,
        */
        if (val.length > 5 && val.length < 9) {
            /*
            * character length 8
            * available valid times: 00:00_AA,
            */
            if (val.length == 8 && (val.substring(2, 3) == ":") && (val.substring(5, 6) == " ")) {
                getHours = val.split(":")[0];
                getMinutes = val.split(":")[1].split(" ")[0];
                getTT = val.split(" ")[1].toUpperCase();
                if (isNaN(getHours) || isNaN(getMinutes)) {
                    warningWithCurrentTime();
                } else {
                    removeSuggestPopEnableBtns(ele);
                    if (getHours > 12 && getHours < 25 && getMinutes < 60) {
                        getHours = getHours - 12;
                        if (getHours == 0) {
                            suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                        }
                    }
                    if (getHours > 24 || getMinutes > 59) {
                        warningWithCurrentTime();
                    }
                    if (!(getTT == "AM" || getTT == "PM")) {
                        warningWithCurrentTime();
                    }
                }
            }
            /*
            * character length 7
            * available valid times: 0:00_AA, 00:0_AA, 00:00_A, 0000_AA, 00:00AA 
            */
            // 0:00_AA, 00:0_AA, 00:00_A
            if (val.length == 7 && val.indexOf(":") > -1 && val.indexOf(" ") > -1) {
                console.log("7: " + val);
                getHours = val.split(":")[0];
                getMinutes = val.split(":")[1].split(" ")[0];
                getTT = val.split(" ")[1].toUpperCase();
                if (isNaN(getHours) || isNaN(getMinutes)) {
                    warningWithCurrentTime();
                } else {
                    if (getHours == 12 &&  getMinutes < 60) {
                        suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " " + getTT);
                    }
                    if (getHours < 12 && getMinutes < 60) {
                        suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " " + getTT);
                    }
                    if (getHours > 12 && getHours < 25 && getMinutes < 60) {
                        getHours = getHours - 12;
                        if (getHours == 0) {
                            suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                        }
                    }
                    if (getHours > 24 || getMinutes > 59) {
                        warningWithCurrentTime();
                    }
                    if (!(getTT == "A" || getTT == "P" || getTT == "AM" || getTT == "PM")) {
                        warningWithCurrentTime();
                    } else {
                        if (getTT == "A") {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " AM");
                        }
                        if (getTT == "P") {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                        }
                    }
                }
            }
            // 00:00AA
            if (val.length == 7 && val.indexOf(":") > -1 && !(val.indexOf(" ") > -1)) {
                getHours = val.split(":")[0];
                getMinutes = val.split(":")[1].substring(0, 2);
                getTT = val.split(":")[1].substring(2, 4).toUpperCase();
                if (isNaN(getHours) || isNaN(getMinutes)) {
                    warningWithCurrentTime();
                } else {
                    removeSuggestPopEnableBtns(ele);
                    if (getHours > 12 && getHours < 25 && getMinutes < 60) {
                        getHours = getHours - 12;
                        if (getHours == 0) {
                            suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                        }
                    }
                    if (getHours > 24 || getMinutes > 59) {
                        warningWithCurrentTime();
                    }
                    if (!(getTT == "AM" || getTT == "PM")) {
                        warningWithCurrentTime();
                    } else {
                        suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " " + getTT);
                    }
                }
            }
            // 0000_AA
            if (val.length == 7 && !(val.indexOf(":") > -1) && (val.indexOf(" ") > -1)) {
                getHours = val.substring(0, 2);
                getMinutes = val.substring(2, 4);
                getTT = val.split(" ")[1];
                if (isNaN(getHours) || isNaN(getMinutes)) {
                    warningWithCurrentTime();
                } else {
                    removeSuggestPopEnableBtns(ele);
                    if (getHours < 13 && getMinutes < 60) {
                        suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " " +getTT);
                    }
                    if (getHours > 12 && getHours < 25 && getMinutes < 60) {
                        getHours = getHours - 12;
                        if (getHours == 12) {
                            suggestTimePopup(getHours + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                        }
                    }
                    if (getHours > 24 || getMinutes > 59) {
                        warningWithCurrentTime();
                    }
                    if (!(getTT == "AM" || getTT == "PM")) {
                        warningWithCurrentTime();
                    }
                }
            }
            /*
            * character length 6
            * 00:00_,0:00_A, 00:0_A, 00:00A, 0:00AA, 00:0AA
            */
            // 00:00_, 0:00_A, 00:0_A
            if (val.length == 6 && (val.indexOf(":") > -1) && (val.indexOf(" ") > -1)) {
                console.log("6: " + val);
                getHours = val.split(":")[0];
                getMinutes = val.split(":")[1].split(" ")[0];
                getTT = val.split(" ")[1].toUpperCase();
                if (isNaN(getHours) || isNaN(getMinutes)) {
                    warningWithCurrentTime();
                } else {
                    if (getHours == "00" &&  getMinutes < 60) {
                        suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                    }
                    if (getHours == 12 &&  getMinutes < 60) {
                        suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " AM");
                    }
                    if (getHours < 12 && getMinutes < 60) {
                        if (getHours == "00") {
                            suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " AM");
                        }
                    }
                    if (getHours > 12 && getHours < 25 && getMinutes < 60) {
                        getHours = getHours - 12;
                        if (getHours == 0) {
                            suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                        }
                    }
                    if (getHours > 24 || getMinutes > 59) {
                        warningWithCurrentTime();
                    }
                    if (!(getTT == "")) {
                        if (!(getTT == "A" || getTT == "P")) {
                            warningWithCurrentTime();
                        } else {
                            if (getTT == "A") {
                                suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " AM");
                            }
                            if (getTT == "P") {
                                suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                            }
                        }
                    }
                }
            }
            // 00:00A, 0:00AA, 00:0AA
            if (val.length == 6 && (val.indexOf(":") > -1) && !(val.indexOf(" ") > -1)) {
                getHours = val.split(":")[0];
                getMinutes = val.split(":")[1].substring(0, 2);
                if (isNaN(getMinutes)) {
                    getMinutes = val.split(":")[1].substring(0, 1);
                    getTT = val.split(":")[1].substring(1, 2).toUpperCase();
                } else {
                    getMinutes = val.split(":")[1].substring(0, 2);
                    getTT = val.split(":")[1].substring(2, 4).toUpperCase();
                }
                if (isNaN(getHours) || isNaN(getMinutes)) {
                    warningWithCurrentTime();
                } else {
                    if (getHours == "00" &&  getMinutes < 60) {
                        suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                    }
                    if (getHours == 12 &&  getMinutes < 60) {
                        suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                    }
                    if (getHours < 12 && getMinutes < 60) {
                        if (getHours == "00") {
                            suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " AM");
                        }
                    }
                    if (getHours > 12 && getHours < 25 && getMinutes < 60) {
                        getHours = getHours - 12;
                        if (getHours == 0) {
                            suggestTimePopup("12" + ":" + leadingZeros(getMinutes) + " AM");
                        } else {
                            suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                        }
                    }
                    if (getHours > 24 || getMinutes > 59) {
                        warningWithCurrentTime();
                    }
                    if (!(getTT == "")) {
                        if (!(getTT == "A" || getTT == "P" || getTT == "AM" || getTT == "PM")) {
                            warningWithCurrentTime();
                        } else {
                            if (getTT == "A" || getTT == "AM") {
                                suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " AM");
                            }
                            if (getTT == "P" || getTT == "PM") {
                                suggestTimePopup(leadingZeros(getHours) + ":" + leadingZeros(getMinutes) + " PM");
                            }
                        }
                    }
                }
            }
        }
        /*
        * do not allow space allow numbers and one : only.
        * character length 5
        * 00:00, exceptions are: 0:00A, 00:0A, 0:0AA, 00:AA, 0:0_A, 
        * character length 4
        * 0000, 00:0, 0:00, exceptions are: 0:0A, 0:AA, 
        * character length 3
        * 000, 00:0, 0:0, exceptions are: 0:A, 0AA,
        * character length 2
        * 00, 0:
        * character length 1
        * 0
        */
        if (val.length > 0 && val.length <= 5 && !(val.indexOf(" ") > -1)) {
            // 5 characters length then validation.
            // 24 hours
            console.log(val);
        }
    }
}

$(document).ready(function () {
    var viewModel = function () {
        var self = this;
        self.defalutSpinnerTime = "14:00";
        self.backendKeyOne = ko.observable(self.defalutSpinnerTime);
        self.backendKeyTwo = ko.observable(self.defalutSpinnerTime);
        self.backendKeyThree = ko.observable(self.defalutSpinnerTime);
        self.backendKeyFour = ko.observable(self.defalutSpinnerTime);
        self.backendKeyFive = ko.observable(self.defalutSpinnerTime);
        self.backendKeySix = ko.observable(self.defalutSpinnerTime);
        self.backendKeySeven = ko.observable(self.defalutSpinnerTime);
        self.backendKeyEight = ko.observable(self.defalutSpinnerTime);
        self.backendKeyNine = ko.observable(self.defalutSpinnerTime);
        self.backendKeyTen = ko.observable(self.defalutSpinnerTime);
        // time format is 0 means 12 hours, 1 means 24 hours
        self.systemTimeTwelveHours = true;
        self.systemTimeTwentyFourHours = false;
        setTimeout(function () {
            self.inputTime1 = new timeSpinner(self, '#spinner1', self.systemTimeTwelveHours, self.backendKeyOne);
            self.inputTime2 = new timeSpinner(self, '#spinner2', self.systemTimeTwelveHours, self.backendKeyTwo);
            self.inputTime3 = new timeSpinner(self, '#spinner3', self.systemTimeTwelveHours, self.backendKeyThree);
            self.inputTime4 = new timeSpinner(self, '#spinner4', self.systemTimeTwelveHours, self.backendKeyFour);
            self.inputTime5 = new timeSpinner(self, '#spinner5', self.systemTimeTwelveHours, self.backendKeyFive);
            self.inputTime6 = new timeSpinner(self, '#spinner6', self.systemTimeTwentyFourHours, self.backendKeySix);
            self.inputTime7 = new timeSpinner(self, '#spinner7', self.systemTimeTwentyFourHours, self.backendKeySeven);
            self.inputTime8 = new timeSpinner(self, '#spinner8', self.systemTimeTwentyFourHours, self.backendKeyEight);
            self.inputTime9 = new timeSpinner(self, '#spinner9', self.systemTimeTwentyFourHours, self.backendKeyNine);
            self.inputTime10 = new timeSpinner(self, '#spinner10', self.systemTimeTwentyFourHours, self.backendKeyTen);
        }, 100);
    };

    ko.applyBindings(viewModel);
});
