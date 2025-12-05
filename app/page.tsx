import ClientLayout from "./client-layout"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
