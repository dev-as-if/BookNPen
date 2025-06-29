import React from "react";
import "../components/donate_us.css";
import qrImage from "../assets/BPPS.jpg"; // Replace with your actual path

const Donation = () => {
  return (
    <div className="donation-container">
      <div className="donation-header text-center">
        <h1>Support a Child, Transform a Future</h1>
        <p>Your donation empowers education for underprivileged children at Book & Pen Public School.</p>
      </div>

      <div className="donation-box">
        <div className="qr-section">
          <img src={qrImage} alt="Scan to Donate QR" className="qr-image" />
          {/* <p className="upi-id"><strong>UPI ID:</strong> booknpen@upi</p> */}
        </div>

        <div className="bank-section">
          <h3>Bank Transfer Details</h3>
          <ul>
            <li><strong>Account Name:</strong> Book and Pen Mission Educate foundation</li>
            <li><strong>Bank Name:</strong> Canara Bank</li>
            <li><strong>Account Number:</strong> 120002592841</li>
            <li><strong>IFSC Code:</strong> CNRB0003290</li>
            <li><strong>Branch:</strong> Nawada, Bihar</li>
            <br /><br /><br /><br />
            <div className="note">
              <li className="text-black"><strong>Note:</strong> Please send the donation using Indian registered bank only</li>
            </div>
            
          </ul>
        </div>
      </div>

      <div className="donation-thankyou text-center">
        <h4>Thank You for Your Generosity!</h4>
        <p>Every contribution helps us provide education, meals, and a better future for our children.</p>
        <p className="secure-note">🔒 100% Secure and Trusted Payment Gateway</p>
      </div>

      <div className="donation-contact text-center">
        <p className="text-black">Need help or want to share your donation receipt?</p>
        <p className="text-black">Email us at: <strong>enquiry@booknpen.com</strong></p>
      </div>
    </div>
  );
};

export default Donation;
