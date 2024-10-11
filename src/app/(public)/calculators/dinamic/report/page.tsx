'use client'
import React, { useState } from 'react'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ReportDetails from './_components/report-details'
import CostTable from './_components/cost-table'
import TravelTable, { TravelHour } from './_components/travel-table'
import TotalValuesTable from './_components/total-values-table'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface Cost {
  description: string
  details?: string
  responsibility: string
  quantity: number
  unitValue: number
  date: string
  totalValue: number
}

const Relatorio: React.FC = () => {
  const searchParams = useSearchParams()
  const cliente = searchParams.get('cliente')
  const dataPeriodo = searchParams.get('dataPeriodo')
  const consultor = searchParams.get('consultor')
  const tipoAtendimento = searchParams.get('tipoAtendimento')
  const localMatriz = searchParams.get('localMatriz')
  const [travelHours, setTravelHours] = useState<TravelHour[]>([])
  const [isCostOpen, setIsCostOpen] = useState(false)
  const [isTravelOpen, setIsTravelOpen] = useState(false)

  const [costs, setCosts] = useState<Cost[]>([])

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
  }

  const sortedCosts = [...costs].sort((a, b) => {
    return a.date.localeCompare(b.date)
  })

  const handleAddCost = (newCost: Cost) => {
    setCosts([...costs, newCost])
  }

  const handleDeleteCost = (index: number) => {
    setCosts(costs.filter((_, i) => i !== index))
  }

  const handleAddTravelHour = (newTravelHour: TravelHour) => {
    setTravelHours([...travelHours, newTravelHour])
  }

  const handleDeleteTravelHour = (index: number) => {
    setTravelHours(travelHours.filter((_, i) => i !== index))
  }

  const totalCosts = sortedCosts.reduce((sum, cost) => sum + cost.totalValue, 0)
  const totalTravelHours = travelHours.reduce(
    (sum, travelHour) => sum + travelHour.totalCost,
    0
  )

  const generatePDF = async () => {
    try {
      const element = document.getElementById('report-content')
      if (!element) throw new Error('Report content not found')

      const canvas = await html2canvas(element)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio)
      pdf.save('relatorio.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <ContentLayout title="Relatório">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/calculators">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Calculadoras</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Relatório</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6" id="report-content">
        <ReportDetails
          cliente={cliente}
          dataPeriodo={dataPeriodo}
          consultor={consultor}
          tipoAtendimento={tipoAtendimento}
          localMatriz={localMatriz}
        />
        <CostTable
          costs={sortedCosts}
          handleDeleteCost={handleDeleteCost}
          formatDate={formatDate}
          isOpen={isCostOpen}
          setIsOpen={setIsCostOpen}
          handleAddCost={handleAddCost}
        />
        <TravelTable
          travelHours={travelHours}
          handleDeleteTravelHour={handleDeleteTravelHour}
          formatDate={formatDate}
          isOpen={isTravelOpen}
          setIsOpen={setIsTravelOpen}
          handleAddTravelHour={handleAddTravelHour}
        />
        <TotalValuesTable
          totalCosts={totalCosts}
          totalTravelHours={totalTravelHours}
        />
      </div>
      <button
        onClick={generatePDF}
        className="mt-4 bg-black text-white p-2 rounded"
      >
        Gerar PDF
      </button>
    </ContentLayout>
  )
}

export default Relatorio
