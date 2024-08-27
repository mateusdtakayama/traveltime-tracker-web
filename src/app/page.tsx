import { Metadata } from "next"
import Image from "next/image"

import { ModeToggle } from "@/components/system/theme-drop-down-menu"
import { HDRForm } from "@/components/system/hdv-form"

export const metadata: Metadata = {
  title: "HDV Calculator",
  description: "Calcuie o HDV com facilidade!",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <ModeToggle />
        <div className="relative hidden flex-col bg-muted p-10 text-white dark:border-r lg:flex h-screen">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
          <div className="relative z-20 mt-auto flex items-center justify-center w-full">
            <Image src="/logo.svg" alt="HDR Logo" width={500} height={256} priority={true} />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Não preciso de frase motivacional, preciso de café.&rdquo;

              </p>
              <footer className="text-sm">Autor Desconhecido</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
            <HDRForm />
          </div>
        </div>
      </div>
    </>
  )
}