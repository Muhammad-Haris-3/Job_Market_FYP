import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ margin: 0, fontFamily: "Arial" }}>
          {/* Navbar */}
          <header
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #333",
              backgroundColor: "#000",
              color: "white",
            }}
          >
            <h3 style={{ margin: 0 }}>📊 Job Market App</h3>
            <div>
              {/* Jab banda Login NAHI hoga toh yeh dikhega */}
              <SignedOut>
                <SignInButton
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    background: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                />
              </SignedOut>

              {/* Jab banda Login HOGA toh yeh dikhega */}
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
