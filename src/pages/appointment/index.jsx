import { forwardRef, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SampleImage from "../../assets/booking.png";
import Button from "../../components/button";

const FormControl = forwardRef(
  ({ id, label, type, required, onChange }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          name={id}
          placeholder={label}
          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          required={required}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default function AppointmentPage() {
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    navigate("/confirmation/:id");
  };

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const agreementRef = useRef();

  const handleFormChange = () => {
    // Basic validation: Check if all required fields are filled
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const phone = phoneRef.current?.value;
    const email = emailRef.current?.value;
    const agreementChecked = agreementRef.current?.checked;

    if (firstName && lastName && phone && email && agreementChecked) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Make an appointment</h2>
      <hr className="my-8 bg-blue-900 h-0.5" />
      <div className="flex flex-row gap-16">
        <div className="relative">
          <div className="bg-black rounded-3xl w-[14rem] h-[22rem] me-8 mb-8" />
          <img
            src={SampleImage}
            alt="Dentist Logo"
            className="absolute top-8 left-8 rounded-3xl w-[14rem] h-[22rem] object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 gap-8">
          <FormControl
            ref={firstNameRef}
            onChange={handleFormChange}
            label="First Name"
            type="text"
            id="first_name"
            required
          />
          <FormControl
            ref={lastNameRef}
            onChange={handleFormChange}
            label="Last Name"
            type="text"
            id="last_name"
            required
          />
          <FormControl
            ref={phoneRef}
            onChange={handleFormChange}
            label="Phone"
            type="tel"
            id="phone"
            required
          />
          <FormControl
            ref={emailRef}
            onChange={handleFormChange}
            label="Email"
            type="email"
            id="email"
            required
          />
          <div className="col-span-2">
            <label htmlFor="message" className="block">
              Message
            </label>
            <textarea
              placeholder="Include a message.."
              id="message"
              className="w-full min-h-24 px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center col-span-2">
            <input
              ref={agreementRef}
              type="checkbox"
              id="agreement"
              className="h-5 w-5 mr-2 text-green-500"
              onChange={handleFormChange}
            />
            <p>You agree with our friendly privacy policy</p>
          </div>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            disabled={!formValid}
            active={formValid}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
