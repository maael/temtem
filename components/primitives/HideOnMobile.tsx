export default function HideOnMobile({ children }: { children: any }) {
  return (
    <div
      css={{
        display: "none",
        "@media (min-width: 800px)": {
          display: "initial"
        }
      }}
    >
      {children}
    </div>
  );
}
