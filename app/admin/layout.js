export const metadata = {
  title: "Admin Dashboard - Al-Khair",
  description: "Admin dashboard for Al-Khair management system",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <style dangerouslySetInnerHTML={{
        __html: `
          #header, .scroll-top, #footer {
            display: none !important;
          }
          .main {
            padding: 0 !important;
          }
        `
      }} />
      {children}
    </div>
  );
}

