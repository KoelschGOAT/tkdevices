/* import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import { save } from "@material-ui/icons";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import tableIcons from "./TableIcons";
import { makeStyles } from "@material-ui/styles";
const tableIcons = tableIcons
const useStyles = makeStyles({
  colHeader: {
    color: "red",
    "&:hover": {
      color: "blue",
    },
  },
});
export default function Table() {
  const classes = useStyles()
  const url = "/api/all";
  const urledit = "/api/device/";
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12|| rowData.serialnumber != rowData.serialnumber.toUpperCase()
          ? "Falsches Format oder Leer (Uppercase und 12 stellig)"
          : true,
    },
    {
      title: "Modell",
      field: "model",
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "benötigt" : true,
    },
    {
      title: "Batterie in %",
      field: "batterylife",
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "benötigt" : true,
    },
    {
      title: "Speicher in GB",
      field: "capacity",
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "benötigt" : true,
    },
    {
      title: "Status",
      field: "status",
      lookup: {
        lagernd: "lagernd",
        raus: "raus",
        validate: (rowData) =>
          rowData.model === undefined || rowData.model === ""
            ? "benötigt"
            : true,
      },
    },
  ];
  const getDevices = () => {
    fetch("/api/all")
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  };
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
  useEffect(() => {
    getDevices();
  }, []);

  const deviceCount = data.length + " Geräte";
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="Table">
        <h1 align="center">Alle Geräte</h1>
        <h4 align="center"></h4>
        <MaterialTable
          icons={tableIcons}
          class="TableRow"
          title={deviceCount}
          data={data}
          columns={columns}
          
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                //Backend POST
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                });
                document
                  .write(newData)
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend PUT
                fetch(urledit + oldData.id, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                //Backend DELETE
                fetch(urledit + oldData.id, {
                  method: "DELETE",
                  headers: {
                    "Content-type": "application/json",
                  },
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
          }}
         
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            paging: false,
            maxBodyHeight: "600px",
          }}
        />
      </div>
    </ThemeProvider>
  );
}
 */
  /*
          cellEditable={{
            onCellEditApproved: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend PUT
                fetch(urledit + oldData.id, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            }}
          */
//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View 
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import { save } from "@material-ui/icons";
import { createTheme, ThemeProvider, alpha } from "@material-ui/core/styles";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Table() {
  const url = "/api/device";
  
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12
          ? "Eintragen"
          : true,
    },
    {
      title: "Modell",
      field: "model",
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "Required" : true,
    },
    {
      title: "Batterie in %",
      field: "batterylife",
      numeric:true,
      validate: (rowData) =>
        rowData.batterylife === undefined || rowData.batterylife === "" || rowData.batterylife < 0 || rowData.batterylife > 100
          ? "Eintragen"
          : true,
     
        
          
    },
    {
      title: "Speicher in GB",
      field: "capacity",
      validate: (rowData) =>
        rowData.capacity === undefined || rowData.capacity === ""
          ? "Required"
          : true,
    },
    {
      title: "Status",
      field: "status",

      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Required"
          : true,
    },
  ];
  const getDevices = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  };
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
  useEffect(() => {
    getDevices();
  }, []);

  const deviceCount = data.length + " Geräte";
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="Table">
        <h1 align="center">Alle Geräte</h1>
        <h4 align="center"></h4>
        <MaterialTable
          icons={tableIcons}
          class="TableRow"
          title={deviceCount}
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.id, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.id, {
                  method: "DELETE",
                  headers: {
                    "Content-type": "application/json",
                  },
                })
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
          }}
          options={{
            paging: false,
            maxBodyHeight: 600,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
      </div>
    </ThemeProvider>
  );
}
