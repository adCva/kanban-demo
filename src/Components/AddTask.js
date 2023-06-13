import React, { useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { toggleAddTaskPop } from "../Redux/UX";
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';

function AddTask({darkTheme}) {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isOpen = useSelector((state) => state.ux.isAddTaskPop);

  // ===== React Spring Transition.
  const transition = useTransition(isOpen, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
  });

  // ===== Close pop on outside click.
  const closePopOutsideClick = (e) => {
    if (isOpen && e.target.className === "add-task-wrapper") {
      dispatch(toggleAddTaskPop());
    }
  }

  useEffect(() => {
    document.addEventListener("click", closePopOutsideClick);

    return () => {
      document.removeEventListener("click", closePopOutsideClick);
    }
  }, [])


  return (
    transition((style, isOpen) => isOpen ? (
      <animated.div style={style} className="add-task-wrapper" >
          <div className={darkTheme ? "add-task-container" : "add-task-container add-task-container-light"} >

            <h1 className='component-title'>Add New Task</h1>

            <form>
              {/* ===================== Title ===================== */}
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' name='title' />
                <p>Fielr required.</p>
              </div>

              {/* ===================== Description ===================== */}
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea id='description' name="desc" ></textarea>
              </div>

            </form>

          </div>
      </animated.div>
    ) : null)
  )
}

export default AddTask;