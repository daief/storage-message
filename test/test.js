define(['storage-message'], (storageMessage) => {
  describe('#storage-message', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    it('test localStorage', (done) => {
      console.log(123);
      window.localStorage.setItem('test', 'test');
      expect(window.localStorage.getItem('test')).toBe('test');
      done();
    });

    it('test', (done) => {
      // expect(1).to.equal(1);
      expect(1).toBe(1);
      done();
    });

    // it('test localStorage storage', (done) => {
    //   window.localStorage.setItem('test', 'test')
    //   window.addEventListener('storage', (e) => {
    //     console.log(e)
    //     expect(e).not.to.be.null
    //     done()
    //   })
    // })

    // it('addEventListener: watch1, send msg: data1', done => {
    //   storageMessage.addEventListener('watch1', (e) => {
    //     const {key, oldValue, newValue} = e
    //     const obj = JSON.parse(newValue)
    //     expect(key).to.equal('watch1')
    //     expect(oldValue).to.be.null
    //     expect(obj.data).to.equal('data1')
    //     expect(obj.timestap).to.be.a('number')
    //     done()
    //   })

    //   expect(storageMessage.events.length).to.equal(1)
    //   storageMessage.trigger('watch1', 'data1')
    // })
  });
});
