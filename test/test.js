define(['storage-message'], (storageMessageLib) => {
  const { storageMessage } = storageMessageLib;
  describe('#storage-message', () => {
    beforeEach(() => {
      storageMessage.events = [];
      window.localStorage.clear();
    });

    it('localStorage', (done) => {
      window.localStorage.setItem('test', 'test');
      expect(window.localStorage.getItem('test')).toBe('test');
      done();
    });

    it('storageMessage addEventListener & removeEventListener', (done) => {
      const l = () => {};
      storageMessage.addEventListener('test', l);
      expect(storageMessage.events.length).toBe(1);

      const event = storageMessage.events[0];

      expect(event.key).toBe('test');
      expect(event.listener).toBe(l);

      storageMessage.removeEventListener('test', l);
      expect(storageMessage.events.length).toBe(0);
      done();
    });

    const sendMsg = `message ${Math.random()}`;
    it(`key: watch1; data: msg: ${sendMsg}`, (done) => {
      storageMessage.addEventListener('watch1', (e) => {
        const { key, oldValue, newValue } = e;
        const obj = JSON.parse(newValue);
        expect(key).toBe('watch1');
        expect(oldValue).toBe.null;
        expect(obj.data).toBe(sendMsg);
        expect(obj.timestap).toEqual(jasmine.any(Number));
        done();
      });

      storageMessage.trigger('watch1', sendMsg);
    });
  });
});
