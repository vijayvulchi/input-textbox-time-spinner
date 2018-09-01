self.timeUpdate = ko.computed(self.inputTime);
        self.timeUpdate.subscribe(function (timeInput) {
            console.log(timeInput);
            var incBtn = $('#spinner_input_time_inc_btn');
            var decBtn = $('#spinner_input_time_dec_btn');
            var inputTime = $('#spinner_input_time');
            var date = new Date();
            var hours = false;
            var twoFourHours = true;
            var oneTwoHours = false;

            // leading zeros
            function leadingZeros(time) {
                if (time < 10) {
                    time = '0' + time;
                }
                return time;
            }
            
            // increase/decrease hours and minutes
            incBtn.on('click', function () {
                // incDate();
            });
            decBtn.on('click', function () {
                // decDate();
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
            
            // increase hours/minutes
            function incDate() {
                var getHours = inputTime.val().split(':')[0];
                var getMinutes = inputTime.val().split(':').pop();
                if (hours) {
                    if (getHours < 23) {
                        inputTime.val(leadingZeros(Number(getHours) + 1) + ':' + getMinutes);
                    } else {
                        inputTime.val('00' + ':' + getMinutes);
                    }
                } else {
                    if (getMinutes < 59) {
                        inputTime.val(getHours + ':' + leadingZeros(Number(getMinutes) + 1));
                    } else {
                        inputTime.val(getHours + ':' + '00');
                    }
                }
            }
            // decrease hours/minutes
            function decDate() {
                var getHours = inputTime.val().split(':')[0];
                var getMinutes = inputTime.val().split(':').pop();
                if (hours) {
                    if (getHours <= 23 && getHours != '00') {
                        inputTime.val(leadingZeros(Number(getHours) - 1) + ':' + getMinutes);
                    } else if (getHours == '00') {
                        inputTime.val(23 + ':' + getMinutes);
                    }
                } else {
                    if (getMinutes <= 59 && getMinutes != '00') {
                        inputTime.val(getHours + ':' + leadingZeros(Number(getMinutes) - 1));
                    } else if (getMinutes == '00') {
                        inputTime.val(getHours + ':' + 59);
                    }
                }
            }
        }, this);





// Init a timeout variable to be used below
    var timeout = null;
    inputTime.val(leadingZeros(date.getHours()) + ':' + leadingZeros(date.getMinutes()));

    function leadingZeros(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

    function incDate() {
        var getHours = inputTime.val().split(':')[0];
        var getMinutes = inputTime.val().split(':').pop();
        if (hours) {
            if (getHours < 23) {
                inputTime.val(leadingZeros(Number(getHours) + 1) + ':' + getMinutes);
            } else {
                inputTime.val('00' + ':' + getMinutes);
            }
        } else {
            if (getMinutes < 59) {
                inputTime.val(getHours + ':' + leadingZeros(Number(getMinutes) + 1));
            } else {
                inputTime.val(getHours + ':' + '00');
            }
        }
    }
    function decDate() {
        var getHours = inputTime.val().split(':')[0];
        var getMinutes = inputTime.val().split(':').pop();
        if (hours) {
            if (getHours <= 23 && getHours != '00') {
                inputTime.val(leadingZeros(Number(getHours) - 1) + ':' + getMinutes);
            } else if (getHours == '00') {
                inputTime.val(23 + ':' + getMinutes);
            }
        } else {
            if (getMinutes <= 59 && getMinutes != '00') {
                inputTime.val(getHours + ':' + leadingZeros(Number(getMinutes) - 1));
            } else if (getMinutes == '00') {
                inputTime.val(getHours + ':' + 59);
            }
        }
    }

    inputTime.focus(function () {
        inputTime.on('mouseup click', function () {
            if (this.selectionStart < 3) {
                hours = true;
            } else {
                hours = false;
            }
        });
    });

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

    incBtn.on('click', function () {
        incDate();
    });
    decBtn.on('click', function () {
        decDate();
    });

    timeNotifyMsg.on('click', function () {
        inputTime.val($(this).text());
        $(this).text('').removeClass('active');
        $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
    });

    // warning
    function warningWidthCurrentDate() {
        timeNotifyMsg.html(leadingZeros(date.getHours()) + ':' + leadingZeros(date.getMinutes()) + "<span class='warning-icon'></span>");
        timeNotifyMsg.addClass('active');
        $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", true);
    }

    // popup time help
    function suggestTimePopup(suggestedTime) {
        timeNotifyMsg.html('');
        timeNotifyMsg.text(suggestedTime);
    }

    inputTime.on('keyup', function (e) {
        getInputTimeValue = inputTime.val();
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeout);
        // Make a new timeout set to go off in 800ms
        timeout = setTimeout(function () {
            if (getInputTimeValue.length > 5) {
                warningWidthCurrentDate();
            } else if (getInputTimeValue.length == 5) {
                timeNotifyMsg.html('');
                $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
            } else if (getInputTimeValue.length != 5) {
                $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
                if (getInputTimeValue.length == 0) {
                    warningWidthCurrentDate();
                } else if (getInputTimeValue.length <= 4 && (getInputTimeValue.substring(0) !== ':')) {
                    var hours = getInputTimeValue.substring(0, 2);
                    var minutes = getInputTimeValue.substring(2);
                    if (hours == 24 && getInputTimeValue.length < 3) {
                        suggestTimePopup('00' + ':' + '00');
                    } else if (hours < 24 && getInputTimeValue.length < 3) {
                        suggestTimePopup(leadingZeros(Number(hours)) + ':' + '00');
                    } else if (hours < 24 && getInputTimeValue.length > 2) {
                        hours = getInputTimeValue.substring(0, 2);
                        minutes = getInputTimeValue.substring(2);
                        if (minutes < 60) {
                            suggestTimePopup(leadingZeros(Number(hours)) + ':' + leadingZeros(Number(minutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    } else if (hours == 24 && getInputTimeValue.length > 2) {
                        minutes = getInputTimeValue.substring(2);
                        if (minutes < 60) {
                            suggestTimePopup('00' + ':' + leadingZeros(Number(minutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    } else if (hours > 24 && getInputTimeValue.length > 2) {
                        hours = getInputTimeValue.substring(0, 1);
                        minutes = getInputTimeValue.substring(1);
                        if (minutes < 60) {
                            suggestTimePopup(leadingZeros(Number(hours)) + ':' + leadingZeros(Number(minutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    } else if (hours > 24 && getInputTimeValue.length < 3) {
                        hours = getInputTimeValue.substring(0, 1);
                        minutes = getInputTimeValue.substring(1);
                        if (minutes < 60) {
                            suggestTimePopup(leadingZeros(Number(hours)) + ':' + leadingZeros(Number(minutes)));
                        } else {
                            warningWidthCurrentDate();
                        }
                    } else {
                        console.log('test');
                    }
                }
            }
        }, 250);
    }).blur(function () {
        if (timeNotifyMsg.text().length > 1) {
            inputTime.val(timeNotifyMsg.text());
            timeNotifyMsg.html('');
            $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
        }
    });