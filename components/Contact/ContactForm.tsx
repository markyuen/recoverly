import React, { useReducer } from "react";
import ContactInput from "./ContactInput";
import axios from "axios";
import useChakraToast from "../../hooks/useChakraToast";
import { validateEmail } from "../../lib/helpers";

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_MESSAGE = "UPDATE_MESSAGE";
const RESET_STATE = "RESET_STATE";

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NAME: {
      return { ...state, name: action.payload };
    }
    case UPDATE_EMAIL: {
      return { ...state, email: action.payload };
    }
    case UPDATE_MESSAGE: {
      return { ...state, message: action.payload };
    }
    case RESET_STATE: {
      return initialFormState;
    }
    default: {
      throw new Error("Unexpected action");
    }
  }
};

const ContactForm = () => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const { generateSuccessToast, generateWarningToast } = useChakraToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formState.email)) {
      generateWarningToast("Warning", "Please enter a valid email address");
      return;
    }

    if (formState.name === "" || formState.message === "") {
      generateWarningToast(
        "Warning",
        "Please complete all the fields in the form"
      );
      return;
    }

    axios
      .post("/api/airtable/customer_enquiry", {
        ...formState,
      })
      .then((res) => {
        dispatch({ type: RESET_STATE });
        generateSuccessToast(
          "Success!",
          "Your enquiry has been succesfully sent. We will get back to you soon with an answer"
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-lg mx-auto lg:max-w-none">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
        <ContactInput
          value={formState.name}
          onChange={(name) => dispatch({ type: UPDATE_NAME, payload: name })}
          placeholder="Full name"
          type="text"
        />
        <ContactInput
          value={formState.email}
          onChange={(email) => dispatch({ type: UPDATE_EMAIL, payload: email })}
          placeholder="Email Address"
          type="text"
        />
        <ContactInput
          value={formState.message}
          onChange={(message) =>
            dispatch({ type: UPDATE_MESSAGE, payload: message })
          }
          placeholder="Message"
          type="textarea"
        />

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
