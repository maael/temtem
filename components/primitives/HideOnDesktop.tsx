export default function HideOnDesktop({ children }: { children: any }) {
  return (
    <div
      css={{
        "@media (min-width: 800px)": {
          display: "none"
        }
      }}
    >
      {children}
    </div>
  );
}
