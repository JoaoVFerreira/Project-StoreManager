const { expect } = require('chai');
const sinon = require('sinon');

const salesServices = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

const errorGetAll = { status: 404, message: 'There is no sales in database' };
const errorId = { status: 404, message: 'Sale not found' };

describe('When gets successfully', () => {
  const request = {};
  const response = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesServices, 'getAll').resolves([
      {
        saleId: 1, 
        date: '2022-02-24T18:28:37.000Z',
        productId: 1,
        quantity: 5,
       }
    ])
  });

  after(() => {
    salesServices.getAll.restore();
  })

  it('should return status 200-OK', async () => {
    await salesController.getAllSales(request, response);
    
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('should return a json object', async () => {
    await salesController.getAllSales(request, response)

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

    sinon.stub(salesServices, 'getAll').rejects(errorGetAll);
  });

  after(() => {
    salesServices.getAll.restore();
  })

  it('should call next with error object', async () => {
    await salesController.getAllSales(request, response, next);

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

    sinon.stub(salesServices, 'findById').resolves([
      { 
        date: '2022-02-24T18:28:37.000Z',
        productId: 1,
        quantity: 5
      }
    ])
  })

  after(() => {
    salesServices.findById.restore();
  })

  it('should have the status 200-OK', async () => {
    await salesController.getSaleId(request, response);

    expect(response.status.calledWith(200)).to.be.true;
  })

  it('should return a json object', async () => {
    await salesController.getSaleId(request, response);

    expect(response.json.calledWith(sinon.match.array)).to.be.true;
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

    sinon.stub(salesServices, 'findById').rejects(errorId);
  });

  after(() => {
    salesServices.findById.restore();
  })

  it('should call next with error object', async () => {
    await salesController.getSaleId(request, response, next);

    expect(next.calledWith(errorId)).to.be.true;
  })
});

describe('When register a sales sucessfully', () => {
  const response = {};
  const request = {};

  before(() => {
    request.body =   [
      {
        productId: 1,
        quantity: 3
      }
    ]

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesServices, 'registerSale').resolves({
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 3
        }
      ]
    })
  })

  after(() => {
    salesServices.registerSale.restore();
  })

  it('should have the status 201-OK', async () => {
    await salesController.registerSale(request, response);

    expect(response.status.calledWith(201)).to.be.true;
  })

  it('should return a json object', async () => {
    await salesController.registerSale(request, response);

    expect(response.json.calledWith(sinon.match.object)).to.be.true;
  })
})