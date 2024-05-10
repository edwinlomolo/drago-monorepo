'use client'

import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'

const Page = () => {
  return (
    <div className="grow gap-4">
      <Tabs aria-label="Trips menu" radius="full" size="sm" className="m-4">
        <Tab key="new" title="Create">
          <Card className="m-4">
            <CardBody>
              Create trip
            </CardBody>
          </Card>
        </Tab>
        <Tab key="trips" title="Trips">
          <Card className="m-4">
            <CardBody>
              Trips
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Page
