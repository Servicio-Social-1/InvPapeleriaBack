/// <reference types="pdfkit" />
export interface Cell {
    doc: PDFKit.PDFDocument;
    x: number;
    y: number;
    width: number;
    height: number;
}
