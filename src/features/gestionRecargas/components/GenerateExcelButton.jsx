import React from "react";
import { Button } from "primereact/button";
import ExcelJS from "exceljs";

const GenerateExcelButton = ({ data }) => {
  const exportToExcel = async (dataToExport, filename, sheetName) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(sheetName);

    const headerStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "232C3D" }, // Color de fondo
      },
      font: {
        color: { argb: "FFFFFFFF" },
        bold: true,
        size: 13, // Tamaño de letra
      },
      alignment: {
        vertical: "middle", // Alinear verticalmente al centro
        horizontal: "center", // Alinear horizontalmente al centro
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const headers = Object.keys(dataToExport[0]);
    headers.forEach((header, index) => {
      const cell = sheet.getCell(1, index + 1);
      cell.value = header.replace(/_/g, " ");
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.alignment = headerStyle.alignment;
      cell.border = headerStyle.border;

      sheet.getColumn(index + 1).width = header.length + 12;
    });

    dataToExport.forEach((item, rowIndex) => {
      headers.forEach((header, colIndex) => {
        const cell = sheet.getCell(rowIndex + 2, colIndex + 1);
        cell.value = item[header];
        cell.border = headerStyle.border;
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        const maxLength = Math.max(
          header.length,
          ...dataToExport.map((item) => {
            const value = item[header];
            return value ? value.toString().length : 0;
          })
        );

        const column = sheet.getColumn(colIndex + 1);
        column.width = maxLength + 5;
      });
    });

    // Guardar el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const generateFileName = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Gestion_recargas_${formattedDate}`;
  };

  const handleExportClick = () => {
    const filename = generateFileName();
    const getFechaHora = (created_at) => {
      const fecha = new Date(created_at);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      return fecha.toLocaleString("es-ES", options);
    };
    // Transformar los datos antes de exportar
    const transformedData = data.map((item) => ({
      codigo_venta: item?.number,
      Id_usuario: item?.userId,
      Fecha: getFechaHora(item.created_at).split(" ")[0],
      Hora: getFechaHora(item.created_at).split(" ")[1],
      N_galones: item?.gallons,
      N_soles: item.price,
      Tipo_combustible: item.type_fuel === 1 ? "Regular" : "Premium",
      Estado: item.status,
    }));

    exportToExcel(transformedData, filename, "Vista 1");
  };

  return (
    <Button
      label="DESCARGAR EXCEL"
      icon="pi pi-file-excel"
      className="p-button-sm p-button-success mr-2"
      onClick={handleExportClick}
    />
  );
};

export default GenerateExcelButton;
