import { data } from "./data";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { ReportControllBoardData } from "./types";

type ExampleComponentProps = {
  data: ReportControllBoardData[];
};

export const ExampleComponent = ({ data }: ExampleComponentProps) => {
  let tableSize: number;

  const createDownloadData = () => {
    handleExport().then((url: any) => {
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.download = "relatorio-registro-de-bordo";
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length);

    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
      //console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const workbook2blob = (workbook: XLSX.WorkBook) => {
    const wopts: any = {
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

    data.forEach((controll: any) => {
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

  const dataInfo = {
    titleRange: "A1:P2",
  };

  const addStyles = (workbookBlob: Blob) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook: any) => {
      workbook.sheets().forEach((sheet: any) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          fontColor: "ffffff",
          fill: "5b9bd5",
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

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
          sheet.column(columns[i]).width(20); // determinar o tamanho das células
        }

        const styleSubtitle = {
          bold: true,
          fontColor: "ffffff",
          fill: "5b9bd5",
        };

        sheet.range("A3:P3").merged(true).style(styleSubtitle);
        sheet.range("A4:P4").merged(true).style(styleSubtitle);

        // sheet.row(3).style(styleSubtitle);
        // sheet.row(4).style(styleSubtitle);

        sheet.row(5).style("bold", true); // Titulos da colunas em negrito

        for (let i = 6; i <= tableSize; i++) {
          sheet.row(i).style("horizontalAlignment", "right"); //alinhar os dados a direita
        }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob: any) => URL.createObjectURL(workbookBlob));
    });
  };

  return <button onClick={() => createDownloadData()}>Exportar</button>;
};
