import React from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';

function EditBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const darkTheme = useSelector((state) => state.ux.darkMode);
    const isOpen = useSelector((state) => state.ux.editBoardPop);

    // ===== React Spring Transition.
    const transition = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        transition((style, isOpen) => isOpen ? (
            <animated.div style={style} className="edit-board-wrapper" >
                <div className={darkTheme ? "edit-board-container" : "edit-board-container edit-board-container-light"} >

                    <h1 className='component-title'>Edit Board</h1>

                    <form className='edit-board-form' onSubmit={handleSubmit} >

                        <div className='form-group'>
                            <label htmlFor='title'>Name</label>
                            <input type='text' id='title' />
                        </div>

                        <div className='edit-statuses-group'>

                        </div>

                        <button type='submit'>Change Board</button>

                    </form>

                </div>
            </animated.div>
        ) : null)
    )
}

export default EditBoard;