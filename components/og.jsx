export const FooterItem = ({ title, value }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: "33.33%",
    }}
  >
    <div
      style={{
        fontSize: 24,
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: 24,
        opacity: 0.5,
        width: "100%",
      }}
    >
      {value && value != "" ? value : "無"}
    </div>
  </div>
);
export const Container = ({ children }) => (
  <div
    style={{
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      display: "flex",
      textAlign: "left",
      flexDirection: "column",
      justifyContent: "flex-start",
      fontFamily: "Lato",
      alignItems: "flex-start",
      fontSize: 24,
    }}
    lang="zh-TW"
  >
    {children}
  </div>
);
export const Tag = ({ children }) => (
  <div
    style={{
      fontSize: 24,
      border: `1px solid #f2f2f2`,
      padding: "8px 16px",
      borderRadius: 12,
      boxShadow: `0 4px 8px rgba(0, 0, 0, .1)`,
    }}
  >
    {children}
  </div>
);
export const Tags = ({ children }) => (
  <div
    style={{
      display: "flex",
      gap: 8,
      marginTop: 16,
    }}
  >
    {children}
  </div>
);
export const Footer = ({ children }) => (
  <div
    style={{
      display: "flex",
      gap: 64,
      padding: `32px 64px`,
      background: "#f2f2f2",
      width: "100%",
    }}
  >
    {children}
  </div>
);
export const Header = ({ children }) => (
  <div
    style={{
      padding: "32px 64px",
      paddingBottom: 0,
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div>🍤 北科課程好朋友</div>
    {children}
  </div>
);
export const Content = ({ children }) => (
  <div
    style={{
      display: "flex",
      textAlign: "left",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: `32px 64px`,
      position: "relative",
    }}
  >
    {children}
  </div>
);
export const Title = ({ children }) => (
  <div style={{ fontSize: 56 }}>{children}</div>
);
export const SubTitle = ({ children }) => (
  <div style={{ fontSize: 36, opacity: 0.5 }}>{children}</div>
);
export const Spacer = () => <div style={{ flex: 1 }} />;
