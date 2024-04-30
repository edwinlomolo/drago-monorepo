import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { BusinessSchema } from '@/components/form/validations'
import {
  Form,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription,
  FormControl,
  FormField,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectGroup,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useUserBusiness from '@/hooks/business-service'
import { loaders } from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'

const options = [
  {value: "business", label: "Business - you sell goods"},
  {value: "3pl", label: "3PL - can move and deliver goods"},
]

const BusinessForm = () => {
  const { createBusiness, creatingBusiness } = useUserBusiness()
  const methods = useForm({
    resolver: yupResolver(BusinessSchema),
    defaultValues: {
      name: "",
      phone: "",
      dateCreated: "",
      businessType: "",
      hasInHouseLogistic: false,
      logo: "",
    },
  })
  const { toast } = useToast()

  const onSubmit = (data: any) => {
    if (!creatingBusiness) {
      createBusiness({
        variables: {
          input: {
            name: data.name,
            phone: data.phone,
            dateCreated: new Date(data.dateCreated),
            hasInHouseLogistic: data.hasInHouseLogistic,
            businessType: data.businessType,
            logo: "",
          },
        },
        onCompleted: () => {
          methods.reset()
          toast({
            title: "Success!",
            description: "Business created successfully.",
          })
        },
        refetchQueries: [
          'GetBusinessBelongingToUser',
        ],
      })
    }
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="justify-self-center space-y-4">
      <h2 className="text-3xl font-semibold">Add business</h2>
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business name</FormLabel>
              <FormControl>
                <Input placeholder="Business name" {...field} />
              </FormControl>
              <FormDescription>Your business name</FormDescription>
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
              <FormDescription>Your business contact phone</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="dateCreated"
          control={methods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date established</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Established" {...field} />
              </FormControl>
              <FormDescription>Date established</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="businessType"
          control={methods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which of the below describes the nature of your business</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Business type"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {options.map(item => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="hasInHouseLogistic"
          control={methods.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Logistics</FormLabel>
                <FormDescription>
                  You have in-house logistics team/department?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="font-semibold items-center"
          type="submit"
        >
          {creatingBusiness ? <loaders.Submitting /> : `Create`}
        </Button>
      </form>
    </Form>
  )
}

export default BusinessForm
