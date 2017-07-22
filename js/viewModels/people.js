/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'utils', 'data/data', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel',
  'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojdialog'],
        function (oj, ko, utils, data)
        {
          function PeopleViewModel() {
            var self = this;
            self.visible = ko.observable(true);
            var defaultLayout = utils.readCookie('peopleLayout');
            if (defaultLayout) {
              self.peopleLayoutType = ko.observable(defaultLayout);
            } else {
              self.peopleLayoutType = ko.observable('peopleCardLayout');
            }
            self.allPeople = ko.observableArray([]);
            self.ready = ko.observable(false);

            data.fetchData('http://10.154.107.147:9090/ords/hr/demo/oal_apps_user_subscriptions/kshitiz.anand@oracle.com').then(function (appData) {
              self.allPeople(appData.items);
            }).fail(function (error) {
              console.log('Error in getting People data: ' + error.message);
            });

            self.parsePeople = function (response) {
              return response['employees'];
            };

            self.model = oj.Model.extend({
              idAttribute: 'user_subscription_id'
            });

            self.collection = new oj.Collection(null, {
              url: 'js/data/employees.json',
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

            self.addEnvPanel = function () {
              var popItem = self.allPeople().pop();
              self.allPeople().push({
                "user_subscription_id": "123",
                "server": "Up",
                "status": "Active",
                "health": "Ok",
                "firstName": "Alexander",
                "lastName": "Khoo",
                "title": "Purchasing Clerk",
                "email": "AKHOO",
                "phone": "515.127.4562",
                "mobile": "515.127.4562",
                "address": "2004 Bellevue Ct",
                "city": "Seattle",
                "state": "Washington",
                "country": "US",
                "postal": "98102",
                "twitter": "Alexander",
                "facebook": "Alexander",
                "google": "Alexander",
                "linkedIn": "Alexander",
                "hireDate": "2004-09-14T00:00:00Z",
                "compRatio": 97,
                "salary": 6500.0,
                "bonus": 1775.0,
                "commission": 0.0,
                "rating": 3,
                "potential": 4,
                "deptId": 30,
                "mgrId": 114,
                "deptName": "Purchasing",
                "mgrFirstName": "Deb",
                "mgrLastName": "Raphaely"
              });
              self.allPeople().push(popItem);
              console.log(self.allPeople());
              self.visible(false);
              self.visible(true);
            };

            self.downloadEnvInfo = function () {

            }

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
                            if (r.app_name.toLowerCase().indexOf(token) === 0 || r.server_name.toLowerCase().indexOf(token) === 0) {
                              peopleFilter.push(r);
                            }
                          });
                }
              }

              self.ready(true);
              return peopleFilter;
            });

            self.listViewDataSource = ko.computed(function () {
              return new oj.ArrayTableDataSource(self.filteredAllPeople(), {idAttribute: 'user_subscription_id'});
            });

            self.cardViewDataSource = ko.computed(function () {
              return new oj.PagingTableDataSource(self.listViewDataSource());
            });

            self.getPhoto = function (user_subscription_id) {
              var src;
              if (user_subscription_id < 188) {
                src = 'css/images/people/' + user_subscription_id + '.png';
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

            self.cardLayoutHandler = function () {
              utils.createCookie('peopleLayout', 'peopleCardLayout');
              self.peopleLayoutType('peopleCardLayout');
            };

            self.listLayoutHandler = function () {
              utils.createCookie('peopleLayout', 'peopleListLayout');
              self.peopleLayoutType('peopleListLayout');
            };

            self.loadPersonPage = function (emp) {

            };

            self.onEnter = function (data, event) {
              if (event.keyCode === 13) {
                var emp = {};
                emp.user_subscription_id = data.user_subscription_id;
                self.loadPersonPage(emp);
              }
              return true;
            };

            self.addItem = function (data, event) {
              $("#addMoniterPanelPopUp").ojDialog("open");
            };

            self.changeHandler = function (page, event) {
              if (event.option === 'selection') {
                if (event.value[0]) {
                  var emp = {};
                  emp.user_subscription_id = event.value[0];
                  self.loadPersonPage(emp);
                }
              }
            };

          }

          return PeopleViewModel;
        });
