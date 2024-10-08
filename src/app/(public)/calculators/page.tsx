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

import { HDRForm } from '@/components/system/hdv-form'

export default function StaticCalculatorPage() {
  return (
    <ContentLayout title="Calculadora Estática">
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
          <BreadcrumbPage>Calculadora Estática</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <HDRForm />
    </ContentLayout>
  )
}
