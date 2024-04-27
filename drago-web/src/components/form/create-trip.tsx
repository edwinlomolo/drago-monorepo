import { useContext, useEffect, useMemo, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { BusinessContext } from '@/providers/business-provider'
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
  FormItem,
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select'
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps'
import { Button } from '@nextui-org/react'
import { loaders } from '@/components/Loader'
import { userAvatarFallback } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { TripSchema } from '@/components/form/validations'
import { Info } from 'lucide-react'

const CreateTripForm = () => {
  const methods = useForm({
    resolver: yupResolver(TripSchema),
    defaultValues: {
      courierId: ""
    },
  })
  const { couriers, defaultBusiness, createTrip, creatingTrip } = useContext(BusinessContext)
  const hasCouriers = useMemo(() => (couriers || []).length > 0, [couriers])
  const courierOptions = useMemo(() => (couriers || []).map(item => ({firstname: item.firstname, lastname: item.lastname, label: `${item.firstname} ${item.lastname}`, value: item.id})), [couriers])
  const [placesService, setPlacesService] = useState(null)
  const placesLibrary = useMapsLibrary('places')
  const map = useMap()
  const [pickupValue, setPickupValue] = useState(null)
  const [dropoffValue, setDropoffValue] = useState(null)

  useEffect(() => {
    if (!placesLibrary || !map) return;

    setPlacesService((new placesLibrary.PlacesService(map) as any));
  }, [placesLibrary, map])

  const dragMapCamera = (e: any) => {
    ((placesService as any))?.getDetails({placeId: e.value.place_id, fields: ['geometry']}, (results: any, _: any) => {
      map?.moveCamera({center: {lat: results.geometry.location.lat(), lng: results.geometry.location.lng()}, zoom: 16})
    })
  }

  const onPickupSelect = (e: any) => {
    dragMapCamera(e)
    setPickupValue(e)
  }

  const onDropoffSelect = (e: any) => {
    dragMapCamera(e)
    setDropoffValue(e)
  }

  const onSubmit = (data: any) => {
    if (!creatingTrip) {
      if (!!pickupValue && !!dropoffValue) {
        createTrip({
          variables: {
            input: {
              pickup: ((pickupValue as any))?.value?.place_id,
              dropoff: ((dropoffValue as any))?.value?.place_id,
              business_id: defaultBusiness?.id,
              courier_id: data.courierId,
            },
          },
          onCompleted: () => {
            setPickupValue(null)
            setDropoffValue(null)
          },
          refetchQueries: [
            'GetTripsBelongingToBusiness'
          ],
        })
      }
    }
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="text-3xl mb-4 font-bold">Create trip</h1>
        <div className="space-y-8">
          <GooglePlacesAutocomplete
            selectProps={{
              value: pickupValue,
              onChange: onPickupSelect,
              placeholder: "Pickup location",
            }}
          />
          <GooglePlacesAutocomplete
            selectProps={{
              value: dropoffValue,
              onChange: onDropoffSelect,
              placeholder: "Drop-off location",
            }}
          />
        </div>
        {hasCouriers ? (
          <FormField
            name="courierId"
            control={methods.control}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>Courier</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={!hasCouriers}>
                      <SelectValue placeholder={hasCouriers ? "Assign courier" : "Onboard couriers to assign"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courierOptions.map(item => (
                      <SelectItem key={item.value} value={item.value}>
                        <div className="flex items-center flex-row gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={``} alt={`${item.label}`} />
                            <AvatarFallback>{userAvatarFallback(item.firstname, item.lastname)}</AvatarFallback>
                          </Avatar>
                          {item.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Assign trip</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <Alert className="bg-yellow-100 my-8">
            <Info className="mr-2 h-4 w-4" />
            <AlertDescription>Onboard courier to assign</AlertDescription>
          </Alert>
        )}
        <Button
          color="primary"
          className="font-semibold items-center"
          type="submit"
        >
          {creatingTrip ? <loaders.Submitting /> : `Create`}
        </Button>
      </form>
    </Form>
  )
}

export default CreateTripForm
