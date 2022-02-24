const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection')
const salesModels = require('../../../models/salesModel');

describe('When does not exists sales in DB', () => {

  before(async () => {
    const result = [[], [{}, {}]];

    sinon.stub(connection, 'execute').resolves(result);
  })
  after(async () => {
    connection.execute.restore();
  })

  it('should return an array', async () => {
    const result = await salesModels.getAll();

    expect(result).to.be.an('array');

  });
  it('should return an empty array', async () => {
    const result = await salesModels.getAll();

    expect(result).to.be.empty;
  })

  describe('When exists sales in DB', () => {

    before(() => {
      sinon.stub(salesModels, 'getAll').resolves([
        {
         saleId: 1, 
         date: '2022-02-24T18:28:37.000Z',
         productId: 1,
         quantity: 5
        }
      ])
    })
    after(() => {
      salesModels.getAll.restore();
    })

    it('should return an array of objects', async () => {
      const result = await salesModels.getAll();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });

    it('should return a non empty array', async () => {
      const result = await salesModels.getAll();

      expect(result).not.to.be.empty;
    });

    it('should have the keys "saleId", "date", "productId" and "quantity"', async () => {
      const [result] = await salesModels.getAll();

      expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    })
  })
});