const { expect } = require('chai');
const sinon = require('sinon');

const salesServices = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const { not } = require('joi');

describe('When sales does not exist in DB', () => {
  before(() => {
    sinon.stub(salesModel, 'getAll').resolves([]);
  })

  after(() => {
    salesModel.getAll.restore();
  })

  it('should return an error object', async () => {
    try {
      await salesServices.getAll();
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error).to.includes.all.keys('status', 'message');
    }
  })

  it('should return an empty object', async () => {
    try {
      await salesServices.getAll();
    } catch (error) {
      expect(error).not.to.be.empty;
      expect(error).to.includes.all.keys('status', 'message');
    }
  })
})

describe('When exists sales in DB', () => {
  before(() => {
    sinon.stub(salesModel, 'getAll').resolves([
      {
       saleId: 1, 
       date: '2022-02-24T18:28:37.000Z',
       productId: 1,
       quantity: 5,
      }
    ])
  })

  after(() => {
    salesModel.getAll.restore();
  })

  it('should return an array of objects', async () => {
    const result = await salesServices.getAll();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
  })

  it('should return a non empty array', async () => {
    const result = await salesServices.getAll();

    expect(result).not.to.be.empty;
  })

  it('should include the keys "saleId", "date", "productId" and "quantity"', async () => {
    const [result] = await salesServices.getAll();

    expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
  })
})

describe('When ID does not exist in DB', () => {
  before(() => {
    sinon.stub(salesModel, 'findById').resolves([])
  })
  
  after(() => {
    salesModel.findById.restore();
  })

  it('should return an error object', async () => {
    try {
      await salesServices.findById(2);
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error).to.includes.all.keys('status', 'message');
    }
  })

  it('should return an non empty array', async () => {
    try {
      await salesServices.findById(2);
    } catch (error) {
      expect(error).not.to.be.empty;
      expect(error).to.includes.all.keys('status', 'message');
    }
  })
})

describe('When ID exist in DB', () => {
  before(() => {
    sinon.stub(salesModel, 'findById').resolves([
      { 
        date: '2022-02-24T18:28:37.000Z',
        productId: 1,
        quantity: 5
      }
    ])
  })

  after(() => {
    salesModel.findById.restore();
  })

  it('should return an array of object', async () => {
    const result = await salesServices.findById(2);

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
  })

  it('should return a non empty array', async () => {
    const result = await salesServices.findById(2);

    expect(result).not.to.be.empty;
  })

  it('should include keys "date", "productId" and "quantity"', async () => {
    const [result] = await salesServices.findById(2);

    expect(result).to.include.all.keys('date', 'productId', 'quantity');
  })
})