
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { User, Phone, Mail, Calendar, Search } from "lucide-react";

interface CustomerManagementProps {
  language: string;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const translations = {
    id: {
      title: "Manajemen Pelanggan",
      customerList: "Daftar Pelanggan",
      loyaltyProgram: "Program Loyalitas",
      addCustomer: "Tambah Pelanggan",
      searchCustomer: "Cari pelanggan...",
      customerInfo: "Info Pelanggan",
      bookingHistory: "Riwayat Pemesanan",
      loyaltyPoints: "Poin Loyalitas",
      status: {
        active: "Aktif",
        inactive: "Tidak Aktif",
        vip: "VIP",
        new: "Baru"
      },
      joinDate: "Tanggal Bergabung",
      totalBookings: "Total Pemesanan",
      lastBooking: "Pemesanan Terakhir"
    },
    en: {
      title: "Customer Management",
      customerList: "Customer List",
      loyaltyProgram: "Loyalty Program",
      addCustomer: "Add Customer",
      searchCustomer: "Search customers...",
      customerInfo: "Customer Info",
      bookingHistory: "Booking History",
      loyaltyPoints: "Loyalty Points",
      status: {
        active: "Active",
        inactive: "Inactive",
        vip: "VIP",
        new: "New"
      },
      joinDate: "Join Date",
      totalBookings: "Total Bookings",
      lastBooking: "Last Booking"
    }
  };

  const t = translations[language as keyof typeof translations];

  const customers = [
    {
      id: "C001",
      name: "Budi Santoso",
      email: "budi.santoso@email.com",
      phone: "+62 812 3456 7890",
      status: "vip",
      loyaltyPoints: 2450,
      totalBookings: 15,
      joinDate: "2023-06-15",
      lastBooking: "2024-01-10",
      avatar: "/placeholder.svg"
    },
    {
      id: "C002",
      name: "Siti Rahayu",
      email: "siti.rahayu@email.com",
      phone: "+62 813 4567 8901",
      status: "active",
      loyaltyPoints: 890,
      totalBookings: 8,
      joinDate: "2023-09-22",
      lastBooking: "2024-01-08",
      avatar: "/placeholder.svg"
    },
    {
      id: "C003",
      name: "Ahmad Wijaya",
      email: "ahmad.wijaya@email.com",
      phone: "+62 814 5678 9012",
      status: "active",
      loyaltyPoints: 1250,
      totalBookings: 12,
      joinDate: "2023-07-10",
      lastBooking: "2024-01-05",
      avatar: "/placeholder.svg"
    },
    {
      id: "C004",
      name: "Dewi Lestari",
      email: "dewi.lestari@email.com",
      phone: "+62 815 6789 0123",
      status: "new",
      loyaltyPoints: 150,
      totalBookings: 2,
      joinDate: "2024-01-01",
      lastBooking: "2024-01-12",
      avatar: "/placeholder.svg"
    },
    {
      id: "C005",
      name: "Rizki Pratama",
      email: "rizki.pratama@email.com",
      phone: "+62 816 7890 1234",
      status: "inactive",
      loyaltyPoints: 450,
      totalBookings: 5,
      joinDate: "2023-04-18",
      lastBooking: "2023-11-20",
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const loyaltyTiers = [
    {
      name: "Bronze",
      minPoints: 0,
      benefits: "Diskon 5%",
      color: "bg-orange-100 text-orange-800"
    },
    {
      name: "Silver",
      minPoints: 500,
      benefits: "Diskon 10% + Priority Support",
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "Gold",
      minPoints: 1000,
      benefits: "Diskon 15% + Free Upgrade",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      name: "Platinum",
      minPoints: 2000,
      benefits: "Diskon 20% + VIP Treatment",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  const getCustomerTier = (points: number) => {
    if (points >= 2000) return loyaltyTiers[3];
    if (points >= 1000) return loyaltyTiers[2];
    if (points >= 500) return loyaltyTiers[1];
    return loyaltyTiers[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <Button>{t.addCustomer}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.customerList}</CardTitle>
              <CardDescription>Kelola data pelanggan dan riwayat pemesanan</CardDescription>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t.searchCustomer}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer) => {
                  const tier = getCustomerTier(customer.loyaltyPoints);
                  return (
                    <div key={customer.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{customer.name}</h3>
                          <div className="flex space-x-2">
                            <Badge className={tier.color}>
                              {tier.name}
                            </Badge>
                            <Badge className={getStatusColor(customer.status)}>
                              {t.status[customer.status as keyof typeof t.status]}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500">{t.loyaltyPoints}: </span>
                            <span className="font-medium">{customer.loyaltyPoints}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.totalBookings}: </span>
                            <span className="font-medium">{customer.totalBookings}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">{t.lastBooking}: </span>
                            <span className="font-medium">{customer.lastBooking}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {t.joinDate}: {customer.joinDate}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loyalty Program */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t.loyaltyProgram}</CardTitle>
              <CardDescription>Tingkatan dan benefit loyalitas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loyaltyTiers.map((tier, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={tier.color}>
                        {tier.name}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {tier.minPoints}+ poin
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{tier.benefits}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistik Pelanggan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Pelanggan</span>
                  <span className="font-medium">{customers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pelanggan Aktif</span>
                  <span className="font-medium">
                    {customers.filter(c => c.status === 'active' || c.status === 'vip').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pelanggan VIP</span>
                  <span className="font-medium">
                    {customers.filter(c => c.status === 'vip').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pelanggan Baru</span>
                  <span className="font-medium">
                    {customers.filter(c => c.status === 'new').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
