const { expect } = require('chai');
const sinon = require('sinon');

const salesServices = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

const errorGetAll = { status: 404, message: 'There is no sales in database' };

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