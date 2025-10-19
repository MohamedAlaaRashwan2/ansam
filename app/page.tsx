import ImageSlider from "./components/sadbar";
import About from "./components/about";
import Services from "./components/Services";
import Room from "./components/roomhome";
import Contact from "./components/contact";
import Footer from "./components/Footer";
function Home() {
  return (
    <div className="mainPage">
      <ImageSlider />
      <About />
      <Services/>
      <Room/>
      <Contact/>
    </div>
  );
}
export default Home;