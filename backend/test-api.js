// Simple API Tests for Production Verification
// Run: node test-api.js

require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

// Test results
let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.log(`❌ FAIL: ${name} - ${err.message}`);
    failed++;
  }
}

async function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function runTests() {
  console.log('\n🔍 Running API Tests...\n');

  // Test 1: Health endpoint
  await test('Health check returns ok', async () => {
    const res = await axios.get(`${API_URL}/health`);
    assert(res.data.status === 'ok', 'Health check failed');
  });

  // Test 2: Get all products
  await test('Get products returns array', async () => {
    const res = await axios.get(`${API_URL}/products`);
    assert(Array.isArray(res.data), 'Products not an array');
  });

  // Test 3: Get products by category
  await test('Get products by category', async () => {
    const res = await axios.get(`${API_URL}/products?category=gates`);
    assert(res.data.length > 0, 'No gates products');
  });

  // Test 4: Get single product
  await test('Get single product', async () => {
    const products = await axios.get(`${API_URL}/products`);
    if (products.data.length > 0) {
      const res = await axios.get(`${API_URL}/products/${products.data[0]._id}`);
      assert(res.data._id === products.data[0]._id, 'Product ID mismatch');
    }
  });

  // Test 5: Invalid product returns 404
  await test('Invalid product returns 404', async () => {
    try {
      await axios.get(`${API_URL}/products/invalid-id`);
      throw new Error('Should have returned 404');
    } catch (err) {
      assert(err.response?.status === 404, 'Expected 404');
    }
  });

  // Test 6: Login without credentials
  await test('Login returns 401 without credentials', async () => {
    try {
      await axios.post(`${API_URL}/auth/login`, {});
      throw new Error('Should have returned 401');
    } catch (err) {
      assert(err.response?.status === 401, 'Expected 401');
    }
  });

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
  
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
