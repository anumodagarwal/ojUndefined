/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'utils', 'data/data', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel',
  'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojdialog', 'ojs/ojchart'],
        function (oj, ko, utils, data)
        {
          function ClampIntgViewModel() {
            var self = this;
            self.isVisible = ko.observable(true);
            var defaultLayout = utils.readCookie('peopleLayout');
            if (defaultLayout) {
              self.peopleLayoutType = ko.observable(defaultLayout);
            } else {
              self.peopleLayoutType = ko.observable('peopleCardLayout');
            }
            self.allPeople = ko.observableArray([]);
            self.ready = ko.observable(false);

            data.fetchData(document.url + '/ords/hr/demo/oal_clamp_apps_status/kshitiz.anand@oracle.com').then(function (people) {
              self.allPeople(people.items);
            }).fail(function (error) {
              console.log('Error in getting People data: ' + error.message);
            });

            self.parsePeople = function (response) {
              return response['items'];
            };
            self.chartArray = ko.observableArray();
            self.model = oj.Model.extend({
              idAttribute: 'clamp_status_id'
            });

            self.collection = new oj.Collection(null, {
              url: document.url + '/ords/hr/demo/oal_clamp_apps_status/kshitiz.anand@oracle.com',
              model: self.model
            });

            self.nameSearch = ko.observable('');
            self.envSearch = ko.observable('');
            self.appName = ko.observable('');
            self.envOption = ko.observableArray([]);
            data.fetchData('js/data/envList.json').then(function (env) {
              self.envOption(env);
            }).fail(function (error) {
              console.log('Error in getting Environment  data: ' + error.message);
            });

            self.appOption = ko.observableArray([]);
            data.fetchData('js/data/appList.json').then(function (app) {
              self.appOption(app);
            }).fail(function (error) {
              console.log('Error in getting Environment  data: ' + error.message);
            });

            peopleFilter = ko.observable();
            self.filteredAllPeople = ko.computed(function () {
              var peopleFilter = new Array();

              if (self.allPeople().length !== 0) {
                if (self.nameSearch().length === 0)
                {
                  peopleFilter = self.allPeople();
                } else {
                  ko.utils.arrayFilter(self.allPeople(),
                          function (r) {
                            var token = self.nameSearch().toLowerCase();
                            if (r.app_name.toLowerCase().indexOf(token) === 0 || r.app_name.toLowerCase().indexOf(token) === 0) {
                              peopleFilter.push(r);
                            }
                          });
                }
              }

              self.ready(true);
              return peopleFilter;
            });

            self.listViewDataSource = ko.computed(function () {
              return new oj.ArrayTableDataSource(self.filteredAllPeople(), {idAttribute: 'clamp_status_id'});
            });

            self.cardViewDataSource = ko.computed(function () {
              return new oj.PagingTableDataSource(self.listViewDataSource());
            });



            self.getPhoto = function (empId) {
              var src;
              if (empId < 188) {
                src = 'css/images/people/' + empId + '.png';
              } else {
                src = 'css/images/people/nopic.png';
              }
              return src;
            };

            self.getEmail = function (emp) {
              return "mailto:" + emp.email + '@example.net';
            };

            self.getFacetime = function (emp) {
              return "#";
            };

            self.getChat = function (emp) {
              return "#";
            };
            // Feature implementation discontinued
            self.getOrg = function (org, event) {
              //     alert('This will take you to the employee page and highlight the team infotile');
            };

            self.getTenure = function (emp) {
              var now = new Date().getFullYear();
              var hired = new Date(emp.hireDate).getFullYear();
              var diff = now - hired;
              return diff;
            };



            self.loadPersonPage = function (emp) {

            };

            self.onEnter = function (data, event) {
              if (event.keyCode === 13) {
                var emp = {};
                emp.empId = data.empId;
                self.loadPersonPage(emp);
              }
              return true;
            };

            self.fetchAppDetails = function () {

              $.ajax({
                type: "GET",
                url: document.url + '/ords/hr/demo/oal_clamp_apps_status/kshitiz.anand@oracle.com',
                async: false,
                success: function (data) {
                  console.log("Data=" + data);


                },
                error: function (error) {
                  console.log(error);
                }
              });
            };

            self.redirectToClamp = function () {

            }

            self.addAppPanel = function () {
              console.log(self.appName());
              console.log(self.envSearch()[0]);
              var payload = {
                'SERVER_ID': self.envSearch()[0],
                'APP_ID': self.appName()[0],
                'USER_ID': 'kshitiz.anand@oracle.com'
              };
              $.ajax({
                type: "POST",
                url: document.url + '/ords/hr/demo/oal_clamp_apps_status',
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: "application/json; charset=utf-8",

                success: function (data) {
                  console.log("Data=" + data);

                },
                error: function (error) {
                  console.log(error);
                  $("#addMoniterPanel").ojDialog("close");
                  self.isVisible(false);
                  data.fetchData(document.url + '/ords/hr/demo/oal_clamp_apps_status/kshitiz.anand@oracle.com').then(function (people) {
                    self.allPeople(people.items);
                  }).fail(function (error) {
                    console.log('Error in getting People data: ' + error.message);
                  });
                  self.isVisible(true);
                }
              });

            }
            self.addItem = function (data, event) {
              $("#addMoniterPanel").ojDialog("open");
            };

            self.changeHandler = function (page, event) {
              if (event.option === 'selection') {
                if (event.value[0]) {
                  var emp = {};
                  emp.empId = event.value[0];
                  self.loadPersonPage(emp);
                }
              }
            };

          }

          return ClampIntgViewModel;
        });
