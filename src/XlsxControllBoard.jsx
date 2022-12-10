import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

export const XlsxControllBoard = ({ data }) => {
  const [urlFile, setUrlFile] = useState(null);
  
  let tableSize;

  useEffect(() => {
    handleExport().then(url => {
      setUrlFile(url);
    });
  }, [data]);

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);

    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
      //console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const handleExport = () => {
    const title = [{ A: "CONTROLE DE BORDO DIGITAL" }, {}];
    const subTitle1 = [
      {
        A: `PROPRIETÁRIO: ${data[1].attributes.vehicle_id.data.attributes.owner_name}`,
      },
    ];

    const subTitle2 = [
      {
        A: `CÓD VEÍCULO: ${data[1].attributes.vehicle_id.data.attributes.code}`,
      },
    ];

    const table = [
      {
        A: "Cód. Boletim",
        B: "Matrícula Condutor",
        C: "Nome do Condutor",
        D: "Centro de Resultado",
        E: "Data",
        F: "Código Veículo",
        G: "Placa",
        H: "Km Inicial",
        I: "Km Final",
        J: "Km Rodado",
        K: "Itinerário Origem",
        L: "Itinerário Destino",
        M: "Houve Abastecimento",
        N: "Quantidade Abastecida",
        O: "R$ Unit",
        P: "R$ Total",
      },
    ];

    data.forEach((controll) => {
      table.push({
        A: controll.id.toString(),
        B: controll.attributes.functionary_id.data.attributes.registration.toString(),
        C: controll.attributes.functionary_id.data.attributes.name,
        D: controll.attributes.cost_center_id.data.attributes.code,
        E: controll.attributes.createdAt,
        F: controll.attributes.vehicle_id.data.attributes.code,
        G: controll.attributes.vehicle_id.data.attributes.plate,
        H: controll.attributes.initial_km,
        I: controll.attributes.final_km,
        J: controll.attributes.final_km,
        K: controll.attributes.origin,
        L: controll.attributes.destination,
        M: controll.attributes.refuelling_status ? "Sim" : "Não",
        N: controll.attributes.refuel_qty.toString(),
        O: controll.attributes.refuel_unit_value.toString(),
        P: controll.attributes.refuel_total_value.toString(),
      });
    });

    // console.log(table);
    const finalData = [...title, ...subTitle1, ...subTitle2, ...table];
    tableSize = finalData.length;
    console.log(finalData);

    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "relatorio-registro-de-bordo");

    const workbookBlob = workbook2blob(wb);

    return addStyles(workbookBlob);
  };

  const addStyles = (workbookBlob) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        }); //styled global

        const styledTitle = {
          bold: true,
          fontColor: "ffffff",
          fill: "5b9bd5",
          horizontalAlignment: "center",
          verticalAlignment: "center",
        }

        sheet.range("A1:P2").merged(true).style(styledTitle); // Titulo

        const columns = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
        ];

        for (let i = 0; i < columns.length; i++) {
          sheet.column(columns[i]).width(30); // determinar o tamanho das células
        }

        const styleSubtitle = {
          bold: true,
          fontColor: "ffffff",
          fill: "5b9bd5",
        };

        sheet.row(3).height(20);
        sheet.row(4).height(20);
        sheet.range("A3:P3").merged(true).style(styleSubtitle);
        sheet.range("A4:P4").merged(true).style(styleSubtitle);

        sheet.row(5).style({
          bold: true,
          horizontalAlignment: "center"
        }); // Titulos da colunas em negrito e centralizar

        for (let i = 6; i <= tableSize; i++) {
          sheet.row(i).style("horizontalAlignment", "right"); //alinhar os dados a direita
        }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (<a href={urlFile} data={data} download={`controle-de-bordo-${new Date().toLocaleString()}`}>
    Exportar
  </a>);
};
