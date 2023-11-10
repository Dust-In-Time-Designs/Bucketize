import {API_URL} from '@env';

interface BudgetData {
  userId: string;
  name: string;
  total: number;
  categories: Array<{
    name: string;
    limit: number;
  }>;
  startDate: Date;
  endDate: Date;
}

const handleCreateBudget = async (budgetData: BudgetData) => {
  try {
    const response = await fetch(`${API_URL}/api/budgets/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budgetData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error creating the budget:', error);
    throw error;
  }
};

const handleGetBudget = async () => {
  try {
    const response = await fetch(`${API_URL}/api/budgets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('There was an error fetching the budget:', error);
    throw error;
  }
};

export {handleCreateBudget, handleGetBudget};
