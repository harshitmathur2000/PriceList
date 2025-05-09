const Fastify = require('fastify');
const cors = require('@fastify/cors');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const fastify = Fastify();
fastify.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
});

const PORT = process.env.PORT || 3000;
const sequelize = new Sequelize(process.env.DB_URL,{
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
    }
  }
});

// Define model
const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  article_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_service: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  in_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  in_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  updated_on: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  }
}, {
  tableName: 'items',
  timestamps: false,
});

// Routes
fastify.get('/products', async (_, reply) => {
  const items = await Item.findAll();
  return items;
});

fastify.post('/products', async (req, reply) => {
  const data = req.body;
  const item = await Item.create({ ...data, updated_on: new Date() });
  return item;
});

fastify.put('/products/:id', async (req, reply) => {
  const { id } = req.params;
  const data = req.body;

  // Find the product by ID
  const item = await Item.findByPk(id);

  if (!item) {
    return reply.status(404).send({ message: 'Product not found' });
  }

  // Update the item with new data
  const updatedItem = await item.update({
    ...data,
    updated_on: new Date(), // Update the timestamp
  });

  return updatedItem;
});

fastify.delete('/products/:id', async (req, reply) => {
  const { id } = req.params;
  const deleted = await Item.destroy({ where: { id } });
  return { message: deleted ? 'Deleted successfully' : 'Not found' };
});

// Start
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  } catch (err) {
    console.error(err);
  }
};

start();
