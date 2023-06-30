import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { openNewColumnPop } from "../../Redux/UX";
import { addNewStatusColumn } from "../../Redux/data";

function NewColumn() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isNewColumnPop = useSelector((state) => state.ux.newColumnPop);
    const darkTheme = useSelector((state) => state.ux.darkMode);
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);

    // ===== Local state.
    const [name, setName] = useState("");

    // ===== React Spring Transition.
    const transition = useTransition(isNewColumnPop, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.length === 0) {
            console.log("Empty");
            dispatch(openNewColumnPop());
            return null;
        }
        dispatch(addNewStatusColumn({currentId: activeBoardId, newStatus: name}));
        dispatch(openNewColumnPop());
    };

    return (
        transition((style, isNewColumnPop) => isNewColumnPop ? (
            <animated.div style={style} className="pop-up-wrapper" >
                <div className={darkTheme ? "pop-up-container" : "pop-up-container pop-up-container-light"}>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Status Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <button type='submit'>Create</button>
                    </form>
                </div>
            </animated.div>
        ) : null)
    )
}

export default NewColumn;