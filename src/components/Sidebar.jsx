import React from "react";

export default function Sidebar({ filters, setFilters, categories, countries }) {
  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const values = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: values, page: 1 };
    });
  };

  return (
    <div className="w-1/4 p-4 border-r bg-white overflow-y-auto">
      {/* Sidebar heading */}
      <h2 className="font-bold mb-4 text-lg">Search for Opportunities</h2>

      {/* Department + Teams */}
      <h3 className="font-bold mb-2">Department</h3>
      {categories.map((cat) => (
        <div key={cat.department} className="mb-2">
          <div>
            <input
              type="checkbox"
              checked={filters.department.includes(cat.department)}
              onChange={() => handleCheckboxChange("department", cat.department)}
              className="mr-2"
            />
            <label>{cat.department}</label>
          </div>
          {/* Teams under department */}
          <div className="ml-4">
            {cat.teams.map((team) => (
              <div key={team}>
                <input
                  type="checkbox"
                  checked={filters.team.includes(team)}
                  onChange={() => handleCheckboxChange("team", team)}
                  className="mr-2"
                />
                <label>{team}</label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Country */}
      <h3 className="font-bold mt-4 mb-2">Country</h3>
      {countries.map((c) => (
        <div key={c} className="mb-1">
          <input
            type="checkbox"
            checked={filters.country.includes(c)}
            onChange={() => handleCheckboxChange("country", c)}
            className="mr-2"
          />
          <label>{c}</label>
        </div>
      ))}

      {/* Clear Filters */}
      <button
        onClick={() =>
          setFilters({
            department: [],
            team: [],
            country: [],
            search: "",
            page: 1,
          })
        }
        className="mt-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear Filters
      </button>
    </div>
  );
}
