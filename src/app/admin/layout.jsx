import { Cormorant_Garamond } from "next/font/google";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fm-serif",
  display: "swap",
});

export const metadata = {
  title: "Future Frames Admin",
  manifest: "/manifest.json",
};

export default function AdminLayout({ children }) {
  return (
    <div className={cormorant.variable}>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}