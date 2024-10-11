'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface FormData {
  cliente: string
  dataPeriodo: string
  consultor: string
  tipoAtendimento: string
  localMatriz: string
}

export default function Formulario() {
  const [data, setData] = useState<FormData>({
    cliente: '',
    dataPeriodo: '',
    consultor: '',
    tipoAtendimento: '',
    localMatriz: '',
  })

  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const query = new URLSearchParams({
      cliente: data.cliente,
      dataPeriodo: data.dataPeriodo,
      consultor: data.consultor,
      tipoAtendimento: data.tipoAtendimento,
      localMatriz: data.localMatriz,
    }).toString()

    router.push(`/calculators/dinamic/report?${query}`)
  }

  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Formulário de Atendimento
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Preencha os valores para gerar o relatório
            </p>
            <form className="my-8" onSubmit={onSubmit}>
              <div className="flex flex-col mb-4">
                <Label htmlFor="cliente">Cliente</Label>
                <Input
                  id="cliente"
                  value={data.cliente}
                  onChange={(e) =>
                    setData({ ...data, cliente: e.target.value })
                  }
                  placeholder="Nome do Cliente"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <Label htmlFor="dataPeriodo">Período</Label>
                <Input
                  id="dataPeriodo"
                  value={data.dataPeriodo}
                  onChange={(e) =>
                    setData({ ...data, dataPeriodo: e.target.value })
                  }
                  placeholder="Ex: 09/09 a 14/09"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <Label htmlFor="consultor">Consultor</Label>
                <Input
                  id="consultor"
                  value={data.consultor}
                  onChange={(e) =>
                    setData({ ...data, consultor: e.target.value })
                  }
                  placeholder="Nome do Consultor"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <Label htmlFor="tipoAtendimento">Tipo de Atendimento</Label>
                <Input
                  id="tipoAtendimento"
                  value={data.tipoAtendimento}
                  onChange={(e) =>
                    setData({ ...data, tipoAtendimento: e.target.value })
                  }
                  placeholder="Ex: Treinamento Operacional"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <Label htmlFor="localMatriz">Local da Matriz</Label>
                <Input
                  id="localMatriz"
                  value={data.localMatriz}
                  onChange={(e) =>
                    setData({ ...data, localMatriz: e.target.value })
                  }
                  placeholder="Local da Matriz"
                  required
                />
              </div>
              <Button type="submit" variant="outline">
                Gerar Relatório &rarr;
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
