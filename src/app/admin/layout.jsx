import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Future Frames Admin",
  manifest: "/manifest.json",
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}