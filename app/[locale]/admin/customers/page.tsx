import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'

export default async function AdminCustomersPage() {
  const t = await getTranslations('Admin')
  
  const customers = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('customers') || 'Customers Directory'}</h1>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-semibold">{customer.name || 'N/A'}</td>
                  <td className="p-4 text-sm text-muted-foreground">{customer.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${customer.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-600' : 'bg-blue-500/10 text-blue-600'}`}>
                      {customer.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {customer.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
