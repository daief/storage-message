// ------ declare
const CURRENT_STORAGE = 'currentStorage';

// storage event 在当前页面不触发，重写 window.localStorage.setItem
function overrideSetItem() {
  const originalSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, [key, value]);

    const oldValue = window.localStorage.getItem(key);
    if (oldValue === `${value}`) {
      return;
    }

    const setItemEvent = new StorageEvent(CURRENT_STORAGE, {
      key,
      oldValue,
      newValue: value,
      url: window.location.href,
    });

    window.dispatchEvent(setItemEvent);
  };
}

type IListener = (e: StorageEvent) => void;
interface IEvent {
  key: string;
  listener: IListener;
}

class StorageMessage {
  events: Array<IEvent | null> = [];

  addEventListener(key: string, listener: IListener) {
    this.events.push({ key, listener });
  }

  removeEventListener(key: string, listener: IListener) {
    for (let index = 0; index < this.events.length; index++) {
      const element = this.events[index];
      if (element && element.key === key && element.listener === listener) {
        this.events[index] = null;
      }
    }

    this.events = this.events.filter(e => e);
  }

  _notice(e: StorageEvent) {
    const { key } = e;
    this.events.forEach(item => {
      if (item && typeof item.listener === 'function' && key === item.key) {
        item.listener(e);
      }
    });
  }

  trigger(key: string, value: any) {
    // auto add timestap
    window.localStorage.setItem(
      key,
      JSON.stringify({
        data: value,
        timestap: Date.now(),
      })
    );
  }

  storageChange(e: StorageEvent) {
    this._notice(e);
  }
}

// ------ excute

overrideSetItem();
const storageMessage = new StorageMessage();
const storageChange = (e: StorageEvent) => {
  storageMessage._notice(e);
};

window.addEventListener(CURRENT_STORAGE, storageChange);
window.addEventListener('storage', storageChange);

// ------ export
export { IListener, IEvent, StorageMessage, storageMessage };
