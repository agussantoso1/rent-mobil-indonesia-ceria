
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Calendar as CalendarIcon, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Car,
  Clock,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose, onSuccess }) => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    pickupLocation: '',
    returnLocation: '',
    vehicleId: '',
    needDriver: false,
    specialRequests: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'available')
        .eq('is_active', true);

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data kendaraan",
        variant: "destructive"
      });
    }
  };

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    setSelectedVehicle(vehicle);
    setFormData(prev => ({ ...prev, vehicleId }));
  };

  const calculateTotalAmount = () => {
    if (!selectedVehicle || !formData.pickupDate || !formData.returnDate) return 0;
    
    const diffTime = Math.abs(formData.returnDate.getTime() - formData.pickupDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return selectedVehicle.daily_rate * diffDays;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.customerName || !formData.customerPhone || !formData.pickupDate || 
          !formData.returnDate || !formData.vehicleId || !formData.pickupLocation) {
        toast({
          title: "Error",
          description: "Mohon lengkapi semua field yang wajib diisi",
          variant: "destructive"
        });
        return;
      }

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          pickup_datetime: formData.pickupDate.toISOString(),
          return_datetime: formData.returnDate.toISOString(),
          pickup_address: formData.pickupLocation,
          return_address: formData.returnLocation || formData.pickupLocation,
          vehicle_id: formData.vehicleId,
          vehicle_rate: selectedVehicle.daily_rate,
          total_amount: calculateTotalAmount(),
          special_requests: formData.specialRequests,
          status: 'pending'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Create customer profile if not exists (for guest booking)
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          full_name: formData.customerName,
          phone: formData.customerPhone,
          role: 'customer'
        }, {
          onConflict: 'phone'
        });

      if (profileError) console.log('Profile creation skipped:', profileError);

      toast({
        title: "Berhasil!",
        description: "Booking Anda telah diterima. Tim kami akan menghubungi Anda segera.",
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat booking. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Booking Online</CardTitle>
            <CardDescription>Isi form di bawah untuk melakukan reservasi</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informasi Penyewa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Nama Lengkap *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">No. Telepon *</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="+62 812 3456 7890"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Detail Booking
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Tanggal Mulai *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.pickupDate ? format(formData.pickupDate, "PPP", { locale: idLocale }) : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.pickupDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, pickupDate: date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Tanggal Selesai *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.returnDate ? format(formData.returnDate, "PPP", { locale: idLocale }) : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.returnDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, returnDate: date }))}
                        disabled={(date) => date < (formData.pickupDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickupLocation">Lokasi Penjemputan *</Label>
                  <Input
                    id="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                    placeholder="Alamat lengkap penjemputan"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="returnLocation">Lokasi Pengantaran</Label>
                  <Input
                    id="returnLocation"
                    value={formData.returnLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, returnLocation: e.target.value }))}
                    placeholder="Kosongkan jika sama dengan penjemputan"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Pilih Kendaraan
              </h3>
              <Select value={formData.vehicleId} onValueChange={handleVehicleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kendaraan yang diinginkan" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} - Rp {vehicle.daily_rate?.toLocaleString()}/hari
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedVehicle && (
                <Card className="p-4 bg-blue-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{selectedVehicle.brand} {selectedVehicle.model}</h4>
                      <p className="text-sm text-gray-600">{selectedVehicle.category} • {selectedVehicle.seating_capacity} Penumpang</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{selectedVehicle.transmission}</Badge>
                        <Badge variant="secondary">{selectedVehicle.fuel_type}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">
                        Rp {selectedVehicle.daily_rate?.toLocaleString()}/hari
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="specialRequests">Permintaan Khusus</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                  placeholder="Ceritakan kebutuhan khusus Anda (opsional)"
                  rows={3}
                />
              </div>
            </div>

            {/* Total Amount */}
            {selectedVehicle && formData.pickupDate && formData.returnDate && (
              <Card className="p-4 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    <span className="font-medium">Estimasi Total</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    Rp {calculateTotalAmount().toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {Math.ceil(Math.abs(formData.returnDate.getTime() - formData.pickupDate.getTime()) / (1000 * 60 * 60 * 24))} hari
                  × Rp {selectedVehicle.daily_rate?.toLocaleString()}
                </p>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Memproses..." : "Kirim Booking"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
