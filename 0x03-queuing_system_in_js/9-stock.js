import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();
client.on('error', (err) => console.log(`Redis client not connected to server: ${err.message}`));
client.on('connect', () => console.log('Redis client connected to the server'));

const getAsync = promisify(client.get).bind(client);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const listProducts = [
  {
    id: 1,
    name: 'Suitcase 250',
    price: 50,
    stock: 4,
  },
  {
    id: 2,
    name: 'Suitcase 450',
    price: 100,
    stock: 10,
  },
  {
    id: 3,
    name: 'Suitcase 650',
    price: 350,
    stock: 2,
  },
  {
    id: 4,
    name: 'Suitcase 1050',
    price: 550,
    stock: 5,
  },
];

function getItemById(id) {
  return listProducts.find((product) => product.id === id);
}

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const item = await getAsync(`item.${itemId}`);
  return item;
}

app.get('/list_products', (req, res) => {
  res.json(
    listProducts.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock,
    })),
  );
});

app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(Number(itemId));
  if (item) {
    const reservedStock = Number(await getCurrentReservedStockById(itemId));
    res.json({
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      initialAvailableQuantity: item.stock,
      currentQuantity: item.stock - reservedStock,
    });
  } else {
    res.json({ status: 'Product not found' });
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(Number(itemId));
  if (item) {
    const reservedStock = Number(await getCurrentReservedStockById(itemId));
    if (item.stock - reservedStock > 0) {
      reserveStockById(itemId, reservedStock + 1);
      res.json({ status: 'Reservation confirmed', itemId });
    } else {
      res.json({ status: 'Not enough stock available', itemId });
    }
  } else {
    res.json({ status: 'Product not found' });
  }
});

app.listen(1245, () => console.log('Listening on port 1245'));
