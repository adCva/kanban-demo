import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleNewBoardPop } from "../Redux/UX";

function NewBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const darkTheme = useSelector((state) => state.ux.darkMode);
    const isOpen = useSelector((state) => state.ux.newBoardPop);

    // ===== Local state.
    const [formData, setFormData] = useState({
        name: "",
        customStatus: [],
        allStatuses: []
    });

    // ===== React Spring Transition.
    const transition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Close pop on outside click.
    const closePopOutsideClick = (e) => {
        if (isOpen && e.target.className === "new-board-wrapper") {
            dispatch(toggleNewBoardPop());
        }
    };

    // ===== Handle form submit.
    const handleNewBoardSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submited");
    };

    useEffect(() => {
        document.addEventListener("click", closePopOutsideClick);

        return () => {
            document.removeEventListener("click", closePopOutsideClick);
        }
    }, [])


    return (
        transition((style, isOpen) => isOpen ? (
            <animated.div style={style} className="new-board-wrapper" >
                <div className={darkTheme ? "new-board-container" : "new-board-container new-board-container-light"} >
                    <h1>Create New Board</h1>

                    <form className='new-board-form' onSubmit={handleNewBoardSubmit}>

                        <div className='form-group' >
                            <label htmlFor='boardName' >Name</label>
                            <input type='text' placeholder='Board Name' id='boardName' value={formData.name} />
                        </div>

                        <div className='form-group-checkboxes'>
                            <label>Board Available Statuses</label>

                            <div className='checkbox-group' >
                                <label>Todo</label>
                                <input type='checkbox' />
                            </div>

                            <div className='checkbox-group' >
                                <label>Doing</label>
                                <input type='checkbox' />
                            </div>

                            <div className='checkbox-group' >
                                <label>Done</label>
                                <input type='checkbox' />
                            </div>

                            <div className='custom-checkbox-group' >
                                {formData.customStatus.map((el, i) => (
                                    <div key={i} className='custom-status-input' >
                                        <input type='text' placeholder='Status Name' />
                                        <button type='button'>Delete</button>
                                    </div>
                                ))}
                                <button type='button' >Add Custom Status</button>
                            </div>

                        </div>

                        <button type='submit'>Create Board</button>

                    </form>

                </div>
            </animated.div>
        ) : null)
    )
}

export default NewBoard;