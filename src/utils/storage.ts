const KeyPrefix = (key: string, prefix: string) => `${key}-${prefix}`
const tokenPrefix = `token`

const getStorageItem = async (key: string) => {
  const prefix = KeyPrefix(key, tokenPrefix)
  return new Promise((resolve) => {
    if (!window) return
    const value = localStorage.getItem(prefix)
    if (!value) {
      resolve(null)
      return
    }
    resolve(JSON.parse(value))
  })
}

const setStorageItem = (key: string, data: unknown) => {
  const prefix = KeyPrefix(key, tokenPrefix)
  let item: string
  try {
    if (typeof data !== 'object') {
      item = String(data)
    }
    item = JSON.stringify(data)
    localStorage.setItem(prefix, item)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const store = {
  setStorageItem,
  getStorageItem,
}

export default store
