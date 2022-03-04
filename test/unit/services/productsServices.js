const { expect } = require('chai');

const sinon = require('sinon');

const productsServices = require('../../../services/productsService');
const productModels = require('../../../models/productsModel');


describe('When product does not exist in DB', () => {
  before(() => {
    sinon.stub(productModels, 'getAll').resolves([]);
  })

  after(() => {
    productModels.getAll.restore();
  })

  it('should return an error object', async () => {
    try {
      await productsServices.getAll();
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error).to.have.all.keys('status', 'message');
    }
  })

  it('should return a non empty object', async () => {
    try {
      await productsServices.getAll();
    } catch (error) {
      expect(error).not.to.be.empty;
      expect(error).to.have.all.keys('status', 'message');
    }
  })
})

describe('When exists products in DB', () => {
  before(() => {
    sinon.stub(productModels, 'getAll').resolves([
      {
       id: 1, 
       name: 'Martelo de Thor',
       quantity: 10,
      }
    ])
  })

  after(() => {
    productModels.getAll.restore();
  })

  it('should return an array of objects', async () => {
    const result = await productsServices.getAll();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
  })

  it('should return a non empty array', async () => {
    const result = await productsServices.getAll();

    expect(result).not.to.be.empty;
  })

  it('should include the keys "id", "name" and "quantity"', async () => {
    const [result] = await productsServices.getAll();

    expect(result).to.include.all.keys('id', 'name', 'quantity');
  })
})

describe('When ID does not exist in DB', () => {
  before(() => {
    sinon.stub(productModels, 'findById').resolves([])
  })
  
  after(() => {
    productModels.findById.restore();
  })

  it('should throw an error object', async () => {
    try {
      await productsServices.findById(2);
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error).to.have.all.keys('status', 'message');
    }
  })

  it('should a non empty object', async () => {
    try {
      await productsServices.findById(2);
    } catch (error) {
      expect(error).not.to.be.empty;
      expect(error).to.have.all.keys('status', 'message');
    }
  })
})

describe('When ID exist in DB', () => {
  before(() => {
    sinon.stub(productModels, 'findById').resolves([
      {
        id: 2,
        name: 'Traje de encolhimento',
        quantity: 20
      }
    ])
  })

  after(() => {
    productModels.findById.restore();
  })

  it('should return an array of object', async () => {
    const result = await productsServices.findById(2);

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
  })

  it('should return a non empty array', async () => {
    const result = await productsServices.findById(2);

    expect(result).not.to.be.empty;
  })

  it('should include keys "id", "name" and "quantity"', async () => {
    const [result] = await productsServices.findById(2);

    expect(result).to.include.all.keys('id', 'name', 'quantity');
  })
})