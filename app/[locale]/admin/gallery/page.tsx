export default function AdminGalleryPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm p-12 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <p className="text-muted-foreground">
            The dedicated standalone gallery management system is currently under construction. 
            For now, gallery images are populated automatically from the Room images you upload in the Rooms section!
          </p>
        </div>
      </div>
    </div>
  )
}
