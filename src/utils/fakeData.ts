
// Şirketler
export const fakeCompanies = [
  { id: 1, name: 'Arı İnşaat', description: 'İnşaat projeleri', manager: 'Ahmet Yılmaz' },
  { id: 2, name: 'Yeni İnşaat', description: 'Yapı ve mühendislik hizmetleri', manager: 'Fatma Demir' },
  { id: 3, name: 'Kalem İnşaat', description: 'Altyapı çalışmaları', manager: 'Mehmet Çelik' },
  { id: 4, name: 'Demir Yapı', description: 'Çelik yapı ve mühendislik', manager: 'Zeynep Aksoy' },
  { id: 5, name: 'Beta Enerji', description: 'Enerji altyapı projeleri', manager: 'Ali Kılıç' },
  { id: 6, name: 'Alpha Yazılım', description: 'Yazılım geliştirme ve teknoloji hizmetleri', manager: 'Cem Doğan' },
  { id: 7, name: 'Gamma Elektrik', description: 'Elektrik sistemleri ve çözümleri', manager: 'Mustafa Can' },
  { id: 8, name: 'Delta Teknoloji', description: 'Yüksek teknoloji projeleri', manager: 'Ela Güneş' },
  { id: 9, name: 'Sigma Lojistik', description: 'Lojistik ve taşıma hizmetleri', manager: 'Deniz Taş' },
  { id: 10, name: 'Omega Finans', description: 'Finansal danışmanlık ve yönetim', manager: 'Hakan Demir' }
]


// Departmanlar
export const fakeDepartments = [
  { id: 1, name: 'Mühendislik', companyId: 1 },
  { id: 2, name: 'Proje Yönetimi', companyId: 1 },
  { id: 3, name: 'Muhasebe', companyId: 2 },
  { id: 4, name: 'Saha Operasyonları', companyId: 3 },
  { id: 5, name: 'IT Destek', companyId: 6 },
  { id: 6, name: 'Ar-Ge', companyId: 4 },
  { id: 7, name: 'Satış', companyId: 5 },
  { id: 8, name: 'Üretim', companyId: 7 },
  { id: 9, name: 'Finans', companyId: 10 },
  { id: 10, name: 'Teknik Destek', companyId: 8 },
  { id: 11, name: 'Lojistik Yönetimi', companyId: 9 },
  { id: 12, name: 'Müşteri Hizmetleri', companyId: 8 },
  { id: 13, name: 'Halkla İlişkiler', companyId: 4 },
  { id: 14, name: 'Kalite Kontrol', companyId: 3 }
]

// Personeller
export const fakeUsers = [
  // Arı İnşaat
  { id: 1, name: 'Ahmet Yılmaz', role: 'Baş Mühendis', email: 'ahmet@ariinsaat.com', phone: '555-123-4567', birthDate: '1980-05-12', address: 'İstanbul', position: 'Yapı mühendisliği projelerinden sorumlu.', departmentId: 1, companyId: 1 },
  { id: 2, name: 'Ayşe Kaya', role: 'Teknisyen', email: 'ayse@ariinsaat.com', phone: '555-234-5678', birthDate: '1990-07-24', address: 'Ankara', position: 'Proje sahasında teknik destek sağlar.', departmentId: 1, companyId: 1 },

  // Yeni İnşaat
  { id: 3, name: 'Fatma Demir', role: 'Muhasebeci', email: 'fatma@yeninsaat.com', phone: '555-456-7890', birthDate: '1985-11-01', address: 'Bursa', position: 'Şirketin finansal yönetiminden sorumludur.', departmentId: 3, companyId: 2 },
  { id: 4, name: 'Mehmet Kurt', role: 'Finans Uzmanı', email: 'mehmet@yeninsaat.com', phone: '555-567-8901', birthDate: '1988-09-15', address: 'Bursa', position: 'Finansal analiz ve raporlama yapar.', departmentId: 3, companyId: 2 },

  // Kalem İnşaat
  { id: 5, name: 'Deniz Taş', role: 'Saha Operatörü', email: 'deniz@kaleminsaat.com', phone: '555-678-9012', birthDate: '1992-03-10', address: 'İzmir', position: 'Saha operasyonlarını denetler.', departmentId: 4, companyId: 3 },
  { id: 6, name: 'Ece Kara', role: 'IT Uzmanı', email: 'ece@kaleminsaat.com', phone: '555-789-0123', birthDate: '1995-01-20', address: 'İzmir', position: 'Sistem altyapısını yönetir.', departmentId: 5, companyId: 6 },

  // Beta Enerji
  { id: 7, name: 'Ali Kılıç', role: 'Enerji Mühendisi', email: 'ali@betaenerji.com', phone: '555-890-1234', birthDate: '1990-08-16', address: 'Ankara', position: 'Enerji projelerini planlar ve denetler.', departmentId: 7, companyId: 5 },

  // Alpha Yazılım
  { id: 8, name: 'Cem Doğan', role: 'Backend Developer', email: 'cem@alphayazilim.com', phone: '555-901-2345', birthDate: '1994-12-05', address: 'İstanbul', position: 'Sunucu tarafı geliştirme yapar.', departmentId: 11, companyId: 6 },
  { id: 9, name: 'Ela Güneş', role: 'Frontend Developer', email: 'ela@alphayazilim.com', phone: '555-012-3456', birthDate: '1996-06-18', address: 'İstanbul', position: 'Kullanıcı arayüzü geliştirir.', departmentId: 11, companyId: 6 },

  // Gamma Elektrik
  { id: 10, name: 'Mustafa Can', role: 'Elektrik Mühendisi', email: 'mustafa@gammaelektrik.com', phone: '555-111-2222', birthDate: '1989-04-22', address: 'Antalya', position: 'Elektrik altyapısını yönetir.', departmentId: 8, companyId: 7 },

  // Omega Finans
  { id: 11, name: 'Hakan Demir', role: 'Finans Müdürü', email: 'hakan@omegafinans.com', phone: '555-333-4444', birthDate: '1983-02-17', address: 'İstanbul', position: 'Finansal planlama ve yatırım yönetimi.', departmentId: 9, companyId: 10 }
]
