import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Proof from "@/components/sections/Proof";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Proof />
      <Projects />
      <Contact />
    </main>
  );
}
