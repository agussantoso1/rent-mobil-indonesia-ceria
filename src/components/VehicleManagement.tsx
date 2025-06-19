
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Wrench, Clock, MapPin, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VehicleManagementProps {
  language: string;
}

const VehicleManagement: React.FC<VehicleManagementProps> = ({ language }) => {
  const translations = {
    id: {
      title: "Manajemen Kendaraan",
      vehicleFleet: "Armada Kendaraan",
      maintenance: "Jadwal Maintenance",
      addVehicle: "Tambah Kendaraan",
      status: {
        available: "Tersedia",
        booked: "Disewa",
        maintenance: "Maintenance",
        unavailable: "Tidak Tersedia"
      },
      fuelLevel: "Level Bahan Bakar",
      lastService: "Service Terakhir",
      nextService: "Service Berikutnya",
      mileage: "Kilometer"
    },
    en: {
      title: "Vehicle Management",
      vehicleFleet: "Vehicle Fleet",
      maintenance: "Maintenance Schedule",
      addVehicle: "Add Vehicle",
      status: {
        available: "Available",
        booked: "Booked",
        maintenance: "Maintenance",
        unavailable: "Unavailable"
      },
      fuelLevel: "Fuel Level",
      lastService: "Last Service",
      nextService: "Next Service",
      mileage: "Mileage"
    }
  };

  const t = translations[language as keyof typeof translations];

  const vehicles = [
    {
      id: "V001",
      brand: "Toyota",
      model: "Avanza",
      year: "2022",
      plate: "B 1234 CD",
      status: "available",
      fuelLevel: 85,
      mileage: "45,230 km",
      lastService: "2024-01-01",
      nextService: "2024-04-01",
      location: "Depot Jakarta Selatan"
    },
    {
      id: "V002",
      brand: "Daihatsu",
      model: "Xenia",
      year: "2021",
      plate: "B 5678 EF",
      status: "booked",
      fuelLevel: 60,
      mileage: "52,180 km",
      lastService: "2023-12-15",
      nextService: "2024-03-15",
      location: "Dengan Pelanggan"
    },
    {
      id: "V003",
      brand: "Honda",
      model: "Jazz",
      year: "2023",
      plate: "B 9012 GH",
      status: "maintenance",
      fuelLevel: 30,
      mileage: "28,950 km",
      lastService: "2024-01-10",
      nextService: "2024-04-10",
      location: "Bengkel Partner"
    },
    {
      id: "V004",
      brand: "Honda",
      model: "Brio",
      year: "2022",
      plate: "B 3456 IJ",
      status: "available",
      fuelLevel: 95,
      mileage: "31,450 km",
      lastService: "2023-12-20",
      nextService: "2024-03-20",
      location: "Depot Jakarta Pusat"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFuelColor = (level: number) => {
    if (level >= 70) return 'bg-green-500';
    if (level >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const maintenanceSchedule = [
    {
      vehicle: "B 1234 CD - Toyota Avanza",
      type: "Service Rutin",
      date: "2024-04-01",
      priority: "medium"
    },
    {
      vehicle: "B 5678 EF - Daihatsu Xenia",
      type: "Ganti Oli",
      date: "2024-03-15",
      priority: "high"
    },
    {
      vehicle: "B 9012 GH - Honda Jazz",
      type: "Perbaikan AC",
      date: "2024-01-20",
      priority: "high"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <Button>{t.addVehicle}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Fleet */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.vehicleFleet}</CardTitle>
              <CardDescription>Daftar semua kendaraan dalam armada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600">{vehicle.plate} • {vehicle.year}</p>
                      </div>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {t.status[vehicle.status as keyof typeof t.status]}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t.fuelLevel}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getFuelColor(vehicle.fuelLevel)}`}
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{vehicle.fuelLevel}%</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {t.mileage}: {vehicle.mileage}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {vehicle.location}
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-3 w-3 mr-1" />
                          Service: {vehicle.nextService}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Schedule */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t.maintenance}</CardTitle>
              <CardDescription>Jadwal maintenance mendatang</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceSchedule.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{item.vehicle}</h4>
                      <Badge 
                        variant={item.priority === 'high' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {item.priority === 'high' ? 'Urgent' : 'Normal'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{item.type}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;
