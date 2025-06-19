
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, MapPin, Phone } from "lucide-react";

interface DriverDashboardProps {
  language: string;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ language }) => {
  const translations = {
    id: {
      title: "Manajemen Driver",
      activeDrivers: "Driver Aktif",
      driverSchedule: "Jadwal Driver",
      performance: "Performa Driver",
      addDriver: "Tambah Driver",
      status: {
        active: "Aktif",
        inactive: "Tidak Aktif",
        onTrip: "Dalam Perjalanan",
        break: "Istirahat"
      },
      rating: "Rating",
      totalTrips: "Total Perjalanan",
      workingHours: "Jam Kerja",
      contact: "Kontak"
    },
    en: {
      title: "Driver Management",
      activeDrivers: "Active Drivers",
      driverSchedule: "Driver Schedule",
      performance: "Driver Performance",
      addDriver: "Add Driver",
      status: {
        active: "Active",
        inactive: "Inactive",
        onTrip: "On Trip",
        break: "On Break"
      },
      rating: "Rating",
      totalTrips: "Total Trips",
      workingHours: "Working Hours",
      contact: "Contact"
    }
  };

  const t = translations[language as keyof typeof translations];

  const drivers = [
    {
      id: "D001",
      name: "Ahmad Wijaya",
      phone: "+62 812 3456 7890",
      status: "onTrip",
      rating: 4.8,
      totalTrips: 156,
      workingHours: "08:00 - 20:00",
      vehicle: "B 1234 CD",
      location: "Dalam perjalanan ke Bandung",
      avatar: "/placeholder.svg"
    },
    {
      id: "D002",
      name: "Budi Santoso",
      phone: "+62 813 4567 8901",
      status: "active",
      rating: 4.6,
      totalTrips: 98,
      workingHours: "06:00 - 18:00",
      vehicle: "B 5678 EF",
      location: "Depot Jakarta Selatan",
      avatar: "/placeholder.svg"
    },
    {
      id: "D003",
      name: "Siti Rahayu",
      phone: "+62 814 5678 9012",
      status: "break",
      rating: 4.9,
      totalTrips: 203,
      workingHours: "10:00 - 22:00",
      vehicle: "B 9012 GH",
      location: "Rest Area KM 25",
      avatar: "/placeholder.svg"
    },
    {
      id: "D004",
      name: "Dedi Kurniawan",
      phone: "+62 815 6789 0123",
      status: "inactive",
      rating: 4.7,
      totalTrips: 87,
      workingHours: "Off Duty",
      vehicle: "-",
      location: "Off Duty",
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'onTrip': return 'bg-blue-100 text-blue-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaySchedule = [
    {
      time: "08:00",
      driver: "Ahmad Wijaya",
      task: "Penjemputan - Budi Santoso",
      location: "Kemang, Jakarta Selatan"
    },
    {
      time: "10:30",
      driver: "Siti Rahayu",
      task: "Antar Jemput - PT. ABC",
      location: "Sudirman, Jakarta Pusat"
    },
    {
      time: "14:00",
      driver: "Budi Santoso",
      task: "Rental Harian - Keluarga Wijaya",
      location: "Bogor, Jawa Barat"
    },
    {
      time: "16:30",
      driver: "Ahmad Wijaya",
      task: "Return Trip - Bandung",
      location: "Kembali ke Jakarta"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <Button>{t.addDriver}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Drivers */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.activeDrivers}</CardTitle>
              <CardDescription>Daftar semua driver dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={driver.avatar} alt={driver.name} />
                      <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{driver.name}</h3>
                        <Badge className={getStatusColor(driver.status)}>
                          {t.status[driver.status as keyof typeof t.status]}
                        </Badge>
                      </div>
                      
                      <div className="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {driver.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {driver.location}
                        </div>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">{t.rating}: </span>
                          <span className="font-medium">⭐ {driver.rating}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">{t.totalTrips}: </span>
                          <span className="font-medium">{driver.totalTrips}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Kendaraan: </span>
                          <span className="font-medium">{driver.vehicle}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {t.workingHours}: {driver.workingHours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Driver Schedule */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t.driverSchedule}</CardTitle>
              <CardDescription>Jadwal driver hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((schedule, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{schedule.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {schedule.driver}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {schedule.task}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {schedule.location}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t.performance}</CardTitle>
          <CardDescription>Ringkasan performa driver bulan ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drivers.slice(0, 3).map((driver) => (
              <div key={driver.id} className="text-center p-4 border rounded-lg">
                <Avatar className="h-16 w-16 mx-auto mb-3">
                  <AvatarImage src={driver.avatar} alt={driver.name} />
                  <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-gray-900 mb-2">{driver.name}</h3>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Rating: {driver.rating}/5.0</div>
                    <Progress value={driver.rating * 20} className="h-2" />
                  </div>
                  <div className="text-xs text-gray-500">
                    {driver.totalTrips} perjalanan selesai
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
