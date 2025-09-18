import CardDataStats from "../../../components/CardDataStats";
import ChartOne from "../../../components/Charts/ChartOne";
import ChartThree from "../../../components/Charts/ChartThree";
import ChartTwo from "../../../components/Charts/ChartTwo";
import ChatCard from "../../../components/Chat/ChatCard";
import TableOne from "../../../components/Tables/TableOne";
import { BsCashCoin, BsPeopleFill } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";

import _ from "lodash";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Calculator,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  useSchoolData,
  useSchoolTermDetails,
} from "@/pages/hook/useSchoolAuth";
import { useTermExpenses } from "@/pagesForStudents/hooks/useStudentHook";
import LittleHeader from "@/components/static/LittleHeader";
import moment from "moment";
// import schoolHeaderImage from "@/assets/school-header.jpg";

// Mock data for the dashboard
const getMonthlyData = (expenses: any[], incomes: any[]) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize monthly totals
  const monthlyTotals = months.map((month) => ({
    month,
    income: 0,
    expenses: 0,
  }));

  // Process expenses
  expenses?.forEach((expense: any) => {
    if (expense?.amount && expense?.createdAt) {
      const month = new Date(expense.createdAt).getMonth();
      monthlyTotals[month].expenses += Number(expense.amount);
    }
  });

  // Process incomes
  incomes?.forEach((income: any) => {
    if (income?.paymentAmount && income?.createdAt) {
      const month = new Date(income.createdAt).getMonth();
      monthlyTotals[month].income += Number(income.paymentAmount);
    }
  });

  return monthlyTotals;
};

const monthlyData = [
  { month: "Jan", income: 45000, expenses: 38000 },
  { month: "Feb", income: 52000, expenses: 41000 },
  { month: "Mar", income: 48000, expenses: 39000 },
  { month: "Apr", income: 55000, expenses: 42000 },
  { month: "May", income: 51000, expenses: 40000 },
  { month: "Jun", income: 58000, expenses: 44000 },
  { month: "Jul", income: 45000, expenses: 38000 },
  { month: "Aug", income: 52000, expenses: 41000 },
  { month: "Sep", income: 48000, expenses: 39000 },
  { month: "Oct", income: 55000, expenses: 42000 },
  { month: "Nov", income: 51000, expenses: 40000 },
  { month: "Dec", income: 58000, expenses: 44000 },
];

const expenseCategories = [
  { name: "Staff Salaries", value: 35000, color: "hsl(220 70% 50%)" },
  { name: "Utilities", value: 8000, color: "hsl(160 70% 50%)" },
  { name: "Supplies", value: 6000, color: "hsl(35 90% 55%)" },
  { name: "Maintenance", value: 4000, color: "hsl(0 70% 55%)" },
  { name: "Other", value: 3000, color: "hsl(270 70% 50%)" },
];

const getExpenseCategories = (expenses: any[]) => {
  // Define category colors
  const categoryColors = {
    "Staff Salaries": "hsl(220 70% 50%)",
    Utilities: "hsl(160 70% 50%)",
    Supplies: "hsl(35 90% 55%)",
    Maintenance: "hsl(0 70% 55%)",
    Transport: "hsl(270 70% 50%)",
    Infrastructure: "hsl(180 70% 50%)",
    Academic: "hsl(120 70% 50%)",
    Other: "hsl(300 70% 50%)",
  };

  // Group expenses by category and sum their values
  const categorizedExpenses = expenses?.reduce((acc: any, expense: any) => {
    const category = expense?.category || "Other";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(expense?.amount) || 0;
    return acc;
  }, {});

  // Transform into required format
  return Object.entries(categorizedExpenses || {}).map(([name, value]) => ({
    name,
    value: Number(value),
    color:
      categoryColors[name as keyof typeof categoryColors] || "hsl(270 70% 50%)",
  }));
};

// This will be calculated inside the component

