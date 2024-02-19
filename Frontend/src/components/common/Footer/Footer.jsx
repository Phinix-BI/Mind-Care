
import { Footer } from 'flowbite-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Component() {
  return (
    <Footer className='bg-white' >
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4" >
          <div>
            <Footer.Title title="MindCare." className='font-extrabold text-xl'  style={{color:"black"}}/>
            <Footer.LinkGroup col className='text-lg'  style={{color:"black"}}>
              <Footer.Link href="/"> Nurturing mental well-being. Personalized assessments, 24/7 AI therapy, seamless appointments. Prioritize your mental health journey with us."</Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="Quick Links" className='font-extrabold text-xl'  style={{color:"black"}}/>
            <Footer.LinkGroup col className='text-lg'  style={{color:"black"}}>
              <Footer.Link href="/">Home</Footer.Link>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Service</Footer.Link>
              <Footer.Link href="#">Contacts</Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="Address" className='font-extrabold text-xl' style={{color:"black"}}/>
            <Footer.LinkGroup col className='text-lg'  style={{color:"black"}}>
              <Footer.Link href="#">368, Sodepur ghola, kolkata-700110.</Footer.Link>
              <Footer.Link href="#">Phone: +91 8240586073</Footer.Link>
              <Footer.Link href="#">Email: mindcare@gmail.com</Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="Social" className='font-extrabold text-xl px-5'  style={{color:"black"}}/>
            <Footer.LinkGroup col className='text-lg flex-row gap-5'  style={{color:"black"}}>
              <Footer.Link href="#"></Footer.Link>
              <Footer.Link href="#"><FaFacebook /></Footer.Link>
              <Footer.Link href="#"><FaInstagram/></Footer.Link>
              <Footer.Link href="#"><FaTwitter  /></Footer.Link>
              <Footer.Link href="#"><FaLinkedin /></Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
    </Footer>
  );
}

export default Component;