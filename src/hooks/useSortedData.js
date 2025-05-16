import React from 'react';

const useSortedData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    const sortableItems = [...items];

    if (sortConfig !== null) {
      const { key, direction } = sortConfig;

      sortableItems.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        // Handle null or undefined values
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        let comparison = 0;

        // Compare numbers
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        // Compare strings (locale-aware, handles åäö and case)
        } else if (typeof aVal === 'string' && typeof bVal === 'string') {
          comparison = aVal.localeCompare(bVal, 'sv', { sensitivity: 'base' });
        // Fallback to string conversion and comparison
        } else {
          comparison = String(aVal).localeCompare(String(bVal), 'sv', { sensitivity: 'base' });
        }

        return direction === 'ascending' ? comparison : -comparison;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { sortedItems, requestSort, sortConfig };
};

export default useSortedData;
