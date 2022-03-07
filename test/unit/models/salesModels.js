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

describe('When the specific ID does not exist', () => { 
  before(async () => {
    const result = [[], [{}, {}]]

    sinon.stub(connection, 'execute').resolves(result);
  })

  after(async () => {
    connection.execute.restore();
  })

  it('should return an array', async () => {
    const result = await salesModels.findById(2);

    expect(result).to.be.an('array');
  })

  it('should return an empty array', async () => {
    const result = await salesModels.findById(2);

    expect(result).to.be.empty;
  })

  describe('When exist ID', () => {
    before(() => {
      sinon.stub(salesModels, 'findById').resolves([
        { 
          date: '2022-02-24T18:28:37.000Z',
          productId: 1,
          quantity: 5
         }
      ])
    })

    after(() => {
      salesModels.findById.restore();
    })

    it('should return an array of object', async () => {
      const result = await salesModels.findById(2);

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
    })

    it('should return a non empty array', async () => {
      const result = await salesModels.findById(2);

      expect(result).not.to.be.empty;
    })

    it('shoul have keys "date", "productId" and "quantity"', async () => {
      const [result] = await salesModels.findById(2);

      expect(result).to.include.all.keys('date', 'productId', 'quantity');
    })
  })
});

describe('When the sale is registered', () => {
  before(async () => {
    const result = {
      message: "Unknown database 'StoreManager'"
    };

    sinon.stub(connection, 'execute').rejects(result);
  })

  after(async () => {
    connection.execute.restore();
  })

  it('should return an object error', async () => {
    await salesModels.registerSale().catch((error) => {
      expect(error).to.be.an('error');
      expect(error.message).to.be.a('string');
    })
  })

  describe('When register is succesfull', () => {
    before(() => {
      sinon.stub(salesModels, 'registerSale').resolves({
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
      salesModels.registerSale.restore();
    })

    it('should return an object', async () => {
      const result = await salesModels.registerSale();

      expect(result).to.be.an('object');
    })

    it('should contain the keys "id" and "itemsSold"', async () => {
      const result = await salesModels.registerSale();

      expect(result).to.includes.all.keys('id', 'itemsSold');
    })

  })
});

describe('Whe the sale is updated', () => {
  before(async () => {
    const result = {
      message: "Unknown database 'StoreManager'"
    };

    sinon.stub(connection, 'execute').rejects(result);
  })

  after(async () => {
    connection.execute.restore();
  })

  it('should return an object error', async () => {
    await salesModels.updateSaleProducts().catch((error) => {
      expect(error).to.be.an('error');
      expect(error.message).to.be.a('string');
    })
  })
})