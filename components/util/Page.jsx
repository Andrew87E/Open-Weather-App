import Head from "next/head";
import React from "react";
import { Sidebar, Jumbotron } from "../index";

export const Page = (currentPage, desc, children) => {
  const pageTitle = `${
    currentPage === "home"
      ? "Weather App - Open Weather API"
      : `${currentPage} - Open Weather`
  }`;

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={desc} />
      </Head>

      <main>
        <div>
          <Jumbotron />
          <Sidebar />

        </div>

        {children}
      </main>
    </div>
  );
};
