"use client"
import { useState, useRef } from 'react'
import { Download } from 'lucide-react'

const slugifyFilename = (value) =>
  (value || 'legal-document')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const TextBoxWrapper = ({ children, title = 'Legal Document', fileName }) => {
  const [loading, setLoading] = useState(false)
  const contentRef = useRef(null)

  const handleDownload = async () => {
    setLoading(true)

    try {
      const { jsPDF } = await import('jspdf')

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      const marginLeft = 20
      const marginRight = 20
      const marginTop = 20
      const marginBottom = 20

      const usableWidth = pageWidth - marginLeft - marginRight
      let cursorY = marginTop

      const addPageIfNeeded = (neededHeight) => {
        if (cursorY + neededHeight > pageHeight - marginBottom) {
          doc.addPage()
          cursorY = marginTop
        }
      }

      doc.setFillColor(48, 76, 97)
      doc.rect(0, 0, pageWidth, 40, 'F')

      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(20)
      doc.text(title, marginLeft, 26)

      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
      doc.text(`CraftWise GmbH - ${today}`, marginLeft, 35)

      cursorY = 50

      const sections =
        contentRef.current?.querySelectorAll('[data-section]') ?? []

      sections.forEach((section) => {
        const titleEl = section.querySelector('[data-title]')
        const descEl = section.querySelector('[data-desc]')
        if (!titleEl || !descEl) return

        const sectionTitle = titleEl.textContent.trim()
        const desc = descEl.textContent.trim()

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        const titleLines = doc.splitTextToSize(sectionTitle, usableWidth)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        const descLines = doc.splitTextToSize(desc, usableWidth)

        const blockHeight =
          titleLines.length * 5 +
          descLines.length * 5 +
          6

        addPageIfNeeded(blockHeight)

        doc.setTextColor(48, 76, 97)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.text(titleLines, marginLeft, cursorY)

        cursorY += titleLines.length * 5 + 5

        doc.setTextColor(60, 60, 60)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(10)
        doc.text(descLines, marginLeft, cursorY)

        cursorY += descLines.length * 5 + 5
      })

      const totalPages = doc.internal.getNumberOfPages()

      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)

        doc.setDrawColor(201, 214, 243)
        doc.setLineWidth(0.3)
        doc.line(
          marginLeft,
          pageHeight - 12,
          pageWidth - marginRight,
          pageHeight - 12
        )

        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)

        doc.text(
          'CraftWise GmbH - support@craft-wise.de',
          marginLeft,
          pageHeight - 7
        )

        doc.text(
          `Page ${i} of ${totalPages}`,
          pageWidth - marginRight,
          pageHeight - 7,
          { align: 'right' }
        )
      }

      doc.save(`${slugifyFilename(fileName || title)}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      window.print()
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='sec-padding-top mx-6'>
      <div
        ref={contentRef}
        style={{ display: 'none' }}
        aria-hidden='true'
      >
        {children}
      </div>

      <div className='container mx-auto px-6 rounded-[30px] lg:!p-[30px] !p-[15px] flex flex-col gap-6'>
        {children}
      </div>

      <div className='container mx-auto px-6 text-center no-print'>
        <button
          onClick={handleDownload}
          disabled={loading}
          className='inline-block text-[16px] font-semibold px-10 py-4 text-black border border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 mt-20 cursor-pointer disabled:opacity-60'
        >
          <div className='flex items-center gap-2'>
            <Download className='w-5' />
            {loading ? 'Generating...' : 'Download'}
          </div>
        </button>
      </div>
    </section>
  )
}

export default TextBoxWrapper
