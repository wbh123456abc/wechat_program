// add.test.js
var  check= require('../miniprogram/pages/test1.js');
var expect = require('chai').expect;

describe('输入的时间和预算', function() {
  it('时间和预算合理', function() {
    expect(check(3000,10)).to.be.equal(1);
  });
  it('时间和预算合理', function() {
    expect(check(1000,4)).to.be.equal(1);
  });
  it('时间和预算合理', function() {
    expect(check(2000,5)).to.be.equal(1);
  });
  it('时间和预算合理', function() {
    expect(check(30000,10)).to.be.equal(1);
  });
  it('时间过长', function() {
    expect(check(30000,100)).to.be.equal(-1);
  });
  it('时间<=0', function() {
    expect(check(30000,-1)).to.be.equal(-1);
  });
  it('预算太大', function() {
    expect(check(3000000,10)).to.be.equal(-1);
  });
  it('预算太小', function() {
    expect(check(30,10)).to.be.equal(-1);
  });
});