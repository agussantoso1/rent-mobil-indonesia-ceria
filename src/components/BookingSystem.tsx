
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, CreditCard } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface BookingSystemProps {
  language: string;
}

const BookingSystem: React.FC<BookingSystemProps> = ({ language }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [bookingData, setBookingData] = useState({
    customerName: '',
    customerPhone: '',
    pickupLocation: '',
    dropoffLocation: '',
    vehicleType: '',
    driverRequired: false,
    duration: '',
    paymentMethod: ''
  });

  const translations = {
    id: {
      title: "Sistem Pemesanan",
      newBooking: "Pemesanan Baru",
      customerInfo: "Informasi Pelanggan",
      bookingDetails: "Detail Pemesanan",
      paymentInfo: "Informasi Pembayaran",
      recentBookings: "Pemesanan Terbaru",
      customerName: "Nama Pelanggan",
      customerPhone: "No. Telepon",
      pickupLocation: "Lokasi Penjemputan",
      dropoffLocation: "Lokasi Pengantaran",
      vehicleType: "Jenis Kendaraan",
      selectVehicle: "Pilih Kendaraan",
      driverRequired: "Perlu Driver",
      duration: "Durasi Sewa",
      paymentMethod: "Metode Pembayaran",
      selectPayment: "Pilih Pembayaran",
      pickupDate: "Tanggal Penjemputan",
      selectDate: "Pilih Tanggal",
      createBooking: "Buat Pemesanan",
      status: {
        pending: "Menunggu",
        confirmed: "Dikonfirmasi",
        ongoing: "Berlangsung",
        completed: "Selesai",
        cancelled: "Dibatalkan"
      }
    },
    en: {
      title: "Booking System",
      newBooking: "New Booking",
      customerInfo: "Customer Information",
      bookingDetails: "Booking Details",
      paymentInfo: "Payment Information",
      recentBookings: "Recent Bookings",
      customerName: "Customer Name",
      customerPhone: "Phone Number",
      pickupLocation: "Pickup Location",
      dropoffLocation: "Dropoff Location",
      vehicleType: "Vehicle Type",
      selectVehicle: "Select Vehicle",
      driverRequired: "Driver Required",
      duration: "Rental Duration",
      paymentMethod: "Payment Method",
      selectPayment: "Select Payment",
      pickupDate: "Pickup Date",
      selectDate: "Select Date",
      createBooking: "Create Booking",
      status: {
        pending: "Pending",
        confirmed: "Confirmed",
        ongoing: "Ongoing",
        completed: "Completed",
        cancelled: "Cancelled"
      }
    }
  };

  const t = translations[language as keyof typeof translations];

  const recentBookings = [
    {
      id: "BK001",
      customer: "Budi Santoso",
      vehicle: "Toyota Avanza",
      date: "2024-01-15",
      status: "confirmed",
      amount: "Rp 850,000"
    },
    {
      id: "BK002",
      customer: "Siti Rahayu",
      vehicle: "Daihatsu Xenia",
      date: "2024-01-14",
      status: "ongoing",
      amount: "Rp 750,000"
    },
    {
      id: "BK003",
      customer: "Ahmad Wijaya",
      vehicle: "Honda Jazz",
      date: "2024-01-13",
      status: "completed",
      amount: "Rp 900,000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t.newBooking}</CardTitle>
            <CardDescription>Buat pemesanan baru untuk pelanggan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <User className="h-5 w-5 mr-2" />
                {t.customerInfo}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">{t.customerName}</Label>
                  <Input
                    id="customerName"
                    value={bookingData.customerName}
                    onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                    placeholder="Masukkan nama pelanggan"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">{t.customerPhone}</Label>
                  <Input
                    id="customerPhone"
                    value={bookingData.customerPhone}
                    onChange={(e) => setBookingData({...bookingData, customerPhone: e.target.value})}
                    placeholder="+62 812 3456 7890"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {t.bookingDetails}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t.pickupDate}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: idLocale }) : t.selectDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="duration">{t.duration}</Label>
                  <Select value={bookingData.duration} onValueChange={(value) => setBookingData({...bookingData, duration: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih durasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-day">1 Hari</SelectItem>
                      <SelectItem value="2-days">2 Hari</SelectItem>
                      <SelectItem value="3-days">3 Hari</SelectItem>
                      <SelectItem value="1-week">1 Minggu</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickupLocation">{t.pickupLocation}</Label>
                  <Input
                    id="pickupLocation"
                    value={bookingData.pickupLocation}
                    onChange={(e) => setBookingData({...bookingData, pickupLocation: e.target.value})}
                    placeholder="Masukkan alamat penjemputan"
                  />
                </div>
                <div>
                  <Label htmlFor="dropoffLocation">{t.dropoffLocation}</Label>
                  <Input
                    id="dropoffLocation"
                    value={bookingData.dropoffLocation}
                    onChange={(e) => setBookingData({...bookingData, dropoffLocation: e.target.value})}
                    placeholder="Masukkan alamat pengantaran"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleType">{t.vehicleType}</Label>
                  <Select value={bookingData.vehicleType} onValueChange={(value) => setBookingData({...bookingData, vehicleType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectVehicle} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avanza">Toyota Avanza</SelectItem>
                      <SelectItem value="xenia">Daihatsu Xenia</SelectItem>
                      <SelectItem value="jazz">Honda Jazz</SelectItem>
                      <SelectItem value="brio">Honda Brio</SelectItem>
                      <SelectItem value="innova">Toyota Innova</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                {t.paymentInfo}
              </h3>
              <div>
                <Label htmlFor="paymentMethod">{t.paymentMethod}</Label>
                <Select value={bookingData.paymentMethod} onValueChange={(value) => setBookingData({...bookingData, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectPayment} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                    <SelectItem value="ovo">OVO</SelectItem>
                    <SelectItem value="gopay">GoPay</SelectItem>
                    <SelectItem value="dana">DANA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full">{t.createBooking}</Button>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.recentBookings}</CardTitle>
            <CardDescription>Pemesanan terbaru dalam sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{booking.customer}</h4>
                      <p className="text-sm text-gray-600">{booking.id}</p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {t.status[booking.status as keyof typeof t.status]}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{booking.vehicle}</span>
                    <span>{booking.amount}</span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {booking.date}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingSystem;
