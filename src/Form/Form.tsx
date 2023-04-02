import React, { useReducer } from "react";
import "./Form.css";


export interface UserInfo {
    firstName: string;
    lastName: string;
    email: any;
}

interface actionProps {
    type: 'FIRSTNAME' | 'LASTNBAME' | 'EMAIL' | 'SUBMITTED' | 'ALLVALID'
    payload: any
}

const reducer = (state: any, action: actionProps) => {
    switch (action.type) {
        case 'FIRSTNAME':
            return {
                ...state , firstName: action.payload
            };
        case 'LASTNBAME':
            return {
                ...state , lastName: action.payload
            };
        case 'EMAIL':
            return {
                ...state , email: action.payload
            };
        case 'SUBMITTED':
            return {
                ...state , submitted: action.payload
            };
        case 'ALLVALID':
            return {
                ...state , allValid: action.payload
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

    // const [firstNameData, setFirstNameData] = useState<string>(""); // state for first name input
    // const [lastNameData, setLastNameData] = useState<string>(""); // State for last name input
    // const [emailData, setEmailData] = useState<string>(""); // State for email input
    // const [submitted, setSubmitted] = useState<boolean>(false); // State for POST data
    // const [allValid, setAllValid] = useState<boolean>(false); // State for input data check 

    const submitHandler = (event: any) => {
        event.preventDefault()

        dispatch({ type: 'SUBMITTED' , payload :true})

        if (state.firstName.length !== 0 && state.lastName.length !== 0 && state.email.length !== 0) {
            dispatch({ type: 'ALLVALID' , payload :true})

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
                dispatch({ type: 'ALLVALID' , payload :false})
            }, 3000);

            dispatch({ type: 'SUBMITTED' , payload :false})

            dispatch({type: 'FIRSTNAME' , payload: ''})
            dispatch({type: 'LASTNBAME' , payload: ''})
            dispatch({type: "EMAIL" , payload: ''})

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
                    value={state.firstName}
                    onChange={(event) => dispatch({ type: 'FIRSTNAME' , payload: event.target.value})}
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
                    value={state.lastName}
                    onChange={(event) => dispatch({ type : 'LASTNBAME', payload: event.target.value})}
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
                    value={state.email}
                    onChange={(event) => dispatch({ type: 'EMAIL' , payload: event.target.value})}
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