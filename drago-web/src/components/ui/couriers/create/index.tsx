'use client'

import CreateCourierForm from '@/components/form/create-courier'

const CreateCourier = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl tracking-light scroll-m-20 font-semibold">Onboard your courier</h2>
      <CreateCourierForm />
    </div>
  )
}

export default CreateCourier
