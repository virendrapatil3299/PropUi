"use client"

interface PropertySidebarProps {
  properties: any[]
  toggleFavorite: (id: number) => void
  favorites: number[]
}

export function PropertySidebar({ properties, toggleFavorite, favorites }: PropertySidebarProps) {
  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="border rounded-lg p-3 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-sm text-gray-500">{property.price}</p>
          </div>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`px-2 py-1 rounded ${
              favorites.includes(property.id)
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            ♥
          </button>
        </div>
      ))}
    </div>
  )
}
