import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Process from "@/components/Process";
import Projects from "@/components/Project";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Journey />
      <Process />
      <Projects />
      <ContactMe />
      <Footer />
    </div>
  );
}
