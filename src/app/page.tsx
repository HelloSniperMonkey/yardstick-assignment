'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from "react";
import { TransactionList } from "@/components/TransactionList";
import { TransactionForm } from "@/components/TransactionForm";
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { DashboardSummary } from "@/components/DashboardSummary";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetComparisonChart } from "@/components/BudgetComparisonChart";
import { SpendingInsights } from "@/components/SpendingInsights";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ITransaction } from "@/models/Transaction";
import { IBudget } from "@/models/Budget";

export default function Home() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/transactions");
      
      if (!res.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const { data } = await res.json();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch(`/api/budgets?month=${selectedMonth}&year=${selectedYear}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch budgets');
      }
      
      const { data } = await res.json();
      setBudgets(data);
    } catch (err) {
      console.error('Failed to fetch budgets:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchBudgets();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Personal Finance Visualizer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your expenses, set budgets, and visualize your spending patterns
          </p>
        </div>
        
        {/* Dashboard Summary Cards */}
        <DashboardSummary 
          transactions={transactions} 
          icons={{
            totalExpenses: 'bi-cash-stack',
            thisMonth: 'bi-calendar-event',
            averageTransaction: 'bi-calculator',
            topCategory: 'bi-award'
          }}
        />
        
        {/* Budget Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Budget Management
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Period:</label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = i + 1;
                      const monthName = new Date(2024, i).toLocaleString('default', { month: 'long' });
                      return (
                        <SelectItem key={month} value={month.toString()}>
                          {monthName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = new Date().getFullYear() - 2 + i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Manage Budgets</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Manage Budgets</DialogTitle>
                  </DialogHeader>
                  <BudgetForm
                    onSuccess={() => {
                      fetchBudgets();
                      setIsBudgetDialogOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        {/* Budget vs Actual Comparison */}
        <div className="mb-6">
          <BudgetComparisonChart 
            transactions={transactions} 
            budgets={budgets}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </div>

        {/* Spending Insights */}
        <div className="mb-6">
          <SpendingInsights 
            transactions={transactions} 
            budgets={budgets}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            icons={{
              trendingUp: 'bi-arrow-up-circle',
              budgetPerformance: 'bi-exclamation-circle',
              quickStats: 'bi-lightning-fill'
            }}
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Transactions
                </h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Add Transaction</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Transaction</DialogTitle>
                    </DialogHeader>
                    <TransactionForm
                      onSuccess={() => {
                        fetchTransactions();
                        setIsDialogOpen(false);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                  {error}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchTransactions}
                    className="ml-2"
                  >
                    Retry
                  </Button>
                </div>
              )}
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <TransactionList
                  transactions={transactions}
                  fetchTransactions={fetchTransactions}
                />
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <MonthlyExpensesChart data={transactions} />
            <CategoryPieChart data={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
