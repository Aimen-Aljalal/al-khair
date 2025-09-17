# دليل الترجمة والاتجاه RTL

## نظرة عامة
تم إضافة دعم كامل للترجمة العربية والإنجليزية مع دعم الاتجاه RTL (Right-to-Left) للعربية.

## الميزات المضافة

### ✅ الترجمة الشاملة
- **قسم About:** جميع النصوص والوصف والميزات
- **قسم Services:** العناوين والأوصاف والخدمات الأربع
- **قسم Projects:** العنوان والوصف
- **قسم Contact:** جميع النصوص والفورم
- **Header:** قائمة التنقل وأزرار اللغة
- **Footer:** الروابط والعناوين

### ✅ دعم RTL للعربية
- **اتجاه النص:** من اليمين لليسار للعربية
- **ترتيب القائمة:** عكسي في العربية
- **ترتيب العناصر:** اللوجو واللغة تتغير مواقعها
- **CSS مخصص:** قواعد RTL شاملة

## كيفية الاستخدام

### 1. تبديل اللغة
```javascript
// في أي مكون
const { i18n } = useTranslation('common');

// تبديل إلى العربية
i18n.changeLanguage('ar');

// تبديل إلى الإنجليزية  
i18n.changeLanguage('en');
```

### 2. استخدام الترجمة
```javascript
// في أي مكون
const { t } = useTranslation('common');

// استخدام الترجمة
<h1>{t('sections.about.title')}</h1>
<p>{t('sections.about.description1')}</p>
```

### 3. إضافة ترجمة جديدة
```json
// locales/en/common.json
{
  "newSection": {
    "title": "New Section",
    "description": "Description in English"
  }
}

// locales/ar/common.json  
{
  "newSection": {
    "title": "قسم جديد",
    "description": "الوصف بالعربية"
  }
}
```

## الملفات المحدثة

### ملفات الترجمة
- `locales/en/common.json` - النصوص الإنجليزية
- `locales/ar/common.json` - النصوص العربية

### ملفات المكونات
- `app/page.js` - الصفحة الرئيسية مع الترجمات
- `components/Header.js` - الهيدر مع دعم RTL
- `components/ProjectsSection.js` - قسم المشاريع
- `components/Footer.js` - الفوتر

### ملفات الإعداد
- `i18n.js` - إعداد الترجمة
- `components/I18nProvider.js` - مكون التغليف
- `app/globals.css` - قواعد CSS للـ RTL

## قواعد CSS للـ RTL

### الاتجاه العام
```css
[dir="rtl"] {
  text-align: right;
}
```

### القائمة
```css
[dir="rtl"] .navmenu ul {
  flex-direction: row-reverse;
}
```

### الترتيب
```css
[dir="rtl"] .language-selector {
  order: -1;
}

[dir="rtl"] .logo {
  order: 1;
}
```

## التشغيل
```bash
cd al-khair
npm run dev
```

## النتيجة النهائية

### ✅ العربية
- جميع النصوص مترجمة
- اتجاه RTL صحيح
- ترتيب العناصر مناسب
- تجربة مستخدم عربية كاملة

### ✅ الإنجليزية  
- جميع النصوص باللغة الإنجليزية
- اتجاه LTR صحيح
- ترتيب العناصر من اليسار لليمين
- تجربة مستخدم إنجليزية كاملة

## ملاحظات مهمة
- Hero Section لم يتم ترجمته كما طُلب
- النظام يحفظ تفضيل اللغة تلقائياً
- دعم كامل لـ Server-Side Rendering
- متوافق مع Next.js 13+ App Router
