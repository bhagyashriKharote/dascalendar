# Dock Appointment Scheduling (DAS) Calendar

This project is part of my SAP Fiori mentorship Assignment 1. The goal is to build a Dock Appointment Scheduling calendar using SAPUI5 and the mock data provided for the assignment.

The calendar displays Loading Groups, Loading Points, time slots, slot status, and capacity information.

## Application Details

- **Application:** Dock Appointment Scheduling Assignment 1
- **Technology:** SAPUI5
- **UI5 Version:** 1.154.0
- **Data Source:** Mock JSON data
- **Template:** Basic SAPUI5 application

## Project Structure

The project follows the standard SAPUI5 application structure. The controller contains the logic for processing the mock data and building the calendar, while the XML view defines the application layout.

The mock data is available in:

`webapp/model/mockdata/DAS-mockdata.json`

## Mock Data

The mock data contains 3 Loading Groups and 5 Loading Points, with 48 time slots for each Loading Point. The slots are available in 30-minute intervals, from 00:00 to 23:30.

The data includes Loading Group and Loading Point details, slot timings, status codes, capacity, and availability information.

## Work Completed

- Integrated the mock JSON data into the application.
- Processed the data to identify Loading Groups and unique Loading Points.
- Transformed the data into a structure suitable for displaying in the calendar.
- Displayed Loading Groups and their Loading Points.
- Created time-slot columns dynamically based on the available data.
- Displayed slot status using colored indicators.
- Added a legend to explain the slot status colors.
- Displayed the Loading Group count.
- Added Total Capacity values for each time slot.

## Current Calendar Display

The calendar currently displays Loading Groups, Loading Points, time slots, status indicators, and capacity values. The columns and rows are generated dynamically using the mock data.

## Next Steps

The remaining work is to add the hardcoded selection values for Docking Location, Booking Date, Schedule Name, and Status, along with a Go button.

After pressing Go, the application should use the mock data to build and display the calendar as discussed during the mentorship session.

Further work includes checking the Loading Groups, Loading Points, and slot availability, improving horizontal scrolling, and testing the application.

# Questions / Clarifications

I need clarification on the following points to ensure the implementation matches the expected requirement:

Status mapping: Are the current status codes and color mapping correct?

Loading Point without slots: What should happen if a Loading Point has no available slots? Should it still be displayed?

Loading Group validation: What validations are expected for Loading Groups?

Go button: Should the calendar be generated only after clicking Go?

Capacity: Is displaying Total Capacity for each time slot the expected behavior?

## Running the Application

Make sure Node.js and npm are installed.

From the project folder, run:

```bash
npm install
```

To start the application:

```bash
npm start
```

The application will open in the local development environment.
