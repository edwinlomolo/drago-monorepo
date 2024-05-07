import { useContext, useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectValue,
} from '@/components/ui/select'
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CourierSchema } from '@/components/form/validations'
import { BusinessContext } from '@/providers/business-provider'
import { Info } from 'lucide-react'
import { loaders } from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'

const CreateCourierForm = () => {
  const {
    business,
    defaultBusiness,
    addCourier,
    addingCourier,
    hasBusinessListing,
  } = useContext(BusinessContext)
  const businesses = useMemo(() => (business || []).map(item => ({label: item.name, value: item.id})), [business])
  const methods = useForm({
    resolver: yupResolver(CourierSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      businessId: "",
    },
  })
  const { toast } = useToast()

  const onSubmit = (data: any) => {
    if (!addingCourier && hasBusinessListing) {
      addCourier({
        variables: {
          input: {
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            business_id: defaultBusiness?.id,
          },
        },
        onCompleted: () => {
          methods.reset()
          toast({
            title: "Success!",
            description: "Courier created successfully.",
          })
        },
        refetchQueries: [
          'GetBusinessCouriers',
        ],
      })
    }
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="justify-self-center space-y-4">
        <h2 className="text-3xl font-semibold">Onboard your courier</h2>
        {!hasBusinessListing && (
          <div className="flex flex-col flex-wrap items-center w-full">
            <Alert className="bg-yellow-100">
              <Info className="mr-2 h-4 w-4" />
              <AlertDescription>You have not onboarded a business/3PL</AlertDescription>
            </Alert>
          </div>
        )}
        <FormField
          control={methods.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="Firstname" {...field} />
              </FormControl>
              <FormDescription>
                Courier first name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="Lastname" {...field} />
              </FormControl>
              <FormDescription>
                Courier last name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormDescription>
                Courier phone number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="businessId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger disabled={!hasBusinessListing}>
                    <SelectValue placeholder={`${hasBusinessListing ? "Add to business" : "No registered business/3PL"}`}/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {businesses.map(item => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>Add courier to one of your business/3PL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="font-semibold items-center"
        >
          {addingCourier ? <loaders.Submitting /> : `Add`}
        </Button>
      </form>
    </Form>
  )
}

export default CreateCourierForm
