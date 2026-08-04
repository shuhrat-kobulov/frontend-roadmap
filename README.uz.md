<div align="center">

![Frontend Roadmap](https://telegra.ph/file/755d5e84a92cb35a80879.jpg)

<h1>Frontend Roadmap</h1>

<p>Frontendni bepul va mustaqil o'rganish uchun saralangan, aniq tanlovga asoslangan yo'l.</p>

![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-blue)
![Link check](https://img.shields.io/github/actions/workflow/status/shuhrat-kobulov/frontend-roadmap/link-check.yml?branch=main&label=links)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Resources: 149](https://img.shields.io/badge/resources-149-orange)

[English](README.md) · [O'zbekcha](README.uz.md)

**[Veb-sayt sifatida o'qing](https://shuhrat-kobulov.github.io/frontend-roadmap/uz/)** — qidiruv bilan, butun yo'l xaritasi bitta yon panelda.

</div>

## Bu nima

Frontend dasturlashni o'rganish uchun qo'lda saralangan **149 ta bepul resurs** —
mavzular bo'yicha guruhlangan va taxminan duch keladigan tartibda joylashtirilgan.
Har bir yozuv — ishlayotgan dasturchi haqiqatan ham tavsiya qiladigan narsa: pullik
devorlar yo'q, ro'yxatdan o'tish talab qilinmaydi, boshqalarning maqolalarini
yig'adigan bloglar yo'q. Ro'yxat mustaqil o'rganayotganlar, bilimidagi bo'shliqni
to'ldirayotgan bootcamp bitiruvchilari va qidiruv natijalari sahifasi o'rniga qisqa
ro'yxat xohlaydigan har bir kishi uchun.

Bu darslik **emas** — u materialga yo'naltiradi, o'zi o'rgatmaydi. Bu to'liq ro'yxat
ham **emas** — ro'yxat ishlatsa bo'ladigan darajada qisqa qolishi uchun ko'plab yaxshi
resurslar ataylab kiritilmagan. Va bu ish kafolati ham **emas**; bu — xarita, yo'lni
baribir o'zingiz bosib o'tasiz.

> [!TIP]
> **Shu yerdan boshlang.** Agar tayyor yo'l kerak bo'lsa,
> [ROADMAP.uz.md](ROADMAP.uz.md) fayliga o'ting — beshta ketma-ket bosqich, har
> birida shartlar, quriladigan loyihalar, o'z-o'zini tekshirish ro'yxati va vaqt
> taxminlari bor. Agar ma'lumotnoma kerak bo'lsa, quyidagi Mundarija jadvalidan
> kerakli mavzu fayliga to'g'ridan-to'g'ri o'ting.

## Mundarija

| Mavzu | Nima bor | Daraja |
| --- | --- | --- |
| **🧱 Poydevor** | | |
| [HTML](docs/HTML.md) | Semantik markup bo'yicha ma'lumotnoma va amaliy mashqlar. | Boshlang'ich |
| [CSS](docs/CSS.md) | Ma'lumotnoma, layout o'yinlari hamda soya, gradient va clip-path generatorlari. | Boshlang'ich → O'rta |
| [JavaScript](docs/JAVASCRIPT.md) | Kurslar va kitoblar, so'ng Node va npm, grafiklar, yordamchi kutubxonalar va JWT vositalari. | Boshlang'ich → Yuqori |
| **🔤 Til va tiplar** | | |
| [TypeScript](docs/TYPESCRIPT.md) | Boshlash uchun qo'llanmalar, so'ng tip tizimiga chuqur kirish. | O'rta |
| **⚛️ Framework'lar** | | |
| [React](docs/REACTJS.md) | Rasmiy ma'lumotnoma, amaliy loyihalar hamda rendering va hook'lar bo'yicha chuqur maqolalar. | O'rta |
| Boshqa framework va meta-framework'lar | Vue, Svelte, Angular, Next.js, Astro. | _(tez orada)_ |
| **🛠 Mahorat** | | |
| Accessibility | WCAG, ekran o'quvchilar, klaviatura bilan navigatsiya, avtomatik tekshiruvlar. | _(tez orada)_ |
| Performance | Core Web Vitals, bundle byudjetlari, profiling. | _(tez orada)_ |
| Xavfsizlik | XSS, CSP, autentifikatsiya patternlari, dependency'larni toza tutish. | _(tez orada)_ |
| Test | Unit, komponent va end-to-end testlar. | _(tez orada)_ |
| **⚙️ Asboblar** | | |
| [Git](docs/GIT.md) | Ma'lumotnoma va branching bo'yicha amaliyot. | Boshlang'ich |
| Build vositalari | Vite, bundler'lar, linter'lar, formatter'lar. | _(tez orada)_ |
| Deployment | Hosting, CI/CD, preview muhitlari. | _(tez orada)_ |
| **🎨 Dizayn va UI** | | |
| [Dizayn](docs/DESIGN.md) | Ranglar, shriftlar, ikonkalar, illyustratsiyalar, mockup'lar, Figma shablonlari, optimizatorlar. | Barcha darajalar |
| [UI Framework'lar](docs/UI-FRAMEWORKS.md) | Komponent kutubxonalari va CSS framework'lari. | O'rta |
| **📺 Koddan tashqari** | | |
| [O'rganish](docs/LEARNING.md) | O'quv dasturlari, hujjatlar, kanallar, kurslar, kitoblar va hamjamiyatlar. | Barcha darajalar |
| AI vositalari | Frontend ishi uchun yordamchilar va ish jarayonlari. | _(tez orada)_ |
| Amaliy loyihalar | Noldan qurish uchun topshiriqlar va challenge'lar. | _(tez orada)_ |

> [!NOTE]
> Mavzu fayllari (`docs/*.md`) ingliz tilida — nega faqat shu ikki fayl tarjima
> qilingani [docs/TRANSLATIONS.md](docs/TRANSLATIONS.md) da tushuntirilgan.

## Qanday foydalanish kerak

- **Tartib bilan, bir marta o'ting.** Framework'dan oldin poydevor. Zaif JavaScript
  ustiga React qo'yish — tiqilib qolishning eng keng tarqalgan yo'li, va uni hech
  qancha darslik tuzatmaydi.
- **Har bo'limdan bitta resurs tanlang, hammasini emas.** Har bir faylda bir nechta
  variant bor, chunki odamlar har xil o'rganadi — bular alternativalar, bajariladigan
  ro'yxat emas.
- **Mavzular orasida biror narsa quring.** Bo'lim o'qib chiqilganda emas, u bilan
  biror narsa yaratib, chiqarib qo'yganingizda tugaydi.

## Hissa qo'shish

Ishlamayotgan havola topdingizmi yoki bu yerga mos resursni bilasizmi? PR yoki issue
oching — bitta havolali kichik PR'lar eng tez merge qilinadi.

Ochishdan oldin nima mos kelishini [CONTRIBUTING.md](CONTRIBUTING.md) da, yozuv
formatini esa [docs/STYLE.md](docs/STYLE.md) da o'qing — ikkalasi ham ingliz tilida.
Barcha ishtirok [Code of Conduct](CODE_OF_CONDUCT.md) qoidalariga bo'ysunadi.

## Litsenziya

[CC BY 4.0](LICENSE) © 2021–2026 Shuhratbek Qobulov
