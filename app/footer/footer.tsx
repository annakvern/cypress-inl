"use client";

export const Footer = () => {
  return (
    <footer
      style={{
        padding: 20,
        backgroundColor: "#d9cdc7",
      }}
    >
      <div>
        <h3
          style={{
            flexGrow: 1,
            textDecoration: "none",
            fontSize: 20,
            color: "#363433",
          }}
        >
          Copyright Nattaktiviteter AB
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        ></div>
      </div>
    </footer>
  );
};
