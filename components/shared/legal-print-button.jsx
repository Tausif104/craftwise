"use client";

import { useState } from "react";
import { Download } from "lucide-react";

function slugifyFilename(value) {
  return (value || "legal-document")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNodeText(node) {
  return node.textContent?.replace(/\s+/g, " ").trim() || "";
}

function extractTableRows(table) {
  return Array.from(table.querySelectorAll("tr"))
    .map((row) =>
      Array.from(row.querySelectorAll("th, td"))
        .map((cell) => getNodeText(cell))
        .filter(Boolean)
    )
    .filter((row) => row.length);
}

function collectPdfBlocks(root) {
  const contentRoot = root.querySelector(".legal-doc") || root;
  const blocks = [];

  const walk = (node) => {
    if (!node?.tagName) return;

    const tag = node.tagName.toLowerCase();

    if (tag === "table") {
      const rows = extractTableRows(node);
      if (rows.length) {
        blocks.push({ type: "table", rows });
      }
      return;
    }

    if (tag.startsWith("h")) {
      const text = getNodeText(node);
      if (text) blocks.push({ type: "heading", text });
      return;
    }

    if (tag === "p") {
      const text = getNodeText(node);
      if (text) blocks.push({ type: "body", text });
      return;
    }

    if (tag === "ul" || tag === "ol") {
      Array.from(node.children)
        .filter((child) => child.tagName?.toLowerCase() === "li")
        .forEach((item, index) => {
          const text = getNodeText(item);
          if (!text) return;
          blocks.push({
            type: "listItem",
            ordered: tag === "ol",
            marker: tag === "ol" ? `${index + 1}.` : null,
            text,
          });
        });
      return;
    }

    Array.from(node.children).forEach(walk);
  };

  walk(contentRoot);
  return blocks;
}

export default function LegalPrintButton({ title = "Legal Document", fileName, downloadLabel = "Download", loadingLabel = "Generating..." }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const printableRoot = document.getElementById("printable-content");
      if (!printableRoot) throw new Error("Printable content not found");

      const blocks = collectPdfBlocks(printableRoot);
      if (!blocks.length) throw new Error("No printable content found");

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginLeft = 20;
      const marginRight = 20;
      const marginTop = 20;
      const marginBottom = 20;
      const usableWidth = pageWidth - marginLeft - marginRight;
      let cursorY = 50;

      const addPageIfNeeded = (neededHeight) => {
        if (cursorY + neededHeight > pageHeight - marginBottom) {
          doc.addPage();
          cursorY = marginTop;
        }
      };

      const LINE_FACTOR = 1.4;
      const ptToMm = (pt) => pt * 0.352778;

      const renderTextBlock = (text, options = {}) => {
        const {
          font = "normal",
          fontSize = 10,
          color = [71, 84, 103],
          spacingBefore = 0,
          spacingAfter = 4,
          indent = 0,
          marker = null,
          bullet = false,
        } = options;

        doc.setFont("helvetica", font);
        doc.setFontSize(fontSize);
        doc.setTextColor(...color);

        const lineHeight = ptToMm(fontSize) * LINE_FACTOR;
        // Size the hanging gutter to the marker so long numbers never overprint text.
        const gutter = marker ? Math.max(indent, doc.getTextWidth(marker) + 2) : indent;
        const lines = doc.splitTextToSize(text, usableWidth - gutter);
        const maxY = pageHeight - marginBottom;

        // Leading gap only if the first line also fits; a page break cancels it.
        if (cursorY + spacingBefore + lineHeight > maxY) {
          doc.addPage();
          cursorY = marginTop;
        } else {
          cursorY += spacingBefore;
        }

        // Draw line-by-line so a block taller than the page splits across pages
        // instead of overflowing the footer. Font/fill state persists across pages.
        lines.forEach((line, index) => {
          if (cursorY + lineHeight > maxY) {
            doc.addPage();
            cursorY = marginTop;
          }
          if (index === 0) {
            if (marker) {
              doc.text(marker, marginLeft, cursorY);
            } else if (bullet) {
              doc.setFillColor(...color);
              doc.circle(marginLeft + 1.4, cursorY - ptToMm(fontSize) * 0.3, 0.7, "F");
            }
          }
          doc.text(line, marginLeft + gutter, cursorY);
          cursorY += lineHeight;
        });

        // Trailing space is not part of the fit test, so no premature page break.
        cursorY += spacingAfter;
      };

      const renderTableBlock = (rows) => {
        const normalizedRows = rows.filter((row) => row.length);
        if (!normalizedRows.length) return;

        const columnCount = Math.max(...normalizedRows.map((row) => row.length));
        const columnWidth = usableWidth / columnCount;
        const preparedRows = normalizedRows.map((row) =>
          Array.from({ length: columnCount }, (_, index) => row[index] || "")
        );

        preparedRows.forEach((row, rowIndex) => {
          doc.setFont("helvetica", rowIndex === 0 ? "bold" : "normal");
          doc.setFontSize(9);

          const cellLines = row.map((cell) =>
            doc.splitTextToSize(cell, Math.max(columnWidth - 4, 12))
          );
          const rowHeight = Math.max(...cellLines.map((lines) => lines.length), 1) * 4.5 + 4;

          addPageIfNeeded(rowHeight + 2);

          let cellX = marginLeft;
          row.forEach((_, cellIndex) => {
            doc.setFillColor(rowIndex === 0 ? 232 : 248, rowIndex === 0 ? 239 : 251, 255);
            doc.setDrawColor(201, 214, 243);
            doc.setLineWidth(0.2);
            doc.rect(cellX, cursorY - 3.5, columnWidth, rowHeight, "FD");

            doc.setTextColor(40, 40, 40);
            doc.text(cellLines[cellIndex], cellX + 2, cursorY);
            cellX += columnWidth;
          });

          cursorY += rowHeight + 2;
        });

        cursorY += 3;
      };

      doc.setFillColor(48, 76, 97);
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(title, marginLeft, 26);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const today = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      doc.text(`CraftWise GmbH - ${today}`, marginLeft, 35);

      blocks.forEach((block) => {
        if (block.type === "heading") {
          renderTextBlock(block.text, {
            font: "bold",
            fontSize: 12,
            color: [10, 27, 40],
            spacingBefore: 6,
            spacingAfter: 3,
          });
          return;
        }

        if (block.type === "listItem") {
          renderTextBlock(block.text, {
            indent: 6,
            marker: block.marker,
            bullet: !block.ordered,
            spacingAfter: 2,
          });
          return;
        }

        if (block.type === "table") {
          renderTableBlock(block.rows);
          return;
        }

        renderTextBlock(block.text);
      });

      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(201, 214, 243);
        doc.setLineWidth(0.3);
        doc.line(marginLeft, pageHeight - 12, pageWidth - marginRight, pageHeight - 12);

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("CraftWise GmbH - support@craft-wise.de", marginLeft, pageHeight - 7);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - marginRight, pageHeight - 7, {
          align: "right",
        });
      }

      doc.save(`${slugifyFilename(fileName || title)}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      window.print();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex justify-center no-print">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center gap-2 rounded-full border border-primary bg-white px-8 py-3 font-medium text-black shadow-sm transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Download size={20} />
        {loading ? loadingLabel : downloadLabel}
      </button>
    </div>
  );
}
