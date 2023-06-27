import React from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveBoardId, toggleDeleteBoardPop } from "../../Redux/UX";
import { deleteBoard } from "../../Redux/data";

function DeleteBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const deleteBoardActive = useSelector((state) => state.ux.deleteBoardPop);
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const darkTheme = useSelector((state) => state.ux.darkMode);
    const boards = useSelector((state) => state.data.boards);

    // ===== React Spring Transition.
    const transition = useTransition(deleteBoardActive, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    const confirmDelete = () => {
        const newBoardDetails = boards.length > 0 ? boards.filter(el => el.board_id !== activeBoardId)[0] : null
        dispatch(deleteBoard({deleteId: activeBoardId}));
        dispatch(changeActiveBoardId({newId: newBoardDetails ? newBoardDetails.board_id : null, newName: newBoardDetails ? newBoardDetails.board_name : "No Board"}));
        dispatch(toggleDeleteBoardPop());
    };

    const cancelDelete = () => {
        dispatch(toggleDeleteBoardPop());
    };


    return (
        transition((style, deleteBoardActive) => deleteBoardActive ? (
            <animated.div style={style} className="delete-barod-wrapper" >
                <div className={darkTheme ? "delete-barod-container" : "delete-barod-container delete-barod-container-light"}>
                    <h1>Are you sure you want to delete this board, all tasks, completed or otherwise will be deleted too.</h1>
                    <div className='delete-btns-container'>
                        <button onClick={confirmDelete}>Confirm</button>
                        <button onClick={cancelDelete}>Cancel</button>
                    </div>
                </div>
            </animated.div>
        ) : null)
    )
}

export default DeleteBoard;