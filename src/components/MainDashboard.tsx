
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Car, Users, DollarSign, Clock, MapPin, Phone, Mail, LogOut } from "lucide-react";
import BookingSystem from "@/components/BookingSystem";
import DriverDashboard from "@/components/DriverDashboard";
import VehicleManagement from "@/components/VehicleManagement";
import FinancialDashboard from "@/components/FinancialDashboard";
import CustomerManagement from "@/components/CustomerManagement";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const MainDashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [language, setLanguage] = useState("id");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const translations = {
    id: {
      title: "Rent Mobil Indonesia Ceria",
      subtitle: "Solusi Terpercaya untuk Kebutuhan Transportasi Anda",
      dashboard: "Dashboard",
      booking: "Pemesanan",
      vehicles: "Kendaraan",
      drivers: "Driver",
      customers: "Pelanggan",
      financial: "Keuangan",
      welcome: "Selamat Datang",
      signOut: "Keluar",
      stats: {
        totalBookings: "Total Pemesanan",
        activeDrivers: "Driver Aktif",
        availableVehicles: "Kendaraan Tersedia",
        monthlyRevenue: "Pendapatan Bulan Ini"
      }
    },
    en: {
      title: "Indonesia Ceria Car Rental",
      subtitle: "Trusted Solution for Your Transportation Needs",
      dashboard: "Dashboard",
      booking: "Booking",
      vehicles: "Vehicles",
      drivers: "Drivers",
      customers: "Customers",
      financial: "Financial",
      welcome: "Welcome",
      signOut: "Sign Out",
      stats: {
        totalBookings: "Total Bookings",
        activeDrivers: "Active Drivers",
        availableVehicles: "Available Vehicles",
        monthlyRevenue: "Monthly Revenue"
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  const statsData = [
    {
      title: t.stats.totalBookings,
      value: "1,245",
      icon: Calendar,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: t.stats.activeDrivers,
      value: "87",
      icon: Users,
      change: "+3%",
      changeType: "positive"
    },
    {
      title: t.stats.availableVehicles,
      value: "156",
      icon: Car,
      change: "-2%",
      changeType: "negative"
    },
    {
      title: t.stats.monthlyRevenue,
      value: "Rp 2.8M",
      icon: DollarSign,
      change: "+18%",
      changeType: "positive"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {t.welcome}, {profile?.full_name || user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "id" ? "en" : "id")}
              >
                {language === "id" ? "EN" : "ID"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                {t.signOut}
              </Button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>info@rentmobil.id</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger value="dashboard">{t.dashboard}</TabsTrigger>
            <TabsTrigger value="booking">{t.booking}</TabsTrigger>
            <TabsTrigger value="vehicles">{t.vehicles}</TabsTrigger>
            <TabsTrigger value="drivers">{t.drivers}</TabsTrigger>
            <TabsTrigger value="customers">{t.customers}</TabsTrigger>
            <TabsTrigger value="financial">{t.financial}</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="flex items-center mt-1">
                      <Badge 
                        variant={stat.changeType === "positive" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-2">dari bulan lalu</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Navigasi cepat ke fungsi utama sistem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveTab("booking")}
                  >
                    <Calendar className="h-6 w-6" />
                    <span>Pemesanan Baru</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveTab("vehicles")}
                  >
                    <Car className="h-6 w-6" />
                    <span>Kelola Kendaraan</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveTab("drivers")}
                  >
                    <Users className="h-6 w-6" />
                    <span>Manajemen Driver</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveTab("financial")}
                  >
                    <DollarSign className="h-6 w-6" />
                    <span>Laporan Keuangan</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terkini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "10:30", action: "Pemesanan baru dari Budi Santoso", type: "booking" },
                    { time: "09:15", action: "Driver Ahmad check-in untuk shift pagi", type: "driver" },
                    { time: "08:45", action: "Kendaraan B 1234 CD selesai servis", type: "vehicle" },
                    { time: "08:00", action: "Pembayaran Rp 850,000 diterima", type: "payment" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking">
            <BookingSystem language={language} />
          </TabsContent>

          <TabsContent value="vehicles">
            <VehicleManagement language={language} />
          </TabsContent>

          <TabsContent value="drivers">
            <DriverDashboard language={language} />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement language={language} />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialDashboard language={language} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainDashboard;
