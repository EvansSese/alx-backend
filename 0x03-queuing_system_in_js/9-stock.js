const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = 1245;

// Array containing the list of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

// Connect to Redis server
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Function to reserve stock by itemId
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

// Function to get current reserved stock by itemId
async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
}

// Function to get item from listProducts by itemId
function getItemById(id) {
  return listProducts.find(item => item.itemId === id);
}

// Middleware to handle product not found
function handleProductNotFound(req, res, next) {
  const { itemId } = req.params;
  const item = getItemById(parseInt(itemId));
  if (!item) {
    res.status(404).json({ status: 'Product not found' });
  } else {
    next();
  }
}

// Middleware to handle not enough stock available
function handleNotEnoughStock(req, res, next) {
  const { itemId } = req.params;
  const item = getItemById(parseInt(itemId));
  const reservedStock = getCurrentReservedStockById(parseInt(itemId));
  if (reservedStock >= item.initialAvailableQuantity) {
    res.status(400).json({ status: 'Not enough stock available', itemId: parseInt(itemId) });
  } else {
    next();
  }
}

// Route to list all products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(item => ({
    itemId: item.itemId,
    itemName: item.itemName,
    price: item.price,
    initialAvailableQuantity: item.initialAvailableQuantity
  })));
});

// Route to get product details by itemId
app.get('/list_products/:itemId', handleProductNotFound, async (req, res) => {
  const { itemId } = req.params;
  const item = getItemById(parseInt(itemId));
  const currentReservedStock = await getCurrentReservedStockById(parseInt(itemId));
  res.json({
    itemId: item.itemId,
    itemName: item.itemName,
    price: item.price,
    initialAvailableQuantity: item.initialAvailableQuantity,
    currentQuantity: item.initialAvailableQuantity - currentReservedStock
  });
});

// Route to reserve a product by itemId
app.get('/reserve_product/:itemId', handleProductNotFound, handleNotEnoughStock, async (req, res) => {
  const { itemId } = req.params;
  await reserveStockById(parseInt(itemId), 1);
  res.json({ status: 'Reservation confirmed', itemId: parseInt(itemId) });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
