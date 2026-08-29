import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Projects from "@/components/Project";
import BlogPreview from "@/components/BlogPreview";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import { MAIN_CONTENT_ID } from "@/lib/accessibility";

export default function Home() {
  return (
    <div>
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Hero />
        <Process />
        <Projects />
        <About />
        <ContactMe />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
