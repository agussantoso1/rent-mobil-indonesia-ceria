
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Calendar as CalendarIcon, 
  MapPin, 
  Star, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle,
  Users,
  Fuel,
  Settings
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import BookingForm from "./BookingForm";

interface LandingPageProps {
  onAuthClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthClick }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: "Toyota Avanza",
      category: "MPV",
      price: "350,000",
      image: "/placeholder.svg",
      passengers: 7,
      transmission: "Manual",
      fuel: "Petrol",
      features: ["AC", "GPS", "Audio System"]
    },
    {
      id: 2,
      name: "Honda Jazz",
      category: "Hatchback",
      price: "300,000",
      image: "/placeholder.svg",
      passengers: 5,
      transmission: "Automatic",
      fuel: "Petrol", 
      features: ["AC", "Power Steering", "USB Port"]
    },
    {
      id: 3,
      name: "Daihatsu Xenia",
      category: "MPV",
      price: "320,000",
      image: "/placeholder.svg",
      passengers: 7,
      transmission: "Manual",
      fuel: "Petrol",
      features: ["AC", "CD Player", "Central Lock"]
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      rating: 5,
      comment: "Pelayanan sangat memuaskan, mobil bersih dan terawat. Pasti akan sewa lagi!",
      location: "Jakarta"
    },
    {
      name: "Siti Rahayu", 
      rating: 5,
      comment: "Proses booking mudah, driver ramah dan profesional. Highly recommended!",
      location: "Bandung"
    },
    {
      name: "Ahmad Wijaya",
      rating: 5,
      comment: "Harga terjangkau dengan kualitas service yang excellent. Thank you!",
      location: "Surabaya"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Rent Mobil Indonesia Ceria</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Beranda</a>
              <a href="#vehicles" className="text-gray-700 hover:text-blue-600 transition-colors">Kendaraan</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Layanan</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimoni</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Kontak</a>
            </nav>
            <Button onClick={onAuthClick} className="bg-blue-600 hover:bg-blue-700">
              Masuk / Daftar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Sewa Mobil Terpercaya di
                <span className="text-blue-600 block">Indonesia</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Nikmati perjalanan Anda dengan armada kendaraan berkualitas, driver berpengalaman, dan pelayanan 24/7 di seluruh Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowBookingForm(true)}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Booking Sekarang
                </Button>
                <Button variant="outline" size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Hubungi Kami
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Car Rental"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">1000+ Happy Customers</p>
                    <p className="text-gray-600">Trusted Since 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kenapa Pilih Kami?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami memberikan pelayanan terbaik dengan standar kualitas tinggi untuk memastikan perjalanan Anda nyaman dan aman.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Armada Lengkap</h3>
              <p className="text-gray-600">Berbagai jenis kendaraan sesuai kebutuhan Anda</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-600">Kendaraan terawat dengan asuransi lengkap</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Layanan 24/7</h3>
              <p className="text-gray-600">Customer service siap membantu kapan saja</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Antar Jemput</h3>
              <p className="text-gray-600">Layanan antar jemput ke lokasi Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Section */}
      <section id="vehicles" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pilihan Kendaraan</h2>
            <p className="text-gray-600">Armada berkualitas dengan berbagai pilihan sesuai kebutuhan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">
                    {vehicle.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{vehicle.name}</span>
                    <span className="text-blue-600 text-lg">Rp {vehicle.price}/hari</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{vehicle.passengers} orang</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Fuel className="h-4 w-4 text-gray-500" />
                      <span>{vehicle.fuel}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" onClick={() => setShowBookingForm(true)}>
                    Booking Sekarang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Rental Harian</h3>
              <p className="text-gray-600">Sewa mobil untuk kebutuhan harian dengan tarif kompetitif</p>
            </Card>
            <Card className="p-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dengan Driver</h3>
              <p className="text-gray-600">Driver berpengalaman dan profesional siap mengantar Anda</p>
            </Card>
            <Card className="p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Antar Jemput</h3>
              <p className="text-gray-600">Layanan antar jemput gratis dalam area kota</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimoni Pelanggan</h2>
            <p className="text-gray-600">Apa kata mereka tentang layanan kami</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
            <p className="text-gray-600">Siap melayani Anda 24/7</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Telepon</h3>
              <p className="text-gray-600">+62 21 1234 5678</p>
              <p className="text-gray-600">+62 812 3456 7890</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@rentmobil.id</p>
              <p className="text-gray-600">booking@rentmobil.id</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Alamat</h3>
              <p className="text-gray-600">Jl. Sudirman No. 123</p>
              <p className="text-gray-600">Jakarta Pusat, 10270</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Rent Mobil Indonesia Ceria</span>
              </div>
              <p className="text-gray-400">
                Solusi terpercaya untuk kebutuhan transportasi Anda di seluruh Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Rental Harian</li>
                <li>Rental Mingguan</li>
                <li>Rental Bulanan</li>
                <li>Dengan Driver</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kendaraan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>City Car</li>
                <li>MPV</li>
                <li>SUV</li>
                <li>Luxury Car</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+62 21 1234 5678</li>
                <li>info@rentmobil.id</li>
                <li>Jl. Sudirman No. 123</li>
                <li>Jakarta Pusat</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rent Mobil Indonesia Ceria. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm 
          onClose={() => setShowBookingForm(false)}
          onSuccess={() => {
            setShowBookingForm(false);
            // Show success message
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;
