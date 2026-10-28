# TEDPA Makina - Kurumsal Web Platformu

## Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL 15+
- npm

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```

3. PostgreSQL veritabanı bağlantısını `.env` dosyasında yapılandırın:
```
DATABASE_URL="postgresql://user:password@localhost:5432/tedpa_db"
JWT_SECRET="secure-random-string"
SESSION_SECRET="another-secure-random-string"
```

4. Veritabanını oluşturun ve migration'ları çalıştırın:
```bash
npx prisma migrate dev --name init
```

5. İlk admin hesabını oluşturun:
```bash
npx tsx src/scripts/setup.ts
```

Varsayılan admin bilgileri (değiştirmeniz önerilir):
- E-posta: `admin@tedpa.com`
- Şifre: `Tedpa2024!`

6. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

7. Tarayıcınızda açın:
- Ana site: http://localhost:3000
- Admin paneli: http://localhost:3000/admin

## Proje Yapısı

```
src/
├── actions/          # Server Actions
├── app/
│   ├── (public)/     # Halka açık sayfalar
│   │   ├── urunler/  # Ürün kataloğu
│   │   ├── teklif/   # Teklif talebi
│   │   └── ...
│   └── admin/        # Yönetim paneli
│       ├── quotes/   # Teklif yönetimi (CRM)
│       ├── products/ # Ürün yönetimi
│       └── ...
├── components/
│   ├── admin/        # Admin bileşenleri
│   ├── home/         # Ana sayfa bileşenleri
│   ├── layout/       # Header, Footer
│   ├── products/     # Ürün bileşenleri
│   └── ui/           # shadcn/ui bileşenleri
├── lib/              # Yardımcı fonksiyonlar
│   ├── auth.ts       # Kimlik doğrulama
│   ├── db.ts         # Prisma client
│   └── validations.ts # Zod şemaları
└── scripts/          # Kurulum scriptleri
```

## Teknoloji Stack

- **Frontend**: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions, Prisma ORM
- **Veritabanı**: PostgreSQL
- **Doğrulama**: Zod
- **Kimlik Doğrulama**: JWT + HttpOnly Cookie

## Teklif Talep Sistemi

1. Ziyaretçi ürün kataloğunu inceler
2. Ürünleri "Teklif Listeme Ekle" butonuyla seçer
3. Miktar belirler
4. Firma ve iletişim bilgilerini doldurur
5. Teklif talebini gönderir
6. Benzersiz talep numarası alır (TKT-YYYYMMDD-XXX)
7. Admin panelinde CRM benzeri ekran ile yönetilir

## Eksik Yapılandırmalar

Aşağıdaki yapılandırmalar sağlanana kadar devre dışıdır:

- **E-posta servisi**: SMTP ayarları `.env` dosyasında yapılandırılmalıdır
- **Dosya depolama**: S3 uyumlu depolama ayarları yapılandırılmalıdır
- **Gerçek görseller**: Admin panelinden yüklenecektir

## Production Build

```bash
npm run build
npm start
```
