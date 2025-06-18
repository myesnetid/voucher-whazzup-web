
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Search, 
  Filter,
  Calendar,
  User,
  CreditCard,
  Download
} from 'lucide-react';

interface Transaction {
  id: number;
  type: 'purchase' | 'topup' | 'voucher_generate';
  username: string;
  whatsapp_number: string;
  amount: number;
  voucher_code?: string;
  profile_name?: string;
  status: 'success' | 'pending' | 'failed';
  created_at: string;
  description: string;
}

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock transaction data
  const allTransactions: Transaction[] = [
    {
      id: 1,
      type: 'purchase',
      username: 'customer1',
      whatsapp_number: '628123456791@c.us',
      amount: 25000,
      voucher_code: 'VOC123456',
      profile_name: '24 Jam',
      status: 'success',
      created_at: '2024-01-15 10:30:00',
      description: 'Pembelian voucher 24 Jam'
    },
    {
      id: 2,
      type: 'topup',
      username: 'reseller1',
      whatsapp_number: '628123456790@c.us',
      amount: 500000,
      status: 'success',
      created_at: '2024-01-15 09:15:00',
      description: 'Top up saldo'
    },
    {
      id: 3,
      type: 'voucher_generate',
      username: 'reseller1',
      whatsapp_number: '628123456790@c.us',
      amount: 50000,
      voucher_code: 'VOC789012',
      profile_name: '3 Jam',
      status: 'success',
      created_at: '2024-01-15 08:45:00',
      description: 'Generate voucher 3 Jam (5 voucher)'
    },
    {
      id: 4,
      type: 'purchase',
      username: 'customer2',
      whatsapp_number: '628123456792@c.us',
      amount: 5000,
      voucher_code: 'VOC345678',
      profile_name: '1 Jam',
      status: 'success',
      created_at: '2024-01-14 20:15:00',
      description: 'Pembelian voucher 1 Jam'
    },
    {
      id: 5,
      type: 'purchase',
      username: 'customer3',
      whatsapp_number: '628123456793@c.us',
      amount: 10000,
      voucher_code: 'VOC901234',
      profile_name: '3 Jam',
      status: 'failed',
      created_at: '2024-01-14 18:30:00',
      description: 'Pembelian voucher 3 Jam (Gagal - Saldo tidak cukup)'
    },
    {
      id: 6,
      type: 'topup',
      username: 'customer1',
      whatsapp_number: '628123456791@c.us',
      amount: 100000,
      status: 'pending',
      created_at: '2024-01-14 16:20:00',
      description: 'Top up saldo (Menunggu konfirmasi)'
    },
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.whatsapp_number.includes(searchTerm) ||
                         (transaction.voucher_code && transaction.voucher_code.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'bg-blue-100 text-blue-800';
      case 'topup': return 'bg-green-100 text-green-800';
      case 'voucher_generate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase': return 'Pembelian';
      case 'topup': return 'Top Up';
      case 'voucher_generate': return 'Generate';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success': return 'Berhasil';
      case 'pending': return 'Pending';
      case 'failed': return 'Gagal';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTransactions.length}</div>
            <p className="text-xs text-muted-foreground">Semua transaksi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Berhasil</CardTitle>
            <Badge className="bg-green-100 text-green-800">✓</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {allTransactions.filter(t => t.status === 'success').length}
            </div>
            <p className="text-xs text-muted-foreground">Transaksi berhasil</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Badge className="bg-yellow-100 text-yellow-800">⏳</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {allTransactions.filter(t => t.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Menunggu konfirmasi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gagal</CardTitle>
            <Badge className="bg-red-100 text-red-800">✗</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {allTransactions.filter(t => t.status === 'failed').length}
            </div>
            <p className="text-xs text-muted-foreground">Transaksi gagal</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Riwayat Transaksi</CardTitle>
              <CardDescription>Kelola dan pantau semua transaksi pengguna</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Cari Transaksi</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Username, nomor WhatsApp, atau kode voucher"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter-type">Filter Tipe</Label>
              <select 
                id="filter-type"
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Semua Tipe</option>
                <option value="purchase">Pembelian</option>
                <option value="topup">Top Up</option>
                <option value="voucher_generate">Generate Voucher</option>
              </select>
            </div>
          </div>

          {/* Transaction Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Waktu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">#{transaction.id}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(transaction.type)}>
                      {getTypeLabel(transaction.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.username}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.whatsapp_number.replace('@c.us', '')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    Rp. {transaction.amount.toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <div>
                      {transaction.voucher_code && (
                        <p className="font-mono text-sm">{transaction.voucher_code}</p>
                      )}
                      {transaction.profile_name && (
                        <p className="text-sm text-gray-500">{transaction.profile_name}</p>
                      )}
                      <p className="text-xs text-gray-400">{transaction.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {getStatusLabel(transaction.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(transaction.created_at).toLocaleDateString('id-ID')}</p>
                      <p className="text-gray-500">
                        {new Date(transaction.created_at).toLocaleTimeString('id-ID')}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
