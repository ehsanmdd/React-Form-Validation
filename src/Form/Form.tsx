import React, { useReducer } from "react";
import "./Form.css";


export interface UserInfo {
    firstName: string;
    lastName: string;
    email: any;
}

interface actionProps {
    type: 'INPUT' | 'SUBMITTED' | 'ALLVALID'
    payload?: any
}

const reducer = (state: any, action: actionProps) => {
    switch (action.type) {
        case 'INPUT':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
              };
        case 'SUBMITTED':
            return {
                submitted: true
            };
        case 'ALLVALID':
            return {
               allValid: true
            };
        default:
            return {
                state
            };
    }
}

function Form() {



    const [state, dispatch] = useReducer(reducer, {

        firstName: '',
        lastName: '',
        email: '',
        submitted: false,
        allValid: false
    })

    const handleChange = (e: any) => {
        dispatch({
          type: "INPUT",
          payload: { name: e.target.name, value: e.target.value },
        });
      };

    const submitHandler = (event: any) => {
        event.preventDefault()

        dispatch({ type: 'SUBMITTED'})

        if (state.firstName.length !== 0 && state.lastName.length !== 0 && state.email.length !== 0) {
            dispatch({ type: 'ALLVALID'})

            let userFormInput: UserInfo = {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
            }

            fetch("https://formvalidation-8094b-default-rtdb.asia-southeast1.firebasedatabase.app/users.json", {
                method: "POST",
                body: JSON.stringify(userFormInput),
            }).then(res => (console.log(res)))

            setTimeout(() => {
                dispatch({ type: 'ALLVALID' })
            }, 3000);

            dispatch({ type: 'SUBMITTED' })


        }
    }

    return (
        <div className="form-container">
            <form className="register-form" autoComplete="off" onSubmit={submitHandler}>
                {state.submitted && state.allValid && (
                    <div className="success-message">Success! Thank you for registering</div>
                )}
                <input
                    id="first-name"
                    onChange={handleChange}
                    className="form-field"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                />
                {state.submitted && state.firstName.length === 0 && (
                    <span id="first-name-error">Please enter a first name</span>
                )}
                <input
                    id="last-name"
                    onChange={handleChange}
                    className="form-field"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                />
                {state.submitted && state.lastName.length === 0 && (
                    <span id="first-name-error">Please enter a Last Name</span>
                )}
                <input
                    id="email"
                    onChange={handleChange}
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                {state.submitted && state.email.length === 0 && (
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