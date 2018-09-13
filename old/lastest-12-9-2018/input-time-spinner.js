function initializeTimeSpinner() {
    $.each($('.spinner-input-time'), function (key, element) {
        registerTimeSpinner(element);
    });
}

function registerTimeSpinner (ele) {
    var inputCurrentElement = ele;
    var defalutTimeSpinner = "14:00";
    timeUpDown(inputCurrentElement, defalutTimeSpinner);
}

function timeUpDown (ele, val) {
    // variables
    var incBtn = $(ele).next().find('.spinner-input-time-inc-btn');
    var decBtn = $(ele).next().find('.spinner-input-time-dec-btn');
    // default setting time for each input value.
    hoursCaret = false;
    amPmCaret = false;
    twelveHours = false;
    $(ele).val(val);

    twelveHours = true;
    if (twelveHours) {
        twelveHour();
    }

    // twelve hours default setup
    function twelveHour () {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':').pop();
        if (getHours == '00' ) {
            $(ele).val(leadingZeros(Number(getHours)) + ':' + getMinutes + ' ' + 'AM');
        } else if (getHours < 13) {
            $(ele).val(leadingZeros(Number(getHours)) + ':' + getMinutes + ' ' + 'AM');
        } else {
            $(ele).val(leadingZeros(Number(getHours) - 12) + ':' + getMinutes + ' ' + 'PM');
        }
    }

    // leading zeros
    function leadingZeros(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

    // increase/decrease hours and minutes
    incBtn.on('click', function () {
        incTime();
    });
    decBtn.on('click', function () {
        decTime();
    });

    // focus
    $(ele).focus(function () {
        $(ele).on('mouseup click', function () {
            if (this.selectionStart < 3) {
                hoursCaret = true;
                amPmCaret = false;
            } else if (this.selectionStart > 3 && this.selectionStart < 6) {
                hoursCaret = false;
                amPmCaret = false;
            } else {
                amPmCaret = true;
                console.log('am pm caret true');
            }
        });
    });

    // increase/decrease hours and minutes when you keyup & keydown
    $(ele).keyup(function (event) {
        if (event.which == 38) {
            incTime();
        }
        if (event.which == 40) {
            decTime();
        }
        if (event.which == 37 || event.which == 39) {
            if (this.selectionEnd < 3) {
                hours = true;
                amPmCaret = false;
            } else if (this.selectionStart > 3 && this.selectionStart < 6) {
                hours = false;
                amPmCaret = false;
            } else {
                amPmCaret = true;
                console.log('am pm caret true');
            }
        }
    });

    // increase hours/minutes
    function incTime() {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        if (twelveHours) {
            var splitMinutes = getMinutes.split(' ')[0];
            var splitAmPm = getMinutes.split(' ').pop();
            if (hoursCaret) {
                if (getHours < 12) {
                    $(ele).val(leadingZeros(Number(getHours) + 1) + ':' + splitMinutes + ' ' + splitAmPm);
                } else {
                    $(ele).val(leadingZeros(Number(getHours) - 12) + ':' + splitMinutes + ' ' + splitAmPm);
                }
            } else {
               if (splitMinutes < 59) {
                    $(ele).val(getHours + ':' + (leadingZeros(Number(splitMinutes) + 1) + ' ' + splitAmPm));
                } else {
                    if (getHours < 23) {
                        $(ele).val(leadingZeros(Number(getHours) + 1) + ':' + '00' + ' ' + splitAmPm);
                    } else {
                        $(ele).val('00' + ':' + '00' + ' ' + splitAmPm);
                    }
                } 
            }
        } else {
            if (hoursCaret) {
                if (getHours < 23) {
                    $(ele).val(leadingZeros(Number(getHours) + 1) + ':' + getMinutes);
                } else {
                    $(ele).val('00' + ':' + getMinutes);
                }
            } else {
                if (getMinutes < 59) {
                    $(ele).val(getHours + ':' + leadingZeros(Number(getMinutes) + 1));
                } else {
                    if (getHours < 23) {
                        $(ele).val(leadingZeros(Number(getHours) + 1) + ':' + '00');
                    } else {
                        $(ele).val('00' + ':' + '00');
                    }
                }
            }
        }
        // self.parent.ReleaseConditionTime($(ele).val());
    }

    // decrease hours/minutes
    function decTime() {
        var getHours = $(ele).val().split(':')[0];
        var getMinutes = $(ele).val().split(':')[1];
        if (twelveHours) {
            var splitMinutes = getMinutes.split(' ')[0];
            var splitAmPm = getMinutes.split(' ').pop();
            if (hoursCaret) {
                if (getHours <= 12 && getHours != '00') {
                    $(ele).val(leadingZeros(Number(getHours) - 1) + ':' + splitMinutes + ' ' + splitAmPm);
                } else {
                    $(ele).val(leadingZeros(Number(getHours) + 12) + ':' + splitMinutes + ' ' + splitAmPm);
                }
            } else {
               if (splitMinutes <= 59 && splitMinutes != '00') {
                    $(ele).val(getHours + ':' + (leadingZeros(Number(splitMinutes) - 1) + ' ' + splitAmPm));
                } else {
                    if (getHours < 23 && getHours != '00') {
                        $(ele).val(leadingZeros(Number(getHours) - 1) + ':' + '59' + ' ' + splitAmPm);
                    } else {
                        $(ele).val('23' + ':' + '59' + ' ' + splitAmPm);
                    }
                } 
            }
        } else {
            if (hoursCaret) {
                if (getHours <= 23 && getHours != '00') {
                    $(ele).val(leadingZeros(Number(getHours) - 1) + ':' + getMinutes);
                } else {
                    $(ele).val('23' + ':' + getMinutes);
                }
            } else {
                if (getMinutes <= 59 && getMinutes != '00') {
                    $(ele).val(getHours + ':' + leadingZeros(Number(getMinutes) - 1));
                } else {
                    if (getHours < 23 && getHours != '00') {
                        $(ele).val(leadingZeros(Number(getHours) - 1) + ':' + '59');
                    } else {
                        $(ele).val('23' + ':' + '59');
                    }
                }
            }
        }
        // self.parent.ReleaseConditionTime($(ele).val());
    }
}

initializeTimeSpinner();