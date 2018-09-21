// storage event 在当前页面不触发，重写 window.localStorage.setItem
function overrideSetItem() {
  const originalSetItem = window.localStorage.setItem
  window.localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, [key, value])

    const oldValue = window.localStorage.getItem(key)
    if (oldValue === `${value}`) {
      return
    }

    const setItemEvent = new StorageEvent('currentStorage', {
      key,
      oldValue,
      newValue: value
    })

    window.dispatchEvent(setItemEvent)
  }
}
