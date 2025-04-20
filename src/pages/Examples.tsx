
import React from "react";
import { Sidebar } from "@/components/examples/Sidebar";
import { MainContainer } from "@/components/examples/MainContainer";

const Examples = () => {
  return (
    <div className="flex min-h-screen w-full pt-16">
      <Sidebar />
      <MainContainer />
    </div>
  );
};

export default Examples;
