/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart'],
        function (ko, oj, data) {

          function PlannedOutageVM() {
            var self = this;
            self.ready = ko.observable(false);
            self.personProfile = ko.observableArray([]);

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

          }

          return PlannedOutageVM;

        });
