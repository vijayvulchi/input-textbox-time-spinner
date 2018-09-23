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
        if (time < 10) {
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

    // decreament hours/minutes
    function updateDecrementTime(getHours, getMinutes) {
        if (amPmCaret) {
            var splitMinutes = getMinutes.split(' ')[0];
            var splitAmPm = getMinutes.split(' ').pop();
            ampmCarets(getHours, splitMinutes, splitAmPm);
        }
        else if (hoursCaret) {
            // hours decrement
        } else {
            // minutes decrement
        }
    }

}

$(document).ready(function () {
	var viewModel = function () {
		var self = this;
	    self.defalutSpinnerTime = "23:00";
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