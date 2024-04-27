import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = (): AuthOptions => {
  const providers = [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    })
  ]

  const callbacks = {
    async session({session}: any) {
      // call our own API to handshake with google provider session
      if (session) {
        try {
          const res = await fetch(
            `${process.env.DRAGO_API}/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: session?.user?.email,
                firstname: session?.user?.name?.split(' ')[0],
                lastname: session?.user?.name?.split(' ')[1],
              }),
            }
          )
          const data = await res.json()
          session.token = data.token
          session.location = data.location
        } catch(e) {
          console.error(e)
        }
      } else {
        return session
      }

      return session
    },

    async redirect({url, baseUrl}: any) {
      return url
    },
  }

  return { providers, callbacks }
}
