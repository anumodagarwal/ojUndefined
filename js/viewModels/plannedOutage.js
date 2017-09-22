define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojdialog'],
        function (ko, oj, data) {

          function PlannedOutageVM() {
            var self = this;
            self.ready = ko.observable(false);
            self.outageInfo = ko.observable("Outage Additional Info");
            self.plannedToDate = ko.observable("21-07-2017");
            self.plannedFromDate = ko.observable("14-07-2017");
            self.plannedCount = ko.observable('-');
            self.outagePeriod = ko.observable('14-07-2017 to 21-07-2017');
            self.logArray = ko.observableArray([]);
            //$.getJSON(document.url + '/ords/hr/demo/oal_env_outages_planned', function (data) {
            $.getJSON('js/data/PlannedOutage.json', function (data) {
              self.logArray(data.items);
              self.plannedCount(data.count);
            });

            self.dataSource = new oj.ArrayTableDataSource(self.logArray);

            self.handleAttached = function () {
              self.ready(true);
            }

            self.onEnterLoadPeople = function (data, event) {
              if (event.keyCode === 13) {
                $("#modalDialog1").ojDialog("open");
                //$.getJSON(document.url + '/ords/hr/demo/oal_env_outages_planned', function (data) {
                $.getJSON('js/data/PlannedOutage.json', function (data) {
                  self.logArray(data.items);
                  self.plannedCount(data.count);
                });
              }
              return true;
            };
            self.openPopUp = function () {
              $("#modalDialog1").ojDialog("open");
            }
            self.openInfoPopUp = function () {
              $("#modalDialog2").ojDialog("open");
            }
          }
          return PlannedOutageVM;
        });
