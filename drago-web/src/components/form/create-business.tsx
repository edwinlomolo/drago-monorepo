import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { BusinessSchema, getDateYYYYMMDD } from '@/components/form/validations'
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
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useUserBusiness from '@/hooks/business-service'
import { loaders } from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'
import { Trash2 } from 'lucide-react'

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
  const businessLogo = methods.watch("logo")
  const { toast } = useToast()
  const [uploadingFile, setUploadingFile] = useState(false)
  const onFileUpload = async(e: any) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    try {
      setUploadingFile(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DRAGO_API}/business/upload/logo`,
        {
          method: "POST",
          body: formData,
        })
      const data = await res.json()
      methods.setValue("logo", data.imageUrl, { shouldValidate: true })
    } catch(e) {
      console.error(`Error uploading file ${e}`)
    } finally {
      setUploadingFile(false)
    }
  }
  const removeLogo = (e: any) => {
    e.preventDefault()
    methods.setValue("logo", "")
  }


  const onSubmit = (data: any) => {
    if (data.dateCreated.length === 0) data.dateCreated = getDateYYYYMMDD()
    if (!creatingBusiness) {
      createBusiness({
        variables: {
          input: {
            name: data.name,
            phone: data.phone,
            dateCreated: new Date(data.dateCreated),
            hasInHouseLogistic: data.hasInHouseLogistic,
            businessType: data.businessType,
            logo: data.logo,
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
          name="logo"
          control={methods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2 w-full">
                  {businessLogo.length === 0 && <Input type="file" {...field} onChange={onFileUpload} />}
                  {businessLogo.length !== 0 && (
                    <div className="flex items-center flex-row gap-4">
                      <Avatar>
                        <AvatarImage src={`${businessLogo}`} alt="business_logo" />
                      </Avatar>
                      <Button size="icon" onClick={removeLogo} variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {uploadingFile && <loaders.Submitting />}
                </div>
              </FormControl>
              <FormDescription>Business logo</FormDescription>
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
