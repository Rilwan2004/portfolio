import Hero     from "@/app/components/Hero";
import About    from "@/app/components/About";
import Skills   from "@/app/components/Skills";
import Projects from "@/app/components/Projects";
import Contact  from "@/app/components/Contact";

export default function Page() {
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="skills"><Skills /></section>
      <section id="projects"><Projects /></section>

      {/*
        This sentinel div is the trigger point.
        When it enters the viewport, Contact.tsx shows the footer.
        When it leaves, the footer slides back down.
        It must be ABOVE the Contact import so it appears in the page flow.
      */}
      <div id="footer-sentinel" style={{ height: "1px" }} />

      <Contact />
    </>
  );
}