import React, { useState } from 'react';

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
  year: number;
  transmission: 'Automatic' | 'Manual';
  totalStock: number;
  soldCount: number;
}

interface MonthlySales {
  month: string;
  sales: number;
  prevSales: number;
  fluctuation: string;
}

interface BuyerAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface UserAccount {
  id: number;
  username: string;
  pin: string; // PIN 6 digit untuk akses admin/kelola
  fullName: string;
  role: 'Admin Showroom' | 'Staff Pengelola';
}

const INITIAL_CARS: Car[] = [
  { id: 1, name: 'Toyota Avanza Veloz', price: 280000000, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80', year: 2024, transmission: 'Automatic', totalStock: 15, soldCount: 5 },
  { id: 2, name: 'Honda Civic Turbo', price: 530000000, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80', year: 2023, transmission: 'Automatic', totalStock: 10, soldCount: 8 },
  { id: 3, name: 'Mitsubishi Xpander', price: 310000000, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', year: 2024, transmission: 'Manual', totalStock: 12, soldCount: 6 },
  { id: 4, name: 'Suzuki Ertiga Hybrid', price: 270000000, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', year: 2024, transmission: 'Automatic', totalStock: 14, soldCount: 9 },
  { id: 5, name: 'Toyota Agya', price: 100000000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', year: 2023, transmission: 'Automatic', totalStock: 14, soldCount: 10 },
];

const INITIAL_SALES_DATA: MonthlySales[] = [
  { month: 'Jan', sales: 12, prevSales: 10, fluctuation: '▲ Naik (+20%)' },
  { month: 'Feb', sales: 15, prevSales: 12, fluctuation: '▲ Naik (+25%)' },
  { month: 'Mar', sales: 10, prevSales: 15, fluctuation: '▼ Turun (-33%)' },
  { month: 'Apr', sales: 18, prevSales: 10, fluctuation: '▲ Naik (+80%)' },
  { month: 'Mei', sales: 22, prevSales: 18, fluctuation: '▲ Naik (+22%)' },
  { month: 'Jun', sales: 19, prevSales: 22, fluctuation: '▼ Turun (-14%)' },
  { month: 'Jul', sales: 25, prevSales: 19, fluctuation: '▲ Naik (+32%)' },
  { month: 'Agu', sales: 28, prevSales: 25, fluctuation: '▲ Naik (+12%)' },
];

export default function App() {
  const [registeredAdmins, setRegisteredAdmins] = useState<UserAccount[]>([
    { id: 1, username: 'bagus', pin: '123456', fullName: 'Bagus Herianto', role: 'Admin Showroom' },
    { id: 2, username: 'admin', pin: '000000', fullName: 'Admin Utama Jaya', role: 'Admin Showroom' },
    { id: 3, username: 'staf1', pin: '111111', fullName: 'Andi Pengelola', role: 'Staff Pengelola' }
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const [loginUser, setLoginUser] = useState('bagus');
  const [loginPin, setLoginPin] = useState('123456');
  
  const [regUsername, setRegUsername] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regConfirmPin, setRegConfirmPin] = useState('');

  const [currentUser, setCurrentUser] = useState<UserAccount>(registeredAdmins[0]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'stats' | 'manage' | 'unit' | 'accounts'>('unit');
  
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [salesData] = useState<MonthlySales[]>(INITIAL_SALES_DATA);
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [buyerAccounts, setBuyerAccounts] = useState<BuyerAccount[]>([
    { id: 1, bankName: 'BCA', accountNumber: '9876-5432-10', accountName: 'Bagus Herianto' }
  ]);
  const [selectedBuyerAccount, setSelectedBuyerAccount] = useState<string>('BCA - 9876-5432-10 (Bagus Herianto)');
  const [isEditingAccount, setIsEditingAccount] = useState<number | null>(null);
  const [formBankName, setFormBankName] = useState('');
  const [formAccNumber, setFormAccNumber] = useState('');
  const [formAccName, setFormAccName] = useState('');
  const [showAccountModal, setShowAccountModal] = useState(false);

  const [isEditingId, setIsEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formSold, setFormSold] = useState('');
  const [formTrans, setFormTrans] = useState<'Automatic' | 'Manual'>('Automatic');

  const [isEditingAdminId, setIsEditingAdminId] = useState<number | null>(null);
  const [adminFormUser, setAdminFormUser] = useState('');
  const [adminFormName, setAdminFormName] = useState('');
  const [adminFormPin, setAdminFormPin] = useState('');
  const [adminFormRole, setAdminFormRole] = useState<'Admin Showroom' | 'Staff Pengelola'>('Staff Pengelola');
  const [showAdminModal, setShowAdminModal] = useState(false);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = registeredAdmins.find(
      acc => acc.username.toLowerCase() === loginUser.trim().toLowerCase() && acc.pin === loginPin.trim()
    );

    if (!found) {
      alert('Username atau PIN Admin salah! Silakan periksa kembali.');
      return;
    }

    setCurrentUser(found);
    setIsLoggedIn(true);
    setBuyerName(found.fullName);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername.trim() || !regFullName.trim() || !regPin.trim()) {
      alert('Mohon isi seluruh kolom pendaftaran dengan lengkap!');
      return;
    }

    if (regPin.length !== 6 || isNaN(Number(regPin))) {
      alert('PIN Keamanan Admin harus berupa tepat 6 digit angka!');
      return;
    }

    if (regPin !== regConfirmPin) {
      alert('Konfirmasi PIN tidak cocok!');
      return;
    }

    const exists = registeredAdmins.some(acc => acc.username.toLowerCase() === regUsername.trim().toLowerCase());
    if (exists) {
      alert('Username tersebut sudah terdaftar! Gunakan username lain.');
      return;
    }

    const newAdmin: UserAccount = {
      id: Date.now(),
      username: regUsername.trim(),
      pin: regPin.trim(),
      fullName: regFullName.trim(),
      role: 'Staff Pengelola'
    };

    setRegisteredAdmins(prev => [...prev, newAdmin]);
    setCurrentUser(newAdmin);
    setIsLoggedIn(true);
    setBuyerName(newAdmin.fullName);
    alert('Akun admin/pengelola berhasil didaftarkan dan otomatis masuk!');
  };

  const handleSaveAdminAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminFormUser.trim() || !adminFormName.trim() || !adminFormPin.trim()) {
      alert('Mohon lengkapi data username, nama lengkap, dan PIN!');
      return;
    }

    if (adminFormPin.length !== 6 || isNaN(Number(adminFormPin))) {
      alert('PIN Keamanan harus tepat 6 digit angka!');
      return;
    }

    if (isEditingAdminId !== null) {
      setRegisteredAdmins(prev =>
        prev.map(acc =>
          acc.id === isEditingAdminId
            ? { ...acc, username: adminFormUser.trim(), fullName: adminFormName.trim(), pin: adminFormPin.trim(), role: adminFormRole }
            : acc
        )
      );
      if (currentUser.id === isEditingAdminId) {
        setCurrentUser(prev => ({
          ...prev,
          username: adminFormUser.trim(),
          fullName: adminFormName.trim(),
          role: adminFormRole
        }));
      }
      setIsEditingAdminId(null);
    } else {
      const exists = registeredAdmins.some(acc => acc.username.toLowerCase() === adminFormUser.trim().toLowerCase());
      if (exists) {
        alert('Username sudah digunakan oleh akun lain!');
        return;
      }

      const newAcc: UserAccount = {
        id: Date.now(),
        username: adminFormUser.trim(),
        pin: adminFormPin.trim(),
        fullName: adminFormName.trim(),
        role: adminFormRole
      };
      setRegisteredAdmins(prev => [...prev, newAcc]);
    }

    setAdminFormUser('');
    setAdminFormName('');
    setAdminFormPin('');
    setAdminFormRole('Staff Pengelola');
    setShowAdminModal(false);
  };

  const handleEditAdminClick = (acc: UserAccount) => {
    setIsEditingAdminId(acc.id);
    setAdminFormUser(acc.username);
    setAdminFormName(acc.fullName);
    setAdminFormPin(acc.pin);
    setAdminFormRole(acc.role);
    setShowAdminModal(true);
  };

  const handleDeleteAdminClick = (id: number) => {
    if (registeredAdmins.length <= 1) {
      alert('Minimal harus ada 1 akun admin aktif di dalam sistem!');
      return;
    }
    if (currentUser.id === id) {
      alert('Anda tidak dapat menghapus akun yang sedang Anda gunakan untuk login saat ini!');
      return;
    }
    if (window.confirm('Apakah Anda yakin ingin menghapus akun admin/pengelola ini?')) {
      setRegisteredAdmins(prev => prev.filter(acc => acc.id !== id));
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar || !buyerName.trim() || !buyerPhone.trim()) {
      alert('Mohon lengkapi seluruh formulir pemesanan!');
      return;
    }

    const remainingStock = selectedCar.totalStock - selectedCar.soldCount;
    if (remainingStock <= 0) {
      alert('Maaf, stok unit mobil ini sudah habis terjual!');
      return;
    }

    setCars(prev =>
      prev.map(car =>
        car.id === selectedCar.id ? { ...car, soldCount: car.soldCount + 1 } : car
      )
    );
    setIsSuccess(true);
  };

  const handleSaveBuyerAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBankName.trim() || !formAccNumber.trim() || !formAccName.trim()) {
      alert('Mohon lengkapi detail rekening!');
      return;
    }

    if (isEditingAccount !== null) {
      setBuyerAccounts(prev =>
        prev.map(acc =>
          acc.id === isEditingAccount
            ? { ...acc, bankName: formBankName, accountNumber: formAccNumber, accountName: formAccName }
            : acc
        )
      );
      setIsEditingAccount(null);
    } else {
      const newAcc: BuyerAccount = {
        id: Date.now(),
        bankName: formBankName,
        accountNumber: formAccNumber,
        accountName: formAccName,
      };
      setBuyerAccounts(prev => [...prev, newAcc]);
    }

    setFormBankName('');
    setFormAccNumber('');
    setFormAccName('');
    setShowAccountModal(false);
  };

  const handleEditBuyerAccount = (acc: BuyerAccount) => {
    setIsEditingAccount(acc.id);
    setFormBankName(acc.bankName);
    setFormAccNumber(acc.accountNumber);
    setFormAccName(acc.accountName);
    setShowAccountModal(true);
  };

  const handleDeleteBuyerAccount = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus rekening ini?')) {
      setBuyerAccounts(prev => prev.filter(acc => acc.id !== id));
    }
  };

  const downloadReceipt = () => {
    if (!selectedCar) return;

    const receiptContent = `
========================================
        STRUK PEMESANAN KENDARAAN        
          SHOWROOM MOBIL JAYA            
========================================
Admin/Petugas        : ${currentUser.fullName}
Nama Pembeli/Penjual : ${buyerName}
No. Telepon          : ${buyerPhone}
Mobil                : ${selectedCar.name} (${selectedCar.year})
Transmisi            : ${selectedCar.transmission}
Total Harga          : ${formatIDR(selectedCar.price)}
Metode Transfer      : Tf Melalui Rekening (${selectedBuyerAccount})
Status               : MENUNGGU PEMBAYARAN

Terima kasih telah mempercayai Showroom Mobil Jaya!
========================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Struk_${selectedCar.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadStatsReport = () => {
    const reportContent = `
==================================================
      LAPORAN RINGKASAN STATISTIK & KINERJA        
                  SHOWROOM MOBIL JAYA                
==================================================
Pengelola/Admin : ${currentUser.fullName} (${currentUser.role})
Tanggal Cetak   : ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

RINGKASAN UTAMA:
- Total Unit Terjual   : 149 Unit (Jan - Agu)
- Puncak Penjualan Tertinggi : Bulan Agu (28 Unit)

FLUKTUASI PENJUALAN BULANAN:
${salesData.map(item => `- ${item.month}: Penjualan Saat Ini (${item.sales} Unit) | Bulan Sebelumnya (${item.prevSales} Unit) | Fluktuasi: ${item.fluctuation}`).join('\n')}

==================================================
Terima kasih atas dedikasi dan kinerja tim Showroom!
==================================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Laporan_Statistik_Showroom_Mobil_Jaya.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice || !formImage.trim()) {
      alert('Mohon isi nama, harga, dan link gambar mobil!');
      return;
    }

    if (isEditingId !== null) {
      setCars(prev =>
        prev.map(car =>
          car.id === isEditingId
            ? {
                ...car,
                name: formName,
                price: Number(formPrice),
                image: formImage,
                year: Number(formYear) || car.year,
                transmission: formTrans,
                totalStock: Number(formStock) || car.totalStock,
                soldCount: formSold !== '' ? Number(formSold) : car.soldCount,
              }
            : car
        )
      );
      setIsEditingId(null);
    } else {
      const newCar: Car = {
        id: Date.now(),
        name: formName,
        price: Number(formPrice),
        image: formImage,
        year: Number(formYear) || 2024,
        transmission: formTrans,
        totalStock: Number(formStock) || 10,
        soldCount: formSold !== '' ? Number(formSold) : 0,
      };
      setCars(prev => [...prev, newCar]);
    }

    resetFormInputs();
    setActiveTab('unit');
  };

  const resetFormInputs = () => {
    setFormName('');
    setFormPrice('');
    setFormImage('');
    setFormYear('');
    setFormStock('');
    setFormSold('');
    setFormTrans('Automatic');
  };

  const handleEditClick = (car: Car) => {
    setIsEditingId(car.id);
    setFormName(car.name);
    setFormPrice(car.price.toString());
    setFormImage(car.image);
    setFormYear(car.year.toString());
    setFormStock(car.totalStock.toString());
    setFormSold(car.soldCount.toString());
    setFormTrans(car.transmission);
    setActiveTab('manage');
  };

  const handleDeleteCar = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus unit kendaraan ini? Laporan dan daftar inventaris akan diperbarui.')) {
      setCars(prev => prev.filter(car => car.id !== id));
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: 'radial-gradient(circle at 50% 10%, #1e1b4b 0%, #09090b 70%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ backgroundColor: 'rgba(24, 24, 27, 0.85)', backdropFilter: 'blur(20px)', padding: '40px 36px', borderRadius: '28px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)', width: '100%', maxWidth: '440px', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#f4f4f5' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 12px 30px -8px rgba(99, 102, 241, 0.5)' }}>
              <span style={{ fontSize: '34px' }}>🏎️</span>
            </div>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '800', background: 'linear-gradient(to right, #ffffff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Showroom Mobil Jaya</h2>
            <p style={{ color: '#a1a1aa', fontSize: '13px', margin: 0, fontWeight: '500' }}>
              {authMode === 'login' ? 'Silakan masuk dengan Akun Admin / Pengelola' : 'Daftar Akun Admin atau Staf Showroom Baru'}
            </p>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Username Admin</label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={e => setLoginUser(e.target.value)}
                  placeholder="Contoh: bagus"
                  required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PIN Keamanan (6 Digit)</label>
                <input
                  type="password"
                  value={loginPin}
                  onChange={e => setLoginPin(e.target.value)}
                  placeholder="••••••"
                  maxLength={6}
                  required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px', letterSpacing: '2px' }}
                />
              </div>

              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px -6px rgba(99, 102, 241, 0.6)' }}>
                Masuk Dashboard Showroom
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Username Unik</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={e => setRegUsername(e.target.value)}
                  placeholder="Contoh: bagus_admin"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '13px' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={e => setRegFullName(e.target.value)}
                  placeholder="Contoh: Bagus Herianto"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '13px' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PIN Keamanan (Tepat 6 Angka)</label>
                <input
                  type="password"
                  value={regPin}
                  onChange={e => setRegPin(e.target.value)}
                  placeholder="••••••"
                  maxLength={6}
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '13px', letterSpacing: '2px' }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Konfirmasi PIN Keamanan</label>
                <input
                  type="password"
                  value={regConfirmPin}
                  onChange={e => setRegConfirmPin(e.target.value)}
                  placeholder="••••••"
                  maxLength={6}
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '13px', letterSpacing: '2px' }}
                />
              </div>

              <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px -6px rgba(16, 185, 129, 0.5)' }}>
                Daftar & Buat Akun Baru
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>
              {authMode === 'login' ? 'Belum punya akun admin? ' : 'Sudah terdaftar? '}
              <span
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                style={{ color: '#818cf8', cursor: 'pointer', fontWeight: '700' }}
              >
                {authMode === 'login' ? 'Daftar Disini' : 'Masuk Disini'}
              </span>
            </p>
            {authMode === 'login' && (
              <p style={{ fontSize: '11px', color: '#71717a', margin: '8px 0 0 0' }}>
                Default Login: Username <strong style={{ color: '#d4d4d8' }}>bagus</strong> | PIN <strong style={{ color: '#d4d4d8' }}>123456</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="no-scrollbar" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", backgroundColor: '#09090b', minHeight: '100vh', display: 'flex', color: '#f4f4f5', overflowX: 'hidden' }}>
      
      {/* Global CSS Style untuk menghilangkan semua scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        body {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        body::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>

      {/* Sidebar Kiri */}
      <aside className="no-scrollbar" style={{
        width: '280px',
        backgroundColor: '#121215',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 20px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxSizing: 'border-box',
        zIndex: 10,
        overflowY: 'auto'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)', padding: '12px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99, 102, 241, 0.3)', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)' }}>
              <span style={{ fontSize: '26px' }}>🏎️</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '17px', fontWeight: '800', background: 'linear-gradient(to right, #ffffff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>Showroom Mobil Jaya</h1>
              <p style={{ color: '#a1a1aa', margin: '3px 0 0 0', fontSize: '11px', fontWeight: '500', lineHeight: '1.3' }}>
                Admin: <strong style={{ color: '#f4f4f5', fontWeight: '700' }}>{currentUser.fullName}</strong>
                <br />
                <span style={{ color: '#818cf8', fontSize: '10px' }}>({currentUser.role})</span>
              </p>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('catalog')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 16px',
                borderRadius: '12px',
                border: activeTab === 'catalog' ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: activeTab === 'catalog' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'catalog' ? '#818cf8' : '#a1a1aa',
                boxShadow: activeTab === 'catalog' ? '0 4px 15px rgba(99, 102, 241, 0.15)' : 'none',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px' }}>🚗</span> Katalog Mobil
            </button>

            <button
              onClick={() => setActiveTab('unit')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 16px',
                borderRadius: '12px',
                border: activeTab === 'unit' ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: activeTab === 'unit' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'unit' ? '#818cf8' : '#a1a1aa',
                boxShadow: activeTab === 'unit' ? '0 4px 15px rgba(99, 102, 241, 0.15)' : 'none',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px' }}>🚙</span> Unit
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 16px',
                borderRadius: '12px',
                border: activeTab === 'stats' ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: activeTab === 'stats' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'stats' ? '#818cf8' : '#a1a1aa',
                boxShadow: activeTab === 'stats' ? '0 4px 15px rgba(99, 102, 241, 0.15)' : 'none',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px' }}>📊</span> Laporan & Fluktuasi
            </button>

            <button
              onClick={() => { resetFormInputs(); setIsEditingId(null); setActiveTab('manage'); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 16px',
                borderRadius: '12px',
                border: activeTab === 'manage' ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: activeTab === 'manage' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'manage' ? '#818cf8' : '#a1a1aa',
                boxShadow: activeTab === 'manage' ? '0 4px 15px rgba(99, 102, 241, 0.15)' : 'none',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px' }}>⚙️</span> Kelola Produk
            </button>

            <button
              onClick={() => setActiveTab('accounts')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '13px 16px',
                borderRadius: '12px',
                border: activeTab === 'accounts' ? '1px solid rgba(16,185,129,0.4)' : '1px solid transparent',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: activeTab === 'accounts' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                color: activeTab === 'accounts' ? '#34d399' : '#a1a1aa',
                boxShadow: activeTab === 'accounts' ? '0 4px 15px rgba(16, 185, 129, 0.15)' : 'none',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px' }}>👥</span> Manajemen Akun
            </button>
          </nav>
        </div>

        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{ width: '100%', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            🚪 Keluar / Ganti Akun
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="no-scrollbar" style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', maxHeight: '100vh', boxSizing: 'border-box' }}>
        
        {/* TAB 1: KATALOG MOBIL */}
        {activeTab === 'catalog' && (
          <div>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: '#fff' }}>🚗 Katalog Unit Mobil</h2>
                <p style={{ color: '#a1a1aa', margin: 0, fontSize: '14px' }}>Pilih unit kendaraan untuk melakukan pemesanan dan checkout instan.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '13px', color: '#d4d4d8' }}>
                Total Unit Tersedia: <strong style={{ color: '#818cf8' }}>{cars.length} Model</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {cars.map(car => {
                const stockRemaining = car.totalStock - car.soldCount;
                return (
                  <div key={car.id} style={{ backgroundColor: '#18181b', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                    <div style={{ height: '200px', position: 'relative', overflow: 'hidden', backgroundColor: '#27272a' }}>
                      <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {car.year} • {car.transmission}
                      </div>
                    </div>

                    <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#fff' }}>{car.name}</h3>
                        <p style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: '#34d399' }}>{formatIDR(car.price)}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#a1a1aa', marginBottom: '20px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <span>Stok: <strong style={{ color: '#fff' }}>{stockRemaining} Unit</strong></span>
                          <span>Terjual: <strong style={{ color: '#f87171' }}>{car.soldCount} Unit</strong></span>
                        </div>
                      </div>

                      <button
                        onClick={() => { setSelectedCar(car); setIsSuccess(false); }}
                        disabled={stockRemaining <= 0}
                        style={{
                          width: '100%',
                          backgroundColor: stockRemaining > 0 ? '#6366f1' : '#3f3f46',
                          color: '#fff',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '12px',
                          fontWeight: '700',
                          cursor: stockRemaining > 0 ? 'pointer' : 'not-allowed',
                          fontSize: '14px',
                          boxShadow: stockRemaining > 0 ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none'
                        }}
                      >
                        {stockRemaining > 0 ? 'Pesan / Checkout Unit' : 'Stok Habis Terjual'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: UNIT (DAFTAR LENGKAP INVENTARIS UNIT MOBIL) */}
        {activeTab === 'unit' && (
          <div>
            <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: '#fff' }}>🚙 Daftar Lengkap Inventaris Unit Mobil</h2>
                <p style={{ color: '#a1a1aa', margin: 0, fontSize: '14px' }}>Pembaruan status stok dan inventaris real-time (otomatis berkurang saat dihapus atau diperbarui).</p>
              </div>
              <button
                onClick={() => { resetFormInputs(); setIsEditingId(null); setActiveTab('manage'); }}
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
              >
                + Tambah Unit Baru
              </button>
            </div>

            <div style={{ backgroundColor: '#18181b', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#202024', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#a1a1aa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '16px 20px' }}>Kendaraan</th>
                      <th style={{ padding: '16px 20px' }}>Tahun / Transmisi</th>
                      <th style={{ padding: '16px 20px' }}>Harga</th>
                      <th style={{ padding: '16px 20px' }}>Stok / Terjual</th>
                      <th style={{ padding: '16px 20px', textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map(car => (
                      <tr key={car.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background-color 0.2s' }}>
                        <td style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img src={car.image} alt={car.name} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '8px' }} />
                          <span style={{ fontWeight: '700', color: '#fff' }}>{car.name}</span>
                        </td>
                        <td style={{ padding: '18px 20px', color: '#d4d4d8' }}>
                          {car.year} • <span style={{ color: '#818cf8', fontWeight: '600' }}>{car.transmission}</span>
                        </td>
                        <td style={{ padding: '18px 20px', fontWeight: '700', color: '#34d399' }}>{formatIDR(car.price)}</td>
                        <td style={{ padding: '18px 20px', color: '#d4d4d8' }}>
                          <strong style={{ color: '#fff' }}>{car.totalStock - car.soldCount} Unit</strong> <span style={{ color: '#a1a1aa', fontSize: '12px' }}>({car.soldCount} terjual)</span>
                        </td>
                        <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <button
                              onClick={() => handleEditClick(car)}
                              style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car.id)}
                              style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LAPORAN & FLUKTUASI */}
        {activeTab === 'stats' && (
          <div>
            <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: '#fff' }}>📊 Laporan & Fluktuasi Penjualan</h2>
                <p style={{ color: '#a1a1aa', margin: 0, fontSize: '14px' }}>Analisis tren performa dan fluktuasi penjualan kendaraan showroom secara bulanan.</p>
              </div>
              <button
                onClick={downloadStatsReport}
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}
              >
                📥 Download Laporan (.txt)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <span style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: '700' }}>Total Unit Terjual (YTD)</span>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '800', color: '#fff' }}>149 Unit</h3>
                <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#34d399' }}>▲ Performa Stabil & Meningkat</p>
              </div>

              <div style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <span style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: '700' }}>Puncak Penjualan Tertinggi</span>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: '800', color: '#fff' }}>Bulan Agu (28 Unit)</h3>
                <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#818cf8' }}>Rekor tertinggi tahun ini</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#18181b', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontWeight: '700', fontSize: '16px', color: '#fff' }}>
                Tabel Fluktuasi Bulanan
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#202024', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#a1a1aa', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '16px 20px' }}>Bulan</th>
                      <th style={{ padding: '16px 20px' }}>Penjualan Saat Ini</th>
                      <th style={{ padding: '16px 20px' }}>Bulan Sebelumnya</th>
                      <th style={{ padding: '16px 20px' }}>Fluktuasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: '700', color: '#fff' }}>{item.month}</td>
                        <td style={{ padding: '16px 20px', color: '#34d399', fontWeight: '700' }}>{item.sales} Unit</td>
                        <td style={{ padding: '16px 20px', color: '#d4d4d8' }}>{item.prevSales} Unit</td>
                        <td style={{ padding: '16px 20px', fontWeight: '700', color: item.fluctuation.includes('Naik') ? '#34d399' : '#f87171' }}>
                          {item.fluctuation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KELOLA PRODUK */}
        {activeTab === 'manage' && (
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: '#fff' }}>
                {isEditingId !== null ? '⚙️ Edit Unit Kendaraan' : '➕ Tambah Unit Kendaraan Baru'}
              </h2>
              <p style={{ color: '#a1a1aa', margin: 0, fontSize: '14px' }}>Lengkapi form di bawah ini untuk memperbarui katalog dan inventaris secara real-time.</p>
            </div>

            <form onSubmit={handleSaveCar} style={{ backgroundColor: '#18181b', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nama Kendaraan</label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="Contoh: Toyota Innova Zenix"
                  required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Harga (Rupiah)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={e => setFormPrice(e.target.value)}
                    placeholder="Contoh: 450000000"
                    required
                    style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tahun Kendaraan</label>
                  <input
                    type="number"
                    value={formYear}
                    onChange={e => setFormYear(e.target.value)}
                    placeholder="Contoh: 2024"
                    required
                    style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Stok Unit</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={e => setFormStock(e.target.value)}
                    placeholder="Contoh: 15"
                    required
                    style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Jumlah Terjual</label>
                  <input
                    type="number"
                    value={formSold}
                    onChange={e => setFormSold(e.target.value)}
                    placeholder="Contoh: 3"
                    style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transmisi</label>
                <select
                  value={formTrans}
                  onChange={e => setFormTrans(e.target.value as 'Automatic' | 'Manual')}
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#d4d4d8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Link Gambar (URL)</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px -6px rgba(99, 102, 241, 0.5)' }}
                >
                  {isEditingId !== null ? 'Simpan Perubahan Unit' : 'Tambahkan Unit ke Katalog'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('unit')}
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: MANAJEMEN AKUN ADMIN & REKENING */}
        {activeTab === 'accounts' && (
          <div>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: '#fff' }}>👥 Manajemen Akun & Rekening Showroom</h2>
                <p style={{ color: '#a1a1aa', margin: 0, fontSize: '14px' }}>Kelola hak akses staf/admin dan rekening pembayaran transfer bank showroom.</p>
              </div>
              <button
                onClick={() => {
                  setAdminFormUser('');
                  setAdminFormName('');
                  setAdminFormPin('');
                  setAdminFormRole('Staff Pengelola');
                  setIsEditingAdminId(null);
                  setShowAdminModal(true);
                }}
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
              >
                + Tambah Akun Staf Baru
              </button>
            </div>

            <div style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>Daftar Akun Admin & Staf Pengelola</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {registeredAdmins.map(acc => (
                  <div key={acc.id} style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#fff' }}>{acc.fullName}</h4>
                          <span style={{ fontSize: '12px', color: '#818cf8', fontWeight: '600' }}>@{acc.username}</span>
                        </div>
                        <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '8px', backgroundColor: acc.role === 'Admin Showroom' ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)', color: acc.role === 'Admin Showroom' ? '#818cf8' : '#34d399', fontWeight: '700' }}>
                          {acc.role}
                        </span>
                      </div>
                      <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#a1a1aa' }}>
                        PIN Keamanan: <strong style={{ color: '#d4d4d8', letterSpacing: '1px' }}>{acc.pin}</strong>
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <button
                        onClick={() => handleEditAdminClick(acc)}
                        style={{ flex: 1, backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '8px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAdminClick(acc.id)}
                        style={{ flex: 1, backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '8px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>Daftar Rekening Pembayaran Showroom</h3>
                <button
                  onClick={() => {
                    setFormBankName('');
                    setFormAccNumber('');
                    setFormAccName('');
                    setIsEditingAccount(null);
                    setShowAccountModal(true);
                  }}
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}
                >
                  + Tambah Rekening Bank
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {buyerAccounts.map(acc => (
                  <div key={acc.id} style={{ backgroundColor: '#18181b', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#34d399' }}>{acc.bankName}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => handleEditBuyerAccount(acc)} style={{ backgroundColor: 'rgba(99,102,241,0.2)', color: '#818cf8', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDeleteBuyerAccount(acc.id)} style={{ backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Hapus</button>
                      </div>
                    </div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#fff', letterSpacing: '1px' }}>{acc.accountNumber}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa' }}>a.n. <strong style={{ color: '#d4d4d8' }}>{acc.accountName}</strong></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL CHECKOUT PEMESANAN */}
      {selectedCar && !isSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ backgroundColor: '#18181b', padding: '36px', borderRadius: '28px', maxWidth: '480px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.7)', color: '#fff' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '800' }}>Formulir Pemesanan Unit</h3>
            <p style={{ color: '#a1a1aa', fontSize: '13px', margin: '0 0 24px 0' }}>Selesaikan pesanan untuk kendaraan <strong style={{ color: '#fff' }}>{selectedCar.name}</strong></p>

            <form onSubmit={handleCheckout}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Nama Pembeli</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  placeholder="Nama Lengkap Pembeli"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={e => setBuyerPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Pilih Rekening Transfer Showroom</label>
                <select
                  value={selectedBuyerAccount}
                  onChange={e => setSelectedBuyerAccount(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                >
                  {buyerAccounts.map(acc => (
                    <option key={acc.id} value={`${acc.bankName} - ${acc.accountNumber} (${acc.accountName})`}>
                      {acc.bankName} : {acc.accountNumber} ({acc.accountName})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '14px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#a1a1aa' }}>Harga Kendaraan:</span>
                  <strong style={{ color: '#34d399' }}>{formatIDR(selectedCar.price)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#a1a1aa' }}>Petugas Showroom:</span>
                  <strong style={{ color: '#fff' }}>{currentUser.fullName}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)' }}
                >
                  Konfirmasi Pesanan
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', padding: '14px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SUKSES PEMESANAN & DOWNLOAD STRUK */}
      {selectedCar && isSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ backgroundColor: '#18181b', padding: '40px 36px', borderRadius: '28px', maxWidth: '440px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.7)', color: '#fff', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
              <span style={{ fontSize: '34px' }}>✅</span>
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800' }}>Pesanan Berhasil Dibuat!</h3>
            <p style={{ color: '#a1a1aa', fontSize: '14px', margin: '0 0 24px 0', lineHeight: '1.5' }}>
              Stok unit <strong style={{ color: '#fff' }}>{selectedCar.name}</strong> telah otomatis dikurangi dan status penjualan tercatat.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={downloadReceipt}
                style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)' }}
              >
                📥 Download Struk Pemesanan (.txt)
              </button>
              <button
                onClick={() => { setSelectedCar(null); setIsSuccess(false); }}
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH/EDIT AKUN ADMIN & STAF */}
      {showAdminModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ backgroundColor: '#18181b', padding: '36px', borderRadius: '28px', maxWidth: '440px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.7)', color: '#fff' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '800' }}>{isEditingAdminId !== null ? '⚙️ Edit Akun Staf/Admin' : '➕ Tambah Akun Staf/Admin Baru'}</h3>
            <p style={{ color: '#a1a1aa', fontSize: '13px', margin: '0 0 24px 0' }}>Atur kredensial dan hak akses login sistem.</p>

            <form onSubmit={handleSaveAdminAccount}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Username</label>
                <input
                  type="text"
                  value={adminFormUser}
                  onChange={e => setAdminFormUser(e.target.value)}
                  placeholder="Contoh: andi_staf"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Nama Lengkap</label>
                <input
                  type="text"
                  value={adminFormName}
                  onChange={e => setAdminFormName(e.target.value)}
                  placeholder="Contoh: Andi Pengelola"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>PIN Keamanan (6 Digit)</label>
                <input
                  type="password"
                  value={adminFormPin}
                  onChange={e => setAdminFormPin(e.target.value)}
                  placeholder="••••••"
                  maxLength={6}
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px', letterSpacing: '2px' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Peran / Role</label>
                <select
                  value={adminFormRole}
                  onChange={e => setAdminFormRole(e.target.value as 'Admin Showroom' | 'Staff Pengelola')}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                >
                  <option value="Admin Showroom">Admin Showroom</option>
                  <option value="Staff Pengelola">Staff Pengelola</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)' }}
                >
                  Simpan Akun
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', padding: '14px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH/EDIT REKENING */}
      {showAccountModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ backgroundColor: '#18181b', padding: '36px', borderRadius: '28px', maxWidth: '440px', width: '100%', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.7)', color: '#fff' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '800' }}>{isEditingAccount !== null ? '⚙️ Edit Rekening Bank' : '➕ Tambah Rekening Bank'}</h3>
            <p style={{ color: '#a1a1aa', fontSize: '13px', margin: '0 0 24px 0' }}>Masukkan detail informasi rekening tujuan transfer pembayaran.</p>

            <form onSubmit={handleSaveBuyerAccount}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Nama Bank</label>
                <input
                  type="text"
                  value={formBankName}
                  onChange={e => setFormBankName(e.target.value)}
                  placeholder="Contoh: Mandiri / BCA / BNI"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Nomor Rekening</label>
                <input
                  type="text"
                  value={formAccNumber}
                  onChange={e => setFormAccNumber(e.target.value)}
                  placeholder="Contoh: 1234-5678-90"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#d4d4d8', textTransform: 'uppercase' }}>Nama Pemilik Rekening</label>
                <input
                  type="text"
                  value={formAccName}
                  onChange={e => setFormAccName(e.target.value)}
                  placeholder="Contoh: Bagus Herianto"
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(9, 9, 11, 0.6)', color: '#fff', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)' }}
                >
                  Simpan Rekening
                </button>
                <button
                  type="button"
                  onClick={() => setShowAccountModal(false)}
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', padding: '14px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}