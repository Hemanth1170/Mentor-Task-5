sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.mindset.apps.project5.controller.View1", {
        onInit: function () {
            var EmployeeModel = new JSONModel();
            EmployeeModel.loadData("/model/InputData.json");
            this.getView().setModel(EmployeeModel);
        },
            
        onButtonPress: function (oEvent) {
            var oModel = this.getView().getModel();
            
            var selectedValue = oModel.getProperty("/selectedValue");
            var enabledSelected = oModel.getProperty("/enabledSelected");
            var editableSelected = oModel.getProperty("/editableSelected");
            var mandatorySelected = oModel.getProperty("/mandatorySelected");
            var inputValue = oModel.getProperty("/inputValue");

            if (selectedValue === "default" || selectedValue === undefined) return;

            var newFormData = {
                "enabledSelected": enabledSelected === undefined ? false : enabledSelected,
                "editableSelected": editableSelected === undefined ? false : editableSelected,
                "mandatorySelected": mandatorySelected === undefined ? false : mandatorySelected,
                "inputValue": inputValue
            }
            
            var formModel = this.getView().getModel();
            formModel.setProperty("/InputForm/" + selectedValue, newFormData);
            
            var property;
            switch (selectedValue) {
                case "FN":
                    property = "First Name";
                    break;
                case "LN":
                    property = "Last Name";
                    break;
                case "Des":
                    property = "Description";
                    break;
                case "Dep":
                    property = "Department";
                    break;
                case "Addr":
                    property = "Address";
                    break;
                case "Mob":
                    property = "Mobile";
                    break;
                case "All":
                    property = "All";
                    break;
                default:
                    property = "";
            }

            var tableModel = this.getView().getModel();
            var tableData = tableModel.getProperty('/TableData');
            
            var existingRow = tableData.find(function (row) {
                return row.property === property;
            });

            if (existingRow) {
                existingRow.editable = editableSelected === undefined ? false : editableSelected;
                existingRow.enabled = enabledSelected === undefined ? false : enabledSelected;
                existingRow.mandatory = mandatorySelected === undefined ? false : mandatorySelected;
                existingRow.value = inputValue;
            } else {
                var payload = {
                    "property": property,
                    "editable": editableSelected === undefined ? false : editableSelected,
                    "enabled": enabledSelected === undefined ? false : enabledSelected,
                    "mandatory": mandatorySelected === undefined ? false : mandatorySelected,
                    "value": inputValue
                };
                tableData.push(payload);
            }

            tableModel.setProperty('/TableData', tableData);
        }
    });
});
