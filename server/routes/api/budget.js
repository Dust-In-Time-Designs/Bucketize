const express = require('express');
const router = express.Router();
const supabase = require('../../config/supabase');

// Create a new budget
router.post('/create', async (req, res) => {
  const {userId, name, startDate, endDate, categories, total} = req.body;

  // Basic validation
  if (!userId || !name || !startDate || !endDate || !categories || !total) {
    return res.status(400).json({error: 'Missing required budget fields'});
  }

  // Should also validate the format of dates and categories structure

  try {
    // Insert the new budget into the 'budgets' table
    const {data: budget, error: budgetError} = await supabase
      .from('budgets')
      .insert({
        user_id: userId, // Make sure this is 'user_id' if that's what your column is called
        name: name,
        start_date: startDate, // Make sure the column names match your database schema
        end_date: endDate,
        total: total,
      })
      .select();
    if (budgetError) {
      throw new Error('Failed to create new budget');
    }
    // Insert budget categories
    const categoryInserts = categories.map(category => ({
      budget_id: budget[0].budget_id,
      name: category.name,
      limit: category.limit,
      spent: 0,
    }));


    const {error: categoriesError} = await supabase
      .from('budget_categories')
      .insert(categoryInserts);
    console.log(categoriesError);
    if (categoriesError) {
      throw new Error('Failed to create budget categories');
    }

    res.json({budget: budget, categories: categories});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
});

// Update an existing budget
router.put('/budgets/:budgetId', async (req, res) => {
  // implementation...
});

// Delete a budget
router.delete('/budgets/:budgetId', async (req, res) => {
  // implementation...
});

// Get all budgets for a user
router.get('/', async (req, res) => {
  console.log('fetching budget');
  try {
    const {data: budget, error: budgetError} = await supabase
      .from('budgets')
      .select();
    if (budgetError) {
      throw new Error('Failed to create new budget');
    }

    const {data: categories, error: categoriesError} = await supabase
      .from('budget_categories')
      .select();

    if (categoriesError) {
      throw new Error('Failed to create budget categories');
    }

    res.json({budget: budget, categories: categories});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Get transactions for a budget
router.get('/budgets/:budgetId/transactions', async (req, res) => {
  // implementation
});

// Assign a transaction to a budget
router.post('/budgets/:budgetId/transactions', async (req, res) => {
  // implementation...
});

module.exports = router;
