function timeSpinner (parent, ele, bindEle) {
	// variables
    self.incBtn = $(ele).next().find('.spinner-input-time-inc-btn');
    self.decBtn = $(ele).next().find('.spinner-input-time-dec-btn');
    self.hoursCaret = false;
    self.amPmCaret = false;

    if (parent.userTimeFormat() == 0) {
    	console.log('12 hours');
        twelveHours();
    } else {
    	console.log('24 hours');
    	twentyFourHours();
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
    // twenty four hours default setup
    function twentyFourHours () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':').pop();
        if (getHours < 24 && getHours != '00' && getMinutes < 60) {
            $(ele).val(leadingZeros(Number(getHours)) + ':' + getMinutes);
        } else {
            console.log('error')
        }
    }

    // increase hours and minutes
    self.incBtn.unbind().click(function () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        updateIncreamentTime(getHours, getMinutes);
    });

    // focus
    $(ele).on('focus click', function () {
        // $(ele).on('mouseup ', function () {
        // });
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
    // $(ele).keyup(function (event) {
    //     if (event.which == 38) {
    //         incTime();
    //     }
    //     if (event.which == 40) {
    //         decTime();
    //     }
    //     if (event.which == 37 || event.which == 39) {
    //         if (this.selectionEnd < 3) {
    //             hoursCaret = true;
    //             amPmCaret = false;
    //         } else if (this.selectionStart > 3 && this.selectionStart < 6) {
    //             hoursCaret = false;
    //             amPmCaret = false;
    //         } else {
    //             amPmCaret = true;
    //             console.log('am pm caret true');
    //         }
    //     }
    // });

    // decrease hours and minutes
    self.decBtn.unbind().click(function () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        updateDecreamentTime(getHours, getMinutes);
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
    	if (parent.userTimeFormat() == 0 && getMinutes.length > 2) {
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
    		// 24 hours code
    		// am/pm carots
    		// hours
    		// minutes
    	}
        // self.parent.ReleaseConditionTime($(ele).val());
    }

    function updateDecreamentTime(getHours, getMinutes) {
    	if (parent.userTimeFormat() == 0 && getMinutes.length > 2) {
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
    		// am/pm carets
    		// hours
    		// minutes
    	}
        // self.parent.ReleaseConditionTime($(ele).val());
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
		// time format is 0 means 12 hours, 1 means 24 hours
		self.userTimeFormat = ko.observable(1);
		// self.selectDropdown = $('#set_time_format');
		// self.selectDropdown.one('change', function () {
		// 	if ($(this).val() != 0) {
		// 		self.userTimeFormat(1);
		// 		console.log('not equal to 0');
		// 	} else {
		// 		self.userTimeFormat(0);
		// 		console.log('equal to 0');
		// 	}
		// });
		setTimeout(function () {
			self.inputTime1 = new timeSpinner(self, '#spinner1', self.backendKeyOne);
			self.inputTime2 = new timeSpinner(self, '#spinner2', self.backendKeyTwo);
			self.inputTime3 = new timeSpinner(self, '#spinner3', self.backendKeyThree);
			self.inputTime4 = new timeSpinner(self, '#spinner4', self.backendKeyFour);
			self.inputTime5 = new timeSpinner(self, '#spinner5', self.backendKeyFive);
		}, 100);
	};

	ko.applyBindings(viewModel);
});