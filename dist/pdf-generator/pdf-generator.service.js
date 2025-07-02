"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const path_1 = require("path");
const PDFTable = require("pdfkit-table");
const articles_service_1 = require("../articles/articles.service");
const article_exit_service_1 = require("../article-exit/article-exit.service");
let PdfGeneratorService = class PdfGeneratorService {
    constructor(articlesService, articleExitService) {
        this.articlesService = articlesService;
        this.articleExitService = articleExitService;
    }
    generatePdf(createPdfGeneratorDto) {
        const options = {
            entry: () => {
                return this.generateCustomArticleExitReportPDF(createPdfGeneratorDto);
            },
            exit: () => {
                return this.generateArticleExitReport(createPdfGeneratorDto);
            },
            inventory: () => {
                return this.generateInventoryReport();
            },
            default: () => {
                return Promise.reject(new Error('Not valid'));
            },
        };
        return options[createPdfGeneratorDto.type]
            ? options[createPdfGeneratorDto.type]()
            : options.default();
    }
    async generateInventoryReport() {
        const articles = await this.articlesService.findAll();
        const currDate = new Date();
        const pdfBuffer = await new Promise((resolve) => {
            const doc = new PDFTable.default({
                size: 'LETTER',
                bufferPages: true,
                margins: {
                    top: 100,
                    bottom: 50,
                    left: 30,
                    right: 30,
                },
            });
            const path = path_1.join(__dirname, '../assets/img/gobierno.png');
            const inventoryData = [
                {
                    headers: [
                        {
                            label: 'Id',
                            property: 'id',
                            width: 50,
                            align: 'center',
                        },
                        {
                            label: 'Descripción',
                            property: 'description',
                            width: 330,
                            align: 'center',
                        },
                        {
                            label: 'Stock',
                            property: 'stock',
                            width: 80,
                            align: 'center',
                        },
                        {
                            label: 'Tamaños',
                            property: 'size',
                            width: 80,
                            align: 'center',
                        },
                    ],
                    datas: articles.map(({ id, description, stock, size, ...rest }) => {
                        return {
                            id,
                            description,
                            stock,
                            size,
                        };
                    }),
                    options: {
                        title: `Lista de Artículos al ${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`,
                    },
                },
            ];
            inventoryData.forEach((table, index) => {
                doc.table(table, table.options);
            });
            doc.end();
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    async generateArticleExitReport(createPdfGeneratorDto) {
        const articleExit = await this.articleExitService.findById(createPdfGeneratorDto.id);
        const pdfBuffer = await new Promise((resolve) => {
            const doc = new PDFTable.default({
                size: 'LETTER',
                bufferPages: true,
                margins: {
                    top: 140,
                    bottom: 50,
                    left: 30,
                    right: 30,
                },
            });
            const fontBoldPath = path_1.join(__dirname, '../assets/fonts/SourceSansPro-Light.otf');
            doc.registerFont('Sans-Pro', fontBoldPath);
            const fontPath = path_1.join(__dirname, '../assets/fonts/SourceSansPro-Bold.otf');
            doc.registerFont('Sans-Pro-Bold', fontPath);
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date(articleExit.date));
            let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(new Date(articleExit.date));
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(articleExit.date));
            const formattedDate = `${da}-${mo}-${ye}`;
            doc.x = 30;
            const path = path_1.join(__dirname, '../assets/img/gobierno.png');
            const inventoryData = [
                {
                    headers: [
                        {
                            label: 'Id',
                            property: 'id',
                            width: 50,
                            align: 'center',
                        },
                        {
                            label: 'Descripción',
                            property: 'description',
                            width: 330,
                            align: 'center',
                        },
                        {
                            label: 'Cantidad',
                            property: 'amount',
                            width: 80,
                            align: 'center',
                        },
                        {
                            label: 'Tamaños',
                            property: 'size',
                            width: 80,
                            align: 'center',
                        },
                    ],
                    datas: articleExit.articleExitDetail.map(({ article, amount, ...rest }) => {
                        return {
                            id: article.id,
                            description: article.description,
                            amount: amount,
                            size: article.size,
                        };
                    }),
                },
            ];
            let page = 1;
            for (let index = 0; index < inventoryData[0].datas.length; index++) {
                if ((index % 24 === 0) && inventoryData[0].datas.length > 23) {
                    this.textInRow({ doc, text: `FECHA:`, x: 30, y: 120, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: formattedDate + '', x: 73, y: 120, width: 200, font: 'Sans-Pro' });
                    this.textInRow({ doc, text: `NÚMERO DE VALE:`, x: 440, y: 120, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: articleExit.id + '', x: 540, y: 120, width: 200, font: 'Sans-Pro' });
                    this.textInRow({ doc, text: `ÁREA SOLICITANTE:`, x: 30, y: 140, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: `PÁGINA: ${page}`, x: 440, y: 140, width: 200, font: 'Sans-Pro' });
                    this.textInRow({ doc, text: articleExit.area.name, x: 135, y: 140, width: 200, font: 'Sans-Pro' });
                    doc.x = 30;
                    doc.image(path, 55, 5, { height: 115, width: 490 });
                    doc.table({ headers: inventoryData[0].headers, datas: inventoryData[0].datas.slice(index, index + 24) });
                    this.textInRow({ doc, text: `SURTIDO POR`, x: 50, y: 580, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: `AUTORIZADO POR`, x: 240, y: 580, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: `RECIBIDO POR`, x: 450, y: 580, width: 200, font: 'Sans-Pro-Bold' });
                    this.createCell({ doc, height: 1, width: 150, x: 30, y: 640 });
                    this.createCell({ doc, height: 1, width: 150, x: 230, y: 640 });
                    this.createCell({ doc, height: 1, width: 150, x: 430, y: 640 });
                    this.textInRow({ doc, text: articleExit.user.name, x: 30, y: 680, width: 150, fontSize: 10, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: 'ING. MANUEL ALEJANDRO RAMOS PARRA', x: 230, y: 680, width: 150, fontSize: 10, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: articleExit.petitioner.name, x: 430, y: 680, width: 150, fontSize: 10, font: 'Sans-Pro-Bold' });
                    if (inventoryData[0].datas[index + 24]) {
                        doc.addPage();
                        page++;
                    }
                }
                else if (index % 24 === 0) {
                    this.textInRow({ doc, text: `FECHA:`, x: 30, y: 120, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: formattedDate + '', x: 73, y: 120, width: 200, font: 'Sans-Pro' });
                    this.textInRow({ doc, text: `NÚMERO DE VALE:`, x: 440, y: 120, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: articleExit.id + '', x: 540, y: 120, width: 200, font: 'Sans-Pro' });
                    this.textInRow({ doc, text: `ÁREA SOLICITANTE:`, x: 30, y: 140, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: `PÁGINA: ${page}`, x: 440, y: 140, width: 200, font: 'Sans-Pro' });
                    this.textInRow({ doc, text: articleExit.area.name, x: 135, y: 140, width: 200, font: 'Sans-Pro' });
                    doc.x = 30;
                    doc.image(path, 55, 5, { height: 115, width: 490 });
                    doc.table({ headers: inventoryData[0].headers, datas: inventoryData[0].datas.slice(0, 24) });
                    this.textInRow({ doc, text: `SURTIDO POR`, x: 50, y: 580, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: `AUTORIZADO POR`, x: 240, y: 580, width: 200, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: `RECIBIDO POR`, x: 450, y: 580, width: 200, font: 'Sans-Pro-Bold' });
                    this.createCell({ doc, height: 1, width: 150, x: 30, y: 640 });
                    this.createCell({ doc, height: 1, width: 150, x: 230, y: 640 });
                    this.createCell({ doc, height: 1, width: 150, x: 430, y: 640 });
                    this.textInRow({ doc, text: articleExit.user.name, x: 30, y: 680, width: 150, fontSize: 10, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: 'ING. MANUEL ALEJANDRO RAMOS PARRA', x: 230, y: 680, width: 150, fontSize: 10, font: 'Sans-Pro-Bold' });
                    this.textInRow({ doc, text: articleExit.petitioner.name, x: 430, y: 680, width: 150, fontSize: 10, font: 'Sans-Pro-Bold' });
                    page++;
                }
            }
            doc.y = 500;
            doc.end();
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    async generateCustomArticleExitReportPDF(createPdfGeneratorDto) {
        const pdfBuffer = await new Promise((resolve) => {
            const doc = new PDFDocument({
                size: 'LETTER',
                bufferPages: true,
            });
            const path = path_1.join(__dirname, '../assets/img/gobierno.png');
            doc.image(path, 0, 0);
            this.header(doc);
            this.descriptions(doc);
            this.articles(doc);
            this.signatures(doc);
            doc.end();
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    createCell({ doc, x, y, width, height }) {
        doc.lineJoin('miter').rect(x, y, width, height).stroke();
        return doc;
    }
    textInRow({ doc, text, x, y, fontSize = 12, font = 'Sans-Pro', width = 100, }) {
        doc.font(font);
        doc.fontSize(fontSize);
        doc.y = y;
        doc.x = x;
        doc.fillColor('black');
        doc.text(text, {
            paragraphGap: 5,
            indent: 5,
            align: 'justify',
            columns: 1,
            width,
        });
        return doc;
    }
    header(doc) {
        const width = 100;
        this.createCell({ doc, x: 500, y: 70, width, height: 80 });
        this.textInRow({ doc, x: 525, y: 75, text: 'Folio' });
        this.createCell({ doc, x: 500, y: 90, width, height: 1 });
        this.textInRow({ doc, x: 525, y: 95, text: '' });
        this.createCell({ doc, x: 500, y: 110, width, height: 1 });
        this.textInRow({ doc, x: 525, y: 115, text: 'Fecha' });
        this.createCell({ doc, x: 500, y: 130, width, height: 1 });
        this.createCell({ doc, x: 525, y: 130, width: 1, height: 20 });
        this.createCell({ doc, x: 550, y: 130, width: 1, height: 20 });
        this.textInRow({
            doc,
            x: 100,
            y: 102.5,
            text: 'VALE SALIDA DE ALMACEN',
            fontSize: 25,
            width: 350,
        });
    }
    descriptions(doc) {
        this.createCell({ doc, x: 10, y: 150, width: 265, height: 100 });
        this.textInRow({
            doc,
            x: 10,
            y: 155,
            text: 'Separar los artículos según la siguiente clasificación',
            width: 265,
        });
        this.createCell({ doc, x: 10, y: 170, width: 265, height: 1 });
        this.textInRow({
            doc,
            x: 40,
            y: 176,
            text: 'Material de oficina',
        });
        this.createCell({ doc, x: 10, y: 190, width: 265, height: 1 });
        this.textInRow({
            doc,
            x: 40,
            y: 196,
            text: 'Material de limpieza',
            width: 200,
        });
        this.createCell({ doc, x: 10, y: 210, width: 265, height: 1 });
        this.textInRow({
            doc,
            x: 40,
            y: 216,
            text: 'Material eléctrico',
        });
        this.createCell({ doc, x: 10, y: 230, width: 265, height: 1 });
        this.textInRow({
            doc,
            x: 40,
            y: 236,
            text: 'Varios',
        });
        this.createCell({ doc, x: 35, y: 170, width: 1, height: 80 });
        this.createCell({ doc, x: 275, y: 170, width: 325, height: 80 });
        this.textInRow({
            doc,
            x: 275,
            y: 175,
            text: 'Solicitante:',
            font: 'Times-Bold',
        });
        this.createCell({ doc, x: 275, y: 210, width: 325, height: 1 });
        this.textInRow({
            doc,
            x: 290,
            y: 215,
            text: 'Àrea:',
            font: 'Times-Bold',
        });
    }
    articles(doc) {
        this.createCell({ doc, x: 10, y: 250, width: 590, height: 20 });
        this.textInRow({
            doc,
            x: 180,
            y: 255,
            text: 'Artículo',
            font: 'Times-Bold',
        });
        this.textInRow({
            doc,
            x: 430,
            y: 255,
            text: 'Solicitados',
            font: 'Times-Bold',
        });
        this.textInRow({
            doc,
            x: 540,
            y: 255,
            text: 'Surtidos',
            font: 'Times-Bold',
        });
        this.createCell({ doc, x: 10, y: 270, width: 590, height: 20 });
        for (let i = 20; i < 340; i += 20) {
            this.createCell({ doc, x: 10, y: 270 + i, width: 590, height: 20 });
        }
        this.createCell({ doc, x: 60, y: 270, width: 1, height: 340 });
        this.textInRow({
            doc,
            x: 15,
            y: 275,
            text: 'Clave',
        });
        this.createCell({ doc, x: 400, y: 250, width: 1, height: 360 });
        this.textInRow({
            doc,
            x: 200,
            y: 275,
            text: 'Descripción',
        });
        this.createCell({ doc, x: 470, y: 270, width: 1, height: 340 });
        this.textInRow({
            doc,
            x: 410,
            y: 275,
            text: 'Cantidad',
        });
        this.createCell({ doc, x: 530, y: 250, width: 1, height: 360 });
        this.textInRow({
            doc,
            x: 480,
            y: 275,
            text: 'Unidad',
        });
        this.textInRow({
            doc,
            x: 535,
            y: 275,
            text: 'Cantidad',
        });
    }
    signatures(doc) {
        this.createCell({ doc, x: 10, y: 600, height: 80, width: 590 });
        this.textInRow({
            doc,
            x: 90,
            y: 625,
            text: 'Área solicitante',
            font: 'Times-Bold',
        });
        this.createCell({ doc, x: 250, y: 600, height: 80, width: 1 });
        this.textInRow({
            doc,
            x: 335,
            y: 625,
            text: 'Autorizó',
            font: 'Times-Bold',
        });
        this.createCell({ doc, x: 470, y: 600, height: 80, width: 1 });
        this.textInRow({
            doc,
            x: 510,
            y: 625,
            text: 'Recibió',
            font: 'Times-Bold',
        });
        this.textInRow({
            doc,
            x: 10,
            y: 645,
            text: 'Firma:',
            font: 'Times-Bold',
        });
        this.textInRow({
            doc,
            x: 10,
            y: 665,
            text: 'Nombre:',
            font: 'Times-Bold',
        });
        this.textInRow({
            doc,
            x: 275,
            y: 675,
            text: 'Ing. Manuel Alejandro Ramos Parra Área de Desarrollo y Control de Sistemas',
            font: 'Times-Bold',
            width: 150,
            fontSize: 8,
        });
        this.textInRow({
            doc,
            x: 475,
            y: 645,
            text: 'Fecha:',
            font: 'Times-Bold',
            width: 200,
        });
        this.textInRow({
            doc,
            x: 475,
            y: 665,
            text: 'Nombre:',
            font: 'Times-Bold',
            width: 200,
        });
        this.textInRow({
            doc,
            x: 475,
            y: 685,
            text: 'Firma:',
            font: 'Times-Bold',
            width: 200,
        });
    }
};
PdfGeneratorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService,
        article_exit_service_1.ArticleExitService])
], PdfGeneratorService);
exports.PdfGeneratorService = PdfGeneratorService;
//# sourceMappingURL=pdf-generator.service.js.map