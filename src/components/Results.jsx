import React from "react";

export default function Results({ data, filters, setFilters, totalPages }) {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Search bar at top of results */}
      <div className="mb-4">
        <input
          type="text"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value, page: 1 })
          }
          className="border p-2 rounded w-full"
          placeholder="Search opportunities..."
        />
      </div>

      {/* Results */}
      {data.length === 0 && <p>No results found.</p>}
      {data.map((item) => (
        <div
          key={item.id}
          className="border bg-white rounded p-3 mb-3 shadow-sm"
        >
          <p className="font-semibold">{item.title}</p>
          <p>Department: {item.department}</p>
          <p>Team: {item.team}</p>
          <p>Country: {item.address?.postalAddress?.addressCountry}</p>
          <p>Work Type: {item.isRemote ? 'Remote' : 'On-site'}</p>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setFilters({ ...filters, page })}
            className={`px-3 py-1 border rounded ${
              page === filters.page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
