'use client'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from '../ui/button'
import { z } from 'zod'
import { Copy } from 'lucide-react'
import { useToast } from '../ui/use-toast'

const HDRFormSchema = z
  .object({
    startTime: z.string().refine((val) => val !== '', {
      message: 'Horário inicial é obrigatório',
    }),
    endTime: z
      .string()
      .refine((val) => val !== '', { message: 'Horário final é obrigatório' }),
    hourValue: z.string().refine((val) => parseFloat(val) > 0, {
      message: 'Valor por hora deve ser maior que 0',
    }),
  })
  .refine(
    (data) => {
      const start = dayjs(`2024-01-01 ${data.startTime}`)
      const end = dayjs(`2024-01-01 ${data.endTime}`)
      return end.isAfter(start)
    },
    {
      message: 'O horário final deve ser maior que o horário inicial',
      path: ['endTime'],
    }
  )

type HDRFormInputs = z.infer<typeof HDRFormSchema>

export function HDRForm() {
  dayjs().format()
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [totalHours, setTotalHours] = useState<string>('')
  const [totalValue, setTotalValue] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HDRFormInputs>({
    resolver: zodResolver(HDRFormSchema),
  })

  const onSubmit = (data: HDRFormInputs) => {
    const { startTime, endTime, hourValue } = data

    const start = dayjs(`2024-01-01 ${startTime}`)
    const end = dayjs(`2024-01-01 ${endTime}`)
    const hours = end.diff(start, 'hour', true)
    const total = hours * parseFloat(hourValue)

    const formattedTotal = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total)

    const formattedHours = `${end.diff(start, 'hour')}:${
      end.diff(start, 'minute') % 60
    } `

    setTotalHours(formattedHours)
    setTotalValue(formattedTotal)
    setOpen(true)
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Calculadora Estática
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Preencha os valores para calcular o valor da viagem
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="startTime">Horário inicial</Label>
            <Input
              id="startTime"
              {...register('startTime')}
              placeholder="08:00"
              type="time"
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm">{errors.startTime.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="endTime">Horário final</Label>
            <Input
              id="endTime"
              {...register('endTime')}
              placeholder="17:00"
              type="time"
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm">{errors.endTime.message}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="hourValue">Valor da hora</Label>
          <Input
            id="hourValue"
            {...register('hourValue')}
            placeholder="30,00"
            type="number"
            step="0.01"
          />
          {errors.hourValue && (
            <p className="text-red-500 text-sm">{errors.hourValue.message}</p>
          )}
        </LabelInputContainer>

        <Button type="submit" variant="outline">
          Calcular &rarr;
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="hidden">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resultado</DialogTitle>
            <DialogDescription>
              Confira os valores calculados abaixo.
            </DialogDescription>
          </DialogHeader>
          <ResultDisplay
            totalHours={totalHours}
            totalValue={totalValue}
            toast={toast}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  )
}

function ResultDisplay({
  totalHours,
  totalValue,
  toast,
}: {
  totalHours: string
  totalValue: string
  toast: any
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Total de Horas:</span>
        <div className="flex justify-center items-center gap-2">
          <span className="font-bold">
            {totalHours} <h3></h3>
          </span>
          <CopyToClipboard text={totalHours}>
            <Button
              variant="ghost"
              className="outline-none"
              onClick={() => {
                toast({
                  description: 'Copiado para a área de transferência!',
                })
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Valor Total:</span>
        <div className="flex justify-center items-center gap-2">
          <span className="font-bold">{totalValue}</span>
          <CopyToClipboard text={totalValue}>
            <Button
              variant="ghost"
              className="outline-none"
              onClick={() => {
                toast({
                  description: 'Copiado para a área de transferência!',
                })
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  )
}
