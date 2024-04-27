import { LoaderCircle } from 'lucide-react'

const Preparing = () => <p className="text-center font-extrabold text-md">Preparing...</p>
const Loading = () => <p className="text-center font-extrabold text-md">Loading...</p>
const Submitting = () => <LoaderCircle className="h-4 w-4 animate-spin" />

export const loaders = {
  Loading,
  Preparing,
  Submitting,
}
