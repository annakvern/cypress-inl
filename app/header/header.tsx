"use client";

export const Header = () => {
  return (
    <header
      style={{
        padding: 20,
        backgroundColor: "gray",
        zIndex: 1100,
      }}
    >
      <div id="toolbar">
        <h1
          style={{
            flexGrow: 1,
            textDecoration: "none",
            fontSize: 45,
          }}
        >
          Nattaktiviteter
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        ></div>
      </div>
    </header>
  );
};
