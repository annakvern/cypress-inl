"use client";

export const Footer = () => {
  return (
    <footer
      style={{
        padding: 20,
        backgroundColor: "gray",
      }}
    >
      <div>
        <h3
          style={{
            flexGrow: 1,
            textDecoration: "none",
            fontSize: 20,
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
