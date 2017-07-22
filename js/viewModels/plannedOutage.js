/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojdialog'],
        function (ko, oj, data) {

          function PlannedOutageVM() {
            var self = this;
            self.ready = ko.observable(false);
            self.outageInfo = ko.observable("Outage Additional Info");
            self.personProfile = ko.observableArray([]);
            self.plannedToDate = ko.observable("21-07-2017");
            self.plannedFromDate = ko.observable("14-07-2017");
            self.plannedCount = ko.observable('-');
            self.outagePeriod = ko.observable('14-07-2017 to 21-07-2017');
            self.logArray = ko.observableArray([]);
            $.getJSON('http://10.154.107.147:9090/ords/hr/demo/oal_env_outages_planned', function (data) {
              self.logArray(data.items);
              self.plannedCount(data.count);
            });

            self.dataSource = new oj.ArrayTableDataSource(self.logArray);

            self.handleAttached = function (info) {
              self.ready(true);
              self.personProfile(info);
            }

            self.onEnterLoadPeople = function (data, event) {
              if (event.keyCode === 13) {
                $("#modalDialog1").ojDialog("open");
                $.getJSON('http://10.154.107.147:9090/ords/hr/demo/oal_env_outages_planned', function (data) {
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
