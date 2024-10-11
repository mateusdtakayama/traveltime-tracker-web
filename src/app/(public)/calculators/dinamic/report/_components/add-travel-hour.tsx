import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import dayjs from 'dayjs'
import { useToast } from '@/components/ui/use-toast'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const schema = z.object({
  date: z.string().nonempty('Data é obrigatória'),
  startTime: z.string().nonempty('Horário de início é obrigatório'),
  endTime: z.string().nonempty('Horário de fim é obrigatório'),
  hourlyRate: z.number().min(0, 'Valor da hora deve ser maior ou igual a 0'),
})

interface FormData {
  date: string
  startTime: string
  endTime: string
  hourlyRate: number
}

interface AddTravelHourDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddTravelHour: (
    travelHour: FormData & { totalCost: number; totalTime: string }
  ) => void
}

const AddTravelHourDialog: React.FC<AddTravelHourDialogProps> = ({
  isOpen,
  onOpenChange,
  onAddTravelHour,
}) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: '',
      startTime: '',
      endTime: '',
      hourlyRate: 0,
    },
  })

  const onSubmit = (data: FormData) => {
    const { date, startTime, endTime, hourlyRate } = data

    const start = dayjs(`${date} ${startTime}`)
    const end = dayjs(`${date} ${endTime}`)
    const hours = end.diff(start, 'hour', true)
    const total = hours * hourlyRate

    const formattedTotal = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total)

    const formattedHours =
      Math.floor(hours) >= 10 ? `${Math.floor(hours)}` : `0${Math.floor(hours)}`

    const formattedMinutes =
      Math.floor(end.diff(start, 'minute') % 60) >= 10
        ? `${Math.floor(end.diff(start, 'minute') % 60)}`
        : `0${Math.floor(end.diff(start, 'minute') % 60)}`

    const formattedTime = `${formattedHours}:${formattedMinutes}`

    onAddTravelHour({ ...data, totalCost: total, totalTime: formattedTime })
    methods.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Horas de Deslocamento</DialogTitle>
          <DialogDescription>
            Preencha os detalhes das horas de deslocamento.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <FormItem>
                <FormLabel htmlFor="date">Data</FormLabel>
                <FormControl>
                  <Input id="date" type="date" {...methods.register('date')} />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.date?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="startTime">Horário de Início</FormLabel>
                <FormControl>
                  <Input
                    id="startTime"
                    type="time"
                    {...methods.register('startTime')}
                  />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.startTime?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="endTime">Horário de Fim</FormLabel>
                <FormControl>
                  <Input
                    id="endTime"
                    type="time"
                    {...methods.register('endTime')}
                  />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.endTime?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="hourlyRate">Valor da Hora</FormLabel>
                <FormControl>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="Valor por hora"
                    {...methods.register('hourlyRate', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.hourlyRate?.message}
                </FormMessage>
              </FormItem>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                Adicionar
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

export default AddTravelHourDialog
