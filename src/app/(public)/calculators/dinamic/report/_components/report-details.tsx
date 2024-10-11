import React from 'react'

interface ReportDetailsProps {
  cliente: string | null
  dataPeriodo: string | null
  consultor: string | null
  tipoAtendimento: string | null
  localMatriz: string | null
}

const ReportDetails: React.FC<ReportDetailsProps> = ({
  cliente,
  dataPeriodo,
  consultor,
  tipoAtendimento,
  localMatriz,
}) => {
  return (
    <div className="mt-4 text-neutral-700 dark:text-neutral-300">
      <p>
        <strong>Cliente:</strong> {cliente}
      </p>
      <p>
        <strong>Período:</strong> {dataPeriodo}
      </p>
      <p>
        <strong>Consultor:</strong> {consultor}
      </p>
      <p>
        <strong>Tipo de Atendimento:</strong> {tipoAtendimento}
      </p>
      <p>
        <strong>Local da Matriz:</strong> {localMatriz}
      </p>
    </div>
  )
}

export default ReportDetails
