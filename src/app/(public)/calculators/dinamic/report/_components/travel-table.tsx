import React from 'react'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import AddTravelHourDialog from './add-travel-hour'

export interface TravelHour {
  date: string
  startTime: string
  endTime: string
  hourlyRate: number
  totalCost: number
  totalTime: string
}

interface TravelTableProps {
  travelHours: TravelHour[]
  handleDeleteTravelHour: (index: number) => void
  formatDate: (dateString: string) => string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleAddTravelHour: (newTravelHour: TravelHour) => void
}

const TravelTable: React.FC<TravelTableProps> = ({
  travelHours,
  handleDeleteTravelHour,
  formatDate,
  isOpen,
  setIsOpen,
  handleAddTravelHour,
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Estimativa de Horas de Deslocamento
        </h2>
        <AddTravelHourDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onAddTravelHour={handleAddTravelHour}
        />
      </div>
      <table className="min-w-full border mt-4">
        <thead>
          <tr>
            {[
              'Data',
              'Horário de Início',
              'Horário de Fim',
              'Quantidade de Horas',
              'Valor da Hora',
              'Custo Total',
              'Ações',
            ].map((header) => (
              <th key={header} className="border-b px-4 py-2 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {travelHours.map((travelHour, index) => (
            <tr key={index} className="border-b">
              <td className="border-b px-4 py-2 text-center">
                {formatDate(travelHour.date)}
              </td>
              <td className="border-b px-4 py-2 text-center">
                {travelHour.startTime}
              </td>
              <td className="border-b px-4 py-2 text-center">
                {travelHour.endTime}
              </td>
              <td className="border-b px-4 py-2 text-center">
                {travelHour.totalTime}
              </td>
              <td className="border-b px-4 py-2 text-center">
                R$ {travelHour.hourlyRate.toFixed(2)}
              </td>
              <td className="border-b px-4 py-2 text-center">
                R$ {travelHour.totalCost.toFixed(2)}
              </td>
              <td className="border-b px-4 py-2 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTravelHour(index)}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TravelTable
