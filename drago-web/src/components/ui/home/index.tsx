'use client'

import { useContext } from 'react'
import { AppContext } from '@/providers/app-provider'
import { loaders } from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { Package } from 'lucide-react'
import { signIn } from 'next-auth/react'

const marketingPoints = [
  "Create delivery",
  "Track delivery",
  "For business with 3PL provider or not",
  "For courier service providers or 3PLs",
  "For individual courier",
]

function LandingPage() {
  const { authLoading } = useContext(AppContext)

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {authLoading ? (
        <div className="flex-1 content-center">
          <loaders.Preparing />
        </div>
      ) : (
        <>
          <div className="hidden md:flex bg-green-900 flex items-stretch h-full w-full">
            <div className="self-center w-full mx-4 my-4">
              <h1 className="text-white font-extrabold tracking-light text-4xl md:text-6xl lg:text-8xl">
                Drago
              </h1>
              <ul className="list-none mx-4">
                {marketingPoints.map((item, i) => (
                  <li className="flex flex-row gap-2 my-4 md:text-lg lg:text-2xl text-white" key={i}><Package /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-stretch w h-full w-full">
            <div className="self-center mx-auto">
              <Button onClick={() => signIn("google", {callbackUrl: "/dashboard"})} variant="outline" className="gap-4 text-md font-semibold">
                <FcGoogle size={32} /> Login with Google
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LandingPage