const recentTransactions = [
  {
    id: 1,
    description: "Tuition Fee - Grade 12A",
    amount: 1200,
    type: "income",
    date: "2024-01-15",
  },
  {
    id: 2,
    description: "Teacher Salary - Mathematics Dept",
    amount: -3500,
    type: "expense",
    date: "2024-01-14",
  },
  {
    id: 3,
    description: "Library Books Purchase",
    amount: -450,
    type: "expense",
    date: "2024-01-13",
  },
  {
    id: 4,
    description: "Registration Fees",
    amount: 800,
    type: "income",
    date: "2024-01-12",
  },
  {
    id: 5,
    description: "Electricity Bill",
    amount: -320,
    type: "expense",
    date: "2024-01-11",
  },
];

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  variant: "primary" | "income" | "expense" | "neutral";
}> = ({ title, value, change, icon, variant }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "income":
        return "metric-card-income";
      case "expense":
        return "metric-card-expense";
      case "primary":
        return "metric-card-primary";
      default:
        return "card-gradient";
    }
  };

  return (
    <Card className={`${getVariantClass()} animate-fade-in text-blue-950`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-70 !-ml-3">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="mx-2 mb-2">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs opacity-80 mt-1">{change}</p>
      </CardContent>
    </Card>
  );
};

const AnalyticScreen: React.FC = () => {
  const { data } = useSchoolData();
  const { data: termData } = useSchoolTermDetails(data?.presentTermID);

  const { termlyExpense } = useTermExpenses(data?._id);

  const otherPayment = _?.sumBy(
    termData?.data?.paymentOptions,
    (option: any) => Number(option.paymentAmount) || 0
  );

  const storePayment = _?.sumBy(termData?.data?.storePayment, "amount");

  const expensePayment = _?.sumBy(termData?.data?.expensePayOut, "amount");

  // const schoolFeePayment = _?.sumBy(termData?.data?.schoolFeePayment, "cost");

  let allData = termData?.data?.storePayment.concat(
    termData?.data?.schoolFeePayment,
    termData?.data?.paymentOptions
  );

  const expenseData = termlyExpense?.data?.expense
    ?.map((el: any) => {
      return el?.amount ? el?.amount : 0;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  const schoolFeePayment = termData?.data?.schoolFeePayment
    ?.map((el: any) => {
      return el?.amount ? el?.amount : 0;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  const monthlyData = getMonthlyData(
    termlyExpense?.data?.expense,
    termData?.data?.paymentOptions
  );

  const expenseCategoriesII = getExpenseCategories(
    termlyExpense?.data?.expense
  );

  // Concatenate and sort all data by createdAt in descending order
  const sortedData = _?.orderBy(
    allData?.concat(termlyExpense?.data?.expense || []) || [],
    ["createdAt"],
    ["desc"]
  );

  return (
    <div className="min-h-screen bg-background p-2 text-blue-950">
      {/* Header */}

      <LittleHeader name="Analytics Screen" />
      <div
        className="relative mb-8 rounded-xl overflow-hidden bg-blue-950"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(59, 130, 246, 0.8)), `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-8 text-white text-left">
          <h1 className="text-4xl font-medium mb-2 text-left uppercase">
            School Financial Dashboard
          </h1>
          <p className="text-lg opacity-90">
            Comprehensive expense and income tracking for educational excellence
          </p>
        </div>
      </div>

      {/* <AnalyticScreenData /> */}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/*  */}
        <MetricCard
          title="Total Income"
          value={`₦${parseFloat(`${otherPayment}`).toLocaleString()}`}
          change="+12% from last month"
          icon={<BsCashCoin className="h-5 w-5 " />}
          variant="income"
        />
        <MetricCard
          title="Total Expenses"
          value={`₦${parseFloat(`${expenseData}`).toLocaleString()}`}
          change="+8% from last month"
          icon={<FaCcMastercard className="h-5 w-5" />}
          variant="expense"
        />
        <MetricCard
          title="Net Balance/Store"
          value={`₦${parseFloat(`${storePayment}`).toLocaleString()}`}
          change="+22% from last month"
          icon={<FaStore className="h-5 w-5" />}
          variant="primary"
        />
        <MetricCard
          title="Total SchoolFees"
          value={`₦${parseFloat(`${schoolFeePayment}`).toLocaleString()}`}
          change={`${termData?.data?.schoolFeePayment?.length} +3% from last month`}
          icon={<Users className="h-5 w-5" />}
          variant="neutral"
        />
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income vs Expenses Trend */}
        <Card className="card-gradient animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Income vs Expenses Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={3}
                  dot={{
                    fill: "hsl(var(--destructive))",
                    strokeWidth: 2,
                    r: 4,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card className="card-gradient animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Expense Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Amount",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* Recent Transactions */}
      <Card className="card-gradient animate-slide-up">
        <CardHeader>
          <CardTitle>Top 10 Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* sortedData?.slice(0, 10) recentTransactions*/}
            {sortedData?.slice(0, 10).map((transaction: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg smooth-transition hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.paymentMode === "cash" ||
                      transaction.reference === "paid in cash"
                        ? "bg-success-light text-success"
                        : "bg-destructive-light text-destructive"
                    }`}
                  >
                    {transaction.paymentMode === "cash" ||
                    transaction.reference === "paid in cash" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.paymentDetails ||
                        transaction.item ||
                        "School Fees"}{" "}
                      -{" "}
                      {transaction?.paymentMode === "cash" ||
                      transaction?.reference === "paid in cash" ? (
                        <span className="text-green-500 font-semibold text-[12px] uppercase ">
                          Inflow
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold text-[12px] uppercase ">
                          Outflow
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {moment(transaction.createAt).format("DD-MM-YYY")}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    transaction.paymentMode === "cash" ||
                    transaction.reference === "paid in cash"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  ₦
                  {Math.abs(
                    transaction.amount ||
                      transaction.amount ||
                      parseInt(transaction.paymentAmount)
                  ).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticScreen;

const AnalyticScreenData: React.FC = () => {
  const { data } = useSchoolData();
  const { data: termData } = useSchoolTermDetails(data?.presentTermID);

  const { termlyExpense } = useTermExpenses(data?._id);

  const otherPayment = _?.sumBy(
    termData?.data?.paymentOptions,
    (option: any) => Number(option.paymentAmount) || 0
  );

  const storePayment = _?.sumBy(termData?.data?.storePayment, "amount");

  const expensePayment = _?.sumBy(termData?.data?.expensePayOut, "amount");

  // const schoolFeePayment = _?.sumBy(termData?.data?.schoolFeePayment, "cost");

  let allData = termData?.data?.storePayment.concat(
    termData?.data?.schoolFeePayment,
    termData?.data?.paymentOptions
  );
  const expenseData = termlyExpense?.data?.expense
    ?.map((el: any) => {
      return el?.amount ? el?.amount : 0;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);
  const schoolFeePayment = termData?.data?.schoolFeePayment
    ?.map((el: any) => {
      return el?.amount ? el?.amount : 0;
    })
    .reduce((a: number, b: number) => {
      return a + b;
    }, 0);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 text-blue-950">
        <CardDataStats
          title="Inflow[income]"
          total={`₦${parseFloat(`${otherPayment}`).toLocaleString()}`}
          rate=""
          levelUp
        >
          <BsCashCoin size={30} />
        </CardDataStats>
        <CardDataStats
          title="Outflow[Expenses]"
          total={`₦${parseFloat(`${expenseData}`).toLocaleString()}`}
          rate=""
          levelUp
        >
          <FaCcMastercard size={30} />
        </CardDataStats>
        <CardDataStats
          title="Store Sales"
          total={`₦${parseFloat(`${storePayment}`).toLocaleString()}`}
          rate=""
          levelUp
        >
          <FaStore size={30} />
        </CardDataStats>
        <CardDataStats
          title="School Fees[Paid]"
          total={`₦${parseFloat(`${schoolFeePayment}`).toLocaleString()}`}
          rate={`${termData?.data?.schoolFeePayment?.length}`}
          levelDown
        >
          <BsPeopleFill size={30} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne
          schoolFee={schoolFeePayment}
          store={storePayment}
          others={otherPayment}
          expensePayment={expenseData}
          data={data}
        /> */}
        {/* <ChartTwo /> */}

        <div className="col-span-12 xl:col-span-12">{/* <TableOne /> */}</div>
      </div>
      {/* <ChatCard /> */}
    </>
  );
};
