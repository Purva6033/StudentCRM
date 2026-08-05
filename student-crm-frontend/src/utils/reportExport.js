import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportPDF = (title, headers, rows) => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 14, 20);

    autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 30
    });

    doc.save(`${title}.pdf`);

};

export const exportExcel = (title, data) => {

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        title
    );

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    saveAs(
        new Blob([excelBuffer]),
        `${title}.xlsx`
    );

};