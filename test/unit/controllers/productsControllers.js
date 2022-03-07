const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

const errorId = { status: 404, message: 'Product not found' };
const errorGetAll = { status: 404, message: 'There is no products in database' };
const errorProductAlreadyExists = { status: 409, message: 'Product already exists' };

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
});

describe('When throws an error', () => {
  const response = {}, request = {};
  let next;
  
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();

    sinon.stub(productsService, 'getAll').rejects(errorGetAll);
  });

  after(() => {
    productsService.getAll.restore();
  })

  it('should call next with error object', async () => {
    await productsController.getAllProducts(request, response, next);

    expect(next.calledWith(errorGetAll)).to.be.true;
  })
});

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
});

describe('When ID does not exist', () => {
  const response = {};
  const request = {};
  let next;
  
  before(() => {
    request.params = { id: 2 };

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();

    sinon.stub(productsService, 'findById').rejects(errorId);
  });

  after(() => {
    productsService.findById.restore();
  })

  it('should call next with error object', async () => {
    await productsController.getProductById(request, response, next);

    expect(next.calledWith(errorId)).to.be.true;
  })
});

describe('When register is succesfull', () => {
  const request = {};
  const response = {};

  before(() => {
    request.body = { name: 'produto', quantity: 10 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, 'registerProduct').resolves(
      { id: 1, name: 'produto', quantity: 10 }
    )
  });

  after(() => {
    productsService.registerProduct.restore();
  })

  it('should return status 201-OK', async () => {
    await productsController.registerProduct(request, response);
    
    expect(response.status.calledWith(201)).to.be.equal(true);
  })

  it('should return a json object', async () => {
    await productsController.registerProduct(request, response)

    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  })
})

describe('When the product already exists', () => {
  const response = {}, request = {};
  let next;
  
  before(() => {
    request.body = { name: 'produto', quantity: 10 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();

    sinon.stub(productsService, 'registerProduct').rejects(errorProductAlreadyExists);
  });

  after(() => {
    productsService.registerProduct.restore();
  })

  it('should call next with error object', async () => {
    await productsController.registerProduct(request, response, next);

    expect(next.calledWith(errorProductAlreadyExists)).to.be.true;
  })
})