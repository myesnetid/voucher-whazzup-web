
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Database, 
  Wifi, 
  User,
  Key,
  Settings as SettingsIcon,
  Save,
  TestTube,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  whatsapp_number: string;
  role: 'admin' | 'reseller' | 'customer';
  balance: number;
}

interface SettingsProps {
  user: User;
}

const Settings = ({ user }: SettingsProps) => {
  const [dbConfig, setDbConfig] = useState({
    host: 'localhost',
    port: '3306',
    database: 'voucher_hotspot',
    username: 'root',
    password: ''
  });

  const [mikrotikConfig, setMikrotikConfig] = useState({
    host: '192.168.1.1',
    port: '8728',
    username: 'admin',
    password: ''
  });

  const [profileConfig, setProfileConfig] = useState({
    name: user.username,
    username: user.username,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    db: false,
    mikrotik: false,
    current: false,
    new: false,
    confirm: false
  });

  const [connectionStatus, setConnectionStatus] = useState({
    database: 'untested',
    mikrotik: 'untested'
  });

  const [loading, setLoading] = useState({
    dbTest: false,
    mikrotikTest: false,
    dbSave: false,
    mikrotikSave: false,
    profileSave: false
  });

  const { toast } = useToast();

  const testDatabaseConnection = async () => {
    setLoading(prev => ({ ...prev, dbTest: true }));
    try {
      // Simulate API call to test database connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success/failure
      const success = Math.random() > 0.3;
      if (success) {
        setConnectionStatus(prev => ({ ...prev, database: 'success' }));
        toast({
          title: "Koneksi Database Berhasil",
          description: "Berhasil terhubung ke MariaDB",
        });
      } else {
        setConnectionStatus(prev => ({ ...prev, database: 'failed' }));
        toast({
          title: "Koneksi Database Gagal",
          description: "Tidak dapat terhubung ke MariaDB. Periksa konfigurasi.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, database: 'failed' }));
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menguji koneksi database",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, dbTest: false }));
    }
  };

  const testMikrotikConnection = async () => {
    setLoading(prev => ({ ...prev, mikrotikTest: true }));
    try {
      // Simulate API call to test Mikrotik connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success/failure
      const success = Math.random() > 0.3;
      if (success) {
        setConnectionStatus(prev => ({ ...prev, mikrotik: 'success' }));
        toast({
          title: "Koneksi Mikrotik Berhasil",
          description: "Berhasil terhubung ke Mikrotik API",
        });
      } else {
        setConnectionStatus(prev => ({ ...prev, mikrotik: 'failed' }));
        toast({
          title: "Koneksi Mikrotik Gagal",
          description: "Tidak dapat terhubung ke Mikrotik. Periksa konfigurasi.",
          variant: "destructive"
        });
      }
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, mikrotik: 'failed' }));
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menguji koneksi Mikrotik",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, mikrotikTest: false }));
    }
  };

  const saveDatabaseConfig = async () => {
    setLoading(prev => ({ ...prev, dbSave: true }));
    try {
      // Simulate API call to save database config
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Konfigurasi Database Tersimpan",
        description: "Pengaturan database berhasil disimpan",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konfigurasi database",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, dbSave: false }));
    }
  };

  const saveMikrotikConfig = async () => {
    setLoading(prev => ({ ...prev, mikrotikSave: true }));
    try {
      // Simulate API call to save Mikrotik config
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Konfigurasi Mikrotik Tersimpan",
        description: "Pengaturan Mikrotik berhasil disimpan",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konfigurasi Mikrotik",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, mikrotikSave: false }));
    }
  };

  const saveProfile = async () => {
    if (profileConfig.newPassword && profileConfig.newPassword !== profileConfig.confirmPassword) {
      toast({
        title: "Error",
        description: "Password baru tidak cocok dengan konfirmasi password",
        variant: "destructive"
      });
      return;
    }

    setLoading(prev => ({ ...prev, profileSave: true }));
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profil Berhasil Diupdate",
        description: "Data profil Anda telah diperbarui",
      });
      
      // Reset password fields
      setProfileConfig(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate profil",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, profileSave: false }));
    }
  };

  const getConnectionBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Terhubung</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Gagal</Badge>;
      default:
        return <Badge variant="secondary">Belum Diuji</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2" />
            Pengaturan Sistem
          </CardTitle>
          <CardDescription>
            Kelola konfigurasi database, Mikrotik API, dan profil pengguna
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="database" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="mikrotik">Mikrotik API</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Konfigurasi MariaDB
                </span>
                {getConnectionBadge(connectionStatus.database)}
              </CardTitle>
              <CardDescription>
                Pengaturan koneksi ke database MariaDB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="db-host">Host</Label>
                  <Input
                    id="db-host"
                    value={dbConfig.host}
                    onChange={(e) => setDbConfig(prev => ({ ...prev, host: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="db-port">Port</Label>
                  <Input
                    id="db-port"
                    value={dbConfig.port}
                    onChange={(e) => setDbConfig(prev => ({ ...prev, port: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="db-database">Database Name</Label>
                <Input
                  id="db-database"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, database: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="db-username">Username</Label>
                <Input
                  id="db-username"
                  value={dbConfig.username}
                  onChange={(e) => setDbConfig(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="db-password">Password</Label>
                <div className="relative">
                  <Input
                    id="db-password"
                    type={showPasswords.db ? "text" : "password"}
                    value={dbConfig.password}
                    onChange={(e) => setDbConfig(prev => ({ ...prev, password: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords(prev => ({ ...prev, db: !prev.db }))}
                  >
                    {showPasswords.db ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button onClick={testDatabaseConnection} variant="outline" disabled={loading.dbTest}>
                  <TestTube className="h-4 w-4 mr-2" />
                  {loading.dbTest ? 'Testing...' : 'Test Koneksi'}
                </Button>
                <Button onClick={saveDatabaseConfig} disabled={loading.dbSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading.dbSave ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mikrotik">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Wifi className="h-5 w-5 mr-2" />
                  Konfigurasi Mikrotik API
                </span>
                {getConnectionBadge(connectionStatus.mikrotik)}
              </CardTitle>
              <CardDescription>
                Pengaturan koneksi ke Mikrotik RouterOS API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mt-host">Host/IP Mikrotik</Label>
                  <Input
                    id="mt-host"
                    value={mikrotikConfig.host}
                    onChange={(e) => setMikrotikConfig(prev => ({ ...prev, host: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="mt-port">Port API</Label>
                  <Input
                    id="mt-port"
                    value={mikrotikConfig.port}
                    onChange={(e) => setMikrotikConfig(prev => ({ ...prev, port: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="mt-username">Username</Label>
                <Input
                  id="mt-username"
                  value={mikrotikConfig.username}
                  onChange={(e) => setMikrotikConfig(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="mt-password">Password</Label>
                <div className="relative">
                  <Input
                    id="mt-password"
                    type={showPasswords.mikrotik ? "text" : "password"}
                    value={mikrotikConfig.password}
                    onChange={(e) => setMikrotikConfig(prev => ({ ...prev, password: e.target.value }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords(prev => ({ ...prev, mikrotik: !prev.mikrotik }))}
                  >
                    {showPasswords.mikrotik ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  Pastikan Mikrotik API sudah diaktifkan dan user memiliki hak akses yang diperlukan untuk mengelola User Manager.
                </AlertDescription>
              </Alert>

              <div className="flex space-x-2 pt-4">
                <Button onClick={testMikrotikConnection} variant="outline" disabled={loading.mikrotikTest}>
                  <TestTube className="h-4 w-4 mr-2" />
                  {loading.mikrotikTest ? 'Testing...' : 'Test Koneksi'}
                </Button>
                <Button onClick={saveMikrotikConfig} disabled={loading.mikrotikSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading.mikrotikSave ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Edit Profil
              </CardTitle>
              <CardDescription>
                Ubah informasi profil dan password Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profile-name">Nama Lengkap</Label>
                <Input
                  id="profile-name"
                  value={profileConfig.name}
                  onChange={(e) => setProfileConfig(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="profile-username">Username</Label>
                <Input
                  id="profile-username"
                  value={profileConfig.username}
                  onChange={(e) => setProfileConfig(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Ganti Password</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Password Saat Ini</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPasswords.current ? "text" : "password"}
                        value={profileConfig.currentPassword}
                        onChange={(e) => setProfileConfig(prev => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-password">Password Baru</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showPasswords.new ? "text" : "password"}
                        value={profileConfig.newPassword}
                        onChange={(e) => setProfileConfig(prev => ({ ...prev, newPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={profileConfig.confirmPassword}
                        onChange={(e) => setProfileConfig(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={saveProfile} disabled={loading.profileSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading.profileSave ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
