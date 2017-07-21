/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * subscribedEnv module
 */
define(['ojs/ojcore', 'knockout','ojs/ojbutton','ojs/ojselectcombobox','ojs/ojarraytabledatasource','ojs/ojlistview'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function subscribedEnvContentViewModel() {
       var self = this;
       self.envDataSource = ko.observable();
       self.tags = ko.observableArray([
            { value: ".net", label: ".net" },
            { value: "Accounting", label: "Accounting" },
            { value: "ADE", label: "ADE" },
            { value: "Adf", label: "Adf" },
            { value: "Adfc", label: "Adfc" },
            { value: "Adfm", label: "Adfm" },
            { value: "Android", label: "Android" },
            { value: "Aria", label: "Aria" },
            { value: "C", label: "C" },
            { value: "C#", label: "C#" },
            { value: "C++", label: "C++" },
            { value: "Chrome", label: "Chrome" },
            { value: "Cloud", label: "Cloud" },
            { value: "CSS3", label: "CSS3" },
            { value: "DBA", label: "DBA" },
            { value: "Eclipse", label: "Eclipse" },
            { value: "Firefox", label: "Firefox" },
            { value: "Git", label: "Git" },
            { value: "Hibernate", label: "Hibernate" },
            { value: "HTML", label: "HTML" },
            { value: "HTML5", label: "HTML5" },
            { value: "IE", label: "IE" },
            { value: "IOS", label: "IOS" },
            { value: "Java", label: "Java" },
            { value: "Javascript", label: "Javascript" },
            { value: "JDeveloper", label: "JDeveloper" },
            { value: "Jet", label: "jet" },
            { value: "JQuery", label: "JQuery" },
            { value: "JQueryUI", label: "JQueryUI" },
            { value: "JS", label: "JS" },
            { value: "Knockout", label: "Knockout" },
            { value: "MAF", label: "MAF" },
            { value: "Maven", label: "Maven" },
            { value: "MCS", label: "MCS" },
            { value: "MySql", label: "MySql" },
            { value: "Netbeans", label: "Netbeans" },
            { value: "Oracle", label: "Oracle" },
            { value: "Solaris", label: "solaris" },
            { value: "Spring", label: "spring" },
            { value: "Svn", label: "Svn" },
            { value: "UX", label: "UX" },
            { value: "xhtml", label: "xhtml" },
            { value: "XML", label: "XML" }
        ]);
        self.selectedItems = ko.observable();
        self.envCollection = ko.observableArray();
        self.visible = ko.observable(true);
        self.envDataSource = new oj.ArrayTableDataSource(self.envCollection());
        self.keyword = ko.observable();
       self.openEnvPopup = function(){
           $("#modalDialogEnv").ojDialog("open");
       };
       self.submitEnv = function(){
         $("#modalDialogEnv").ojDialog("close");
         self.envCollection.push({
             "item":self.keyword()[0]});
         self.visible(false);
         self.visible(true);
         console.log(self.envCollection());
       };
       
    }
    
    return subscribedEnvContentViewModel;
});
