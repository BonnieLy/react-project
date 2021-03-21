import React from "react";
import Images from "../components/Images";

export default function Gallery() {
  return (
    <section className="space-y-4 justify-center">
      <div className="text-center justify-center container mx-auto space-y-4">
        <Images />
      </div>
    </section>
  );
}
