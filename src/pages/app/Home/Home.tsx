import Header from "@widgets/app/Header";
import Hero from "@widgets/app/Hero";
import ChoosePath from "@widgets/app/ChoosePath";
import Partners from "@widgets/app/Partners";
import Testimonials from "@widgets/app/Testimonials";
import Touch from "@widgets/app/Touch";
import Footer from "@widgets/app/Footer";

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChoosePath />
        <Partners />
        <Testimonials />
        <Touch />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
