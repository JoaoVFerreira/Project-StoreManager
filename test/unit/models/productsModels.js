const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');


describe('When does not exists products in DB', () => {

  before(async () => {
    const result = [[], [{}, {}]];

    sinon.stub(connection, 'execute').resolves(result);
  })
  after(async () => {
    connection.execute.restore();
  })

  it('should return an array', async () => {
    const result = await productsModel.getAll();

    expect(result).to.be.an('array');

  });
  it('should return an empty array', async () => {
    const result = await productsModel.getAll();

    expect(result).to.be.empty;
  })

  describe('When exists products in DB', () => {

    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([
        {
         id: 1, 
         name: 'Martelo de Thor',
         quantity: 10,
        }
      ])
    })
    after(() => {
      productsModel.getAll.restore();
    })

    it('should return an array of objects', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    });

    it('should return a non empty array', async () => {
      const result = await productsModel.getAll();

      expect(result).not.to.be.empty;
    });

    it('should have the keys "id", "name" and "quantity"', async () => {
      const [result] = await productsModel.getAll();

      expect(result).to.include.all.keys('id', 'name', 'quantity');
    })
  })
});

describe('When the specific ID does not exist', () => { 
  before(async () => {
    const result = [[], [{}, {}]]

    sinon.stub(connection, 'execute').resolves(result);
  })

  after(async () => {
    connection.execute.restore();
  })

  it('should return an array', async () => {
    const result = await productsModel.findById(2);

    expect(result).to.be.an('array');
  })

  it('should return an empty array', async () => {
    const result = await productsModel.findById(2);

    expect(result).to.be.empty;
  })

  describe('When exist ID', () => {
    before(() => {
      sinon.stub(productsModel, 'findById').resolves([
        {
          id: 2,
          name: 'Traje de encolhimento',
          quantity: 20
        }
      ])
    })

    after(() => {
      productsModel.findById.restore();
    })

    it('should return an array of object', async () => {
      const result = await productsModel.findById(2);

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    })

    it('should return a non empty array', async () => {
      const result = await productsModel.findById(2);

      expect(result).not.to.be.empty;
    })

    it('shoul have keys "id", "name" and "quantity"', async () => {
      const [result] = await productsModel.findById(2);

      expect(result).to.include.all.keys('id', 'name', 'quantity');
    })
  })
})