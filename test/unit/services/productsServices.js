const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../../services/productsService');


describe('When product does not exist in DB', () => {
  before(() => {
    sinon.stub(productsServices, 'getAll').resolves([]);
  })

  after(() => {
    productsServices.getAll.restore();
  })

  it('should return an array', async () => {
    const result = await productsServices.getAll();

    expect(result).to.be.an('array');
  })

  it('should return an empty array', async () => {
    const result = await productsServices.getAll();

    expect(result).to.be.empty;
  })
})

describe('When exists products in DB', () => {
  before(() => {
    sinon.stub(productsServices, 'getAll').resolves([
      {
       id: 1, 
       name: 'Martelo de Thor',
       quantity: 10,
      }
    ])
  })

  after(() => {
    productsServices.getAll.restore();
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
    sinon.stub(productsServices, 'findById').resolves([])
  })
  
  after(() => {
    productsServices.findById.restore();
  })

  it('should return an array', async () => {
    const result = await productsServices.findById(2);

    expect(result).to.be.an('array');
  })

  it('should return an empty array', async () => {
    const result = await productsServices.findById(2);

    expect(result).to.be.empty;
  })
})

describe('When ID exist in DB', () => {
  before(() => {
    sinon.stub(productsServices, 'findById').resolves([
      {
        id: 2,
        name: 'Traje de encolhimento',
        quantity: 20
      }
    ])
  })

  after(() => {
    productsServices.findById.restore();
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