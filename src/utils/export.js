import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPNG = async (elementId, filename = 'schedule.png') => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const canvas = await html2canvas(element, {
    backgroundColor: '#FFF8E7',
    scale: 2, // High quality
  });
  
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

export const exportToPDF = async (elementId, filename = 'schedule.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const canvas = await html2canvas(element, {
    backgroundColor: '#FFF8E7',
    scale: 2,
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};
