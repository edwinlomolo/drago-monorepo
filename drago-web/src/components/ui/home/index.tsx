'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { loaders } from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

function LandingPage() {
  const { authLoading } = useContext(AppContext)

  return (
    <div className="grid justify-center content-center px-6 pt-14 lg:px-8">
      {authLoading ? (
        <div className="flex-1 content-center">
          <loaders.Preparing />
        </div>
      ) : (
        <div className="relative isolate lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-200 to-green-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="max-w-2xl">
            <div className="hidden sm:flex sm:mb-8 sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-yellow-900/10 hover:ring-yellow-900/20">
                We are in beta mode. You may experience breaking ui/ux changes
              </div>
            </div>
            <div className="text-center">
              <h1 className="font-bold tracking-light text-4xl sm:text-6xl">
                Drago - Rethinking business logistic
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Try our software tools for your online or physical stores, 3PLs, and Individual couriers
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Try now</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col py-8 mx-4 items-center w-full">
                      <Button onClick={() => signIn("google", {callbackUrl: "/dashboard"})} variant="outline" className="gap-4 text-md font-semibold">
                        <FcGoogle size={32} /> Login with Google
                      </Button>
                      <p className="mt-4 text-slate-600 text-sm">By signing-in, you agree to our <a className="underline" href="/privacy-policy">Privacy Policy</a>.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
