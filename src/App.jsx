import React, { useState, useEffect } from "react";
import data from "./data.json";
import Sidebar from "./components/Sidebar";
import Results from "./components/Results";
import { applyFilters } from "./utils/filters";

export default function App() {
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      department: params.getAll("department"),
      team: params.getAll("team"),
      country: params.getAll("country"),
      sidebarSearch: params.get("sidebarSearch") || "",
      search: params.get("search") || "",
      page: parseInt(params.get("page") || "1", 10),
    };
  });

  const [filteredData, setFilteredData] = useState([]);

  // Build Department → Teams tree
  const categories = Array.from(
    data.reduce((map, item) => {
      if (!map.has(item.department)) {
        map.set(item.department, new Set());
      }
      if (item.team) {
        map.get(item.department).add(item.team);
      }
      return map;
    }, new Map())
  ).map(([department, teams]) => ({
    department,
    teams: [...teams],
  }));

  // Countries
  const countries = [
    ...new Set(
      data.map((d) => d.address?.postalAddress?.addressCountry).filter(Boolean)
    ),
  ];

  useEffect(() => {
    const results = applyFilters(data, filters);
    setFilteredData(results);

    // Sync filters → URL
    const params = new URLSearchParams();
    filters.department.forEach((d) => params.append("department", d));
    filters.team.forEach((t) => params.append("team", t));
    filters.country.forEach((c) => params.append("country", c));
    if (filters.sidebarSearch) params.set("sidebarSearch", filters.sidebarSearch);
    if (filters.search) params.set("search", filters.search);
    if (filters.page > 1) params.set("page", filters.page);

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [filters]);

  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (filters.page - 1) * pageSize,
    filters.page * pageSize
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        countries={countries}
      />
      <Results
        data={paginatedData}
        filters={filters}
        setFilters={setFilters}
        totalPages={totalPages}
      />
    </div>
  );
}
