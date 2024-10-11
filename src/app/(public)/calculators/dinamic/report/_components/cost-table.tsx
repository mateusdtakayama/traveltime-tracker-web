import React from 'react'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import AddCostDialog from './add-cost'

interface Cost {
  date: string
  description: string
  details?: string
  responsibility: string
  quantity: number
  unitValue: number
  totalValue: number
}

interface CostTableProps {
  costs: Cost[]
  handleDeleteCost: (index: number) => void
  formatDate: (dateString: string) => string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleAddCost: (newCost: Cost) => void
}

const CostTable: React.FC<CostTableProps> = ({
  costs,
  handleDeleteCost,
  formatDate,
  isOpen,
  setIsOpen,
  handleAddCost,
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Estimativa de Custos
        </h2>
        <AddCostDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onAddCost={handleAddCost}
        />
      </div>
      <table className="min-w-full border mt-4">
        <thead>
          <tr>
            {[
              'Data',
              'Descrição',
              'Detalhes',
              'Responsabilidade',
              'Quantidade',
              'Valor Unitário',
              'Valor Total',
              'Ações',
            ].map((header) => (
              <th key={header} className="border-b px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {costs.map((cost, index) => (
            <tr key={index} className="border-b">
              <td className="border-b px-4 py-2 text-center">
                {formatDate(cost.date)}
              </td>
              <td className="border-b px-4 py-2 text-center">
                {cost.description}
              </td>
              <td className="border-b px-4 py-2 text-center">{cost.details}</td>
              <td className="border-b px-4 py-2 text-center">
                {cost.responsibility}
              </td>
              <td className="border-b px-4 py-2 text-center">
                {cost.quantity}
              </td>
              <td className="border-b px-4 py-2 text-center">
                R$ {cost.unitValue.toFixed(2)}
              </td>
              <td className="border-b px-4 py-2 text-center">
                R$ {cost.totalValue.toFixed(2)}
              </td>
              <td className="border-b px-4 py-2 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCost(index)}
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

export default CostTable
