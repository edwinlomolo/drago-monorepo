import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Menu, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface Props {}

const MobileNav = ({}: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package className="h-6 w-6" />
            <span className="sr-only">Drago</span>
            <Badge className="pointer-events-none font-extrabold h-4 bg-yellow-600">beta</Badge>
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/trip/view/trips"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Trips
          </Link>
          <Link
            href="/courier/view/couriers"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Couriers
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
