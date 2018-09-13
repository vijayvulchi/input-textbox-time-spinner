function timeSpinner (parent, ele, userTimeFormat, bindEle) {
	// variables
    self.incBtn = $(ele).next().find('.spinner-input-time-inc-btn');
    self.decBtn = $(ele).next().find('.spinner-input-time-dec-btn');
    self.notification = $(ele).parent().find('.spinner-input-time-notifier');
    self.hoursCaret = false;
    self.amPmCaret = false;

    if (userTimeFormat == 0) {
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
            bindEle(leadingZeros(Number(getHours)) + ':' + getMinutes + ' ' + 'AM');
        } else if (getHours < 13) {
            bindEle(leadingZeros(Number(getHours)) + ':' + getMinutes + ' ' + 'AM');
        } else {
            bindEle(leadingZeros(Number(getHours) - 12) + ':' + getMinutes + ' ' + 'PM');
        }
    }

    // increase hours and minutes
    self.incBtn.unbind().click(function () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        updateIncreamentTime(getHours, getMinutes);
    });

    // decrease hours and minutes
    self.decBtn.unbind().click(function () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        updateDecreamentTime(getHours, getMinutes);
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

    // increase/decrease hours and minutes
    // when you keyup & keydown
    $(ele).keyup(function (event) {
        if (event.which == 38) {
	        var getHours = $(ele).val().split(':')[0];
	        var getMinutes = $(ele).val().split(':')[1];
	        updateIncreamentTime(getHours, getMinutes);
        }
        if (event.which == 40) {
	        var getHours = $(ele).val().split(':')[0];
	        var getMinutes = $(ele).val().split(':')[1];
	        updateDecreamentTime(getHours, getMinutes);
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

    function ampmCarets (getHours, getMinutes, tt) {
    	if (tt === 'AM') {
			bindEle(getHours + ':' + getMinutes + ' ' + 'PM');
    	} else {
			bindEle(getHours + ':' + getMinutes + ' ' + 'AM');
    	}
    }

    // increase hours/minutes
    function updateIncreamentTime(getHours, getMinutes) {
    	if (userTimeFormat == 0 && getMinutes.length > 2) {
    		// 12 hours code
    		var splitMinutes = getMinutes.split(' ')[0];
            var splitAmPm = getMinutes.split(' ').pop();
            // am/pm carets
            if (amPmCaret) {
            	ampmCarets(getHours, splitMinutes, splitAmPm);
            } else if (hoursCaret) {
            	// hours
            	if (getHours < 12) {
                    bindEle(leadingZeros(Number(getHours) + 1) + ':' + splitMinutes + ' ' + splitAmPm);
                } else {
                    bindEle(leadingZeros(Number(getHours) - 12) + ':' + splitMinutes + ' ' + splitAmPm);
                }
            } else {
	    		// minutes
	    		if (splitMinutes < 59) {
					bindEle(getHours + ':' + (leadingZeros(Number(splitMinutes) + 1) + ' ' + splitAmPm));
	    		} else {
	    			if (getHours < 12) {
						bindEle(leadingZeros(Number(getHours) + 1) + ':' + '00' + ' ' + splitAmPm);
	    			} else {
	    				bindEle('01' + ':' + '00' + ' ' + splitAmPm);	
	    			}
	    		}
            }
    	} else {
    		if (hoursCaret) {
                if (getHours < 23) {
                    bindEle(leadingZeros(Number(getHours) + 1) + ':' + getMinutes);
                } else {
                    bindEle('00' + ':' + getMinutes);
                }
            } else {
    			// minutes
                if (getMinutes < 59) {
                    bindEle(getHours + ':' + leadingZeros(Number(getMinutes) + 1));
                } else {
                    if (getHours < 23) {
                        bindEle(leadingZeros(Number(getHours) + 1) + ':' + '00');
                    } else {
                        bindEle('00' + ':' + '00');
                    }
                }
            }
    	}
    }

	// decreament hours/minutes
    function updateDecreamentTime(getHours, getMinutes) {
    	if (userTimeFormat == 0 && getMinutes.length > 2) {
    		// 12 hours code
    		var splitMinutes = getMinutes.split(' ')[0];
            var splitAmPm = getMinutes.split(' ').pop();
            // am/pm carets
            if (amPmCaret) {
            	ampmCarets(getHours, splitMinutes, splitAmPm);
            } else if (hoursCaret) {
				// hours
				if (getHours <= 12 && getHours != '00') {
                    bindEle(leadingZeros(Number(getHours) - 1) + ':' + splitMinutes + ' ' + splitAmPm);
                } else {
                    bindEle(leadingZeros(Number(getHours) + 12) + ':' + splitMinutes + ' ' + splitAmPm);
                }
            } else {
	    		// minutes
	    		if (splitMinutes <= 59 && splitMinutes != '00') {
					bindEle(getHours + ':' + (leadingZeros(Number(splitMinutes) - 1) + ' ' + splitAmPm));
	    		} else {
	    			if (getHours < 13 && getHours != '00') {
						bindEle(leadingZeros(Number(getHours) - 1) + ':' + '59' + ' ' + splitAmPm);
	    			} else {
	    				bindEle('12' + ':' + '59' + ' ' + splitAmPm);	
	    			}
	    		}
            }
    	} else {
    		// 24 hours code
    		if (hoursCaret) {
                if (getHours <= 23 && getHours != '00') {
                    bindEle(leadingZeros(Number(getHours) - 1) + ':' + getMinutes);
                } else {
                    bindEle('23' + ':' + getMinutes);
                }
            } else {
                if (getMinutes <= 59 && getMinutes != '00') {
                    bindEle(getHours + ':' + leadingZeros(Number(getMinutes) - 1));
                } else {
                    if (getHours < 23 && getHours != '00') {
                        bindEle(leadingZeros(Number(getHours) - 1) + ':' + '59');
                    } else {
                        bindEle('23' + ':' + '59');
                    }
                }
            }
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
		setTimeout(function () {
			self.inputTime1 = new timeSpinner(self, '#spinner1', 0, self.backendKeyOne);
			self.inputTime2 = new timeSpinner(self, '#spinner2', 0, self.backendKeyTwo);
			self.inputTime3 = new timeSpinner(self, '#spinner3', 0, self.backendKeyThree);
			self.inputTime4 = new timeSpinner(self, '#spinner4', 0, self.backendKeyFour);
			self.inputTime5 = new timeSpinner(self, '#spinner5', 0, self.backendKeyFive);
			self.inputTime6 = new timeSpinner(self, '#spinner6', 1, self.backendKeySix);
			self.inputTime7 = new timeSpinner(self, '#spinner7', 1, self.backendKeySeven);
			self.inputTime8 = new timeSpinner(self, '#spinner8', 1, self.backendKeyEight);
			self.inputTime9 = new timeSpinner(self, '#spinner9', 1, self.backendKeyNine);
			self.inputTime10 = new timeSpinner(self, '#spinner10', 1, self.backendKeyTen);
		}, 100);
	};

	ko.applyBindings(viewModel);
});