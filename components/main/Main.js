const Main = ({ children }) => {
  return (
    <>
      <main
        className="max-w-screen-2xl mx-auto p-8"
        style={{ minHeight: "calc(100vh - 12rem)" }}
      >
        {children}
      </main>
    </>
  );
};

export default Main;
