# نظام الترجمة (Internationalization)

## نظرة عامة
تم إضافة دعم تعدد اللغات للموقع باستخدام `react-i18next` مع Next.js 13+ App Router.

## الميزات
- ✅ دعم اللغتين العربية والإنجليزية
- ✅ تبديل اللغة فوري
- ✅ حفظ تفضيل اللغة في localStorage
- ✅ ترجمة شاملة لجميع النصوص
- ✅ دعم RTL للغة العربية

## الملفات المهمة

### ملفات الترجمة
```
locales/
├── en/
│   └── common.json    # النصوص الإنجليزية
└── ar/
    └── common.json    # النصوص العربية
```

### ملفات الإعداد
- `i18n.js` - إعداد i18next
- `components/I18nProvider.js` - مكون تغليف التطبيق
- `app/layout.js` - استخدام I18nProvider

## كيفية الاستخدام

### 1. إضافة نص جديد
```javascript
// في المكون
const { t } = useTranslation('common');

// استخدام الترجمة
<h1>{t('navigation.home')}</h1>
```

### 2. إضافة ترجمة جديدة
```json
// locales/en/common.json
{
  "newSection": {
    "title": "New Section"
  }
}

// locales/ar/common.json
{
  "newSection": {
    "title": "قسم جديد"
  }
}
```

### 3. تبديل اللغة
```javascript
const { i18n } = useTranslation('common');

// تبديل إلى العربية
i18n.changeLanguage('ar');

// تبديل إلى الإنجليزية
i18n.changeLanguage('en');
```

## التشغيل
```bash
npm run dev
```

## ملاحظات
- النظام يعمل مع Next.js 13+ App Router
- لا يتطلب `next-i18next`
- يدعم Server-Side Rendering
- يحفظ تفضيل اللغة تلقائياً
