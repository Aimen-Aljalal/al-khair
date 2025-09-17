# ترجمة Hero Section

## نظرة عامة
تم إضافة دعم الترجمة الكامل لـ Hero Section مع الحفاظ على نفس التنسيقات والألوان.

## الميزات المضافة

### ✅ الترجمة الكاملة
- **اسم الشركة:** "شــركــــة الخــــيــر" / "Al-Khair Company"
- **العنوان الفرعي:** "للمقاولات وتوريد وتمويل الشركات" / "for Contracting, Supply and Corporate Financing"
- **الوصف:** النص الكامل بالعربية والإنجليزية

### ✅ التنسيقات المحفوظة
- **نفس الألوان:** أبيض للخلفية والنص
- **نفس الأحجام:** جميع أحجام الخطوط محفوظة
- **نفس المسافات:** letterSpacing و marginBottom
- **نفس الخطوط:** خطوط عربية للعربية وإنجليزية للإنجليزية

### ✅ الخطوط المخصصة
- **العربية:** Noto Naskh Arabic, Cairo, Tajawal
- **الإنجليزية:** Arial Black, Helvetica Neue, Times New Roman

## كيفية العمل

### 1. التبديل التلقائي
```javascript
// عند تغيير اللغة
const { i18n } = useTranslation('common');
i18n.changeLanguage('ar'); // للعربية
i18n.changeLanguage('en'); // للإنجليزية
```

### 2. الخطوط الديناميكية
```javascript
// خطوط مختلفة حسب اللغة
fontFamily: currentLanguage === 'ar' 
  ? "'Noto Naskh Arabic', 'Cairo', 'Tajawal', sans-serif"
  : "'Arial Black', 'Helvetica Neue', sans-serif"
```

### 3. المسافات المخصصة
```javascript
// مسافات مختلفة حسب اللغة
letterSpacing: currentLanguage === 'ar' ? "1.5px" : "0.5px"
```

## الملفات المحدثة

### ملفات الترجمة
- `locales/en/common.json` - إضافة `sections.hero`
- `locales/ar/common.json` - إضافة `sections.hero`

### مكون الصفحة الرئيسية
- `app/page.js` - تحديث Hero Section لاستخدام الترجمات

## النتيجة النهائية

### العربية
- **اسم الشركة:** شــركــــة الخــــيــر
- **العنوان الفرعي:** للمقاولات وتوريد وتمويل الشركات
- **الوصف:** نسعى لبناء سمعة متميزة وحضور قوي عبر بيئة عمل احترافية وهيكل إداري مرن
- **الخط:** Noto Naskh Arabic, Cairo, Tajawal
- **المسافات:** 1.5px letterSpacing

### الإنجليزية
- **اسم الشركة:** Al-Khair Company
- **العنوان الفرعي:** for Contracting, Supply and Corporate Financing
- **الوصف:** We strive to build a distinguished reputation and strong presence through a professional work environment and flexible administrative structure
- **الخط:** Arial Black, Helvetica Neue, Times New Roman
- **المسافات:** 0.5px letterSpacing

## التشغيل
```bash
cd al-khair
npm run dev
```

## ملاحظات مهمة
- ✅ جميع التنسيقات محفوظة
- ✅ نفس الألوان والأحجام
- ✅ خطوط مناسبة لكل لغة
- ✅ مسافات مخصصة لكل لغة
- ✅ تبديل فوري عند تغيير اللغة
