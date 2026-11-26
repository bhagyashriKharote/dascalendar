sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/Text",
    "sap/m/ColumnListItem",
    "sap/ui/core/Icon"
], function (Controller, JSONModel, Column, Text, ColumnListItem, Icon) {
    "use strict";

    return Controller.extend("com.mentorship.dascalendar.dascalendar.controller.Calendar", {

        onInit: function () {
            var oDataModel = this.getOwnerComponent().getModel("Calendar");

            oDataModel.dataLoaded().then(function () {
                var oData = oDataModel.getData();
                var aGroups = oData.d.results;
                var aFrontendGroups = [];
                var aFrontendPoints = [];

                aGroups.forEach(function (oGroup) {
                    var aSlots = oGroup.NavCalender.results;
                     // var aLoadpoints = aSlots.map(function (oSlot) {
                    //     return oSlot.Loadpoint;
                    // });
                    var aLoadpoints = [...new Set(aSlots.map(function (oSlot) {
                        return oSlot.Loadpoint;
                    }))];

                    var aPoints = [];

                    aLoadpoints.forEach(function (sLoadpoint) {
                        var aPointSlots = aSlots.filter(function (oSlot) {
                            return oSlot.Loadpoint === sLoadpoint;
                        });

                        var aFrontendSlots = aPointSlots.map(function (oSlot) {
                            return {
                                time: oSlot.SlotStartTime,
                                finishTime: oSlot.SlotFinishTime,
                                colorCode: oSlot.ColorCode,
                                capacity: String(oSlot.TotalCapacity || "").trim(),
                                disableSlot: oSlot.DISABLE_SLOT
                            };
                        });

                        var oPoint = {
                            loadpoint: sLoadpoint,
                            description: aPointSlots[0].LpDescription,
                            slots: aFrontendSlots
                        };

                        aPoints.push(oPoint);

                        aFrontendPoints.push({
                            loadingGroup: oGroup.Loadinggroup,
                            loadingGroupDescription: oGroup.Lg_Description,
                            loadpoint: oPoint.loadpoint,
                            description: oPoint.description,
                            slots: oPoint.slots
                        });
                    });

                    aFrontendGroups.push({
                        loadingGroup: oGroup.Loadinggroup,
                        description: oGroup.Lg_Description,
                        loadingPoints: aPoints
                    });
                });

                var oFrontendData = {
                    loadingGroups: aFrontendGroups,
                    loadingPoints: aFrontendPoints,
                    loadingGroupText: "Loading Groups (" + aFrontendGroups.length + ")"
                };

                var oFrontendModel = new JSONModel(oFrontendData);

                this.getOwnerComponent().setModel(oFrontendModel, "Frontend");

                this._buildCalendarTable(aFrontendPoints);

            }.bind(this)).catch(function (oError) {
                console.error("Could not load calendar mock data.", oError);
            });
        },


        _buildCalendarTable: function (aLoadingPoints) {
            var oTable = this.byId("idcalendarTable");

            oTable.removeAllColumns();
            oTable.removeAllItems();

            if (!aLoadingPoints.length) {
                return;
            }

            var aSlots = aLoadingPoints[0].slots;

            // Loading Point column
            oTable.addColumn(new Column({
                width: "12rem",
                hAlign: "Begin",
                header: new Text({
                    text: "Loading Points",
                    wrapping: false
                })
            }));

            // Time slot columns
            aSlots.forEach(function (oSlot) {
                oTable.addColumn(new Column({
                    width: "5rem",
                    hAlign: "Center",
                    header: new Text({
                        text: oSlot.time,
                        wrapping: false,
                        textAlign: "Center"
                    })
                }));
            });

            var sPreviousGroup = "";

            aLoadingPoints.forEach(function (oPoint) {

                // Add a header when the Loading Group changes
                if (oPoint.loadingGroup !== sPreviousGroup) {
                    sPreviousGroup = oPoint.loadingGroup;

                    var aGroupCells = [
                        new Text({
                            text: oPoint.loadingGroup + " - " +
                                oPoint.loadingGroupDescription,
                            wrapping: false
                        })
                    ];

                    aSlots.forEach(function () {
                        aGroupCells.push(new Text({
                            text: ""
                        }));
                    });

                    var oGroupRow = new ColumnListItem({
                        cells: aGroupCells
                    });

                    oGroupRow.addStyleClass("loadingGroupHeaderRow");
                    oTable.addItem(oGroupRow);
                }

                // Loading Point row
                var aPointCells = [
                    new Text({
                        text: oPoint.description,
                        wrapping: false
                    })
                ];

                oPoint.slots.forEach(function (oSlot) {
                    var sColor = "#000000";

                    switch (oSlot.colorCode) {
                        case "G":
                            sColor = "#70B51A";
                            break;
                        case "W":
                            sColor = "#D9D9D9";
                            break;
                        case "V":
                            sColor = "#9900FF";
                            break;
                        case "A":
                            sColor = "#F5C400";
                            break;
                    }

                    aPointCells.push(new Icon({
                        src: "sap-icon://circle-task-2",
                        color: sColor,
                        size: "0.8rem"
                    }));
                });

                oTable.addItem(new ColumnListItem({
                    cells: aPointCells
                }));

                // Total Capacity row
                var aCapacityCells = [
                    new Text({
                        text: "Total Capacity",
                        wrapping: false
                    })
                ];

                oPoint.slots.forEach(function (oSlot) {
                    aCapacityCells.push(new Text({
                        text: oSlot.capacity,
                        wrapping: false,
                        textAlign: "Center"
                    }));
                });

                var oCapacityRow = new ColumnListItem({
                    cells: aCapacityCells
                });

                oCapacityRow.addStyleClass("capacityRow");
                oTable.addItem(oCapacityRow);
            });
        }

    });
});