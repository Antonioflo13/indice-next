//REACT
import React, { useState } from "react";
//STATE
import { useDispatch, useSelector } from "react-redux";
import { setDialogContactShow } from "../store/modules/dialogContact";
//INTL
import { FormattedMessage } from "react-intl";
//MOTION
import { AnimatePresence, motion } from "framer-motion";
//COMPONENTS
import Modal from "./modal";
import PageTitle from "./page-title";
import { stores } from "../data/stores";
//ICONS
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import closeIcon from "../assets/images/cross.svg";

const Contact = ({ setShown }) => {
  //STORE
  const showDialogProduct = useSelector(state => state.dialogContact.product);
  const dispatch = useDispatch();
  const initialValues = {
    store: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  //STATE
  const [sendingForm, setSendingForm] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const [successShown, setSuccessShown] = useState(false);
  const [errorShown, setErrorShown] = useState(false);
  const Brescia = stores[0].name;
  const Forte = stores[1].name;
  const Roma = stores[2].name;

  //FUNCTIONS
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

    if (
      formValues.store.length > 0 &&
      formValues.name.length > 0 &&
      formValues.email.length > 0 &&
      formValues.phone.length > 0 &&
      formValues.message.length > 0
    ) {
      setDisabled(false);
    }
  };

  const handleSubmit = e => {
    setSendingForm(true);
    fetch("https://submit-form.com/bevHjZg7", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then(() => {
        setFormValues(initialValues);
        setSuccessShown(true);
        setDisabled(true);
      })
      .catch(_error => {
        setErrorShown(true);
      })
      .finally(() => {
        setSendingForm(false);
      });
    e.preventDefault();
  };

  return (
    <>
      <Modal setShown={setShown}>
        <div className="flex flex-col w-full">
          <div className="flex md:flex-row flex-col-reverse md:items-start items-end">
            <div className="flex-1">
              <PageTitle
                title={"contacts.title"}
                subtitle={"contacts.subtitle"}
              />
            </div>
            <div>
              <button className="close-menu" onClick={() => dispatch(setDialogContactShow(false))}>
                <span>
                  <img src={closeIcon.src} width={10} alt="close-icon" />
                </span>
              </button>
            </div>
          </div>
          <div className="md:mt-0 flex-1 flex flex-col justify-center items-center md:items-start">
            <form
              name="contact"
              method="post"
              className="w-full mt-4"
              onSubmit={handleSubmit}
            >
              {showDialogProduct && (
                <div className="-mt-4 mb-5 text-xs">
                  <FormattedMessage id="contacts.text" />{" "}
                  <b>{showDialogProduct.title}</b> di{" "}
                  <b>{showDialogProduct.vendor}</b>
                </div>
              )}
              <AnimatePresence>
                {(successShown || errorShown) && (
                  <motion.div
                    key={successShown ? "success" : "error"}
                    initial={{ opacity: 0, height: "0px" }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: "0px" }}
                    transition={{ type: "tween" }}
                    className={`flex mb-4 p-4 ${
                      successShown ? "bg-green-200" : "bg-red-200"
                    } items-center justify-center`}
                  >
                    <div className="text-xs flex-1">
                      {successShown ? (
                        <>
                          Abbiamo ricevuto il tuo messaggio e ti ricontatteremo
                          al più presto
                        </>
                      ) : (
                        <>Non è stato possibile inviare il messaggio</>
                      )}
                    </div>
                    <button
                      className="mr-2 text-gray-800"
                      onClick={e => {
                        setSuccessShown(false);
                        setErrorShown(false);
                        e.preventDefault();
                      }}
                    >
                      <span>
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="hidden">
                <label htmlFor="name" className="block text-xs">
                  Very extra info:
                </label>
                <input id="very-extra-info" name="very-extra-info" />
              </div>
              <input type="hidden" name="form-name" value="contact" />
              <input
                type="hidden"
                name="product"
                value={
                  showDialogProduct
                    ? `${showDialogProduct.title} - ${showDialogProduct.vendor}`
                    : ""
                }
              />
              <div className="flex flex-col">
                <label
                  className="inline-flex items-center pointer"
                  onClick={handleChange}
                >
                  <input
                    type="radio"
                    className="form-checkbox"
                    name="store"
                    defaultValue={Brescia}
                    value={formValues.store.defaultValue}
                  />
                  <span className="ml-2">{Brescia}</span>
                </label>
                <label className="inline-flex items-center pointer">
                  <input
                    type="radio"
                    className="form-checkbox"
                    name="store"
                    defaultValue={Forte}
                    value={formValues.store.defaultValue}
                    onClick={handleChange}
                  />
                  <span className="ml-2">{Forte}</span>
                </label>
                <label className="inline-flex items-center pointer">
                  <input
                    type="radio"
                    className="form-checkbox"
                    name="store"
                    defaultValue={Roma}
                    value={formValues.store.defaultValue}
                    onClick={handleChange}
                  />
                  <span className="ml-2">{Roma}</span>
                </label>
              </div>
              <div className="mt-8 grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-4 md:gap-8">
                <div>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    autoComplete="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    id="phone"
                    placeholder="Phone"
                    autoComplete="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <textarea
                className="mt-5 block w-full bg-indice-grey px-4 pt-4 pb-3 text-sm"
                style={{ borderRadius: "1.5rem" }}
                rows="4"
                id="message"
                placeholder="Your message here!"
                name="message"
                value={formValues.message}
                onChange={handleChange}
              />
              <div className="mt-8"></div>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="hidden md:block text-xs">
                    <FormattedMessage id="contacts.phone_alternative" />
                  </div>
                </div>
                <div>
                  <button
                    className="rounded-full bg-indice-red pt-1 pb-px px-4 leading-5 text-white font-bold text-xs uppercase"
                    type="submit"
                    disabled={disabled}
                    style={disabled ? { opacity: "0.6" } : { opacity: "1.0" }}
                  >
                    <FormattedMessage id="contacts.send" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <style jsx="true">
        {`
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
          .form-checkbox {
            color: #800000;
            border-radius: 15%;
          }
          .form-checkbox::after {
            content: "";
          }
          .form-checkbox:focus {
            box-shadow: none;
            border-color: transparent;
          }
          .pointer {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Contact;

const Input = props => (
  <input
    className="mt-1 block w-full bg-indice-grey px-4 pt-2 pb-1 text-sm"
    style={{ borderRadius: "1.5rem" }}
    {...props}
  />
);
