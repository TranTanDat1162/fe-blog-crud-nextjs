import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is home page",
};

const HomePage = () => {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-extrabold text-blue-600 flex items-center justify-center">
        This is Home Page
      </h1>
    </div>
  );
};

export default HomePage;
