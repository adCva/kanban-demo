import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleNewBoardPop } from "../Redux/UX";
import { addBoard } from "../Redux/data";

function NewBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const darkTheme = useSelector((state) => state.ux.darkMode);
    const isOpen = useSelector((state) => state.ux.newBoardPop);
    const boards = useSelector((state) => state.data.boards);

    // ===== Local state.
    const [formData, setFormData] = useState({
        title: "",
        customStatus: [],
        allStatuses: []
    });

    // ===== Handle local state change.
    const handleTitleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // ===== Handle Predefined (todo, doing, done) Checkboxes.
    const handlePredefinedCheckbox = (status) => {
        if (formData.allStatuses.includes(status)) {
            let tempArray = [...formData.allStatuses];
            tempArray.splice(tempArray.indexOf(status), 1);

            setFormData(prevState => ({
                ...prevState,
                allStatuses: tempArray
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                allStatuses: [...formData.allStatuses, status]
            }));
        }
    };

    // ===== Add Custom Status Input.
    const addCustomStatusInput = () => {
        if (formData.customStatus.length < 3) {
            setFormData(prevState => ({
                ...prevState,
                customStatus: [...formData.customStatus, {name: ""}]
            }));
        }
    };

    // ===== Add Text to Custom Status Input.
    const addTextCustomInput = (event, index) => {
        let tempArray = [...formData.customStatus];
        let tempFile = tempArray[index];
        tempFile.name = event.target.value;

        tempArray.splice(index, 1, tempFile);

        setFormData(prevState => ({
            ...prevState,
            customStatus: tempArray
        }));
    };

    // ===== Delete Custom Status Input.
    const deleteCustomInput = (index) => {
        let tempArray = [...formData.customStatus];
        tempArray.splice(index, 1);

        setFormData(prevState => ({
            ...prevState,
            customStatus: tempArray
        }));
    };

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

        const biggestBoardId = boards.length === 0 ? 0 : boards.reduce((prev, current) => { return (current.board_id > prev.board_id) ? current : prev }).board_id

        const newBoardData = {
            board_id: biggestBoardId + 1,
            board_name: formData.title,
            board_avaiableStatuses: [...formData.allStatuses, ...formData.customStatus.map(el => el.name)]
        }

        dispatch(addBoard({newBoard: newBoardData}));
        dispatch(toggleNewBoardPop());

        setFormData({title: "", customStatus: [], allStatuses: []});
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
                            <input type='text' placeholder='Board Name' id='boardName' value={formData.title} name="title" onChange={handleTitleChange} />
                        </div>

                        <div className='form-group-checkboxes'>
                            <label>Board Available Statuses</label>

                            <div className='checkbox-group' >
                                <label>Todo</label>
                                <input type='checkbox' onChange={() => handlePredefinedCheckbox("todo")} />
                            </div>

                            <div className='checkbox-group' >
                                <label>Doing</label>
                                <input type='checkbox' onChange={() => handlePredefinedCheckbox("doing")} />
                            </div>

                            <div className='checkbox-group' >
                                <label>Done</label>
                                <input type='checkbox' onChange={() => handlePredefinedCheckbox("done")} />
                            </div>

                            <div className='custom-checkbox-group' >
                                {formData.customStatus.map((el, i) => (
                                    <div key={i} className='custom-status-input' >
                                        <input type='text' placeholder='Status Name' value={el.name} onChange={(e) => addTextCustomInput(e, i)} />
                                        <button type='button' onClick={() => deleteCustomInput(i)}>Delete</button>
                                    </div>
                                ))}
                                <button type='button' onClick={addCustomStatusInput} >Add Custom Status</button>
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