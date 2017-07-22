/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojdialog'],
        function (ko, oj, data) {

          function UnplannedOutageVM() {
            var self = this;
            self.ready = ko.observable(false);
            self.outageInfo = ko.observable("Outage Additional Info");
            self.personProfile = ko.observableArray([]);
            self.plannedToDate = ko.observable("21-07-2017");
            self.plannedFromDate = ko.observable("14-07-2017");
            self.outagePeriod = ko.observable('14-07-2017 to 21-07-2017');

            self.unplannedCount = ko.observable('-');

            self.logArray = ko.observableArray([]);
            $.getJSON(document.url + '/ords/hr/demo/oal_env_outages_current', function (data) {
              self.logArray(data.items);
              self.unplannedCount(data.count);
            });

            self.dataSourceUnplanned = new oj.ArrayTableDataSource(self.logArray);

            self.handleAttached = function (info) {
              self.ready(true);
              self.personProfile(info);
            }

            self.onEnterLoadPeople = function (data, event) {
              if (event.keyCode === 13) {
                $("#unplannedDialog").ojDialog("open");
                $.getJSON(document.url + '/ords/hr/demo/oal_env_outages_current', function (data) {
                  self.logArray(data.items);
                  self.unplannedCount(data.count);
                });
              }
              return true;
            };

            self.openPopUp = function () {
              $("#unplannedDialog").ojDialog("open");
            }

            self.openInfoPopUp = function () {
              $("#modalDialog2").ojDialog("open");
            }

          }

          return UnplannedOutageVM;

        });
