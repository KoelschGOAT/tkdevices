import { Link, useLocation } from "react-router-dom";
import React from 'react'

export default function Props() {
    let location = useLocation();
    
  
       console.log(location.pathname)
       return(
           <>
           </>
       );    
}
export const localization ={
            body: {
              emptyDataSourceMessage: "Keine Einträge",
              addTooltip: "Hinzufügen",
              deleteTooltip: "Löschen",
              editTooltip: "Bearbeiten",
              filterRow: {
                filterTooltip: "Filter",
              },
              editRow: {
                deleteText: "Diese Zeile wirklich löschen?",
                cancelTooltip: "Abbrechen",
                saveTooltip: "Speichern",
              },
            },
            grouping: {
              placeholder: "Spalten ziehen ...",
              groupedBy: "Gruppiert nach:",
            },
            header: {
              actions: "Aktionen",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} von {count}",
              labelRowsSelect: "Zeilen",
              labelRowsPerPage: "Zeilen pro Seite:",
              firstAriaLabel: "Erste Seite",
              firstTooltip: "Erste Seite",
              previousAriaLabel: "Vorherige Seite",
              previousTooltip: "Vorherige Seite",
              nextAriaLabel: "Nächste Seite",
              nextTooltip: "Nächste Seite",
              lastAriaLabel: "Letzte Seite",
              lastTooltip: "Letzte Seite",
            },
            toolbar: {
              addRemoveColumns: "Spalten hinzufügen oder löschen",
              nRowsSelected: "{0} Zeile(n) ausgewählt",
              showColumnsTitle: "Zeige Spalten",
              showColumnsAriaLabel: "Zeige Spalten",
              exportTitle: "Export",
              exportAriaLabel: "Export",
              exportName: "Export als CSV",
              searchTooltip: "Suche...",
              searchPlaceholder: "Suche...",}
            
};
