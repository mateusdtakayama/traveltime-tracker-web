import React from 'react'
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
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  details: z.string().optional(),
  responsibility: z.string().min(1, 'Responsabilidade é obrigatória'),
  quantity: z.number().min(1, 'Quantidade deve ser maior que 0'),
  unitValue: z.number().min(0, 'Valor unitário deve ser maior ou igual a 0'),
  date: z.string().nonempty('Data é obrigatória'),
})

interface FormData {
  description: string
  details?: string
  responsibility: string
  quantity: number
  unitValue: number
  date: string
}

interface AddCostDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddCost: (cost: FormData & { totalValue: number }) => void
}

const AddCostDialog: React.FC<AddCostDialogProps> = ({
  isOpen,
  onOpenChange,
  onAddCost,
}) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      details: '',
      responsibility: '',
      quantity: 1,
      unitValue: 0,
      date: '',
    },
  })

  const onSubmit = (data: FormData) => {
    const totalValue = data.quantity * data.unitValue
    onAddCost({ ...data, totalValue })
    methods.reset()
    onOpenChange(false)
  }

  const handleUnitValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(',', '.')
    methods.setValue('unitValue', parseFloat(value) || 0)
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
          <DialogTitle>Adicionar Custo</DialogTitle>
          <DialogDescription>Preencha os detalhes do custo.</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="date">Data</FormLabel>
              <FormControl>
                <Input id="date" type="date" {...methods.register('date')} />
              </FormControl>
              <FormDescription>Selecione a data do custo.</FormDescription>
              <FormMessage>
                {methods.formState.errors.date?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="Descrição"
                  {...methods.register('description')}
                />
              </FormControl>
              <FormDescription>Insira uma breve descrição.</FormDescription>
              <FormMessage>
                {methods.formState.errors.description?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="details">Detalhes</FormLabel>
              <FormControl>
                <Input
                  id="details"
                  placeholder="Detalhes"
                  {...methods.register('details')}
                />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.details?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="responsibility">Responsabilidade</FormLabel>
              <FormControl>
                <Input
                  id="responsibility"
                  placeholder="Responsabilidade"
                  {...methods.register('responsibility')}
                />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.responsibility?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="quantity">Quantidade</FormLabel>
              <FormControl>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Quantidade"
                  {...methods.register('quantity', { valueAsNumber: true })}
                />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.quantity?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel htmlFor="unitValue">Valor Unitário</FormLabel>
              <FormControl>
                <Input
                  id="unitValue"
                  type="text"
                  placeholder="Valor Unitário"
                  onChange={handleUnitValueChange}
                />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.unitValue?.message}
              </FormMessage>
            </FormItem>

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

export default AddCostDialog
