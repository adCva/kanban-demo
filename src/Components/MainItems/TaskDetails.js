import React from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { closeDetailsPop } from "../../Redux/UX";

function TaskDetails({darkTheme}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const activeBoardId = useSelector((state) => state.ux.activeBoardId);
    const seeDetailsForTask = useSelector((state) => state.ux.detailsForTask);

    // ===== React Spring Transition.
    const transition = useTransition(seeDetailsForTask, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return (
        transition((style, seeDetailsForTask) => seeDetailsForTask ? (
            <animated.div style={style} className={darkTheme ? "task-details-wrapper" : "task-details-wrapper task-details-wrapper-light"} onClick={() => dispatch(closeDetailsPop())}>
                <div className='task-details-container'>
                    Task Details
                </div>
            </animated.div>
        ) : null)
    )
}

export default TaskDetails;