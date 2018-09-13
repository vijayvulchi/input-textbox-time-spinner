var viewModel = function () {
	var self = this;
	self.inputTime1 = ko.observable();
	self.inputTime2 = ko.observable();
	self.inputTime3 = ko.observable();
	// self.inputTimeSpinner = new timeSpinnerViewModel();
};

ko.applyBindings(viewModel);