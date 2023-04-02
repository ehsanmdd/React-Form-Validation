import React, { useState } from "react";
import "./Form.css";


export interface UserInfo {
    firstName: string;
    lastName: string;
    email: any;
}


function Form() {

    const [firstNameData, setFirstNameData] = useState<string>(""); // state for first name input
    const [lastNameData, setLastNameData] = useState<string>(""); // State for last name input
    const [emailData, setEmailData] = useState<string>(""); // State for email input
    const [submitted, setSubmitted] = useState<boolean>(false); // State for POST data
    const [allValid, setAllValid] = useState<boolean>(false); // State for input data check 

    const submitHandler = (event: any) => {
        event.preventDefault()

        setSubmitted(true)

        if (firstNameData.length !== 0 && lastNameData.length !== 0 && emailData.length !== 0) {
            setAllValid(true)

            let userFormInput : UserInfo = {
                firstName: firstNameData,
                lastName: lastNameData,
                email: emailData,
            }

            fetch("https://formvalidation-8094b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json", {
                method: "POST",
                body: JSON.stringify(userFormInput),
            }).then(res => (console.log(res)))

            setTimeout(() => {
                setAllValid(false)
            }, 3000);

            setSubmitted(false)

            setFirstNameData("")
            setLastNameData("")
            setEmailData("")

        }
    }

    return (
        <div className="form-container">
            <form className="register-form" autoComplete="off" onSubmit={submitHandler}>
                {submitted && allValid && (
                    <div className="success-message">Success! Thank you for registering</div>
                )}
                <input
                    id="first-name"
                    value={firstNameData}
                    onChange={(event) => setFirstNameData(event.target.value)}
                    className="form-field"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                />
                {submitted && firstNameData.length === 0 && (
                    <span id="first-name-error">Please enter a first name</span>
                )}
                <input
                    id="last-name"
                    value={lastNameData}
                    onChange={(event) => setLastNameData(event.target.value)}
                    className="form-field"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                />
                {submitted && lastNameData.length === 0 && (
                    <span id="first-name-error">Please enter a Last Name</span>
                )}
                <input
                    id="email"
                    value={emailData}
                    onChange={(event) => setEmailData(event.target.value)}
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                {submitted && emailData.length === 0 && (
                    <span id="first-name-error">Please enter a Email</span>
                )}
                <button className="form-field" type="submit">
                    Register
                </button>
            </form>
        </div>

    )
}


export default Form