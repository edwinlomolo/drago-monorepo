// import { isValidPhoneNumber } from 'libphonenumber-js'
import { object, string, boolean } from 'yup'

export const BusinessSchema = object().shape({
  name: string()
    .trim()
    .matches(/^[a-zA-Z ]+$/i, {
      message: "Name is invalid. Try again",
      excludeEmptyString: true,
    })
    .required("Business name required"),
  phone: string()
    .matches(/^[0-9 ]+$/, {
      message: "Expects phone number",
      excludeEmptyString: true,
    })
    // TODO backlog this for now until we figure how to load country info dynamically - maybe ipstack/ipinfo service?
    //.test("valid-phone", "We are accepting Kenyan businesses first", (value) => isValidPhoneNumber(value!, "KE"))
    .required("Contact phone required"),
  dateCreated: string()
    .default(() => new Date().toString()),
  businessType: string()
    .required("This is required"),
  hasInHouseLogistic: boolean().default(() => false),
  logo: string().optional()
})

export const CourierSchema = object().shape({
  firstname: string()
    .trim()
    .matches(/^[a-zA-Z ]+$/i, {
      message: "Name is invalid. Try again",
      excludeEmptyString: true,
    })
    .required("Firstname required"),
  lastname: string()
    .trim()
    .matches(/^[a-zA-Z ]+$/i, {
      message: "Name is invalid. Try again",
      excludeEmptyString: true,
    })
    .required("Lastname required"),
  businessId: string()
    .trim()
    .required("Business is required"),
  phone: string()
    .matches(/^[0-9 ]+$/, {
      message: "Expects phone number",
      excludeEmptyString: true,
    })
    // TODO backlog this for now until we figure how to load country info dynamically - maybe ipstack/ipinfo service?
    //.test("valid-phone", "We are accepting Kenyan couriers first", (value) => isValidPhoneNumber(value!, "KE"))
    .required("Contact phone required"),
})

export const TripSchema = object().shape({
  courierId: string()
    .trim()
    .required("Courier required"),
})
