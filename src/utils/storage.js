// Sets an item to localStorage
// expiry time is in minutes
const setLSItem = (key, value, expiry) => {
  const item = {
    value,
    expiry: expiry ? new Date().getTime() + (1000 * 60 * expiry) : '',
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Gets an item from localStorage
const getLSItem = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  if (item.expiry && new Date().getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export { setLSItem, getLSItem };
