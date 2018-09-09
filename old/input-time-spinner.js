$(document).ready(function () {
    var defaultInputTime = '14:00';
    var viewModel = function () {
        var incBtn = $('#spinner_input_time_inc_btn');
        var decBtn = $('#spinner_input_time_dec_btn');
        var inputTime = $('#spinner_input_time');
        var timeNotifyMsg = $('#spinner_input_time_notifier');
        var date = new Date();
        var hours = false;
        var getUserInputTimeValue;
        var twoFourHours = true;
        var oneTwoHours = false;
        var timeout = null;
        var self = this;
        self.inputTime = ko.observable(defaultInputTime);

        // leading zeros
        function leadingZeros(time) {
            if (time < 10) {
                time = '0' + time;
            }
            return time;
        }

        // increase/decrease hours and minutes
        incBtn.on('click', function () {
            incDate();
        });
        decBtn.on('click', function () {
            decDate();
        });
        
        // focus
        inputTime.focus(function () {
            inputTime.on('mouseup click', function () {
                if (this.selectionStart < 3) {
                    hours = true;
                } else {
                    hours = false;
                }
            });
        });
        // increase/decrease hours and minutes when you keyup & keydown
        inputTime.keyup(function (event) {
            if (event.which == 38) {
                incDate();
            }
            if (event.which == 40) {
                decDate();
            }
            if (event.which == 37 || event.which == 39) {
                if (this.selectionEnd < 3) {
                    hours = true;
                } else {
                    hours = false;
                }
            }
        });

        // increase hours/minutes
        function incDate() {
            var getHours = inputTime.val().split(':')[0];
            var getMinutes = inputTime.val().split(':').pop();
            if (hours) {
                if (getHours < 23) {
                    self.inputTime(leadingZeros(Number(getHours) + 1) + ':' + getMinutes);
                } else {
                    self.inputTime('00' + ':' + getMinutes);
                }
            } else {
                if (getMinutes < 59) {
                    self.inputTime(getHours + ':' + leadingZeros(Number(getMinutes) + 1));
                } else {
                    self.inputTime(getHours + ':' + '00');
                }
            }
        }
        // decrease hours/minutes
        function decDate() {
            var getHours = inputTime.val().split(':')[0];
            var getMinutes = inputTime.val().split(':').pop();
            if (hours) {
                if (getHours <= 23 && getHours != '00') {
                    self.inputTime(leadingZeros(Number(getHours) - 1) + ':' + getMinutes);
                } else {
                    self.inputTime('23' + ':' + getMinutes);
                }
            } else {
                if (getMinutes <= 59 && getMinutes != '00') {
                    self.inputTime(getHours + ':' + leadingZeros(Number(getMinutes) - 1));
                } else {
                    self.inputTime(getHours + ':' + '59');
                }
            }
        }

        /*
        * user manually entered input time format validations
        */
    
        // warning
        function warningWidthCurrentDate() {
            timeNotifyMsg.html(leadingZeros(date.getHours()) + ':' + leadingZeros(date.getMinutes()) + "<span class='warning-icon'></span>");
            $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", true);
        }
    
        // time suggest popup
        function suggestTimePopup(suggestedTime) {
            timeNotifyMsg.html('');
            timeNotifyMsg.text(suggestedTime);
        }

        // apply suggest popup time
        timeNotifyMsg.on('click', function () {
            self.inputTime($(this).text());
            timeNotifyMsg.html('');
            $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
        });

        inputTime.on('keyup', function () {
            getUserInputTimeValue = inputTime.val();
            // Clear the timeout if it has already been set.
            // This will prevent the previous task from executing
            // if it has been less than <MILLISECONDS>
            clearTimeout(timeout);
            // Make a new timeout set to go off in 800ms
            timeout = setTimeout(function () {
                if (getUserInputTimeValue.length == 0) {
                    warningWidthCurrentDate();
                } else if (getUserInputTimeValue.length <= 5) {
                    var getHours;
                    var getMinutes;
                    if ((getUserInputTimeValue.length == 5) && (getUserInputTimeValue.indexOf(':') > - 1) && (getUserInputTimeValue.substring(2, 3) == ':')) {
                        timeNotifyMsg.html('');
                        $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
                        getHours = getUserInputTimeValue.substring(0,2);
                        getMinutes = getUserInputTimeValue.substring(3);
                        if (getHours < 24 && getMinutes < 60) {
                            self.inputTime(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    } else {
                        if (getUserInputTimeValue.length < 5) {
                            generateTime(getUserInputTimeValue);
                        }
                    }
                } else {
                    warningWidthCurrentDate();
                }
            }, 250);
        }).blur(function () {
            if (timeNotifyMsg.text().length > 1) {
                self.inputTime(timeNotifyMsg.text());
                timeNotifyMsg.html('');
                $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
            }
        });

        // generate and validate user time function
        function generateTime (userinput) {
            var userInput = userinput;
            var getHours;
            var getMinutes;
            if (! (userInput.indexOf(':') > -1)) {
                timeNotifyMsg.html('');
                if (userInput.length == 4) {
                    console.log('length 4');
                    getHours = userInput.substring(0,2);
                    getMinutes = userInput.substring(2);
                    if (getHours < 24 && getMinutes < 60) {
                        suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                    } else {
                        warningWidthCurrentDate();
                    }
                }
                if (userInput.length == 3) {
                    console.log('length 3');
                    getHours = userInput.substring(0,2);
                    getMinutes = userInput.substring(2);
                    if (getHours < 24) {
                        suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                    } else {
                        getHours = userInput.substring(0,1);
                        getMinutes = userInput.substring(1);
                        if (getMinutes < 60) {
                            suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    }
                }
                if (userInput.length == 2) {
                    getHours = userInput.substring(0,2);
                    if (getHours < 24) {
                        suggestTimePopup(leadingZeros(Number(getHours)) + ':' + '00');
                    } else {
                        getHours = userInput.substring(0,1);
                        getMinutes = userInput.substring(1);
                        if (getMinutes < 60) {
                            suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    }
                }
                if (userInput.length == 1) {
                    getHours = userInput.substring(0,1);
                    suggestTimePopup(leadingZeros(Number(getHours)) + ':' + '00');
                }
            } else {
                if ((userInput.substring(0, 1) == ':') || (userInput.substring(3, 4) == ':')) {
                    warningWidthCurrentDate();
                } else if ((userInput.length == 2) && (userInput.substring(1, 2) == ':')) {
                    getHours = userInput.substring(0, 1);
                    suggestTimePopup(leadingZeros(Number(getHours)) + ':' + '00')
                } else { //if (userInput.length <= 4) 
                    if (userInput.substring(1, 2) == ':') {
                        getHours = userInput.substring(0, 1);
                        getMinutes = userInput.substring(2);
                        if (getMinutes < 60) {
                            suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    }
                    if (userInput.substring(2, 3) == ':') {
                        getHours = userInput.substring(0, 2);
                        getMinutes = userInput.substring(3);
                        if (getHours < 24) {
                            suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    }
                }
            }
        }
    };
    
    ko.applyBindings(viewModel);
});
