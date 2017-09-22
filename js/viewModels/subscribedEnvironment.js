/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojvalidation-datetime', 'ojs/ojtagcloud', 'ojs/ojchart'],
        function (oj, ko)
        {

          function PersonViewModel() {
            var self = this;

            var data = [{name: 'ERP 1', version: '10.3.6', nodes: 2, cpu: 2, type: 'Designated System Maintenance Window', balancer: 1, memory: 8},
              {name: 'Tools', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
              {name: 'Base', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
              {name: 'Environment', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8},
              {name: 'Security', version: '10.3.6', nodes: 2, cpu: 2, type: 'Java Cloud Service Virtual Image', balancer: 1, memory: 8}
            ];
            self.dataSource = new oj.ArrayTableDataSource(data, {idAttribute: "name"});
          }

          return new PersonViewModel();
        });
