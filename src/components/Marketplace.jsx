import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";

function Marketplace() {
  const { isAuthenticated, user } = useMoralis();

  const dummy = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const Cards = ({ data, type, title, description }) => {
    return (
      <React.Fragment>
        {data.map((level) => (
          <div
            className="card py-2 rounded bg-dark mx-3"
            style={{ width: "18rem" }}
          >
            <img
              src={`tokens/${type}_${level}.png`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-center">
              <h5 className="card-title text-white">{`${title} #${level}`}</h5>
              <p className="card-text">{description}</p>

              <div
                className="btn text-dark rounded-pill text-white fw-bold"
                style={{ background: "#4444fc" }}
              >
                Mint Now
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 2.5 }}
        className="container"
      >
        <h1
          className="text-white fw-bold text-end my-3 mt-5 pt-4"
          style={{ fontSize: "5rem" }}
        >
          Gods for sale
        </h1>

        <section className="py-5 my-5">
          <h4
            style={{ background: "#4444fc" }}
            className="text-white btn btn-lg text-start"
          >
            Cricket 🏏
          </h4>
          <div className="mt-3 d-flex justify-content-center">
            <Marquee
              className=" mt-5 mb-0  "
              direction="right"
              speed={40}
              pauseOnHover
              gradient
              gradientWidth={0}
              gradientColor={[31, 31, 31]}
            >
              <Cards
                data={dummy}
                title="God Of Cricket"
                description=" This mighty statue blesses the gifted players with unlimited money"
                type="cricket"
              />
            </Marquee>
          </div>
        </section>

        <section className="my-5 py-5">
          <h4
            style={{ background: "#4444fc" }}
            className="text-white btn btn-lg text-start"
          >
            Snake 🐍
          </h4>
          <div className="mt-3 d-flex justify-content-center">
            <Marquee
              className=" mt-5 mb-0  "
              direction="right"
              speed={40}
              pauseOnHover
              gradient
              gradientWidth={0}
              gradientColor={[31, 31, 31]}
            >
              <Cards
                data={dummy}
                title="God Of Snake"
                description=" This mighty statue blesses the gifted players with unlimited money"
                type="snake"
              />
            </Marquee>
          </div>
        </section>

        <section className="my-5 py-5">
          <h4
            style={{ background: "#4444fc" }}
            className="text-white btn btn-lg text-start"
          >
            Gambling 🎰
          </h4>
          <div className="mt-3 d-flex justify-content-center">
            <Marquee
              className=" mt-5 mb-0  "
              direction="right"
              speed={40}
              pauseOnHover
              gradient
              gradientWidth={0}
              gradientColor={[31, 31, 31]}
            >
              <Cards
                data={dummy}
                title="God Of Gambling"
                description=" This mighty statue blesses the gifted players with unlimited money"
                type="gamblling"
              />
            </Marquee>
          </div>
        </section>

        <section className="my-5 py-5">
          <h4
            style={{ background: "#4444fc" }}
            className="text-white btn btn-lg text-start"
          >
            Money 💰
          </h4>
          <div className="mt-3 d-flex justify-content-center">
            <Marquee
              className=" mt-5 mb-0  "
              direction="right"
              speed={40}
              pauseOnHover
              gradient
              gradientWidth={0}
              gradientColor={[31, 31, 31]}
            >
              <Cards
                data={dummy}
                title="God Of Money"
                description=" This mighty statue blesses the gifted players with unlimited money"
                type="money"
              />
            </Marquee>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}

export default Marketplace;
