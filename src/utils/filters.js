export function applyFilters(data, filters) {
  let result = [...data];

  // Department filter
  if (filters.department.length) {
    result = result.filter((d) => filters.department.includes(d.department));
  }

  // Team filter
  if (filters.team.length) {
    result = result.filter((d) => filters.team.includes(d.team));
  }

  // Country filter
  if (filters.country.length) {
    result = result.filter((d) =>
      filters.country.includes(d.address?.postalAddress?.addressCountry)
    );
  }

  if(filters.isRemote.length) {
    result = result.filter((d) =>
      filters.isRemote.includes(d.isRemote.toString())
    )
  }

  // Sidebar search (only department + team)
  if (filters.sidebarSearch) {
    const keyword = filters.sidebarSearch.toLowerCase();
    result = result.filter(
      (d) =>
        d.department?.toLowerCase().includes(keyword) ||
        d.team?.toLowerCase().includes(keyword)
    );
  }

  // Global search (title, dept, team, country)
  if (filters.search) {
    const keyword = filters.search.toLowerCase();
    result = result.filter(
      (d) =>
        d.title?.toLowerCase().includes(keyword) ||
        d.department?.toLowerCase().includes(keyword) ||
        d.team?.toLowerCase().includes(keyword) ||
        d.address?.postalAddress?.addressCountry?.toLowerCase().includes(keyword)
    );
  }

  return result;
}
