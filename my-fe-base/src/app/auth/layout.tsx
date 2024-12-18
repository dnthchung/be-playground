//layout là thành pần dùng chung cho các trang

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
