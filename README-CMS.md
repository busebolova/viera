# VIERA - GitHub İçerik Yönetim Sistemi

Bu proje, GitHub'da saklanan JSON dosyalarını yönetmek için Next.js 14 App Router ile oluşturulmuş bir CMS sistemidir.

## Özellikler

- GitHub API ile entegrasyon
- Server-side API routes
- Gerçek zamanlı commit sistemi
- Cookie-based kimlik doğrulama
- Vercel'de çalışır

## Ortam Değişkenleri

Vercel'de aşağıdaki değişkenleri tanımlayın:

| Değişken | Açıklama |
|----------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token (repo yetkili) |
| `GITHUB_OWNER` | GitHub kullanıcı/org adı |
| `GITHUB_REPO` | Repository adı |
| `GITHUB_BRANCH` | Branch adı (main) |
| `ADMIN_PASSWORD` | Admin panel şifresi |

## Kullanım

1. `/admin/login` sayfasına gidin
2. ADMIN_PASSWORD ile giriş yapın
3. İçerikleri JSON olarak düzenleyin
4. Kaydet - değişiklikler GitHub'a commit edilir

## API Endpoints

- `GET /api/admin/content/[slug]` - İçerik okuma
- `PUT /api/admin/content/[slug]` - İçerik güncelleme
- `POST /api/auth/login` - Giriş
- `POST /api/auth/logout` - Çıkış
