import React from 'react';

// TODO: since .toLowerCase() is used, this sort only accepts strings. Work out a better way!
const useSortedData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase()) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase()) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }
  return { sortedItems: sortedItems, requestSort , sortConfig};
}

export default useSortedData;
