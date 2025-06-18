
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Calendar, 
  Download, 
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

interface SalesData {
  month: string;
  reseller_sales: number;
  customer_sales: number;
  total_sales: number;
  voucher_count: number;
}

const SalesReport = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('all');

  // Mock sales data
  const salesData: SalesData[] = [
    { month: 'Jan 2024', reseller_sales: 15000000, customer_sales: 8000000, total_sales: 23000000, voucher_count: 450 },
    { month: 'Feb 2024', reseller_sales: 18000000, customer_sales: 9500000, total_sales: 27500000, voucher_count: 520 },
    { month: 'Mar 2024', reseller_sales: 22000000, customer_sales: 12000000, total_sales: 34000000, voucher_count: 680 },
    { month: 'Apr 2024', reseller_sales: 19000000, customer_sales: 10500000, total_sales: 29500000, voucher_count: 590 },
    { month: 'May 2024', reseller_sales: 25000000, customer_sales: 13500000, total_sales: 38500000, voucher_count: 770 },
  ];

  const pieData = [
    { name: 'Reseller', value: salesData.reduce((sum, item) => sum + item.reseller_sales, 0), color: '#0088FE' },
    { name: 'Customer', value: salesData.reduce((sum, item) => sum + item.customer_sales, 0), color: '#00C49F' },
  ];

  const totalRevenue = salesData.reduce((sum, item) => sum + item.total_sales, 0);
  const totalVouchers = salesData.reduce((sum, item) => sum + item.voucher_count, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Rp. {totalRevenue.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground">
              Total revenue tahun ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Voucher</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalVouchers.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground">
              Voucher terjual tahun ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata/Bulan</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              Rp. {Math.round(totalRevenue/salesData.length).toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground">
              Penjualan rata-rata per bulan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grafik Penjualan Bulanan</CardTitle>
            <CardDescription>Perbandingan penjualan reseller vs customer</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp. ${parseInt(value).toLocaleString('id-ID')}`} />
                <Bar dataKey="reseller_sales" fill="#0088FE" name="Reseller" />
                <Bar dataKey="customer_sales" fill="#00C49F" name="Customer" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Penjualan</CardTitle>
            <CardDescription>Persentase penjualan berdasarkan tipe user</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp. ${parseInt(value).toLocaleString('id-ID')}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Detail Penjualan Bulanan</CardTitle>
              <CardDescription>Rincian penjualan per bulan</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bulan</TableHead>
                <TableHead>Penjualan Reseller</TableHead>
                <TableHead>Penjualan Customer</TableHead>
                <TableHead>Total Penjualan</TableHead>
                <TableHead>Jumlah Voucher</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{data.month}</TableCell>
                  <TableCell>Rp. {data.reseller_sales.toLocaleString('id-ID')}</TableCell>
                  <TableCell>Rp. {data.customer_sales.toLocaleString('id-ID')}</TableCell>
                  <TableCell className="font-semibold">Rp. {data.total_sales.toLocaleString('id-ID')}</TableCell>
                  <TableCell>{data.voucher_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReport;
