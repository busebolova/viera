# GitHub CMS Kurulum Rehberi

VIERA - Alkan Yapı & Viera web sitesi için GitHub tabanlı içerik yönetim sistemi kurulum adımları.

## 1. GitHub Repository Oluşturma

1. GitHub'da yeni bir repository oluşturun (örn: `viera-content`)
2. Repository'yi public veya private olarak ayarlayın
3. Repository'nizi oluşturduktan sonra URL'sini not alın: `https://github.com/KULLANICI_ADI/REPO_ADI`

## 2. Content Klasörünü GitHub'a Yükleme

Repository'nizde `content` klasörü oluşturun ve aşağıdaki JSON dosyalarını ekleyin:

### content/config.json
\`\`\`json
{
  "password": "admin123"
}
\`\`\`

### content/home.json
\`\`\`json
{
  "video": {
    "url": "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4",
    "title": "VIERA",
    "subtitle": "Alkan Yapı & Viera Ortaklığı"
  },
  "experience": {
    "title": "60 Yılı Aşkın Tecrübe",
    "description": "1965'ten bu yana konut ve iş yeri üretiminde aralıksız hizmet vermekteyiz."
  },
  "about": {
    "badge": "Hakkımızda",
    "title": "Firma Geçmişimiz",
    "description": "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
    "certification": {
      "title": "Müteahhitlik Belgemiz",
      "description": "Firmamız D sınıfı Müteahhitlik Belgesine sahiptir."
    },
    "projects": {
      "title": "Projelerimiz",
      "description": "1965'ten bu yana 100'den fazla proje başarıyla tamamlanmıştır."
    },
    "image": "/modern-office-building.png"
  }
}
\`\`\`

### content/about.json
\`\`\`json
{
  "title": "Hakkımızda",
  "description": "VIERA - Alkan Yapı & Viera Ortaklığı, 1965 yılından bu yana İstanbul'un en prestijli projelerinde imza atıyor.",
  "founder": {
    "name": "Servet Alkan",
    "role": "Kurucu",
    "bio": "60 yıllık tecrübesiyle inşaat sektörünün öncü isimlerinden biri."
  },
  "mission": "Kaliteli, güvenilir ve sürdürülebilir projeler üretmek",
  "vision": "Türkiye'nin en güvenilir inşaat firması olmak"
}
\`\`\`

### content/contact.json
\`\`\`json
{
  "address": "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul",
  "phone": "0216 391 49 40",
  "mobile": "0533 479 83 87",
  "email": "info@alkanyapi.com.tr",
  "fax": "0216 310 90 74",
  "authorized": "Erdem Alkan",
  "hours": "Pazartesi - Cuma: 09:00 - 18:00"
}
\`\`\`

### content/projects.json
\`\`\`json
{
  "completed": [
    {
      "id": "validebag-27-28",
      "title": "Validebağ 27-28 Blok",
      "description": "Altunizade Mah. Kalfa Çeşme Sok.",
      "details": "56 Daire",
      "year": "2024",
      "image": "/modern-apartment-building.png"
    }
  ],
  "ongoing": [
    {
      "id": "validebag-29",
      "title": "Validebağ 29 Kentsel Dönüşüm",
      "description": "38 Daire - Kaba inşaat tamamlandı",
      "details": "2. Etap 2025 3. Çeyrek tamamlanacak",
      "year": "2025",
      "image": "/modern-construction-site.png"
    }
  ]
}
\`\`\`

### content/services.json
\`\`\`json
{
  "hero": {
    "title": "Hizmetlerimiz",
    "subtitle": "VIERA - Alkan Yapı & Viera Ortaklığı olarak 60 yılı aşkın tecrübemizle modern yaşam alanları inşa ediyoruz.",
    "image": "/modern-construction-site.png"
  },
  "services": [
    {
      "id": "konut",
      "icon": "Home",
      "title": "Konut Projeleri",
      "description": "Modern yaşam standartlarına uygun konut projeleri.",
      "image": "/modern-apartment-building.png"
    }
  ]
}
\`\`\`

## 3. GitHub Personal Access Token Oluşturma

1. GitHub hesabınıza giriş yapın
2. Sağ üst köşeden profil resminize tıklayın → **Settings**
3. Sol menüden en altta **Developer settings** → **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)** butonuna tıklayın
5. Token ayarları:
   - **Note**: "VIERA CMS Token" gibi açıklayıcı bir isim verin
   - **Expiration**: "No expiration" veya istediğiniz süre
   - **Select scopes**: **repo** kutusunu işaretleyin (tüm alt seçenekler otomatik seçilecek)
     - ✅ repo (Full control of private repositories)
     - ✅ repo:status
     - ✅ repo_deployment
     - ✅ public_repo
     - ✅ repo:invite
6. **Generate token** butonuna tıklayın
7. ⚠️ **ÖNEMLİ**: Token'ı kopyalayın - bu sayfadan ayrıldıktan sonra bir daha göremezsiniz!

## 4. Vercel Environment Variables Ayarlama

### Vercel Dashboard'dan:

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. Projenizi seçin
3. **Settings** → **Environment Variables** sekmesine gidin
4. Aşağıdaki değişkenleri ekleyin:

| Değişken Adı | Değer | Ortam |
|-------------|-------|-------|
| `GITHUB_TOKEN` | GitHub Personal Access Token'ınız (ghp_... ile başlayan) | Production, Preview, Development |
| `GITHUB_OWNER` | GitHub kullanıcı adınız veya organizasyon adınız | Production, Preview, Development |
| `GITHUB_REPO` | Repository adınız (örn: viera-content) | Production, Preview, Development |
| `GITHUB_BRANCH` | Branch adı (genellikle `main`) | Production, Preview, Development |

### Örnek Değerler:

\`\`\`
GITHUB_TOKEN=ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890
GITHUB_OWNER=erdemalkan
GITHUB_REPO=viera-content
GITHUB_BRANCH=main
\`\`\`

5. Tüm environment variables'ları ekledikten sonra **Save** butonuna tıklayın
6. Projenizi **Redeploy** edin (Settings → Deployments → en son deployment'ın sağındaki 3 nokta → Redeploy)

## 5. Sistem Testi

1. Deployment tamamlandıktan sonra sitenizi açın
2. `/admin/login` sayfasına gidin
3. Şifre: `admin123`
4. Giriş yapın ve içerikleri düzenleyin
5. "Kaydet" butonuna basın
6. GitHub repository'nizi kontrol edin - yeni commit göreceksiniz

## Sorun Giderme

### "Anasayfa yükleniyor..." hatası
- Environment variables'ların doğru girildiğinden emin olun
- GitHub token'ın `repo` yetkisine sahip olduğunu kontrol edin
- GitHub repository'de `content/` klasörü ve JSON dosyalarının olduğunu doğrulayın
- Browser console'da hata mesajlarını kontrol edin

### GitHub API Hataları
- Token'ın geçerli olduğundan emin olun
- Repository adının ve owner'ın doğru yazıldığından emin olun
- Branch adının doğru olduğunu kontrol edin (main veya master)

### Admin Panel Erişim Sorunu
- `/admin/login` URL'sini kullanın
- Şifre: `admin123` (panelden değiştirilebilir)
- Cookies'lerin etkin olduğundan emin olun

## Güvenlik Notları

⚠️ **ÖNEMLİ GÜVENLİK UYARILARI:**

1. GitHub token'ınızı asla public repository'lerde saklamayın
2. Token'ınızı kimseyle paylaşmayın
3. Admin şifresini ilk girişten sonra değiştirin
4. Token'ınızın sadece gerekli izinlere sahip olduğundan emin olun
5. Düzenli olarak token'ları yenileyin

## Destek

Sorun yaşarsanız:
- Browser console'u kontrol edin (F12)
- Network sekmesinde API isteklerini inceleyin
- Vercel deployment loglarını kontrol edin
