import { getTranslations } from 'next-intl/server'
import { RoomForm } from '@/components/admin/RoomForm'
import { Link } from '@/i18n/routing'

export default async function AddRoomPage() {
  const t = await getTranslations('Admin')

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/rooms" className="text-muted-foreground hover:text-primary mb-4 inline-block">
          &larr; Back to Rooms
        </Link>
        <h1 className="text-3xl font-bold">Add New Room</h1>
      </div>

      <RoomForm />
    </div>
  )
}
