export const metadata = {
  title: "Admin Login - Al-Khair",
  description: "Admin login page for Al-Khair management system",
};

export default function LoginLayout({ children }) {
  return (
    <div className="login-layout">
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

