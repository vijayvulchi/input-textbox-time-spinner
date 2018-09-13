$(document).ready(function () {
  // function InitializeSpinner() {
  //   $.each($('.spinner'), function (key, element) {
  //       RegisterSpinner(element);
  //   });    
  // }
  function timeSpinnerViewModel(parent, element, value) {
    // element (root), value (default value)
    //$(element).siblings('.ui-spinner-up').addClass('disable-spinner-btn');
    //$(element).siblings('.ui-spinner-down').removeClass('disable-spinner-btn');
    var incBtn = $('#spinner_input_time_inc_btn');
    var decBtn = $('#spinner_input_time_dec_btn');
    var inputTime = $('#spinner_input_time');
    var timeNotifyMsg = $('#spinner_input_time_notifier');
    var date = new Date();
    var hours = false;
    var getUserInputTimeValue;
    var timeout = null;
    var self = this;
    self.parent = parent;
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
              if (getHours < 23) {
                  self.inputTime(leadingZeros(Number(getHours) + 1) + ':' + '00');
              } else {
                  self.inputTime('00' + ':' + '00');
              }
          }
      }

        self.parent.ReleaseConditionTime(self.inputTime());
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
                if (getHours < 23 && getHours != '00') {
                    self.inputTime(leadingZeros(Number(getHours) - 1) + ':' + '59');
                } else {
                    self.inputTime('23' + ':' + '59');
                }
            }
        }

        self.parent.ReleaseConditionTime(self.inputTime());
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
                if ((getUserInputTimeValue.length == 5) && (getUserInputTimeValue.indexOf(':') > -1) && (getUserInputTimeValue.substring(2, 3) == ':')) {
                    timeNotifyMsg.html('');
                    $('#spinner_input_time_dec_btn, #spinner_input_time_inc_btn').prop("disabled", false);
                    getHours = getUserInputTimeValue.substring(0, 2);
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
        self.parent.ReleaseConditionTime(self.inputTime());
    });

    // generate and validate user time function
    function generateTime(userinput) {
        var userInput = userinput;
        var getHours;
        var getMinutes;
        if (!(userInput.indexOf(':') > -1)) {
            timeNotifyMsg.html('');
            if (userInput.length == 4) {
                console.log('length 4');
                getHours = userInput.substring(0, 2);
                getMinutes = userInput.substring(2);
                if (getHours < 24 && getMinutes < 60) {
                    suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                } else {
                    warningWidthCurrentDate();
                }
            }
            if (userInput.length == 3) {
                console.log('length 3');
                getHours = userInput.substring(0, 2);
                getMinutes = userInput.substring(2);
                if (getHours < 24) {
                    suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                } else {
                    getHours = userInput.substring(0, 1);
                    getMinutes = userInput.substring(1);
                    if (getMinutes < 60) {
                        suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                    } else {
                        warningWidthCurrentDate();
                    }
                }
            }
            if (userInput.length == 2) {
                getHours = userInput.substring(0, 2);
                if (getHours < 24) {
                    suggestTimePopup(leadingZeros(Number(getHours)) + ':' + '00');
                } else {
                    getHours = userInput.substring(0, 1);
                    getMinutes = userInput.substring(1);
                    if (getMinutes < 60) {
                        suggestTimePopup(leadingZeros(Number(getHours)) + ':' + leadingZeros(Number(getMinutes)));
                    } else {
                        warningWidthCurrentDate();
                    }
                }
            }
            if (userInput.length == 1) {
                getHours = userInput.substring(0, 1);
                suggestTimePopup(leadingZeros(Number(getHours)) + ':' + '00');
            }
        } else {
            if ((userInput.substring(0, 1) == ':') || (userInput.substring(3, 4) == ':')) {
                warningWidthCurrentDate();
            } else if ((userInput.length == 2) && (userInput.substring(1, 2) == ':')) {
                getHours = userInput.substring(0, 1);
                suggestTimePopup(leadingZeros(Number(getHours)) + ':' + '00')
            } else {
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
  // knockoutjs code
  var self = this;
  self.ReleaseConditionTime = ko.observable();
  self.defaultInputTime = '14:00';
  self.inputTimeSpinner = new timeSpinnerViewModel(self, inputElement, defaultInputTime);
  //self.inputTimeSpinner = new timeSpinnerViewModel(self);
  // self.TimeSpinner = ko.computed({
  //   read: function () {
  //     return self.inputTimeSpinner.inputTime();
  //   },
  //   write: function (value) {
  //     self.ReleaseConditionTime(value);
  //     self.inputTimeSpinner.inputTime(value);
  //   },
  //   owner: this
  // });
});


/*

function InitializeSpinner() {
    $.each($('.spinner'), function (key, element) {
        RegisterSpinner(element);
    });    
}
function ApplyUpDownStyle(element,value) {    
    value = parseFloat(value);
    min = Number(element.min); //Number($(this).customspinner('option', 'min'));
    max = Number(element.max); //Number($(this).customspinner('option', 'max'));
    isdecimal = $(element).customspinner('option', 'isdecimal');
    if (!isdecimal) value = parseInt(value);
    else value = parseFloat(value);
    if (value >= max) {
        $(element).siblings('.ui-spinner-up').addClass('disable-spinner-btn');
        $(element).siblings('.ui-spinner-down').removeClass('disable-spinner-btn');
    }
    else if (value <= min) {
        $(element).siblings('.ui-spinner-down').addClass('disable-spinner-btn');
        $(element).siblings('.ui-spinner-up').removeClass('disable-spinner-btn');
    }
    else {
        if (!$(element).closest('.ui-spinner').hasClass('focus')) {
            $(element).siblings('.ui-spinner-down, .ui-spinner-up').removeClass('disable-spinner-btn');
            $(element).closest('.ui-spinner').removeClass('focus');
        }
        else $(element).siblings('.ui-spinner-down, .ui-spinner-up').removeClass('disable-spinner-btn');
    }
    if (Number(value) > 999 && regionalunit == "mm" && isdecimal) {
        $(element).removeClass("ui-spinner-3digit");
        $(element).addClass("ui-spinner-4digit");
    }
    else if (Number(value) > 99 && regionalunit == "mm" && isdecimal) {
        $(element).removeClass("ui-spinner-4digit");
        $(element).addClass("ui-spinner-3digit");
    }
}
function RegisterSpinner(element) {
    regionalunit = $("#GlobalRegionalUnits").val() == "Inches" ? "in" : "mm";
    numberFormat = $("#NumberFormat").val();
    $.widget("ui.customspinner", $.ui.spinner, {
        widgetEventPrefix: $.ui.spinner.prototype.widgetEventPrefix,
        _buttonHtml: function () { // Remove arrows on the buttons
            var unitprefix = this.element.attr("unitprefix");
            if (unitprefix != undefined && unitprefix != null && unitprefix != "")
                regionalunit = unitprefix;            
            var mesclass = regionalunit == "mm" ? "spinner-mes-mm-block" : "spinner-mes-in-block";
            return "" +
            "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +
              "<span class='ui-icon " + this.options.icons.down + "'></span>" +
            "</a>" +
            "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" +
              "<span class='ui-icon " + this.options.icons.up + "'></span>" +
            "</a>" + (this.element.attr("ismeasurement") == "true" ?
            "<span class='" + mesclass + "'>" + regionalunit + "</span>" : "");
            if (regionalunit == "mm") $(this.element).css("padding", "6px 25px");
        }
    });

    var elementvalue = element.value == "" ? Number(element.min) : Number(element.value);
    var decimalplaces = element.attributes.decimalplaces != undefined ? Number(element.attributes.decimalplaces.value) : 0;
    var stepvalue = (element.step == undefined || element.step == "" || element.step == null) ? 1 : Number(element.step);
    var isdecimal = element.attributes.isdecimal != undefined ? element.attributes.isdecimal.value === 'true' : false;

    //Added Class for validating only numbers and number with decimal
    if (isdecimal) $(element).addClass("allownumericwithdecimal");
    else $(element).addClass("allownumericwithoutdecimal");

    var minvalue = Number(element.min);
    var maxvalue = Number(element.max);
    var unitprefix = $(element).attr("unitprefix");
    if (unitprefix != undefined && unitprefix != null && unitprefix != "")
        regionalunit = unitprefix;
    if (regionalunit == "mm" && isdecimal) {
        decimalplaces = decimalplaces == 3 ? 2 : decimalplaces;
        stepvalue = (decimalplaces == 3 || stepvalue == 0.001) ? 0.01 : stepvalue;
    }
    if (!isNaN(elementvalue) && elementvalue > maxvalue)
        elementvalue = maxvalue;
    else if (!isNaN(elementvalue) && elementvalue <= minvalue)
        elementvalue = minvalue;

    var slider = $(element).parent().children(".slider")[0];
    if (slider != undefined) {
        $(slider).slider({
            animate: "fast",
            value: elementvalue, min: minvalue, max: maxvalue, step: stepvalue,
            slide: function (event, ui) {               
                var value = ui.value;
                $(element).val(value);
                ApplyUpDownStyle(element, value);
            },
            change: function (event, ui) {
                var value = ui.value;                
                $(element).customspinner("value", value).change();
                var context = ko.contextFor(element);
                var boundData = ko.bindingProvider.instance.getBindings(element, context);
                boundData.spinner(value);
                ApplyUpDownStyle(element, value);
            }
        });
    }

    var spin_startVal = 0.000;
    var spin_repVal = 0;

    $(element).customspinner({
        min: minvalue,
        max: maxvalue,
        value: elementvalue,
        decimalplaces: decimalplaces,
        isdecimal: isdecimal,
        step: stepvalue,
        start: function (event, ui) {
            spin_startVal = this.value;
            spin_repVal = spin_startVal.replace(',', '.');
            this.value = spin_repVal;
        },
        stop: function (event, ui) {
            var value = spin_repVal.replace(',', '.');
            value = parseFloat(value);
             //$(this).customspinner("value", value);
            ///Slider Included
            var slider = $(element).parent().parent().children(".slider")[0];
            if (slider != undefined) {
                $(slider).slider({
                    value: this.value, animate: true
                });
            }
            $(this).trigger("change");
            ApplyUpDownStyle(this, value);            
            if ($(this).parents().eq(6).attr("class") == "link-spinner pull-left") {
                var parentSpinner = $(this).parents().eq(6).find("input")[1];
                if (parentSpinner != undefined) {
                    $(parentSpinner).customspinner("value", value);                    
                }
                //$.data(parentSpinner, "ui-customspinner")._trigger("change");
            }
        },
        change: function (event, ui) {
            var value = this.value;
            value = value.replace(',', '.');
            var pattern = this.pattern;
            min = Number(this.min);// Number($(this).customspinner('option', 'min'));
            max = Number(this.max); //Number($(this).customspinner('option', 'max'));//                            
            isdecimal = $(this).customspinner('option', 'isdecimal');
            decimalplaces = $(this).customspinner('option', 'decimalplaces');
            decimalplaces = (regionalunit == "mm" && Number(decimalplaces)>2) ? 2 : Number(decimalplaces);
            if (pattern == undefined || pattern == "" || pattern == null) pattern = /^-?[0-9]\d*((\,|\.)\d+)?$/;
            if (!value.match(pattern)) {
                value = min
            }
            else {
                if (!isNaN(value) && parseFloat(value) > max) {
                    value = max;
                } else if (!isNaN(value) && parseFloat(value) <= min) {
                    value = min;
                }
            }
            ApplyUpDownStyle(this, value)
            if (!isdecimal) value = parseInt(value);
            if (value != this.value) {
                if (isdecimal) value = parseFloat(value).toFixed(decimalplaces).replace('.', numberFormat);
                //$(this).customspinner("value", value);
                this.value = value;
            }
            else if (isdecimal) this.value = parseFloat(value).toFixed(decimalplaces).replace('.', numberFormat);
            ///Slider Included
            var slider = $(element).parent().parent().children(".slider")[0];
            if (slider != undefined) {
                $(slider).slider({
                    value: value, animate: true
                });
            }
        }
    }).on('mousedown', function () {
        $(this).closest('.ui-spinner').addClass('focus');
        $(this).parents().eq(2).children("div.btn-group.linkButtonspiner.spinner-link-dropdown-div").addClass('focus');
    }).on('keypress', function () {
        $(this).closest('.ui-spinner').addClass('focus');
        $(this).parents().eq(2).children("div.btn-group.linkButtonspiner.spinner-link-dropdown-div").addClass('focus');
    }).on('blur', function () {
        $(this).closest('.ui-spinner').removeClass('focus');
        $(this).closest('.ui-spinner-input').removeClass('removefocus');
        $(this).parents().eq(2).children("div.btn-group.linkButtonspiner.spinner-link-dropdown-div").removeClass('focus');
    });
    if (elementvalue <= minvalue)
        $(element).siblings('.ui-spinner-down').addClass('disable-spinner-btn');
    if (elementvalue >= maxvalue)
        $(element).siblings('.ui-spinner-up').addClass('disable-spinner-btn');
    //elementvalue = (elementvalue == 0 && isdecimal) ? elementvalue + stepvalue : elementvalue;
    if (isdecimal) elementvalue = parseFloat(elementvalue).toFixed(decimalplaces).replace('.', numberFormat);
    $(element).val(elementvalue);

    $(".dropdown-submenu .ui-spinner-button").on("click", function (event) {        
        event.stopPropagation();
        event.preventDefault();
    })    
}


*/