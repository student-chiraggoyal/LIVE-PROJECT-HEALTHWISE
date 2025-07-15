import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = ({ showAssessmentButton = true }) => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#003366] text-white">
      {/* Top CTA Section */}
      {showAssessmentButton && (
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-b border-blue-800 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-0">
            Take <span className="text-orange-600">HealthWise</span> Automation
            From Vision To Value
          </h2>
          <button
            className="bg-orange-600 text-[#003366] font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
            onClick={() => navigate("/quiz")}
          >
            Start Assessment →
          </button>
        </div>
      )}

      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-600">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms and Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-600">Connection Details</h4>
          <ul className="space-y-2 text-sm">
            <li>Email - chirag8056.in@gmail.com</li>
            <li>
              LinkedIn -{" "}
              <a
                href="https://linkedin.com/in/chiragGoyal"
                target="_blank"
                rel="noopener noreferrer"
              >
                chiragGoyal
              </a>
            </li>
            <li>
              GitHub -{" "}
              <a
                href="https://github.com/student-chiraggoyal"
                target="_blank"
                rel="noopener noreferrer"
              >
                student-chiraggoyal
              </a>
            </li>
            <li>Instagram - @chirag8056.in</li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-600">Solutions</h4>
          <ul className="space-y-2 text-sm">
            <li>Modification</li>
            <li>OCR API Solutions</li>
            <li>AI & ML Solutions</li>
            <li>NLP Solutions</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-600">Products</h4>
          <ul className="space-y-2 text-sm">
            <li>Chatbot</li>
            <li>Live Chat</li>
            <li>WhatsApp Business</li>
            <li>Account Reconciliation</li>
            <li>Digital eSign</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-blue-200 border-t border-blue-800 py-4">
        © {new Date().getFullYear()} HealthWise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
