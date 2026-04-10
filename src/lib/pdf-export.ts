// PDF鑑定書の生成（プレミアム機能）
import jsPDF from 'jspdf';

interface PDFOptions {
  title: string;
  serviceName: string;
  headline: string;
  sections: { label: string; content: string }[];
  date: string;
}

export function exportToPDF(options: PDFOptions): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ヘッダー
  pdf.setFillColor(212, 165, 182);
  pdf.rect(0, 0, pageWidth, 15, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.text('Oracle Portal - AI Fortune Reading', margin, 10);
  y = 25;

  // タイトル
  pdf.setTextColor(90, 85, 96);
  pdf.setFontSize(20);
  pdf.text(options.serviceName, margin, y);
  y += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(142, 138, 148);
  pdf.text(options.date, margin, y);
  y += 12;

  // ヘッドライン
  if (options.headline) {
    pdf.setFillColor(252, 238, 245);
    pdf.rect(margin, y - 5, contentWidth, 15, 'F');
    pdf.setFontSize(12);
    pdf.setTextColor(90, 85, 96);
    const headlineLines = pdf.splitTextToSize(options.headline, contentWidth - 10);
    pdf.text(headlineLines, margin + 5, y + 3);
    y += 18;
  }

  if (options.title) {
    pdf.setFontSize(14);
    pdf.setTextColor(181, 164, 214);
    pdf.text(options.title, margin, y);
    y += 8;
  }

  // セクション
  pdf.setFontSize(10);
  for (const section of options.sections) {
    if (y > 260) {
      pdf.addPage();
      y = margin;
    }

    // セクションラベル
    pdf.setTextColor(212, 165, 182);
    pdf.setFontSize(11);
    pdf.text(`■ ${section.label}`, margin, y);
    y += 6;

    // セクション内容（**を除去）
    pdf.setTextColor(90, 85, 96);
    pdf.setFontSize(9);
    const cleanContent = section.content.replace(/\*\*/g, '');
    const lines = pdf.splitTextToSize(cleanContent, contentWidth);

    for (const line of lines) {
      if (y > 275) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += 5;
    }
    y += 4;
  }

  // フッター
  const pageCount = (pdf as any).internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(142, 138, 148);
    pdf.text(
      `oracle-portal.vercel.app | Page ${i}/${pageCount}`,
      pageWidth / 2,
      290,
      { align: 'center' }
    );
  }

  pdf.save(`${options.serviceName}_${options.date}.pdf`);
}
