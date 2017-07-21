/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart'],
        function (ko, oj, data) {

          function UnplannedOutageVM() {
            var self = this;
            self.ready = ko.observable(false);
            self.outageInfo = ko.observable("Outage Additional Info");
            self.personProfile = ko.observableArray([]);
            self.plannedToDate = ko.observable("21-07-2017");
            self.plannedFromDate = ko.observable("14-07-2017");
            var model = oj.Model.extend({
              idAttribute: 'questionId'
            });
            self.collection = new oj.Collection(null, {
              url: 'js/data/PlannedOutage.json',
              //customPagingOptions: self.pagingOptions,
              fetchSize: 10,
              model: model
            });
            self.dataSource = new oj.CollectionTableDataSource(self.collection);

            self.handleAttached = function (info) {
              self.ready(true);
              self.personProfile(info);
            }

            self.onEnterLoadPeople = function (data, event) {
              if (event.keyCode === 13) {
                $("#modalDialog1").ojDialog("open");
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

          return UnplannedOutageVM;

        });
