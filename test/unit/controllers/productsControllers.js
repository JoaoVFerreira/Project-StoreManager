const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('When gets successfully', () => {
  const request = {};
  const response = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAll').resolves([
      {
        id: 1, 
        name: 'Martelo de Thor',
        quantity: 10,
       }
    ])
  });

  after(() => {
    productsService.getAll.restore();
  })

  it('should return status 200-OK', async () => {
    await productsController.getAllProducts(request, response);
    
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('should return a json object', async () => {
    await productsController.getAllProducts(request, response)

    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  })
})

describe('When throws an error', () => {
  const response = {};
  const request = {};
  
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAll').resolves(
      { status: 404, message: 'There is no products in database' }
    );
  });

  after(() => {
    productsService.getAll.restore();
  })

  it('should have 404 status', async () => {
    await productsController.getAllProducts(request, response);
    // console.log(await productsController.getAllProducts(request, response));

    expect(response.status.calledWith(404)).to.be.true;
  })
})

describe('When get ID successfully', () => {
  const response = {};
  const request = {};

  before(() => {
    request.params = { id: 2 };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves([
      {
      id: 2,
      name: 'Traje de encolhimento',
      quantity: 20
      }
    ])
  })

  after(() => {
    productsService.findById.restore();
  })

  it('should have the status 200-OK', async () => {
    await productsController.getProductById(request, response);

    expect(response.status.calledWith(200)).to.be.true;
  })

  it('should return a json object', async () => {
    await productsController.getProductById(request, response);

    expect(response.json.calledWith(sinon.match.object)).to.be.true;
  })
})