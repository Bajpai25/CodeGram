import React from "react";
import { Link } from "react-router-dom";
import MainHeading from "../components/MainHeading";

const CompetePage = ({
  token,
  id,
}: {
  token: string | null;
  id: string | null;
}) => {
  const isLoggedIn = Boolean(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <MainHeading
        data={{
          status: isLoggedIn ? "loggedin" : "not-loggedin",
        }}
      />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
          Compete
        </h1>

        {isLoggedIn ? (
          <div className="text-center text-gray-400 text-xl">
            Programming contests and competitions coming soon!
          </div>
        ) : (
          <div className="text-center text-gray-400 text-xl">
            Please{" "}
            <Link
              to="/login"
              className="text-orange-400 font-semibold hover:underline"
            >
              log in
            </Link>{" "}
            or{" "}
            <Link
              to="/signup"
              className="text-orange-400 font-semibold hover:underline"
            >
              sign up
            </Link>{" "}
            to participate in exciting programming contests and challenges.
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetePage;
