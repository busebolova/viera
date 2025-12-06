# VIERA - Alkan Yapı & Viera Ortaklığı

Modern, responsive inşaat firması web sitesi. Next.js 14 ile geliştirilmiş, JSON tabanlı CMS sistemi.

## 🚀 Özellikler

- **JSON Tabanlı CMS**: Veritabanı gerektirmez, tüm içerik `/content/*.json` dosyalarında
- **Admin Paneli**: Şifre korumalı yönetim paneli
- **GitHub Entegrasyonu**: Opsiyonel olarak içeriği GitHub'a commit edebilir
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Dark/Light Mode**: Tema desteği
- **SEO Optimized**: Meta etiketleri ve Schema.org desteği

## 📁 Proje Yapısı

```
alkanyapi2/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin paneli
│   ├── api/               # API endpoints
│   ├── hakkimizda/        # Hakkımızda sayfası
│   ├── hizmetlerimiz/     # Hizmetler sayfası
│   ├── iletisim/          # İletişim sayfası
│   └── projeler/          # Projeler sayfası
├── components/            # React bileşenleri
├── content/               # JSON içerik dosyaları
│   ├── home.json          # Anasayfa içeriği
│   ├── about.json         # Hakkımızda içeriği
│   ├── contact.json       # İletişim bilgileri
│   ├── services.json      # Hizmetler
│   ├── projects.json      # Projeler
│   └── config.json        # Site ayarları
├── lib/                   # Utility fonksiyonları
│   ├── content.ts         # JSON okuma/yazma
│   ├── default-content.ts # Varsayılan içerik
│   └── github.ts          # GitHub API
└── public/                # Statik dosyalar
```

## 🛠️ Kurulum

### 1. Bağımlılıkları yükle

```bash
npm install
```

### 2. Environment değişkenlerini ayarla

`.env.example` dosyasını `.env.local` olarak kopyala:

```bash
cp .env.example .env.local
```

Minimum gerekli değişken:

```env
ADMIN_PASSWORD=guclu_bir_sifre
```

### 3. Geliştirme sunucusunu başlat

```bash
npm run dev
```

Site: http://localhost:3000
Admin: http://localhost:3000/admin

## 📝 İçerik Yönetimi

### Lokal Mod (Varsayılan)

- İçerik `/content/*.json` dosyalarında saklanır
- Admin panelinden yapılan değişiklikler lokal dosyalara kaydedilir
- Vercel'de deploy edildiğinde, build sırasındaki içerik kullanılır

### GitHub Mod (Opsiyonel)

GitHub entegrasyonu aktif edildiğinde:
- İçerik GitHub reposuna commit edilir
- Vercel otomatik olarak yeni commit'leri deploy eder

GitHub modunu aktifleştirmek için `.env.local`:

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_OWNER=kullanici_adi
GITHUB_REPO=repo_adi
GITHUB_BRANCH=main
```

## 🔐 Admin Paneli

### Giriş

1. http://localhost:3000/admin/login adresine git
2. `ADMIN_PASSWORD` ile giriş yap

### Özellikler

- **Anasayfa**: Hero, hakkımızda bölümü düzenleme
- **Hakkımızda**: Firma bilgileri, vizyon/misyon
- **Hizmetler**: Hizmet kategorileri ve açıklamaları
- **Projeler**: Tamamlanan, devam eden, başlayacak projeler
- **İletişim**: Adres, telefon, e-posta bilgileri

## 🚀 Deploy (Vercel)

### 1. Vercel'e import et

```bash
vercel
```

### 2. Environment değişkenlerini ekle

Vercel Dashboard > Project Settings > Environment Variables:

```
ADMIN_PASSWORD=guclu_sifre
```

GitHub entegrasyonu için ek değişkenler:

```
GITHUB_TOKEN=ghp_xxxx
GITHUB_OWNER=username
GITHUB_REPO=repo
GITHUB_BRANCH=main
```

### 3. Deploy

```bash
vercel --prod
```

## 📱 Sayfalar

| Sayfa | URL | Açıklama |
|-------|-----|----------|
| Anasayfa | `/` | Hero slider, hakkımızda, projeler, iletişim |
| Hakkımızda | `/hakkimizda` | Firma geçmişi, vizyon, misyon |
| Hizmetler | `/hizmetlerimiz` | Konut, ticari, karma projeler |
| Projeler | `/projeler` | Tamamlanan ve devam eden projeler |
| İletişim | `/iletisim` | İletişim formu ve bilgiler |
| Admin | `/admin` | Yönetim paneli |

## 🛡️ Güvenlik

- Admin paneli şifre korumalı
- Cookie tabanlı session (8 saat geçerli)
- GitHub token güvenli şekilde saklanır

## 📄 Lisans

MIT

---

**VIERA - Alkan Yapı & Viera Ortaklığı**  
60+ Yıllık Tecrübe ile Güvenin Adresi
