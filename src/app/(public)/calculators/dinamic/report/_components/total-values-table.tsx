import React from 'react'

interface TotalValuesTableProps {
  totalCosts: number
  totalTravelHours: number
}

const TotalValuesTable: React.FC<TotalValuesTableProps> = ({
  totalCosts,
  totalTravelHours,
}) => {
  const grandTotal = totalCosts + totalTravelHours

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Valores Totais
      </h3>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Descrição</th>
            <th className="border px-4 py-2 text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Total dos Custos</td>
            <td className="border px-4 py-2 text-right">
              {totalCosts.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              Total das Horas de Deslocamento
            </td>
            <td className="border px-4 py-2 text-right">
              {totalTravelHours.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Total Geral</td>
            <td className="border px-4 py-2 font-bold text-right">
              {grandTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TotalValuesTable
