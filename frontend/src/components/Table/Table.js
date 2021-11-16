//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import MaterialTable from "material-table";
import Props, { localization,darkTheme } from "../props";
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useReducer,
  useContext
} from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import "../../../static/css/table.css";

import { QRCode } from "react-qr-svg";
import useNewTab from "../openInNewTab";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import UserContext from "../User/UserContext";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import getData from "../APIRequests";

export default function Table() {
  let forbidden = false;
  document.title = " Lagernde Geräte";
  const url = "/api/device";

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const {user,setuser} = useContext(UserContext);

  //useEffect Hook to fetch the data from the REST API Endpoint, wich provides all devicedata
  useEffect(() => {
    getData(data, setData, url);
  }, []);

  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12 ||
        rowData.serialnumber !== rowData.serialnumber.toUpperCase() ||
        rowData.serialnumber.indexOf(" ") >= 0
          ? "S/N im richtigen Format angeben"
          : true,
      filterPlaceholder: "S/N eingeben",
    },
    {
      title: "Modell",
      field: "model",
      lookup: {
        "SE 2016": "iPhone SE 2016",
        "SE 2020": "iPhone SE 2020",
        "6s": "iPhone 6s",
        7: "iPhone 7",
        11: "iPhone 11",
      },
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === ""
          ? "Model auswählen"
          : true,
      filterPlaceholder: "Modell auswählen",
      initialEditValue: "SE 2016",
    },
    {
      title: "Batterie",
      field: "batterylife",
      //defaultSort: "desc",

      validate: (rowData) =>
        rowData.batterylife === undefined ||
        rowData.batterylife === "" ||
        rowData.batterylife < 0 ||
        rowData.batterylife > 100
          ? "Wert zwischen 0 und 100"
          : true,
      filtering: false,
      defaultSort: "desc",
      render: (rowData) => rowData.batterylife + "%",
      cellStyle: (data, rowData) => ({
        color: data > 90 ? "green" : "red",
      }),
    },
    {
      title: "Speicher",
      field: "capacity",

      lookup: {
        32: "32GB",
        64: "64GB",
        128: "128GB",
        256: "256GB",
      },

      validate: (rowData) =>
        rowData.capacity === undefined || rowData.capacity === ""
          ? "Speicher auswählen"
          : true,
      filterPlaceholder: "Speicher auswählen",
      initialEditValue: 32,
    },
    {
      title: "Status",
      //defaultFilter: true,
      field: "status",

      lookup: {
        true: "lagernd",
        false: "rausgegeben",
      },
      cellStyle: (data, rowData) => ({
        color: data === "lagernd" ? "green" : "red",
      }),
      filterPlaceholder: "Status auswählen",
      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Status auswählen"
          : true,
      initialEditValue: true,
      defaultFilter: ["true"],
    },
    {
      title: "Defekt",
      field: "status_defect",
      type: "boolean",
      filering: false,
      cellStyle: {
        justifyContent: "center",
      },
    },
  ];

  const deviceCount = data.length.toString() + " Geräte lagernd";

  return (
      <ThemeProvider theme={darkTheme}>
      <pre>{JSON.stringify(user, null, 2)}</pre>;
      <title className="">{deviceCount}</title>
      <div className="Table">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.BOTTOM_CENTER}
        />
        <MaterialTable
          //icons={tableIcons}
          title={deviceCount}
          data={data}
          columns={columns}
          /*
          cellEditable={{
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return Promise((resolve, reject) => {
                //Backend call

                const clonedData = [...data];
                clonedData[rowData.tableData.id][columnDef.field] = newValue;
                setData(clonedData);
                console.log(clonedData);
                fetch(url + "/" + rowData.serialnumber, {
                  method: "PUT",
                  headers: {
                    Authorization: `Token ${(localStorage.getItem("token"))}`,
                  },
                  body: JSON.stringify(rowData),
                })
                  .then((resp) => resp.json())
                  .then(() => {
                    ToastsStore.success("Änderung gespeichert");
                    getDevices();
                    resolve();
                  })
                  .catch((err) => console.log(err));
              });
            },
          }}
          */
          editable={{
            onRowAdd: (newData, tableData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url, {
                  method: "POST",
                  headers: {
                    Authorization: `Token ${(localStorage.getItem("token"))}`,
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    ToastsStore.success("Neues Gerät gespeichert");
                    getData(data, setData, url);

                    resolve();
                  });
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.serialnumber, {
                  method: "PUT",
                  headers: {
                    Authorization: `Token ${(localStorage.getItem("token"))}`,
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    ToastsStore.success("Gerätedaten gespeichert");
                    getData(data, setData, url);
                    resolve();
                  });
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.serialnumber, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Token ${(localStorage.getItem("token"))}`,
                  },
                }).then((resp) => {
                  ToastsStore.success("Gerät Gelöscht");
                  getData(data, setData, url);
                  resolve();
                });
              }),
          }}
          options={{
            paging: false,
            maxBodyHeight: 700,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            filtering: true,
            exportButton: true,
            headerStyle: {
              zIndex: 0,
            },

            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#2E2E2E" : "#424242",
            }),
            filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
          }}
          actions={[
            (rowData) => ({
              icon: SmartphoneIcon,
              tooltip: "Gerät öffnen",
              onClick: (event, rowData) => {
                useNewTab(
                  "http://localhost:8000/devices/" + rowData.serialnumber
                );
              },
            }),
          ]}
          localization={localization}
        />
      </div>
    </ThemeProvider>
  );
}
