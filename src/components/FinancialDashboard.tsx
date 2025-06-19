
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PieChart, BarChart3 } from "lucide-react";

interface FinancialDashboardProps {
  language: string;
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ language }) => {
  const translations = {
    id: {
      title: "Dashboard Keuangan",
      revenue: "Pendapatan",
      expenses: "Pengeluaran",
      profit: "Keuntungan",
      monthlyRevenue: "Pendapatan Bulanan",
      totalBookings: "Total Booking",
      avgBookingValue: "Rata-rata Nilai Booking",
      paymentStatus: "Status Pembayaran",
      recentTransactions: "Transaksi Terbaru"
    },
    en: {
      title: "Financial Dashboard",
      revenue: "Revenue",
      expenses: "Expenses", 
      profit: "Profit",
      monthlyRevenue: "Monthly Revenue",
      totalBookings: "Total Bookings",
      avgBookingValue: "Average Booking Value",
      paymentStatus: "Payment Status",
      recentTransactions: "Recent Transactions"
    }
  };

  const t = translations[language as keyof typeof translations];

  const financialData = {
    monthlyRevenue: 125000000,
    totalExpenses: 85000000,
    profit: 40000000,
    totalBookings: 342,
    avgBookingValue: 365000
  };

  const recentTransactions = [
    {
      id: "TXN001",
      customer: "Ahmad Santoso",
      amount: 450000,
      method: "GoPay",
      status: "completed",
      date: "2024-01-15"
    },
    {
      id: "TXN002", 
      customer: "Siti Nurhaliza",
      amount: 320000,
      method: "OVO",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "TXN003",
      customer: "Budi Santoso",
      amount: 280000,
      method: "Bank Transfer",
      status: "completed",
      date: "2024-01-14"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.monthlyRevenue}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {financialData.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalBookings}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+8% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.avgBookingValue}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {financialData.avgBookingValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.profit}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {financialData.profit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>{t.recentTransactions}</CardTitle>
          <CardDescription>Transaksi pembayaran terbaru</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-gray-600">{transaction.method} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rp {transaction.amount.toLocaleString()}</p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {transaction.status === 'completed' ? 'Selesai' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDashboard;
