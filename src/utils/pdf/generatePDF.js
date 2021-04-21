import PdfPrinter from 'pdfmake';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fs from 'fs-extra';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const { createWriteStream } = fs;

export const asyncPipeline = promisify(pipeline);

const generatePDF = async (data) => {
  try {
    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };
    const printer = new PdfPrinter(fonts);
    const docDefinition = {
      content: [
        { text: 'Your booking info', style: 'header' },
        {
          ul: [
            `name: ${data.firstName}`,
            `last name: ${data.lastName}`,
            `email: ${data.email}`,
            `arrival time: ${data.arrivalTime}`,
            `booking id: ${data._id}`,
          ],
        },
      ],
    };
    const pdfSourceStream = printer.createPdfKitDocument(docDefinition);
    //& return stream

    // const pdfPath = join(
    //   dirname(fileURLToPath(import.meta.url)),
    //   `../../data/pdf/${data._id}.pdf`
    // );
    pdfSourceStream.end();
    return pdfSourceStream;

    // await asyncPipeline(pdfSourceStream, createWriteStream(pdfPath));
  } catch (error) {
    console.log('genera pdf errore: ', error);
    throw new Error('Errore durante la creazione del PDF');
  }
};

export default generatePDF;
