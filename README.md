# Personal Finance Visualizer

A modern, responsive web application for tracking personal finances built with Next.js, React, and MongoDB.

## Features

### Stage 1: Basic Transaction Tracking ✅
- ✅ Add/Edit/Delete transactions (amount, date, description, category)
- ✅ Transaction list view with category display
- ✅ Monthly expenses bar chart
- ✅ Form validation with error handling
- ✅ Loading states and error handling
- ✅ Responsive design

### Stage 2: Categories ✅
- ✅ Enhanced predefined categories with icons and colors
- ✅ Category-wise pie chart with custom tooltips and legend
- ✅ Dashboard with summary cards:
  - Total expenses and transaction count
  - Current month expenses
  - Average transaction amount
  - Top spending category
  - Top categories breakdown with progress bars
  - Recent transactions list

### Stage 3: Budgeting ✅
- ✅ Set monthly category budgets with intuitive form interface
- ✅ Budget vs actual comparison chart with:
  - Side-by-side bar comparison
  - Individual category progress cards
  - Color-coded status indicators (green/yellow/red)
  - Budget utilization percentages
- ✅ Comprehensive spending insights:
  - Month-over-month spending comparison
  - Budget performance analysis (over/under budget categories)
  - Spending trend analysis (categories trending up/down)
  - Quick statistics (transaction count, averages, top categories)
- ✅ Period selection for budget analysis (month/year selector)
- ✅ Budget management interface with CRUD operations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Charts**: Recharts
- **Database**: MongoDB with Mongoose
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with dark mode support

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yardstick-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/personal-finance?retryWrites=true
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── transactions/
│   │       ├── route.ts          # GET, POST /api/transactions
│   │       └── [id]/
│   │           └── route.ts      # PUT, DELETE /api/transactions/:id
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main dashboard
├── components/
│   ├── BudgetComparisonChart.tsx# Budget vs actual comparison
│   ├── BudgetForm.tsx          # Budget setting form
│   ├── CategoryPieChart.tsx    # Category breakdown pie chart
│   ├── DashboardSummary.tsx    # Summary cards dashboard
│   ├── MonthlyExpensesChart.tsx# Bar chart component
│   ├── SpendingInsights.tsx    # Spending analysis insights
│   ├── TransactionForm.tsx     # Add/Edit transaction form
│   ├── TransactionList.tsx     # Transaction table
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── categories.ts           # Category definitions and utilities
│   ├── dbConnect.ts            # MongoDB connection
│   └── utils.ts                # Utility functions
└── models/
    ├── Budget.ts               # Budget model
    └── Transaction.ts          # Transaction model
└── models/
    └── Transaction.ts           # Transaction model
```

## API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

### Budgets
- `GET /api/budgets` - Get budgets (supports month/year query params)
- `POST /api/budgets` - Create or update a budget
- `PUT /api/budgets/:id` - Update a budget
- `DELETE /api/budgets/:id` - Delete a budget

## MongoDB Schemas

### Transaction Schema
```javascript
{
  amount: Number,      // Transaction amount
  date: Date,          // Transaction date
  description: String, // Transaction description
  category: String,    // Transaction category
}
```

### Budget Schema
```javascript
{
  category: String,    // Budget category
  amount: Number,      // Budget amount
  month: String,       // Month in YYYY-MM format
  year: Number,        // Budget year
  createdAt: Date,     // Creation timestamp
  updatedAt: Date,     // Last update timestamp
}
```

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **Database Models**: Add to `src/models/`
2. **API Routes**: Add to `src/app/api/`
3. **Components**: Add to `src/components/`
4. **UI Components**: Use shadcn/ui components from `src/components/ui/`

## Deployment

1. **Vercel** (Recommended)
   - Connect your GitHub repository to Vercel
   - Add your `MONGODB_URI` environment variable
   - Deploy automatically on push

2. **Other Platforms**
   - Build the project: `npm run build`
   - Set environment variables
   - Deploy the `.next` folder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
